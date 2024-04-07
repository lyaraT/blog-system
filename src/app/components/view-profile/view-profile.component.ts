import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

constructor( private router: Router) {
}

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
