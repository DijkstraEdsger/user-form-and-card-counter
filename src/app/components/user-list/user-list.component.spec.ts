import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../classes/user';
import { of, Observable } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  // Create a fake UserService object with a `getUsers()` spy
  // const userService = jasmine.createSpyObj('UserService', ['getUsers']);

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useClass: UserServiceMock },
        // UserService,
      ],
    }).compileComponents();

    // userService = TestBed.inject(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should nothing', async(() => {
    let fixture = TestBed.createComponent(UserListComponent);
    let app = fixture.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    // Make the spy return a synchronous Observable with the test data
    // let getUsersSpy = userService.getUsers.and.returnValue(of(testQuote));
  }));
});

class UserServiceMock {
  users: User[] = [
    new User('John', 'Doe', null, null, null, '1'),
    new User('Maria', 'Zalas', 25, 'maria@email', 'Holguin, Cuba', '2'),
    new User('Pepe', 'Toledo', 30, null, null, '3'),
  ];

  user: User;
  id: string;

  constructor() {}

  getUsers(): Observable<any> {
    return new Observable(this.getUsersObservable);
  }

  getUsersObservable = (observer) => {
    let time = setTimeout(() => {
      observer.next(this.users);
    }, 1000);

    return {
      unsubscribe() {
        clearTimeout(time);
      },
    };
  };

  createUserObservable = (observer) => {
    let time = setTimeout(() => {
      this.user.id = (Math.floor(Math.random() * 10) + 1000).toString();
      this.users.push(this.user);
      observer.next(this.users);
    }, 1500);

    return {
      unsubscribe() {},
    };
  };

  createUser(newUserData: User): Observable<any> {
    this.user = newUserData;
    return new Observable(this.createUserObservable);
  }

  getUser(id: string) {
    this.id = id;
    return new Observable(this.getUserObservable);
  }

  getUserObservable = (observer) => {
    let time = setTimeout(() => {
      let fetchedUser: User = this.users.find((item) => item.id === this.id);
      if (fetchedUser !== undefined) {
        observer.next(fetchedUser);
      } else {
        observer.error({ message: 'User not found' });
      }
    }, 1500);

    return {
      unsubscribe() {},
    };
  };
}
