export class Card {
  suit: string;
  value: string | number;

  constructor(suit: string, value: string | number) {
    this.suit = suit;
    this.value = value;
  }
}
