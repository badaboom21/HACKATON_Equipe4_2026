import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  title = 'angular-dashboard';

  // Doughnut Chart Data
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Construction', 'Exploitation', 'Matériaux'],
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#e0e0e0' } },
    },
  };

  // Bar Chart Data
  public barChartData: ChartData<'bar'> = {
    labels: ['Béton', 'Acier', 'Verre', 'Bois'],
    datasets: [
      {
        data: [65, 59, 80, 81],
        label: 'Émissions CO2 par matériau (kgCO2e)',
        backgroundColor: '#10b981',
        borderRadius: 4,
      },
    ],
  };
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { ticks: { color: '#a0a0a0' }, grid: { color: '#333' } },
      x: { ticks: { color: '#a0a0a0' }, grid: { color: '#333' } },
    },
    plugins: {
      legend: { labels: { color: '#e0e0e0' } },
    },
  };
}
