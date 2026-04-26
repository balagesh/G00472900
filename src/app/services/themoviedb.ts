import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})
export class Themoviedb {

  constructor() {}

  //private apiKey = '9bb4565b7e9cf15a771e7e9917060b22';
  
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
}
}