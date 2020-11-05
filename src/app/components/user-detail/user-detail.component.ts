import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  isLoading: boolean;
  showErrorMessage: boolean;
  errorMessage: string;
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.isLoading = true;
    this.showErrorMessage = false;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.route.paramMap.subscribe((pmap) => {
      this.userService.getUser(pmap.get('id')).subscribe(
        (data: any) => {
          this.isLoading = false;
          this.showErrorMessage = false;
          this.user = data;
        },
        (error) => {
          this.showErrorMessage = true;
          this.isLoading = false;
          this.errorMessage = error.message;
          console.log('error', error);
        }
      );
    });
  }
}
