export const random = (min = 0, max = 1) => Math.random() * (max - min) + min;
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
export const randomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
