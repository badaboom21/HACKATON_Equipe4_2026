import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-saisie-releves',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './saisie-releves.component.html',
  styleUrl: './saisie-releves.component.css',
})
export class SaisieRelevesComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  savedData: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      surfaceSite: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      placesParking: ['', [Validators.required, Validators.min(0)]],
      consoEnergetique: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      anneeConsommation: [new Date().getFullYear(), Validators.required],
      nombreEmployes: ['', [Validators.required, Validators.min(1)]],
      noteEmployes: ['Données approximatives'],
      nombrePostesWs: ['', [Validators.required, Validators.min(1)]],
      typeMateriau: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.savedData = {
      ...this.form.value,
      dateSubmission: new Date().toLocaleString('fr-FR'),
    };

    console.log('Données sauvegardées:', this.savedData);
  }

  onReset(): void {
    this.form.reset({
      anneeConsommation: new Date().getFullYear(),
      noteEmployes: 'Données approximatives',
    });
    this.submitted = false;
    this.savedData = null;
  }

  get f() {
    return this.form.controls;
  }
}
