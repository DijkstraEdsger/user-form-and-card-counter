import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { FormBuilder } from '@angular/forms';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear user inputs after clicked submit', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector(
      '#exampleInputName'
    );
    const lastNameInput: HTMLInputElement = hostElement.querySelector(
      '#exampleInputLastName'
    );
    const ageInput: HTMLInputElement = hostElement.querySelector(
      '#exampleInputAge'
    );
    const addressInput: HTMLInputElement = hostElement.querySelector(
      '#exampleInputAddress'
    );
    const emailInput: HTMLInputElement = hostElement.querySelector(
      '#exampleInputEmail1'
    );

    nameInput.value = 'John';
    lastNameInput.value = 'Doe';
    ageInput.value = '35';
    addressInput.value = 'Somewhere';
    emailInput.value = 'johndoe@email.com';

    const submitButton: HTMLButtonElement = hostElement.querySelector(
      '#createUserButton'
    );
    submitButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(nameInput.textContent).toBe('');
    expect(lastNameInput.textContent).toBe('');
    expect(ageInput.textContent).toBe('');
    expect(addressInput.textContent).toBe('');
    expect(emailInput.textContent).toBe('');
  });

  // it('should disabled submit button if email input is invalid', () => {
  //   const hostElement = fixture.nativeElement;
  //   const emailInput: HTMLInputElement = hostElement.querySelector(
  //     '#exampleInputEmail1'
  //   );
  //   emailInput.value = 'invalid-emil';
  //   emailInput.dispatchEvent(new Event('input'));
  //   const submitButton: HTMLButtonElement = hostElement.querySelector(
  //     '#createUserButton'
  //   );
  //   fixture.detectChanges();
  //   expect(submitButton.disabled).toEqual(true);
  // });
});
