import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCarouselComponent, NzCarouselContentDirective} from "ng-zorro-antd/carousel";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NzCarouselComponent, NzCarouselContentDirective, NzPaginationComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  blogs = [1,1,1,1,1,1,1,1,1,1,1,1,]
  array = [1, 2, 3, 4];
  effect = 'scrollx';

}
export class AppComponent {
  testimonials = [
    { name: 'John Doe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Jane Doe', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Alice Smith', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
  ];
}
