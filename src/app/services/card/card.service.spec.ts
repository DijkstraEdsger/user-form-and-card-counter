import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import { Card } from '../../classes/card';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cards list synchronously', () => {
    const cards: Card[] = [
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
    service.cards = cards;
    expect(service.getAllCards()).toEqual(cards);
  });
});
