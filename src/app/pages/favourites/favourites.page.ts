import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonItem, IonList, IonLabel, IonThumbnail, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Themoviedb } from 'src/app/services/themoviedb';
import { HttpOptions } from '@capacitor/core';
import { MyData } from 'src/app/services/my-data';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonSearchbar, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonImg, IonLabel, IonList, IonItem, IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonThumbnail]
})

export class FavouritesPage implements OnInit {

  movieData: any;
  // https://developer.themoviedb.org/docs/image-basics
  imageLink = "https://image.tmdb.org/t/p/w500";
  searched: string = '';
  pageTitle: string = "Favourite Movies";

  options: HttpOptions = {
    url: ''
  }

  constructor(private tmdbService: Themoviedb, private mds: MyData)  {
    addIcons({ home });
   }

  ngOnInit() {
    this.movieData = [];
  }

  ionViewWillEnter() {
    this.getFavs();
  }

  /// If search input is empty, return to home state instead of calling API/ Reset data and reload page, when coming back, it doesn't hold previous search
  ionViewWillLeave() {
    this.pageTitle = "Favourite Movies";
    this.searched = '';
    this.movieData = [];
    this.getFavs();
  }

  async getFavs() {
    let favs = await this.mds.get("favourites");
    if (favs == null) {
      favs = [];
    }

    //for the developer tools check
    console.log(favs);  
    this.movieData = favs;
  }

  loadHome() {
    this.searched = '';
    this.pageTitle = "Favourite Movies";
    this.getFavs();
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.searched = target.value?.toLowerCase() || '';
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
    console.log(result);
    this.movieData = result.data.results;
  }

}
