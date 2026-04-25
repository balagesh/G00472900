import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class MovieDetailsPage implements OnInit {

  constructor() { 
    addIcons({ home });
    addIcons({ heart });
  }

  ngOnInit() {
  }

}
