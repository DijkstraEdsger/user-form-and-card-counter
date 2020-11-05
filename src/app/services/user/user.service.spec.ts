import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../../classes/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should return users list from observable', (done: DoneFn) => {
    const expectedUsers: User[] = [
      new User('John', 'Doe', null, null, null, '1'),
      new User('Maria', 'Zalas', 25, 'maria@email', 'Holguin, Cuba', '2'),
    ];
    service.users = expectedUsers;
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(expectedUsers, 'expected users');
      done();
    });
  });

  it('getUser should return an user from observable', (done: DoneFn) => {
    const users: User[] = [
      new User('John', 'Doe', null, null, null, '1'),
      new User('Maria', 'Zalas', 25, 'maria@email', 'Holguin, Cuba', '2'),
    ];
    service.users = users;
    service.getUser(users[0].id).subscribe((user) => {
      expect(user).toEqual(users[0], 'expected users');
      done();
    });
  });

  it('createUser should create an user from observable', (done: DoneFn) => {
    const users: User[] = [new User('John', 'Doe', null, null, null, '1')];
    const newUserData: User = new User(
      'Maria',
      'Zalas',
      25,
      'maria@email',
      'Holguin, Cuba',
      '2'
    );
    service.users = users;
    service.createUser(newUserData).subscribe((user) => {
      expect(users).toContain(users[0], 'user created');
      done();
    });
  });
});
