import {Component, EventEmitter, Output} from '@angular/core';
import {PixabayService} from "../service/pixabay.service";


@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent {
  images: any[] = [];
  selectedImage: any;

  @Output() imageSelected = new EventEmitter<any>();
  constructor(private pixabayService: PixabayService) {
  }

  onSearch(query: string) {
    this.pixabayService.searchImages(query).subscribe((response: any) => {
      this.images = response.hits;
      // Handle empty or error responses appropriately
    });
  }

  selectImage(image: any) {
    this.selectedImage = image;
    // Perform additional actions as necessary, e.g., close modal, update another component, etc.
  }

  isSelected(image: any): boolean {
    return this.selectedImage && this.selectedImage.id === image.id;
  }

}
