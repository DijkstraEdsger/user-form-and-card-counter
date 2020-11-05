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

  constructor() {}

  getUsers(): Observable<any> {
    return new Observable(this.getUsersObservable);
  }

  getUsersObservable = (observer) => {
    let time = setTimeout(() => {
      observer.next(this.users);
    }, 1500);

    return {
      unsubscribe() {
        clearTimeout(time);
      },
    };
  };

  createUser(newUserData: User) {
    this.users.push(newUserData);
  }

  getUser(id: string) {
    return this.users.find((item) => item.id === id);
  }
}
