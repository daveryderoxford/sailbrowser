import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { collection, collectionData, CollectionReference, getFirestore } from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface Club {
  id: string;
  name: string;
  email: string;
  contact: string;
  logoUrl?: string;
}

@Component({
  selector: 'app-clubs',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './clubs.html'
})
export class Clubs {
  private firestore = getFirestore(inject(FirebaseApp));
  private fb = inject(FormBuilder);
  
  clubs = rxResource<Club[], null>( {
    stream: () => {
    const clubsCollection = collection(this.firestore, 'clubs') as CollectionReference<Club>;
    return collectionData(clubsCollection, { idField: 'id' })
    },
    defaultValue: [],
  });
  
  isSubmitting = signal(false);
  submitted = signal(false);

  clubForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    subdomain: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
    burgeeUrl: ['', [Validators.pattern(/https?:\/\/.+/)]]
  });

  /**  */
  clubResultsUrl(clubId: string): string {
    return `https://${clubId}.ro.scoresmarter.app/results/viewer`;
  }

  async onSubmit() {
    if (this.clubForm.invalid) return;

    this.isSubmitting.set(true);
    
    try {
      console.log('Clubs:  Calling Cloud Function to register club:', this.clubForm.value);
      // TODO actually call cloud function
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.submitted.set(true);
      this.clubForm.reset();
    } catch (err) {
      console.error('Clubs:  Registration failed:', err);
      alert('Clubs:  Failed to register club. Please try again later.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
