import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent {
  @ViewChild('navbarToggler') navbarToggler!: ElementRef<HTMLButtonElement>;  // specify the element type

  constructor() {}

  closeNavbar() {
    if (window.innerWidth <= 992 && this.navbarToggler) {
      const toggleBtn = this.navbarToggler.nativeElement;  // get the native element
      if (toggleBtn) {
        toggleBtn.click();  // directly call the click method on the native element
      }
    }
  }
}
