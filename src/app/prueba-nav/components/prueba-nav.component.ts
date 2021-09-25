import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba-nav',
  templateUrl: './prueba-nav.component.html',
  styleUrls: ['./prueba-nav.component.scss']
})
export class PruebaNavComponent implements OnInit {

  mySidebar = document.getElementById("mySidebar");
  overlayBg = document.getElementById("myOverlay");

  constructor() { }

  ngOnInit(): void {
  }

  w3_open() {
      this.mySidebar.style.display = 'block';
      this.overlayBg.style.display = "block";
  }

}
