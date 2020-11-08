import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../classes/user';
import { defer } from 'rxjs';

let component: CreateUserComponent;
let fixture: ComponentFixture<CreateUserComponent>;

describe('CreateUserComponent', () => {
  let usSpy: UserServiceSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      providers: [
        FormBuilder,
        { provide: UserService, useClass: UserServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
    usSpy = fixture.debugElement.injector.get(UserService) as any;
  }));

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
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

class UserServiceSpy {
  testUser: User = { id: '1', name: 'Luna', lastName: 'Brillante' };

  createUser = jasmine
    .createSpy('createUser')
    .and.callFake((user: User) =>
      asyncData(Object.assign(this.testUser, { data: user }))
    );
}

function createComponent() {
  fixture = TestBed.createComponent(CreateUserComponent);
  component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets users
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection
    fixture.detectChanges();
  });
}
