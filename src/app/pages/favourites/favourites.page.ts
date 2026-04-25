import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class FavouritesPage implements OnInit {

  constructor() {
    addIcons({ home });
   }

  ngOnInit() {
  }

}
