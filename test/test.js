/*eslint-env node, mocha*/
var System = require('jspm');
var assert = require('assert');
var sinon = require('sinon');

var promise = System.import('./test/es6-test-setup');

promise.catch(function (e) {
    describe('JSPM', function () {
        it('ES6 module not loaded properly', function (done) {
            assert.fail(true, '', e);
        });
    });
});

describe('Range', function () {
    describe('#scale', function () {
        it('should throw if inputMin and inputMax are equals', function (done) {
            promise.then(function (value) {
                var scale = value.default.scale;

                assert.throws(() => scale(8, 10, 10, 0, 5), RangeError, 'inputMax must be different from inputMin');

                done();
            }).catch(done);

        });

        it('should throw if any argument is not a Number type', function (done) {
            promise.then(function (value) {
                var scale = value.default.scale;

                assert.throws(() => scale(null, 10, 10, 0, 5), TypeError, '`value` must be a Number');
                assert.throws(() => scale(8, undefined, 10, 0, 5), TypeError, '`inputMin` must be a Number');
                assert.throws(() => scale(8, 10, 'toto', 0, 5), TypeError, '`inputMax` must be a Number');
                assert.throws(() => scale(8, 10, 10, {}, 5), TypeError, '`outputMin` must be a Number');
                assert.throws(() => scale(8, 10, 10, 0, function(){}), TypeError, '`outputMax` must be a Number');

                done();
            }).catch(done);

        });

        it('should return input value when input and output ranges are equals', function (done) {
            promise.then(function (value) {
                var scale = value.default.scale;
                var rand = Math.random();
                assert.equal(rand, scale(rand, 0, 1, 0, 1));

                rand = Math.random() * 5;
                assert.equal(rand, scale(rand, 0, 5, 0, 5));
                done();
            }).catch(done);

        });

        it('should return min of output range when input value is min of input range', function (done) {
            promise.then(function (value) {
                var scale = value.default.scale;
                var minInput = 0;
                var maxInput = 10;

                var minOutput = -22;
                var maxOutput = 5;

                assert.equal(minOutput, scale(minInput, minInput, maxInput, minOutput, maxOutput));

                done();
            }).catch(done);
        });

        it('should return max of output range when input value is max of input range', function (done) {
            promise.then(function (value) {
                var scale = value.default.scale;
                var minInput = -8;
                var maxInput = -3;

                var minOutput = 11;
                var maxOutput = 42;

                assert.equal(maxOutput, scale(maxInput, minInput, maxInput, minOutput, maxOutput));

                done();
            }).catch(done);
        });

        it('should return mean of output range when input value is mean of input range', function (done) {
            promise.then(function (value) {
                var scale = value.default.scale;
                var minInput = 12;
                var maxInput = 25;

                var minOutput = 18;
                var maxOutput = 37;

                var meanInput = (maxInput + minInput) / 2;
                var meanOutput = (maxOutput + minOutput) / 2;

                assert.equal(meanOutput, scale(meanInput, minInput, maxInput, minOutput, maxOutput));

                done();
            }).catch(done);
        });
    });
    describe('#curriedScale', function () {
        it('should return a function', function (done) {
            promise.then(function (value) {
                var curriedScale = value.default.curriedScale;

                assert.ok(typeof curriedScale(0, 1, 0, 1) === 'function');

                done();
            }).catch(done);
        });

        it('should early throw if inputMin and inputMax are equals', function (done) {
            promise.then(function (value) {
                var curriedScale = value.default.curriedScale;

                assert.throws(() => curriedScale(5, 5, 0, 1), RangeError, 'inputMax must be different from inputMin');

                done();
            }).catch(done);
        });

        it('returned function should return min of output range when input value is min of input range', function (done) {
            promise.then(function (value) {
                var curriedScale = value.default.curriedScale;
                var minInput = 0;
                var maxInput = 10;

                var minOutput = -22;
                var maxOutput = 5;

                var scale = curriedScale(minInput, maxInput, minOutput,maxOutput);

                assert.equal(minOutput, scale(minInput));

                done();
            }).catch(done);
        });

        it('returned function should return max of output range when input value is max of input range', function (done) {
            promise.then(function (value) {
                var curriedScale = value.default.curriedScale;
                var minInput = -0.4;
                var maxInput = 12.5;

                var minOutput = -82.7;
                var maxOutput = 7;

                var scale = curriedScale(minInput, maxInput, minOutput,maxOutput);

                assert.equal(maxOutput, scale(maxInput));

                done();
            }).catch(done);
        });

        it('returned function should return mean of output range when input value is mean of input range', function (done) {
            promise.then(function (value) {
                var curriedScale = value.default.curriedScale;
                var minInput = -25;
                var maxInput = 13;

                var minOutput = 92;
                var maxOutput = 131;

                var meanInput = (maxInput + minInput) / 2;
                var meanOutput = (maxOutput + minOutput) / 2;

                var scale = curriedScale(minInput, maxInput, minOutput,maxOutput);

                assert.equal(meanOutput, scale(meanInput));

                done();
            }).catch(done);
        });
    });
    describe('#curriedNormalize', function () {
        it('should return a function', function (done) {
            promise.then(function (value) {
                var curriedNormalize = value.default.curriedNormalize;

                assert.ok(typeof curriedNormalize(0, 1) === 'function');

                done();
            }).catch(done);
        });

        it('should early throw if inputMin and inputMax are equals', function (done) {
            promise.then(function (value) {
                var curriedNormalize = value.default.curriedNormalize;

                assert.throws(() => curriedNormalize(5, 5), RangeError, 'inputMax must be different from inputMin');

                done();
            }).catch(done);
        });

        it('returned function should return 0 when input value is min of input range', function (done) {
            promise.then(function (value) {
                var curriedNormalize = value.default.curriedNormalize;
                var minInput = 0;
                var maxInput = 10;

                var minOutput = -22;
                var maxOutput = 5;

                var scale = curriedNormalize(minInput, maxInput, minOutput,maxOutput);

                assert.equal(0, scale(minInput));

                done();
            }).catch(done);
        });

        it('returned function should return 1 when input value is max of input range', function (done) {
            promise.then(function (value) {
                var curriedNormalize = value.default.curriedNormalize;
                var minInput = -0.4;
                var maxInput = 12.5;

                var minOutput = -82.7;
                var maxOutput = 7;

                var scale = curriedNormalize(minInput, maxInput, minOutput,maxOutput);

                assert.equal(1, scale(maxInput));

                done();
            }).catch(done);
        });

        it('returned function should return 0.5 when input value is mean of input range', function (done) {
            promise.then(function (value) {
                var curriedNormalize = value.default.curriedNormalize;
                var minInput = -25;
                var maxInput = 13;

                var minOutput = 92;
                var maxOutput = 131;

                var meanInput = (maxInput + minInput) / 2;

                var scale = curriedNormalize(minInput, maxInput, minOutput,maxOutput);

                assert.equal(0.5, scale(meanInput));

                done();
            }).catch(done);
        });

        it('inputMin and inpuMax values can be delayed to the returned function call', function (done) {
            promise.then(function (value) {
                var curriedNormalize = value.default.curriedNormalize;
                var minInput = -25;
                var maxInput = 13;

                var minOutput = 92;
                var maxOutput = 131;

                var meanInput = (maxInput + minInput) / 2;

                var scale = curriedNormalize(null, null, minOutput,maxOutput);

                assert.equal(0.5, scale(meanInput, minInput, maxInput));

                done();
            }).catch(done);
        });
    });
    describe('#normalize', function () {
        it('should throw if inputMin and inputMax are equals', function (done) {
            promise.then(function (value) {
                var normalize = value.default.normalize;

                assert.throws(() => normalize(0, 5, 5), RangeError, 'inputMax must be different from inputMin');

                done();
            }).catch(done);
        });

        it('should throw if inputMin or inputMax are not Number type', function (done) {
            promise.then(function (value) {
                var normalize = value.default.normalize;

                assert.throws(() => normalize(0, 'toto'), TypeError, '`inputMin` must be a Number');
                assert.throws(() => normalize(0, 8, {}), TypeError, '`outputMin` must be a Number');

                done();
            }).catch(done);
        });

        it('should return 0 when input value is min value of input range', function (done) {
            promise.then(function (value) {
                var normalize = value.default.normalize;
                var minInput = 5;
                var maxInput = 10;


                assert.equal(0, normalize(minInput, minInput, maxInput));

                done();
            }).catch(done);
        });

        it('should return 1 when input value is max value of input range', function (done) {
            promise.then(function (value) {
                var normalize = value.default.normalize;
                var minInput = 5;
                var maxInput = 10;


                assert.equal(1, normalize(maxInput, minInput, maxInput));

                done();
            }).catch(done);
        });

        it('should return 0.5 when input value is max value is mean of input range', function (done) {
            promise.then(function (value) {
                var normalize = value.default.normalize;
                var minInput = -25;
                var maxInput = 13;

                var meanInput = (maxInput + minInput) / 2;


                assert.equal(0.5, normalize(meanInput, minInput, maxInput));

                done();
            }).catch(done);
        });
    });

    describe('#random', function () {
        it('should return a random value between 0 and 1 when no parameter is given', function (done) {
            promise.then(function (value) {
                var random = value.default.random;
                sinon.stub(Math, 'random').returns(0.2);

                assert.equal(0.2, random());

                done();
            }).catch(done);
        });

        it('should return a random value between 0 and 1 when parameters are 0 and 1', function (done) {
            promise.then(function (value) {
                var random = value.default.random;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.7);

                assert.equal(0.7, random(0, 1));

                done();
            }).catch(done);
        });

        it('should return a random value between 0 and 10 when parameters are 0 and 10', function (done) {
            promise.then(function (value) {
                var random = value.default.random;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.9);

                assert.equal(9, random(0, 10));

                done();
            }).catch(done);
        });

        it('should return a random value between -5 and 5 when parameters are -5 and 5', function (done) {
            promise.then(function (value) {
                var random = value.default.random;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.5);

                assert.equal(0, random(-5, 5));

                done();
            }).catch(done);
        });

        it('should return a random value between -5 and 0 when parameters are -5 and 0', function (done) {
            promise.then(function (value) {
                var random = value.default.random;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0);

                assert.equal(-5, random(-5, 0));

                done();
            }).catch(done);
        });

        it('should return a random value between 0 and 4.2 when parameters are 0 and 4.2', function (done) {
            promise.then(function (value) {
                var random = value.default.random;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.5);

                assert.equal(2.1, random(0, 4.2));

                done();
            }).catch(done);
        });
    });


    describe('#randomInt', function () {
        it('should return a random integer value between 0 and 100 exclusive', function (done) {
            promise.then(function (value) {
                var randomInt = value.default.randomInt;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.5);

                assert.equal(50, randomInt(0, 100));
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.999);

                assert.equal(99, randomInt(0, 100));

                done();
            }).catch(done);
        });

        it('should return a random integer value between 0 and 100 inclusive', function (done) {
            promise.then(function (value) {
                var randomIntInclusive = value.default.randomIntInclusive;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.5);

                assert.equal(50, randomIntInclusive(0, 100));
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.999);

                assert.equal(100, randomIntInclusive(0, 100));

                done();
            }).catch(done);
        });
    });

    describe('#randomIntInclusive', function () {
        it('should return a random integer value between 0 and 100 inclusive', function (done) {
            promise.then(function (value) {
                var randomIntInclusive = value.default.randomIntInclusive;
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.5);

                assert.equal(50, randomIntInclusive(0, 100));
                Math.random.restore();
                sinon.stub(Math, 'random').returns(0.999);

                assert.equal(100, randomIntInclusive(0, 100));

                done();
            }).catch(done);
        });
    });
});