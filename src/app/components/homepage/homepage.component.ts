import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzCarouselComponent, NzCarouselContentDirective} from "ng-zorro-antd/carousel";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NzCarouselComponent, NzCarouselContentDirective, NzPaginationComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  blogs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
  array = [1, 2, 3, 4];
  effect = 'scrollx';


  constructor(private router: Router) {
  }


  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

}

