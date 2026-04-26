import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonList, IonLabel, IonThumbnail, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Themoviedb } from 'src/app/services/themoviedb';
import { HttpOptions } from '@capacitor/core';

@Component({  
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonImg, IonLabel, IonList, IonItem, IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonThumbnail]
})
export class HomePage implements OnInit {

  movieData: any;
  // https://developer.themoviedb.org/docs/image-basics
  imageLink = "https://image.tmdb.org/t/p/w500";

  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=9bb4565b7e9cf15a771e7e9917060b22"
  }

  constructor(private tmdbService: Themoviedb) { 
    addIcons({ heart });
  }
  
  ngOnInit() {
    this.movieData = [];
  }

  ionViewWillEnter() {
    this.getTrending();
  }

  async getTrending() {
    let result = await this.tmdbService.get(this.options);
    //for the developer tools check
    console.log(result);
    //Extract movie list from result
    //Response body: object, results: array of objects
    this.movieData = result.data.results;
  }
}
