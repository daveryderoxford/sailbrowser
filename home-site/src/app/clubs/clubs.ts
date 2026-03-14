import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { collection, collectionData, getFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FirebaseApp } from '@angular/fire/app';

export interface Club {
  id: string;
  name: string;
  logoUrl?: string;
}

@Component({
  selector: 'app-clubs',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './clubs.html'
})
export class Clubs implements OnInit {
  private firestore = getFirestore(inject(FirebaseApp));
  private fb = inject(FormBuilder);
  
  clubs = signal<Club[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  
  isSubmitting = signal(false);
  submitted = signal(false);

  clubForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    subdomain: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    burgeeUrl: ['', [Validators.pattern(/https?:\/\/.+/)]]
  });

  ngOnInit() {
    this.loadClubs();
  }

  getClubPath(clubId: string): string {
    const host = window.location.hostname;
    const port = window.location.port;
    const clubDomain = port ? `${clubId}.${host}` : `${clubId}.${host}:${port}`;

    console.log("Club: Navigating to domain " + clubDomain);
    return clubDomain;
  }

  async onSubmit() {
    if (this.clubForm.invalid) return;

    this.isSubmitting.set(true);
    
    try {
      console.log('Calling Cloud Function to register club:', this.clubForm.value);
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.submitted.set(true);
      this.clubForm.reset();
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Failed to register club. Please try again later.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  loadClubs() {
    this.loading.set(true);
    this.error.set(null);

    const clubsCollection = collection(this.firestore, 'clubs');
    collectionData(clubsCollection, { idField: 'id' })
      .pipe(
        catchError(() => {
          this.error.set('Failed to load clubs from Firestore. Please ensure your Firebase configuration is correct.');
          return of([]);
        })
      )
      .subscribe(data => {
        this.clubs.set(data as Club[]);
        this.loading.set(false);
      });
  }
}
