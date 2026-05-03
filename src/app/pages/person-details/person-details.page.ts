import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonCard, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';
import { HttpOptions } from '@capacitor/core';
import { Themoviedb } from 'src/app/services/themoviedb';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  standalone: true,
  imports: [IonLabel, IonCard, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class PersonDetailsPage implements OnInit {

  pData: any;
  pMData: any;
  
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
    if (this.tmdbService.cPicked) {
      this.pData = this.tmdbService.cPicked;
    }
    else {
    this.pData = this.tmdbService.crPicked;
    }

    this.pMData = [];
  }

  ionViewWillEnter() {  
    this.getPDetails();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  async getPDetails() {

    let pId = this.pData.id;

    // 1. PERSON DATA
    this.options.url =   this.tmdbService.getTmdbUrl() + '/person/' + pId + '?api_key=' + this.tmdbService.getApiKey();
    let result = await this.tmdbService.get(this.options);
    //for the developer tools check
    console.log(result);
    //Extract movie list from result
    //Response body: object, results: array of objects
    this.pData = result.data;

    // 2. MOVIE DATA
    this.options.url =   this.tmdbService.getTmdbUrl() + '/person/' + pId + '/movie_credits?api_key=' + this.tmdbService.getApiKey();
    let pMRresult = await this.tmdbService.get(this.options);

    //Extract movie list from result
    //Response body: object, results: array of objects


    if (pMRresult.data.cast && pMRresult.data.crew) {
      this.pMData = pMRresult.data.cast.concat(pMRresult.data.crew);
    }
    else if (pMRresult.data.cast) {
      this.pMData = pMRresult.data.cast;
    }
    else if (pMRresult.data.crew) {
      this.pMData = pMRresult.data.crew;
    }
    else {
      this.pMData = [];
    }
    
    //for the developer tools check
        console.log(pMRresult.data);
  }

  moviePicker(thatMovie: any) {
    this.tmdbService.mPicked = thatMovie;
  } 

}