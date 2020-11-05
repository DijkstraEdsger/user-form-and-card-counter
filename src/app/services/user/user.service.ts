import { Injectable } from '@angular/core';
import { User } from '../../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
      observer.next(fetchedUser);
    }, 1500);

    return {
      unsubscribe() {},
    };
  };
}
