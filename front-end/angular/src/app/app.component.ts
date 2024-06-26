import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  minutes = 0;
  gender = 'female';
  fly = true;
  logo = '/favicon.ico';
  inc(i: number) {
    this.minutes = Math.min(5, Math.max(0, this.minutes + i));
  }
  male() {
    this.gender = 'male';
  }
  female() {
    this.gender = 'female';
  }
  other() {
    this.gender = 'other';
  }
}
