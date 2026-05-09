import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonCard, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';
import { HttpOptions } from '@capacitor/core';
import { Themoviedb } from 'src/app/services/themoviedb';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  standalone: true,
  imports: [IonLabel, IonCard, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class PersonDetailsPage implements OnInit {
  //Selected personás details and the related movies - initialized in the constructor
  pData: any;
  pMData: any;
  
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
    this.pData = [];
    this.pMData = [];

    // magic: Angular routing: params from the current page
    const id = this.route.snapshot.paramMap.get('id');
    console.log('person id:', id);

    if (id) {
      this.getPDetails(id);
    }
  }

  ionViewWillEnter() {  
  }

  //Scroll for the internal navigation
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  async getPDetails(pId: string) {

    // 1. PERSON DATA
    const personUrl = this.tmdbService.getTmdbUrl() + '/person/' + pId + '?api_key=' + this.tmdbService.getApiKey();
    const personResult = await this.tmdbService.get({ url: personUrl });
    this.pData = personResult.data;

    // 2. MOVIE DATA
    const pMUrl = this.tmdbService.getTmdbUrl() + '/person/' + pId + '/movie_credits?api_key=' + this.tmdbService.getApiKey();
    const pMRresult = await this.tmdbService.get({ url: pMUrl });

    // this.pMData = pMRresult.data;
    // Merge the cast and crew data

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


}