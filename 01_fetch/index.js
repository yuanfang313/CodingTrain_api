// display Text
async function catchPoem() {
  const response = await fetch('poem.txt');
  const text = await response.text();
  document.getElementById('poem').innerHTML = text;
}
catchPoem()
  .then((response) => {
    console.log("I'd caught the poem!");
  })
  .catch((error) => {
    console.log('error');
    console.log(error);
  });

// display img_Houses
async function catchHouses() {
  const arrHouses = [
    'Gryffindor.png',
    'Hufflepuff.png',
    'Ravenclaw.png',
    'Slytherin.png',
  ];
  const arrId = ['bage1', 'bage2', 'bage3', 'bage4'];

  arrHouses.forEach(async (el, i) => {
    const response = await fetch(el);
    const blob = await response.blob();
    document.getElementById(arrId[i]).src = URL.createObjectURL(blob);
  });
}
catchHouses()
  .then((response) => {
    console.log("I'd caught the houses!");
  })
  .catch((error) => {
    console.log('error');
    console.log(error);
  });

// display img_rainbow
async function catchRainbow() {
  const response = await fetch('rainbow.jpg');
  const blob = await response.blob();
  document.getElementById('rainbow').src = URL.createObjectURL(blob);
}
catchRainbow()
  .then((response) => {
    console.log("I'd caught the rainbow!");
  })
  .catch((error) => {
    console.log('error');
    console.log(error);
  });
