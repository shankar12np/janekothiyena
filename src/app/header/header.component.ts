import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {  closeNavbar() {
  if (window.innerWidth <= 992) {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLButtonElement;
    if (navbarToggler) {
      navbarToggler.click(); // Programmatically click the navbar-toggler button to close the menu
    }
  }
}
}
