# A set of range utility functions
This script is an ES6 `module`.
## API
### ```Range.normalize```
Takes a numeric value and input range, returns the normalized value (between 0 and 1)
```javascript
import Range from "math-range";
Range.normalize(50, 0, 100);   // 0.5
Range.normalize(12, 5, 12);    // 1
Range.normalize(7, 7, 22);  // 0
```
### ```Range.scale```
Similar to ```Range.normalize``` but scale to an arbitrary range.
```javascript
import Range from "math-range";
Range.scale(12, 0, 20, -10, 10);   // 2
Range.scale(50, 0, 100, 0, 1);    // 0.5 (same as Range.normalize(50, 0, 100))
Range.scale(0, -100, 100, 0, 20);  // 10
```
### Curry methods ```Range.curriedScale``` and ```Range.curriedNormalize```
It is possible to curry the ```scale``` and the ```normalize``` functions.
```javascript
import Range from "math-range";
const customScale = Range.curriedScale(0, 690, -100, 100);
// `customScale` is a function
// `customScale` can be call simply with a value
customScale(690); // 100 
// `customScale` can also be call with overriden input range
customScale(-10, -10, 10); // -100

const customNormalize = Range.curriedNormalize(0, 800);
// Same as Range.curriedScale(0, 800, 0, 1)
// `customNormalize` is a function as well
customNormalize(400); // 0.5
```


### ```Range.random```
Returns a random number in a range
```javascript
import Range from "math-range";
Range.random(0, 1);   // Same as Math.random();
Range.random(0, 100);
Range.random(-10, 10);
```
### ```Range.randomInt``` and ```Range.randomIntInclusive```
Returns a random integer in a range
```javascript
import Range from "math-range";
Range.randomInt(0, 100); // A random integer between 0 and 100 (100 being excluded)
Range.randomIntInclusive(0, 20); // A random integer between 0 and 20 (20 being included)
```
## Import
All Range functions can be imported as a whole or individually
```javascript
import Range from "math-range";
import { 
    random,
    randomInt,
    randomIntInclusive,
    scale,
    curriedScale,
    curriedNormalize,
    normalize
} from "math-range";
```
## Installation
Use [jspm](http://jspm.io/) to eases the use of ES6 features, the package is installed from the npm registry

```bash
jspm install npm:math-range
```
or simply use npm
```bash
npm install math-range --save
