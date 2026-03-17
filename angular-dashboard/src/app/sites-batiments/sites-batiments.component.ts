import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';

interface Neighborhood {
  name: string;
  lat: number;
  lng: number;
  carbonFootprint: number; // in tonnes CO2/year/capita
  trend: string;
}

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-sites-batiments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sites-batiments.component.html',
  styleUrls: ['./sites-batiments.component.css']
})
export class SitesBatimentsComponent implements OnInit, AfterViewInit, OnDestroy {
  private map?: L.Map;
  searchQuery: string = '';
  isSearching: boolean = false;
  searchError: string = '';
  suggestions: Suggestion[] = [];
  private readonly searchSubject = new Subject<string>();
  
  neighborhoods: Neighborhood[] = [
    { name: 'Centre-Ville', lat: 48.1113, lng: -1.68, carbonFootprint: 8.5, trend: '-2%' },
    { name: 'Thabor-Saint-Hélier', lat: 48.1147, lng: -1.6667, carbonFootprint: 7.2, trend: '-5%' },
    { name: 'Bourg-l’Évesque', lat: 48.1126, lng: -1.6934, carbonFootprint: 6.8, trend: '-3%' },
    { name: 'Villejean-Beauregard', lat: 48.1219, lng: -1.7042, carbonFootprint: 5.4, trend: '-8%' },
    { name: 'Le Blosne', lat: 48.0894, lng: -1.6672, carbonFootprint: 4.9, trend: '-10%' },
    { name: 'Bréquigny', lat: 48.0903, lng: -1.6883, carbonFootprint: 5.7, trend: '-4%' },
  ];

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    console.log('Sites et Bâtiments component initialized');
    
    // Setup debounced search for suggestions
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query.trim() || query.length < 3) {
          return of([]);
        }
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=3`;
        return this.http.get<any[]>(url).pipe(
          catchError(err => {
            console.error('Autocomplete error:', err);
            return of([]);
          })
        );
      })
    ).subscribe(results => {
      this.suggestions = results;
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [48.111, -1.677],
      zoom: 13,
      zoomControl: false 
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(this.map);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    // Add markers for neighborhoods
    const mapInstance = this.map;
    if (!mapInstance) return;

    this.neighborhoods.forEach(n => {
      const marker = L.circleMarker([n.lat, n.lng], {
        radius: 10,
        fillColor: this.getColor(n.carbonFootprint),
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapInstance);

      const popupContent = `
        <div class="map-popup">
          <h3>${n.name}</h3>
          <div class="popup-stats">
            <div class="stat-item">
              <span class="label">Empreinte Carbone</span>
              <span class="value">${n.carbonFootprint} tCO2e/an/hab</span>
            </div>
            <div class="stat-item">
              <span class="label">Tendance</span>
              <span class="value trend ${n.trend.startsWith('-') ? 'positive' : 'negative'}">${n.trend}</span>
            </div>
          </div>
          <button class="action-btn">Voir détails</button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup'
      });
    });
  }

  private getColor(d: number): string {
    if (d > 8) return '#f43f5e';
    if (d > 7) return '#f59e0b';
    if (d > 6) return '#10b981';
    return '#3b82f6';
  }

  onSearchInput(): void {
    this.searchError = '';
    this.searchSubject.next(this.searchQuery);
  }

  selectSuggestion(suggestion: Suggestion): void {
    this.searchQuery = suggestion.display_name;
    this.suggestions = [];
    
    if (this.map) {
      const lat = Number.parseFloat(suggestion.lat);
      const lon = Number.parseFloat(suggestion.lon);
      this.map.setView([lat, lon], 14);
      
      L.marker([lat, lon])
        .addTo(this.map)
        .bindPopup(suggestion.display_name)
        .openPopup();
    }
  }

  searchNeighborhood(): void {
    if (!this.searchQuery.trim()) return;

    this.isSearching = true;
    this.searchError = '';
    this.suggestions = [];

    // 1. Check local list first
    const neighborhood = this.neighborhoods.find(n => 
      n.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (neighborhood && this.map) {
      this.map.setView([neighborhood.lat, neighborhood.lng], 15);
      this.isSearching = false;
      return;
    }

    // 2. If not found, use Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`;
    
    this.http.get<any[]>(url).subscribe({
      next: (results) => {
        if (results && results.length > 0 && this.map) {
          const res = results[0];
          const lat = Number.parseFloat(res.lat);
          const lon = Number.parseFloat(res.lon);
          this.map.setView([lat, lon], 14);
          
          L.marker([lat, lon])
            .addTo(this.map)
            .bindPopup(res.display_name)
            .openPopup();
        } else {
          this.searchError = "Lieu non trouvé";
        }
        this.isSearching = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.searchError = "Erreur lors de la recherche";
        this.isSearching = false;
      }
    });
  }

  zoomIn(): void {
    this.map?.zoomIn();
  }

  zoomOut(): void {
    this.map?.zoomOut();
  }
}
