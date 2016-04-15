import { random, randomInt, randomIntInclusive } from './src/random.js';
import { scale, curriedScale, curriedNormalize, normalize } from './src/scale.js';

export * from './src/random.js';
export * from './src/scale.js';

export default {
    random,
    randomInt,
    randomIntInclusive,
    scale,
    curriedScale,
    curriedNormalize,
    normalize
};