import Dealer from "./game/Dealer";
import { Role } from "./type";

const testDealer = new Dealer([
  Role.HUNTER,
  Role.WITCH,
  Role.IDIOT,
  Role.PROPHET,
  Role.VILLAGER,
  Role.VILLAGER,
  Role.VILLAGER,
  Role.VILLAGER,
  Role.WEREWOLF,
  Role.WEREWOLF,
  Role.WEREWOLF,
  Role.WEREWOLF,
]);

testDealer.shuffle();
console.log(testDealer.print());
