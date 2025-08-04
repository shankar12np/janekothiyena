import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PixabayService {
private API_URL = 'https://pixabay.com/api/'
  private API_KEY = '41564115-d3175b503e3fd2ea43eb7331c'
  constructor(private http: HttpClient) { }

  searchImages(query: string){
  return this.http.get(`${this.API_URL}?key=${this.API_KEY}&q=${encodeURIComponent(query)}`);
  }

}
