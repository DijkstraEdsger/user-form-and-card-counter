import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    let userData: any = this.form.value;
    console.log('sending to the backend', userData);
    this.form.reset();
  }
}
