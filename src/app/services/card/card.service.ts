import { Injectable } from '@angular/core';
import { Card } from '../../classes/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
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

  constructor() {}

  getAllCards() {
    return this.cards;
  }
}
