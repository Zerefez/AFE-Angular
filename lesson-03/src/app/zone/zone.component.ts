import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-zone',
  imports: [],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.css'
})
export class ZoneComponent {
  likeAngular = true;
  count = signal(0);
  counter: any;

  toggle() {
    this.likeAngular = !this.likeAngular;
  }

  startCounter() {
    // Clear any existing interval first
    if (this.counter) {
      clearInterval(this.counter);
    }
    this.counter = setInterval(() => {
      this.count.set(this.count() + 1);
      console.log(this.count());
    }, 1000);
  }

  stopCounter() {

    clearInterval(this.counter);
  }
}
