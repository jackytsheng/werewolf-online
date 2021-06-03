import { Role } from "../util/type";
import shuffle from "../util/shuffle";
import capticalise from "../util/capticalise";

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
      console.log(`Seat ${number + 1}`, capticalise(role));
    });
  };
}

export default Dealer;
