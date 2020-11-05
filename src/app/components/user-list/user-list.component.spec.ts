import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render users data when load', ()=> {

  // });
});
