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
  numberOfCompleteDecks: number;
  cards: Card[] = [];

  constructor(private cardService: CardService) {
    this.cardCounter = new Array(4);
    for (var i = 0; i < this.cardCounter.length; i++) {
      this.cardCounter[i] = new Array(13);
      for (let j = 0; j < this.cardCounter[i].length; j++) {
        this.cardCounter[i][j] = 0;
      }
    }
  }

  ngOnInit(): void {
    this.cards = this.cardService.getAllCards();
    // this.cards = this.generate2CompleteCardDecks();
    this.countCompleteDecks();

    // console.log('cards generated', this.generate2CompleteCardDecks());
  }

  countCompleteDecks() {
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
}
