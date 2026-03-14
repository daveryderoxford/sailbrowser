import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIconModule],
  templateUrl: 'home.html',
  styles: [`
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(-5%); }
      50% { transform: translateY(0); }
    }
    .animate-bounce-slow {
      animation: bounce-slow 3s infinite ease-in-out;
    }
  `]
})
export class Home {}
