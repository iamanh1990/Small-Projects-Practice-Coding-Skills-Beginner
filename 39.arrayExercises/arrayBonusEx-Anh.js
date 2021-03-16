const band = {
  members: {
    current: [
      { name: "Sascha", age: 59, plays: ["vocals", "synth", "guitar", "bass"] },
      { name: "Lucia", age: 49, plays: ["vocals", "synth"] },
      { name: "Jules", age: 53, plays: ["guitar", "bass", "synth"] },
      { name: "Steve", age: 55, plays: ["guitar"] },
    ],
    past: [
      { name: "Raymond", age: 57, plays: ["vocals", "synth"] },
      { name: "En", age: 52, plays: ["vocals", "drums", "guitar", "synth"] },
      { name: "Gunter", age: 57, plays: ["guitar", "synth"] },
    ],
  },
};

const sortingBand = (band) => {
  //creating and sorting property 'all'
  band.members.all = [...band.members.current, ...band.members.past];
  band.members.all = band.members.all.sort(
    (a, b) => b.age - a.age || a.name.localeCompare(b.name)
  );

  //creating property plays
  band.members.plays = band.members.all;
  let plays = {};
  band.members.plays.forEach((member) => {
    //looping through members
    for (let play of member.plays) {
      //taking properties in plays to set as the property of the empty object
      if (!plays[play]) {
        plays[play] = [member.name.toLowerCase()]; //if there is no such property, set the property equal to new array with value of member name
      } else {
        plays[play].push(member.name.toLowerCase()); //else, pushing the member name into the existing array
      }
    }
  });
  //setting property plays
  band.members.plays = plays;

  //setting property all - getting only names
  band.members.all = band.members.all.map((member) =>
    member.name.toLowerCase()
  );

  return band;
};

//Printing the band in console

console.log(sortingBand(band));

const expected = {
  members: {
    // current: no changes
    current: [
      { name: "Sascha", age: 59, plays: ["vocals", "synth", "guitar", "bass"] },
      { name: "Lucia", age: 49, plays: ["vocals", "synth"] },
      { name: "Jules", age: 53, plays: ["guitar", "bass", "synth"] },
      { name: "Steve", age: 55, plays: ["guitar"] },
    ],
    // past: no changes
    past: [
      { name: "Raymond", age: 57, plays: ["vocals", "synth"] },
      { name: "En", age: 52, plays: ["vocals", "drums", "guitar", "synth"] },
      { name: "Gunter", age: 57, plays: ["guitar", "synth"] },
    ],
    // ORDER MATTERS!
    // 1. Sort age first by DESC
    // 2. then sort name by ASC
    // 3. lowercase all the names
    all: ["sascha", "gunter", "raymond", "steve", "jules", "en", "lucia"],
  },
  // plays order doesn't matter
  plays: {
    // name order doesn't matter
    // but show the name in lowercase
    vocals: ["sascha", "lucia", "raymond", "en"],
    synth: ["sascha", "lucia", "jules", "raymond", "en", "gunter"],
    guitar: ["sascha", "jules", "steve", "en", "gunter"],
    bass: ["sascha", "jules"],
    drums: ["en"],
  },
};
