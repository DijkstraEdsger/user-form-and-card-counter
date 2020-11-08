import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import {
  ActivatedRouteStub,
  ActivatedRoute,
} from '../../../testing/activated-route-stub';
import { User } from '../../classes/user';
import { defer } from 'rxjs';
import { UserService } from '../../services/user/user.service';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let component: UserDetailComponent;
let fixture: ComponentFixture<UserDetailComponent>;

describe('UserDetailComponent', () => {
  let usSpy: UserServiceSpy;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: UserService, useClass: UserServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
    usSpy = fixture.debugElement.injector.get(UserService) as any;
  }));

  // beforeEach(() => activatedRoute.setParamMap({ id: 99999 }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show user name if isLoading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    let nameEl = fixture.nativeElement.querySelector('#userDetailName');
    expect(nameEl).toBe(null);
  });

  it('should show user name if not isLoading', () => {
    component.user = new User('Valentina', 'Tamayo');
    component.isLoading = false;
    fixture.detectChanges();
    let nameEl = fixture.nativeElement.querySelector('#userDetailName');
    expect(nameEl.textContent).toEqual(component.user.name);
  });
});

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

class UserServiceSpy {
  testUser: User = { id: '1', name: 'Luna', lastName: 'Brillante' };

  getUser = jasmine
    .createSpy('getUser')
    .and.callFake(() => asyncData(Object.assign({}, { data: this.testUser })));
}

function createComponent() {
  fixture = TestBed.createComponent(UserDetailComponent);
  component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets user
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection
    fixture.detectChanges();
  });
}
