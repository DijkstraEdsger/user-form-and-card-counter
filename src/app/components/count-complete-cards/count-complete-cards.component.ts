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
    this.countCompleteDecks();
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
    let min: number;
    for (let i = 0; i < this.cardCounter.length; i++) {
      min = Math.min(...this.cardCounter[i]);
    }
    return min;
  }
}
