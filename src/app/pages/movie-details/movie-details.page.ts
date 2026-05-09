import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonLabel, IonItem, IonSegmentButton, IonSegment } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home, information } from 'ionicons/icons';
import { Themoviedb } from 'src/app/services/themoviedb';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import { MyData } from 'src/app/services/my-data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonSegment, IonSegmentButton, IonItem, IonLabel, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonButtons, IonButton, IonIcon, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonContent]
})
export class MovieDetailsPage implements OnInit {

  movieData: any;
  castData: any;
  crewData: any;
  isFav: boolean = false;
  
  // https://developer.themoviedb.org/docs/image-basics
  imageLink = "https://image.tmdb.org/t/p/w500";

  options: HttpOptions = {
    url: ''
  }

  constructor(private tmdbService: Themoviedb, private route: ActivatedRoute, private mds: MyData) { 
    addIcons({ home });
    addIcons({ heart });
  }

  ngOnInit() {
    this.castData = [];
    this.crewData = [];

    const id = this.route.snapshot.paramMap.get('id');
    console.log('movie id:', id);

    if (id) {
      this.loadMovie(id);
    }
  }

  ionViewWillEnter() {  
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  /* Two things:
  1) Main: loading Movie details with credit information
  2) Checking if it is in favourite */

  async loadMovie(id: string) {

    const movieUrl = this.tmdbService.getTmdbUrl() +'/movie/' + id + '?api_key=' + this.tmdbService.getApiKey();
    // https://capacitorjs.com/docs/apis/http - get the key:value instead this.option
    const movieResult = await this.tmdbService.get({ url: movieUrl });
    this.movieData = movieResult.data;

    const creditsUrl =
      this.tmdbService.getTmdbUrl() + '/movie/' + id + '/credits?api_key=' + this.tmdbService.getApiKey();
 
    const creditsResult = await this.tmdbService.get({ url: creditsUrl });
    this.castData = creditsResult.data.cast;
    this.crewData = creditsResult.data.crew;

    // Get favourites list from storage or empty array
    let favs = await this.mds.get('favourites')  || [];

    // Becuase of reloading I needed this again
    this.isFav = false;

    // Check favourites list match
    for (let movie of favs) {
      if (movie.id === this.movieData.id) {
        this.isFav = true;
        break;
      }
    }
  }

// It pushes the movie into the favourites array

  async clockFavourites() {
    let favs = await this.mds.get('favourites') || [];

    if (this.isFav) {

      let freshFavs: any[] = [];

      for (let m of favs) {
        if (m.id !== this.movieData.id) {
          freshFavs.push(m);
        } }

      favs = freshFavs; 
      this.isFav = false;
    } else {
      favs.push(this.movieData);
      this.isFav = true;
    }
    
    //Save the whole thing in Storage
    await this.mds.set('favourites', favs);
    console.log('saved favourite:', favs);
  }

/*   castPicker(thatCast: any) {
    this.tmdbService.cPicked = thatCast;
  }

  crewPicker(thatCrew: any) {
    this.tmdbService.cPicked = thatCrew;
  }
 */

}
