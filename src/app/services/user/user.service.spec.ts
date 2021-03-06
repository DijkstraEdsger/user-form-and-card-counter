import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../../classes/user';
import { defer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    userService = TestBed.inject(UserService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UserService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should return expected users (HttpClient called once)', () => {
    const expectedUsers: User[] = [
      {
        id: '1',
        name: 'Maria',
        lastName: 'Lopez',
      },
      {
        id: '2',
        name: 'John',
        lastName: 'Doe',
      },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedUsers));

    userService
      .getUsers()
      .subscribe(
        (response) =>
          expect(response).toEqual(expectedUsers, 'expected users'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
