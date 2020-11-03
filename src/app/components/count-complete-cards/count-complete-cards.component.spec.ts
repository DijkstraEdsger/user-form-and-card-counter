import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCompleteCardsComponent } from './count-complete-cards.component';

describe('CountCompleteCardsComponent', () => {
  let component: CountCompleteCardsComponent;
  let fixture: ComponentFixture<CountCompleteCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountCompleteCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountCompleteCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
