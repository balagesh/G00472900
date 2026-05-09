import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonList, IonLabel, IonThumbnail, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Themoviedb } from 'src/app/services/themoviedb';
import { HttpOptions } from '@capacitor/core';

@Component({  
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [IonSearchbar, IonCard, IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink, IonItem, IonLabel]
})

export class HomePage implements OnInit {

  movieData: any;
  // https://developer.themoviedb.org/docs/image-basics
  imageLink = "https://image.tmdb.org/t/p/w500";
  searched: string = '';
  pageTitle: string = "Today’s Trending Movies";

  options: HttpOptions = {
    url: ''
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

  // Scrolls to selected section on the page
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  /// Reset and reload page, when user is back, it doesn't hold previous search
  ionViewWillLeave() {
    this.pageTitle = "Today’s Trending Movies";
    this.searched = '';
    this.movieData = [];
    this.getTrending();
  }

  async getTrending() {
    this.options.url = this.tmdbService.getTmdbUrl() + '/trending/movie/day?api_key=' + this.tmdbService.getApiKey();
    let result = await this.tmdbService.get(this.options);
    //for the developer tools check
    console.log(result);
    //Extract movie list from result
    this.movieData = result.data.results;
  }

  loadHome() {
    this.searched = '';
    this.pageTitle = "Today’s Trending Movies";
    this.getTrending();
  }
  
  //Searchbar input
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.searched = target.value?.toLowerCase() || '';

/*  
  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.data.filter((d) => d.toLowerCase().includes(query));
  }
*/
  } 

  async searchMovies() {

// If there is no search input: reload initial state of page 
    if (!this.searched) {
      this.loadHome();
      return;
    } else {
      this.pageTitle = this.searched + " Movies";
    }

    this.options.url = this.tmdbService.getTmdbUrl() + '/search/movie?api_key=' + this.tmdbService.getApiKey() + '&query=' + this.searched;
    let result = await this.tmdbService.get(this.options);
    //for the developer tools check
    console.log(result);
    //Extract movie list from result
    //Response body: object, results: array of objects
    this.movieData = result.data.results;
  }

/*   moviePicker(thatMovie: any) {
    this.tmdbService.mPicked = thatMovie;
  } 
   */
}