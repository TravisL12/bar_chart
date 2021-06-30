function randomizer(max = 1, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

export const getData = (maxSize = 100, count = 25) => {
  const data = [];
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

export const getSingleData = (count = 20) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(randomizer(100, 1));
  }
  return data;
};
