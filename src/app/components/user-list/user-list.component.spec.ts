import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../classes/user';
import { of, Observable, defer } from 'rxjs';

let component: UserListComponent;
let fixture: ComponentFixture<UserListComponent>;

describe('UserListComponent', () => {
  let usSpy: UserServiceSpy;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useClass: UserServiceSpy },
        // UserService,
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

  it('should have called getUsers', () => {
    expect(usSpy.getUsers.calls.count()).toBe(1, 'getUsers called once');
    expect(component.users).toEqual([
      { id: '1', name: 'Luna', lastName: 'Brillante' },
    ]);
  });
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

class UserServiceSpy {
  testUsers: User[] = [{ id: '1', name: 'Luna', lastName: 'Brillante' }];

  getUsers = jasmine
    .createSpy('getUsers')
    .and.callFake(() => asyncData(Object.assign({}, { data: this.testUsers })));
}

function createComponent() {
  fixture = TestBed.createComponent(UserListComponent);
  component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets users
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection
    fixture.detectChanges();
  });
}

// class UserServiceMock {
//   users: User[] = [
//     new User('John', 'Doe', null, null, null, '1'),
//     new User('Maria', 'Zalas', 25, 'maria@email', 'Holguin, Cuba', '2'),
//     new User('Pepe', 'Toledo', 30, null, null, '3'),
//   ];

//   user: User;
//   id: string;

//   constructor() {}

//   getUsers(): Observable<any> {
//     return new Observable(this.getUsersObservable);
//   }

//   getUsersObservable = (observer) => {
//     let time = setTimeout(() => {
//       observer.next(this.users);
//     }, 1000);

//     return {
//       unsubscribe() {
//         clearTimeout(time);
//       },
//     };
//   };

//   createUserObservable = (observer) => {
//     let time = setTimeout(() => {
//       this.user.id = (Math.floor(Math.random() * 10) + 1000).toString();
//       this.users.push(this.user);
//       observer.next(this.users);
//     }, 1500);

//     return {
//       unsubscribe() {},
//     };
//   };

//   createUser(newUserData: User): Observable<any> {
//     this.user = newUserData;
//     return new Observable(this.createUserObservable);
//   }

//   getUser(id: string) {
//     this.id = id;
//     return new Observable(this.getUserObservable);
//   }

//   getUserObservable = (observer) => {
//     let time = setTimeout(() => {
//       let fetchedUser: User = this.users.find((item) => item.id === this.id);
//       if (fetchedUser !== undefined) {
//         observer.next(fetchedUser);
//       } else {
//         observer.error({ message: 'User not found' });
//       }
//     }, 1500);

//     return {
//       unsubscribe() {},
//     };
//   };
// }
