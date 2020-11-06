import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountCompleteCardsComponent } from './count-complete-cards.component';
import { Card } from '../../classes/card';
import { CardService } from '../../services/card/card.service';

describe('CountCompleteCardsComponent', () => {
  let component: CountCompleteCardsComponent;
  let fixture: ComponentFixture<CountCompleteCardsComponent>;
  let cardService: CardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountCompleteCardsComponent],
      providers: [
        // CountCompleteCardsComponent,
        { provide: CardService, useClass: MockCardService },
      ],
    }).compileComponents();

    // component = TestBed.inject(CountCompleteCardsComponent);
    cardService = TestBed.inject(CardService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountCompleteCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should numberOfCompleteDecks=0 of complete decks', () => {
    expect(component.numberOfCompleteDecks).toBe(0);
  });

  it('should numberOfCompleteDecks=1 of complete decks for case 1', () => {
    cardService.cards = generate1CompleteCardDecks();
    component.ngOnInit();
    expect(component.numberOfCompleteDecks).toBe(1);
  });

  it('should numberOfCompleteDecks=2 of complete decks for case 2', () => {
    cardService.cards = generate2CompleteCardDecks();
    component.ngOnInit();
    expect(component.numberOfCompleteDecks).toBe(2);
  });

  it('should numberOfCompleteDecks=1 of complete decks for case 2', () => {
    cardService.cards = generate1CompleteCardDecksCase2();
    component.ngOnInit();
    expect(component.numberOfCompleteDecks).toBe(1);
  });
});

class MockCardService {
  cards: Card[] = [
    {
      suit: 'hearts',
      value: 2,
    },
    {
      suit: 'clubs',
      value: 9,
    },
    {
      suit: 'diamonds',
      value: 'J',
    },
    {
      suit: 'spades',
      value: 'A',
    },
  ];
  getAllCards() {
    return this.cards;
  }
}

function generate1CompleteCardDecks() {
  let value: any[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  let suit: any[] = ['diamonds', 'hearts', 'spades', 'clubs'];
  let cards: Card[] = [];
  let card: Card;
  for (let i = 0; i < suit.length; i++) {
    for (let j = 0; j < value.length; j++) {
      card = new Card(suit[i], value[j]);
      cards.push(card);
    }
  }
  return cards;
}

function generate2CompleteCardDecks() {
  let value: any[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  let suit: any[] = ['diamonds', 'hearts', 'spades', 'clubs'];
  let cards: Card[] = [];
  let card: Card;
  for (let decks = 0; decks < 2; decks++) {
    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < value.length; j++) {
        card = new Card(suit[i], value[j]);
        cards.push(card);
      }
    }
  }

  return cards;
}

function generate1CompleteCardDecksCase2() {
  let value: any[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  let suit: any[] = ['diamonds', 'hearts', 'spades', 'clubs'];
  let cards: Card[] = [];
  let card: Card;
  for (let decks = 0; decks < 2; decks++) {
    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < value.length; j++) {
        card = new Card(suit[i], value[j]);
        cards.push(card);
      }
    }
  }
  const index: number = cards.findIndex(
    (item) => item.suit === 'diamonds' && item.value === 2
  );
  if (index !== -1) {
    cards.splice(index, 1);
    console.log('here');
  }
  console.log('number of cards', cards.length);

  return cards;
}
