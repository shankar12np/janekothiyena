import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PixabayService {
private API_URL = 'https://pixabay.com/api/'
  private API_KEY = environment.pixabayApiKey;
  constructor(private http: HttpClient) { }

  searchImages(query: string){
  return this.http.get(`${this.API_URL}?key=${this.API_KEY}&q=${encodeURIComponent(query)}`);
  }

}
