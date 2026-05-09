import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})
export class Themoviedb {

  constructor() {}

  /*Update 2: readonly
  'You can initialize them at the point of declaration or in the constructor.'
  https://stackoverflow.com/questions/28513780/final-keyword-in-typescript
  */

  private readonly apiKey = '9bb4565b7e9cf15a771e7e9917060b22';
  private readonly tmdbUrl = 'https://api.themoviedb.org/3';

  getApiKey(): string {
    return this.apiKey;
  }

  getTmdbUrl(): string {
    return this.tmdbUrl;
  }
  
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}