import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRouteStub, ActivatedRoute } from '../../../testing/activated-route-stub';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => activatedRoute.setParamMap({ id: 99999 }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
