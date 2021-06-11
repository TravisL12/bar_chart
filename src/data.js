function randomizer(max = 1, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

export const getData = (count = 20) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      time: `2021-05-05 10:00:0${i}`,
      cat: randomizer(100, 10),
      dog: randomizer(100, 10),
      fish: randomizer(100, 10),
    });
  }
  return data;
};

export const getSingleData = (count = 20) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(randomizer(100, 10));
  }
  return data;
};
