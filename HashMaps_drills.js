const HashMap_OA = require("./HashMap-OA");

function main() {
  const lotr = new HashMap_OA();
  lotr.MAX_LOAD_RATIO = 0.5;
  lotr.SIZE_RATIO = 3;

  const names = [
    { Hobbit: "Bilbo" },
    { Hobbit: "Frod" },
    { Wizard: "Gandolf" },
    { Human: "Aragorn" },
    { Elf: "Legolas" },
    { Maiar: "The Necromancer" },
    { Maiar: "Sauron" },
    { RingBearer: "Gollum" },
    { LadyOfLight: "Galadriel" },
    { HalfElven: "Arwen" },
    { Ent: "Treebeard" }
  ];

  console.log(lotr);
}

main();
