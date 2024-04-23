import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-view-profile',
  standalone: true,
    imports: [
        NzButtonComponent
    ],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'

})
export class ViewProfileComponent implements OnInit{

  authorData:any;
  authorId:any;
constructor( private router: Router, private route: ActivatedRoute, private userService: UserService,) {
}


  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    this.userService.getOneUser(this.authorId).subscribe((res)=>{
      this.authorData = res[0];
    })
  }
}
