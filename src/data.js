function randomizer(max = 1, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

export const getData = (maxSize = 100) => {
  const data = [];
  const count = randomizer(25, 10);
  for (let i = 0; i < count; i++) {
    data.push({
      time: `2021-05-05 10:00:0${i}`,
      cat: randomizer(maxSize),
      dog: randomizer(maxSize),
      fish: randomizer(maxSize),
      cow: randomizer(maxSize),
      mouse: randomizer(maxSize),
    });
  }
  return data;
};

export const getSingleData = () => {
  const data = [];
  const count = randomizer(25, 10);
  for (let i = 0; i < count; i++) {
    data.push(randomizer(100, 1));
  }
  return data;
};

export const getScatterData = () => {
  const data = [];
  const count = randomizer(50, 10);
  for (let i = 0; i < count; i++) {
    data.push({
      x: randomizer(100, 1),
      y: randomizer(100, 1),
      r: randomizer(10, 1),
    });
  }
  return data;
};
