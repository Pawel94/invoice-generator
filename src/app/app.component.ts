import {Component} from '@angular/core';
import {MainPageComponent} from "../features/main-page/main-page.component";

import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, MainPageComponent],
  standalone: true
})
export class AppComponent {
}
