export const userSizes = {
  emailMaxLen: 128,
  nameMaxLen: 150,
  passwordMaxLen: 64,
  passwordMinLen: 8,
  phoneMaxLen: 16
};

export const addressSizes = {
  cityMax: 64,
  numberMin: 0,
  numberMax: Number.MAX_SAFE_INTEGER,
  neighborhoodMax: 64,
  stateMax: 64,
  streetMax: 128,
  zipCodeMax: 9
};

export const categorySizes = {
  titleMax: 64
};

export const listSizes = {
  titleMin: 2,
  titleMax: 64
};

export const productSizes = {
  amountAvailableMax: Number.MAX_SAFE_INTEGER,
  amountAvailableMin: 0,
  avgReviewMax: 5,
  avgReviewMin: 0,
  costMin: 0,
  costMax: 9999999,
  descMin: 10,
  descMax: 4000,
  heightMin: 1,
  heightMax: 9999,
  lengthMin: 1,
  lengthMax: 9999,
  percentOffMax: 100,
  percentOffMin: 0,
  priceMin: 0,
  priceMax: Number.MAX_SAFE_INTEGER,
  titleMin: 20,
  titleMax: 128,
  weightMin: 0.01,
  weightMax: 9999,
  widthMin: 1,
  widthMax: 9999,
  urlMainImageMax: 512
};

export const reviewSizes = {
  commentMin: 10,
  commentMax: 512,
  ratingMin: 0,
  ratingMax: 5,
  titleMin: 10,
  titleMax: 128,
};

export const slideSizes = {
  btnTitleMin: 2,
  btnTitleMax: 64,
  descMin: 4,
  descMax: 512,
  imageUrlMin: 16,
  imageUrlMax: 2048,
  indexMin: 0,
  indexMax: 16,
  titleMin: 4,
  titleMax: 256,
  urlMin: 8,
  urlMax: 2048
};
