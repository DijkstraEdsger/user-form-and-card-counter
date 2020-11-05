import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      lastName: [''],
      age: [null],
      address: [''],
      email: [null, [Validators.email]],
    });
  }

  onCreate() {
    let userData: User = this.form.value;
    this.userService.createUser(userData).subscribe((data) => {
      console.log('user created', data);
    });
    this.form.reset();
  }
}
