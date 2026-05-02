import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonCardHeader, IonCardContent, IonCardTitle, IonCard } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';
import { Themoviedb } from 'src/app/services/themoviedb';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonButtons, IonButton, IonIcon, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonContent]
})
export class MovieDetailsPage implements OnInit {

  movieData: any;
  castData: any;
  crewData: any;
  
  // https://developer.themoviedb.org/docs/image-basics
  imageLink = "https://image.tmdb.org/t/p/w500";

  options: HttpOptions = {
    url: ''
  }

  constructor(private tmdbService: Themoviedb) { 
    addIcons({ home });
    addIcons({ heart });
  }

  ngOnInit() {
    this.movieData = this.tmdbService.mPicked;
    this.castData = [];
    this.crewData = [];
  }

  ionViewWillEnter() {  
    this.getMDetails();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  async getMDetails() {

    let mId = this.movieData.id;

    this.options.url =   this.tmdbService.getTmdbUrl() + '/movie/' + mId + '/credits?api_key=' + this.tmdbService.getApiKey();
    let result = await this.tmdbService.get(this.options);
    //for the developer tools check
    console.log(result);
    //Extract movie list from result
    //Response body: object, results: array of objects
    this.castData = result.data.cast;
    this.crewData = result.data.crew;
  }

}
