import { Component, OnInit } from '@angular/core';
import { Card } from '../../classes/card';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-count-complete-cards',
  templateUrl: './count-complete-cards.component.html',
  styleUrls: ['./count-complete-cards.component.css'],
})
export class CountCompleteCardsComponent implements OnInit {
  value: any[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  suit: any[] = ['diamonds', 'hearts', 'spades', 'clubs'];
  cardCounter = [];
  numberOfCompleteDecks: number = 0;
  cards: Card[] = [];
  showMessageForCalculate: boolean = true;

  constructor(private cardService: CardService) {
    this.cardCounter = new Array(4);
    this.initCounterTable();
  }

  initCounterTable() {
    for (var i = 0; i < this.cardCounter.length; i++) {
      this.cardCounter[i] = new Array(13);
      for (let j = 0; j < this.cardCounter[i].length; j++) {
        this.cardCounter[i][j] = 0;
      }
    }
  }

  ngOnInit(): void {
    this.cards = this.cardService.getAllCards();
    this.cardList1();
    // this.cards = this.generate2CompleteCardDecks();
    // this.countCompleteDecks();

    // console.log('cards generated', this.generate2CompleteCardDecks());
  }

  countCompleteDecks() {
    this.showMessageForCalculate = false;
    this.initCounterTable();
    this.countAllCards();
    this.numberOfCompleteDecks = this.getMinNumberOfSameCard();
  }

  countAllCards() {
    this.cards.forEach((element) => {
      let i: number = this.suit.findIndex((item) => element.suit === item);
      let j: number = this.value.findIndex((item) => element.value === item);

      this.cardCounter[i][j] += 1;
    });
  }

  getMinNumberOfSameCard(): number {
    let min: number = this.cardCounter[0][0];
    let minRow: number;
    for (let i = 0; i < this.cardCounter.length; i++) {
      minRow = Math.min(...this.cardCounter[i]);
      if (minRow < min) {
        min = minRow;
      }
    }
    return min;
  }

  generate2CompleteCardDecks() {
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

  cardList1() {
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
    this.cards = cards;
    this.initCounterTable();
    this.showMessageForCalculate = true;
  }

  cardList2() {
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
    this.cards = cards;
    this.initCounterTable();
    this.showMessageForCalculate = true;
  }

  cardList3() {
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
    this.cards = cards;
    this.initCounterTable();
    this.showMessageForCalculate = true;
  }
}
