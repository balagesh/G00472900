import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonLabel, IonItem, IonSegmentButton, IonSegment } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';
import { Themoviedb } from 'src/app/services/themoviedb';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';

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
  
  // https://developer.themoviedb.org/docs/image-basics
  imageLink = "https://image.tmdb.org/t/p/w500";

  options: HttpOptions = {
    url: ''
  }

  constructor(private tmdbService: Themoviedb, private route: ActivatedRoute) { 
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

  async loadMovie(id: string) {

    const movieUrl = this.tmdbService.getTmdbUrl() +'/movie/' + id + '?api_key=' + this.tmdbService.getApiKey();
    // https://capacitorjs.com/docs/apis/http - get the key:value instead this.option
    const movieResult = await this.tmdbService.get({ url: movieUrl });
    this.movieData = movieResult.data;

    const creditsUrl =
      this.tmdbService.getTmdbUrl() +
      '/movie/' + id +
      '/credits?api_key=' +
      this.tmdbService.getApiKey();
 
    const creditsResult = await this.tmdbService.get({ url: creditsUrl });
    this.castData = creditsResult.data.cast;
    this.crewData = creditsResult.data.crew;
  }

/*   castPicker(thatCast: any) {
    this.tmdbService.cPicked = thatCast;
  }

  crewPicker(thatCrew: any) {
    this.tmdbService.cPicked = thatCrew;
  }
 */

}
