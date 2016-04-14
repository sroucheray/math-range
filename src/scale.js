const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const scale = (value, inputMin, inputMax, outputMin, outputMax) => {
    if (!isNumeric(value)) {
        throw new TypeError('`value` must be a Number');
    }

    if (!isNumeric(inputMin)) {
        throw new TypeError('`inputMin` must be a Number');
    }

    if (!isNumeric(inputMax)) {
        throw new TypeError('`inputMax` must be a Number');
    }

    if (!isNumeric(outputMin)) {
        throw new TypeError('`outputMin` must be a Number');
    }

    if (!isNumeric(outputMax)) {
        throw new TypeError('`outputMax` must be a Number');
    }

    if (inputMin === inputMax) {
        throw new RangeError('inputMax must be different from inputMin');
    }

    const outputRange = outputMax - outputMin;
    const inputRange = inputMax - inputMin;

    return outputRange * (value - inputMin) / inputRange + outputMin;
};

export const curriedScale = (inputMin, inputMax, outputMin, outputMax) => {
    if (isNumeric(inputMin) && isNumeric(inputMin) && inputMax === inputMin) {
        throw new RangeError('inputMax must be different from inputMin');
    }

    return (value, inputMinB, inputMaxB) => {
        if (!isNumeric(inputMinB)) {
            inputMinB = inputMin;
        }

        if (!isNumeric(inputMaxB)) {
            inputMaxB = inputMax;
        }

        return scale(value, inputMinB, inputMaxB, outputMin, outputMax);
    };
};

export const curriedNormalize = (inputMin, inputMax) => curriedScale(inputMin, inputMax, 0, 1);
export const normalize = (value, inputMin, inputMax) => curriedNormalize(inputMin, inputMax)(value);