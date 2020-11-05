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

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        UserService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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

  // it('should show user name', async(() => {
  //   let user: User = new User('Marta', 'Lopez', 31, null, null, '1');

  //   // Create a fake UserService object with a `getUser()` spy
  //   const userService = jasmine.createSpyObj('UserService', ['getUser']);
  //   // Simulate delayed observable values with the `asyncData()` helper
  //   let getUserSpy = userService.getUser.and.returnValue(asyncData(user));

  //   fixture.detectChanges(); // ngOnInit()

  //   fixture.whenStable().then(() => {
  //     component.isLoading = false;
  //     // wait for async getUser
  //     fixture.detectChanges(); // update view
  //     let nameEl = fixture.nativeElement.querySelector('#userDetailName');
  //     expect(nameEl.textContent).toBe('kjhg');
  //   });
  // }));

  it('should fetch data successfully if called asynchronously', async(() => {
    let fixture = TestBed.createComponent(UserDetailComponent);
    let app = fixture.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    let spy = spyOn(userService, 'getUser').and.returnValue(
      asyncData({ name: 'Pepe', lastName: 'Lopez' })
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.user.name).toBe('Pepe');
    });
  }));
});

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
