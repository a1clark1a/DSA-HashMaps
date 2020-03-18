const HashMap = require("./HashMap");

function main() {
  const lotr = new HashMap();
  lotr.MAX_LOAD_RATIO = 0.5;
  lotr.SIZE_RATIO = 3;

  const names = [
    { Hobbit: "Bilbo" },
    { Hobbit: "Frodo" },
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

  names.forEach(name => {
    key = Object.keys(name).toString();
    value = Object.values(name).toString();
    lotr.set(key, value);
  });

  lotr.set("Dragon", "Smaug");
  console.log(lotr);

  //Retreiving "Maiar"
  console.log(lotr.get("Maiar"));

  console.log(lotr.get("Hobbit"));
}

main();
