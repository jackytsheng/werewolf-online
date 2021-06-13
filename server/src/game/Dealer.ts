import { Role } from "../type";
import shuffle from "../util/shuffle";
import { captitalise } from "../util/message-helper";

class Dealer {
  cards: Role[];

  constructor(cards: Role[]) {
    this.cards = cards;
  }

  shuffle = (): Role[] => {
    this.cards = shuffle(this.cards);
    return this.cards;
  };

  print = () => {
    this.cards.forEach((role, number) => {
      console.log(`Seat ${number + 1}`, captitalise(role));
    });
  };
}

export default Dealer;
