import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../classes/user';
declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  toastMessageHead: string;
  toastMessageBody: string;
  toastOptions: any = {
    delay: 5000,
  };
  isError: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      age: [null],
      address: [''],
      email: [null, [Validators.email]],
    });
  }

  ngAfterViewInit() {
    $('.toast').toast(this.toastOptions);
  }

  showToast() {
    $('.toast').toast('show');
  }

  onCreate() {
    let userData: User = this.form.value;
    this.userService.createUser(userData).subscribe(
      (data) => {
        console.log('user created', data);
        this.isError = false;
        this.toastMessageHead = 'SUCCESS';
        this.toastMessageBody = 'User created';
        this.showToast();
      },
      (error) => {
        this.isError = true;
        this.toastMessageHead = 'ERROR';
        this.toastMessageBody = 'Error during creating user';
        this.showToast();
      }
    );
    this.form.reset();
  }
}
