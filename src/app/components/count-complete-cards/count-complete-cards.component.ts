import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-complete-cards',
  templateUrl: './count-complete-cards.component.html',
  styleUrls: ['./count-complete-cards.component.css'],
})
export class CountCompleteCardsComponent implements OnInit {
  value: any[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  suit: any[] = ['diamonds', 'hearts', 'spades', 'clubs'];
  deck = [];
  numberOfCompleteDecks: number;

  constructor() {
    this.deck = new Array(4);
    for (var i = 0; i < this.deck.length; i++) {
      this.deck[i] = new Array(13);
      for (let j = 0; j < this.deck[i].length; j++) {
        this.deck[i][j] = 0;
      }
    }
  }

  ngOnInit(): void {
    this.countCompleteDecks();
  }

  countCompleteDecks() {
    this.countAllCards();
    this.numberOfCompleteDecks = this.getMinNumberOfSameCard();
  }

  countAllCards() {
    this.deckList.forEach((element) => {
      let i: number = this.suit.findIndex((item) => element.suit === item);
      let j: number = this.value.findIndex((item) => element.value === item);

      this.deck[i][j] += 1;
    });
  }

  getMinNumberOfSameCard(): number {
    let min: number = this.deck[0][0];
    for (let i = 0; i < this.deck.length; i++) {
      for (let j = 0; j < this.deck[i].length; j++) {
        if (this.deck[i][j] < min) {
          min = this.deck[i][j];
        }
      }
    }
    return min;
  }

  deckList: any[] = [
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
}
