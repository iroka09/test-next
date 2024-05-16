exports.id = 916;
exports.ids = [916];
exports.modules = {

/***/ 6652:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.
// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(3456);
// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(8843);
// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(7502);
// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(86);
// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(1755);
// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(4074);
// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(8347);
sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;
module.exports = sr;


/***/ }),

/***/ 3456:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -
// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
(function(global, module1, define1) {
    function Alea(seed) {
        var me = this, mash = Mash();
        me.next = function() {
            var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
            me.s0 = me.s1;
            me.s1 = me.s2;
            return me.s2 = t - (me.c = t | 0);
        };
        // Apply the seeding algorithm from Baagoe.
        me.c = 1;
        me.s0 = mash(" ");
        me.s1 = mash(" ");
        me.s2 = mash(" ");
        me.s0 -= mash(seed);
        if (me.s0 < 0) {
            me.s0 += 1;
        }
        me.s1 -= mash(seed);
        if (me.s1 < 0) {
            me.s1 += 1;
        }
        me.s2 -= mash(seed);
        if (me.s2 < 0) {
            me.s2 += 1;
        }
        mash = null;
    }
    function copy(f, t) {
        t.c = f.c;
        t.s0 = f.s0;
        t.s1 = f.s1;
        t.s2 = f.s2;
        return t;
    }
    function impl(seed, opts) {
        var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
        prng.int32 = function() {
            return xg.next() * 0x100000000 | 0;
        };
        prng.double = function() {
            return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
        };
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    function Mash() {
        var n = 0xefc8249d;
        var mash = function(data) {
            data = String(data);
            for(var i = 0; i < data.length; i++){
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };
        return mash;
    }
    if (module1 && module1.exports) {
        module1.exports = impl;
    } else if (__webpack_require__.amdD && __webpack_require__.amdO) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return impl;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this.alea = impl;
    }
})(this,  true && module, __webpack_require__.amdD // present with an AMD loader
);


/***/ }),

/***/ 4074:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this, strseed = "";
        // Set up generator function.
        me.next = function() {
            var b = me.b, c = me.c, d = me.d, a = me.a;
            b = b << 25 ^ b >>> 7 ^ c;
            c = c - d | 0;
            d = d << 24 ^ d >>> 8 ^ a;
            a = a - b | 0;
            me.b = b = b << 20 ^ b >>> 12 ^ c;
            me.c = c = c - d | 0;
            me.d = d << 16 ^ c >>> 16 ^ a;
            return me.a = a - b | 0;
        };
        /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */ me.a = 0;
        me.b = 0;
        me.c = 2654435769 | 0;
        me.d = 1367130551;
        if (seed === Math.floor(seed)) {
            // Integer seed.
            me.a = seed / 0x100000000 | 0;
            me.b = seed | 0;
        } else {
            // String seed.
            strseed += seed;
        }
        // Mix in string seed, then discard an initial batch of 64 values.
        for(var k = 0; k < strseed.length + 20; k++){
            me.b ^= strseed.charCodeAt(k) | 0;
            me.next();
        }
    }
    function copy(f, t) {
        t.a = f.a;
        t.b = f.b;
        t.c = f.c;
        t.d = f.d;
        return t;
    }
    ;
    function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do {
                var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / (1 << 21);
            }while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) {
        module1.exports = impl;
    } else if (__webpack_require__.amdD && __webpack_require__.amdO) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return impl;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this.tychei = impl;
    }
})(this,  true && module, __webpack_require__.amdD // present with an AMD loader
);


/***/ }),

/***/ 8843:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this, strseed = "";
        me.x = 0;
        me.y = 0;
        me.z = 0;
        me.w = 0;
        // Set up generator function.
        me.next = function() {
            var t = me.x ^ me.x << 11;
            me.x = me.y;
            me.y = me.z;
            me.z = me.w;
            return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
        };
        if (seed === (seed | 0)) {
            // Integer seed.
            me.x = seed;
        } else {
            // String seed.
            strseed += seed;
        }
        // Mix in string seed, then discard an initial batch of 64 values.
        for(var k = 0; k < strseed.length + 64; k++){
            me.x ^= strseed.charCodeAt(k) | 0;
            me.next();
        }
    }
    function copy(f, t) {
        t.x = f.x;
        t.y = f.y;
        t.z = f.z;
        t.w = f.w;
        return t;
    }
    function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do {
                var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / (1 << 21);
            }while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) {
        module1.exports = impl;
    } else if (__webpack_require__.amdD && __webpack_require__.amdO) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return impl;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this.xor128 = impl;
    }
})(this,  true && module, __webpack_require__.amdD // present with an AMD loader
);


/***/ }),

/***/ 1755:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this;
        // Set up generator function.
        me.next = function() {
            var w = me.w, X = me.X, i = me.i, t, v;
            // Update Weyl generator.
            me.w = w = w + 0x61c88647 | 0;
            // Update xor generator.
            v = X[i + 34 & 127];
            t = X[i = i + 1 & 127];
            v ^= v << 13;
            t ^= t << 17;
            v ^= v >>> 15;
            t ^= t >>> 12;
            // Update Xor generator array state.
            v = X[i] = v ^ t;
            me.i = i;
            // Result is the combination.
            return v + (w ^ w >>> 16) | 0;
        };
        function init(me, seed) {
            var t, v, i, j, w, X = [], limit = 128;
            if (seed === (seed | 0)) {
                // Numeric seeds initialize v, which is used to generates X.
                v = seed;
                seed = null;
            } else {
                // String seeds are mixed into v and X one character at a time.
                seed = seed + "\x00";
                v = 0;
                limit = Math.max(limit, seed.length);
            }
            // Initialize circular array and weyl value.
            for(i = 0, j = -32; j < limit; ++j){
                // Put the unicode characters into the array, and shuffle them.
                if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
                // After 32 shuffles, take v as the starting w value.
                if (j === 0) w = v;
                v ^= v << 10;
                v ^= v >>> 15;
                v ^= v << 4;
                v ^= v >>> 13;
                if (j >= 0) {
                    w = w + 0x61c88647 | 0; // Weyl.
                    t = X[j & 127] ^= v + w; // Combine xor and weyl to init array.
                    i = 0 == t ? i + 1 : 0; // Count zeroes.
                }
            }
            // We have detected all zeroes; make the key nonzero.
            if (i >= 128) {
                X[(seed && seed.length || 0) & 127] = -1;
            }
            // Run the generator 512 times to further mix the state before using it.
            // Factoring this as a function slows the main generator, so it is just
            // unrolled here.  The weyl generator is not advanced while warming up.
            i = 127;
            for(j = 4 * 128; j > 0; --j){
                v = X[i + 34 & 127];
                t = X[i = i + 1 & 127];
                v ^= v << 13;
                t ^= t << 17;
                v ^= v >>> 15;
                t ^= t >>> 12;
                X[i] = v ^ t;
            }
            // Storing state as object members is faster than using closure variables.
            me.w = w;
            me.X = X;
            me.i = i;
        }
        init(me, seed);
    }
    function copy(f, t) {
        t.i = f.i;
        t.w = f.w;
        t.X = f.X.slice();
        return t;
    }
    ;
    function impl(seed, opts) {
        if (seed == null) seed = +new Date;
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do {
                var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / (1 << 21);
            }while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (state.X) copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) {
        module1.exports = impl;
    } else if (__webpack_require__.amdD && __webpack_require__.amdO) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return impl;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this.xor4096 = impl;
    }
})(this,  true && module, __webpack_require__.amdD // present with an AMD loader
);


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this;
        // Set up generator function.
        me.next = function() {
            // Update xor generator.
            var X = me.x, i = me.i, t, v, w;
            t = X[i];
            t ^= t >>> 7;
            v = t ^ t << 24;
            t = X[i + 1 & 7];
            v ^= t ^ t >>> 10;
            t = X[i + 3 & 7];
            v ^= t ^ t >>> 3;
            t = X[i + 4 & 7];
            v ^= t ^ t << 7;
            t = X[i + 7 & 7];
            t = t ^ t << 13;
            v ^= t ^ t << 9;
            X[i] = v;
            me.i = i + 1 & 7;
            return v;
        };
        function init(me, seed) {
            var j, w, X = [];
            if (seed === (seed | 0)) {
                // Seed state array using a 32-bit integer.
                w = X[0] = seed;
            } else {
                // Seed state using a string.
                seed = "" + seed;
                for(j = 0; j < seed.length; ++j){
                    X[j & 7] = X[j & 7] << 15 ^ seed.charCodeAt(j) + X[j + 1 & 7] << 13;
                }
            }
            // Enforce an array length of 8, not all zeroes.
            while(X.length < 8)X.push(0);
            for(j = 0; j < 8 && X[j] === 0; ++j);
            if (j == 8) w = X[7] = -1;
            else w = X[j];
            me.x = X;
            me.i = 0;
            // Discard an initial 256 values.
            for(j = 256; j > 0; --j){
                me.next();
            }
        }
        init(me, seed);
    }
    function copy(f, t) {
        t.x = f.x.slice();
        t.i = f.i;
        return t;
    }
    function impl(seed, opts) {
        if (seed == null) seed = +new Date;
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do {
                var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / (1 << 21);
            }while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (state.x) copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) {
        module1.exports = impl;
    } else if (__webpack_require__.amdD && __webpack_require__.amdO) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return impl;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this.xorshift7 = impl;
    }
})(this,  true && module, __webpack_require__.amdD // present with an AMD loader
);


/***/ }),

/***/ 7502:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this, strseed = "";
        // Set up generator function.
        me.next = function() {
            var t = me.x ^ me.x >>> 2;
            me.x = me.y;
            me.y = me.z;
            me.z = me.w;
            me.w = me.v;
            return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
        };
        me.x = 0;
        me.y = 0;
        me.z = 0;
        me.w = 0;
        me.v = 0;
        if (seed === (seed | 0)) {
            // Integer seed.
            me.x = seed;
        } else {
            // String seed.
            strseed += seed;
        }
        // Mix in string seed, then discard an initial batch of 64 values.
        for(var k = 0; k < strseed.length + 64; k++){
            me.x ^= strseed.charCodeAt(k) | 0;
            if (k == strseed.length) {
                me.d = me.x << 10 ^ me.x >>> 4;
            }
            me.next();
        }
    }
    function copy(f, t) {
        t.x = f.x;
        t.y = f.y;
        t.z = f.z;
        t.w = f.w;
        t.v = f.v;
        t.d = f.d;
        return t;
    }
    function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do {
                var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / (1 << 21);
            }while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) {
        module1.exports = impl;
    } else if (__webpack_require__.amdD && __webpack_require__.amdO) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return impl;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        this.xorwow = impl;
    }
})(this,  true && module, __webpack_require__.amdD // present with an AMD loader
);


/***/ }),

/***/ 8347:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/ (function(global, pool, math) {
    //
    // The following constants are related to IEEE 754 limits.
    //
    var width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto; // node.js crypto module, initialized at the bottom.
    //
    // seedrandom()
    // This is the seedrandom function described above.
    //
    function seedrandom(seed, options, callback) {
        var key = [];
        options = options == true ? {
            entropy: true
        } : options || {};
        // Flatten the seed string or build one from local entropy if needed.
        var shortseed = mixkey(flatten(options.entropy ? [
            seed,
            tostring(pool)
        ] : seed == null ? autoseed() : seed, 3), key);
        // Use the seed to initialize an ARC4 generator.
        var arc4 = new ARC4(key);
        // This function returns a random double in [0, 1) that contains
        // randomness in every bit of the mantissa of the IEEE 754 value.
        var prng = function() {
            var n = arc4.g(chunks), d = startdenom, x = 0; //   and no 'extra last byte'.
            while(n < significance){
                n = (n + x) * width; //   shifting numerator and
                d *= width; //   denominator and generating a
                x = arc4.g(1); //   new least-significant-byte.
            }
            while(n >= overflow){
                n /= 2; //   last byte, shift everything
                d /= 2; //   right using integer math until
                x >>>= 1; //   we have exactly the desired bits.
            }
            return (n + x) / d; // Form the number within [0, 1).
        };
        prng.int32 = function() {
            return arc4.g(4) | 0;
        };
        prng.quick = function() {
            return arc4.g(4) / 0x100000000;
        };
        prng.double = prng;
        // Mix the randomness into accumulated entropy.
        mixkey(tostring(arc4.S), pool);
        // Calling convention: what to return as a function of prng, seed, is_math.
        return (options.pass || callback || function(prng, seed, is_math_call, state) {
            if (state) {
                // Load the arc4 state from the given state if it has an S array.
                if (state.S) {
                    copy(state, arc4);
                }
                // Only provide the .state method if requested via options.state.
                prng.state = function() {
                    return copy(arc4, {});
                };
            }
            // If called as a method of Math (Math.seedrandom()), mutate
            // Math.random because that is how seedrandom.js has worked since v1.0.
            if (is_math_call) {
                math[rngname] = prng;
                return seed;
            } else return prng;
        })(prng, shortseed, "global" in options ? options.global : this == math, options.state);
    }
    //
    // ARC4
    //
    // An ARC4 implementation.  The constructor takes a key in the form of
    // an array of at most (width) integers that should be 0 <= x < (width).
    //
    // The g(count) method returns a pseudorandom integer that concatenates
    // the next (count) outputs from ARC4.  Its return value is a number x
    // that is in the range 0 <= x < (width ^ count).
    //
    function ARC4(key) {
        var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
        // The empty key [] is treated as [0].
        if (!keylen) {
            key = [
                keylen++
            ];
        }
        // Set up S using the standard key scheduling algorithm.
        while(i < width){
            s[i] = i++;
        }
        for(i = 0; i < width; i++){
            s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
            s[j] = t;
        }
        // The "g" method returns the next (count) outputs as one number.
        (me.g = function(count) {
            // Using instance members instead of closure state nearly doubles speed.
            var t, r = 0, i = me.i, j = me.j, s = me.S;
            while(count--){
                t = s[i = mask & i + 1];
                r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
            }
            me.i = i;
            me.j = j;
            return r;
        // For robust unpredictability, the function call below automatically
        // discards an initial batch of values.  This is called RC4-drop[256].
        // See http://google.com/search?q=rsa+fluhrer+response&btnI
        })(width);
    }
    //
    // copy()
    // Copies internal state of ARC4 to or from a plain object.
    //
    function copy(f, t) {
        t.i = f.i;
        t.j = f.j;
        t.S = f.S.slice();
        return t;
    }
    ;
    //
    // flatten()
    // Converts an object tree to nested arrays of strings.
    //
    function flatten(obj, depth) {
        var result = [], typ = typeof obj, prop;
        if (depth && typ == "object") {
            for(prop in obj){
                try {
                    result.push(flatten(obj[prop], depth - 1));
                } catch (e) {}
            }
        }
        return result.length ? result : typ == "string" ? obj : obj + "\x00";
    }
    //
    // mixkey()
    // Mixes a string seed into a key that is an array of integers, and
    // returns a shortened string seed that is equivalent to the result key.
    //
    function mixkey(seed, key) {
        var stringseed = seed + "", smear, j = 0;
        while(j < stringseed.length){
            key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
        }
        return tostring(key);
    }
    //
    // autoseed()
    // Returns an object for autoseeding, using window.crypto and Node crypto
    // module if available.
    //
    function autoseed() {
        try {
            var out;
            if (nodecrypto && (out = nodecrypto.randomBytes)) {
                // The use of 'out' to remember randomBytes makes tight minified code.
                out = out(width);
            } else {
                out = new Uint8Array(width);
                (global.crypto || global.msCrypto).getRandomValues(out);
            }
            return tostring(out);
        } catch (e) {
            var browser = global.navigator, plugins = browser && browser.plugins;
            return [
                +new Date,
                global,
                plugins,
                global.screen,
                tostring(pool)
            ];
        }
    }
    //
    // tostring()
    // Converts an array of charcodes to a string
    //
    function tostring(a) {
        return String.fromCharCode.apply(0, a);
    }
    //
    // When seedrandom.js is loaded, we immediately mix a few bits
    // from the built-in RNG into the entropy pool.  Because we do
    // not want to interfere with deterministic PRNG state later,
    // seedrandom will not call math.random on its own again after
    // initialization.
    //
    mixkey(math.random(), pool);
    //
    // Nodejs and AMD support: export the implementation as a module using
    // either convention.
    //
    if ( true && module.exports) {
        module.exports = seedrandom;
        // When in node.js, try using crypto package for autoseeding.
        try {
            nodecrypto = __webpack_require__(6113);
        } catch (ex) {}
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return seedrandom;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
// End anonymous scope, and pass initial values.
})(// global: `self` in browsers (including strict mode and web workers),
// otherwise `this` in Node and other environments
typeof self !== "undefined" ? self : this, [], Math // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ 7916:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (/* binding */ random)
/* harmony export */ });
/* unused harmony exports RNG, RNGFactory, Random */
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6652);

function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
}
var RNG = /*#__PURE__*/ function() {
    function RNG() {}
    var _proto = RNG.prototype;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _proto._seed = function _seed(seed, _opts) {
        // TODO: add entropy and stuff
        if (seed === (seed || 0)) {
            return seed;
        } else {
            var strSeed = "" + seed;
            var s = 0;
            for(var k = 0; k < strSeed.length; ++k){
                s ^= strSeed.charCodeAt(k) | 0;
            }
            return s;
        }
    };
    return RNG;
}();
var RNGFunction = /*#__PURE__*/ function(_RNG) {
    _inheritsLoose(RNGFunction, _RNG);
    function RNGFunction(thunk, opts) {
        var _this;
        _this = _RNG.call(this) || this;
        _this._rng = void 0;
        _this.seed(thunk, opts);
        return _this;
    }
    var _proto = RNGFunction.prototype;
    _proto.next = function next() {
        return this._rng();
    };
    _proto.seed = function seed(thunk, _opts) {
        this._rng = thunk;
    };
    _proto.clone = function clone(_, opts) {
        return new RNGFunction(this._rng, opts);
    };
    _createClass(RNGFunction, [
        {
            key: "name",
            get: function get() {
                return "function";
            }
        }
    ]);
    return RNGFunction;
}(RNG);
/**
 * Construct an RNG with variable inputs. Used in calls to Random constructor
 * @param {...*} args - Distribution-specific arguments
 * @return RNG
 *
 * @example
 * new Random(RNGFactory(...args))
 */ var RNGFactory = function() {
    var args = [].slice.call(arguments);
    var _args = args, _args$ = _args[0], arg0 = _args$ === void 0 ? "default" : _args$;
    switch(typeof arg0){
        case "object":
            if (arg0 instanceof RNG) {
                return arg0;
            }
            break;
        case "function":
            return new RNGFunction(arg0);
        case "number":
        case "string":
        default:
            return new RNGFunction(seedrandom__WEBPACK_IMPORTED_MODULE_0__.apply(void 0, args));
    }
    throw new Error('invalid RNG "' + arg0 + '"');
};
var uniform = function(random, min, max) {
    if (min === void 0) {
        min = 0;
    }
    if (max === void 0) {
        max = 1;
    }
    return function() {
        return random.next() * (max - min) + min;
    };
};
function numberValidator(num) {
    return new NumberValidator(num);
}
var NumberValidator = function NumberValidator(num) {
    var _this = this;
    this.n = void 0;
    this.isInt = function() {
        if (Number.isInteger(_this.n)) {
            return _this;
        }
        throw new Error("Expected number to be an integer, got " + _this.n);
    };
    this.isPositive = function() {
        if (_this.n > 0) {
            return _this;
        }
        throw new Error("Expected number to be positive, got " + _this.n);
    };
    this.lessThan = function(v) {
        if (_this.n < v) {
            return _this;
        }
        throw new Error("Expected number to be less than " + v + ", got " + _this.n);
    };
    this.greaterThanOrEqual = function(v) {
        if (_this.n >= v) {
            return _this;
        }
        throw new Error("Expected number to be greater than or equal to " + v + ", got " + _this.n);
    };
    this.greaterThan = function(v) {
        if (_this.n > v) {
            return _this;
        }
        throw new Error("Expected number to be greater than " + v + ", got " + _this.n);
    };
    this.n = num;
};
var uniformInt = function(random, min, max) {
    if (min === void 0) {
        min = 0;
    }
    if (max === void 0) {
        max = 1;
    }
    if (max === undefined) {
        max = min === undefined ? 1 : min;
        min = 0;
    }
    numberValidator(min).isInt();
    numberValidator(max).isInt();
    return function() {
        return Math.floor(random.next() * (max - min + 1) + min);
    };
};
var uniformBoolean = function(random) {
    return function() {
        return random.next() >= 0.5;
    };
};
var normal = function(random, mu, sigma) {
    if (mu === void 0) {
        mu = 0;
    }
    if (sigma === void 0) {
        sigma = 1;
    }
    return function() {
        var x, y, r;
        do {
            x = random.next() * 2 - 1;
            y = random.next() * 2 - 1;
            r = x * x + y * y;
        }while (!r || r > 1);
        return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
};
var logNormal = function(random, mu, sigma) {
    if (mu === void 0) {
        mu = 0;
    }
    if (sigma === void 0) {
        sigma = 1;
    }
    var normal = random.normal(mu, sigma);
    return function() {
        return Math.exp(normal());
    };
};
var bernoulli = function(random, p) {
    if (p === void 0) {
        p = 0.5;
    }
    numberValidator(p).greaterThanOrEqual(0).lessThan(1);
    return function() {
        return Math.floor(random.next() + p);
    };
};
var binomial = function(random, n, p) {
    if (n === void 0) {
        n = 1;
    }
    if (p === void 0) {
        p = 0.5;
    }
    numberValidator(n).isInt().isPositive();
    numberValidator(p).greaterThanOrEqual(0).lessThan(1);
    return function() {
        var i = 0;
        var x = 0;
        while(i++ < n){
            if (random.next() < p) {
                x++;
            }
        }
        return x;
    };
};
var geometric = function(random, p) {
    if (p === void 0) {
        p = 0.5;
    }
    numberValidator(p).greaterThan(0).lessThan(1);
    var invLogP = 1.0 / Math.log(1.0 - p);
    return function() {
        return Math.floor(1 + Math.log(random.next()) * invLogP);
    };
};
var logFactorialTable = [
    0.0,
    0.0,
    0.69314718055994529,
    1.791759469228055,
    3.1780538303479458,
    4.7874917427820458,
    6.5792512120101012,
    8.5251613610654147,
    10.604602902745251,
    12.801827480081469
];
var logFactorial = function logFactorial(k) {
    return logFactorialTable[k];
};
var logSqrt2PI = 0.91893853320467267;
var poisson = function(random, lambda) {
    if (lambda === void 0) {
        lambda = 1;
    }
    numberValidator(lambda).isPositive();
    if (lambda < 10) {
        // inversion method
        var expMean = Math.exp(-lambda);
        return function() {
            var p = expMean;
            var x = 0;
            var u = random.next();
            while(u > p){
                u = u - p;
                p = lambda * p / ++x;
            }
            return x;
        };
    } else {
        // generative method
        var smu = Math.sqrt(lambda);
        var b = 0.931 + 2.53 * smu;
        var a = -0.059 + 0.02483 * b;
        var invAlpha = 1.1239 + 1.1328 / (b - 3.4);
        var vR = 0.9277 - 3.6224 / (b - 2);
        return function() {
            while(true){
                var u = void 0;
                var v = random.next();
                if (v <= 0.86 * vR) {
                    u = v / vR - 0.43;
                    return Math.floor((2 * a / (0.5 - Math.abs(u)) + b) * u + lambda + 0.445);
                }
                if (v >= vR) {
                    u = random.next() - 0.5;
                } else {
                    u = v / vR - 0.93;
                    u = (u < 0 ? -0.5 : 0.5) - u;
                    v = random.next() * vR;
                }
                var us = 0.5 - Math.abs(u);
                if (us < 0.013 && v > us) {
                    continue;
                }
                var k = Math.floor((2 * a / us + b) * u + lambda + 0.445);
                v = v * invAlpha / (a / (us * us) + b);
                if (k >= 10) {
                    var t = (k + 0.5) * Math.log(lambda / k) - lambda - logSqrt2PI + k - (1 / 12.0 - (1 / 360.0 - 1 / (1260.0 * k * k)) / (k * k)) / k;
                    if (Math.log(v * smu) <= t) {
                        return k;
                    }
                } else if (k >= 0) {
                    var _logFactorial;
                    var f = (_logFactorial = logFactorial(k)) != null ? _logFactorial : 0;
                    if (Math.log(v) <= k * Math.log(lambda) - lambda - f) {
                        return k;
                    }
                }
            }
        };
    }
};
var exponential = function(random, lambda) {
    if (lambda === void 0) {
        lambda = 1;
    }
    numberValidator(lambda).isPositive();
    return function() {
        return -Math.log(1 - random.next()) / lambda;
    };
};
var irwinHall = function(random, n) {
    if (n === void 0) {
        n = 1;
    }
    numberValidator(n).isInt().greaterThanOrEqual(0);
    return function() {
        var sum = 0;
        for(var i = 0; i < n; ++i){
            sum += random.next();
        }
        return sum;
    };
};
var bates = function(random, n) {
    if (n === void 0) {
        n = 1;
    }
    numberValidator(n).isInt().isPositive();
    var irwinHall = random.irwinHall(n);
    return function() {
        return irwinHall() / n;
    };
};
var pareto = function(random, alpha) {
    if (alpha === void 0) {
        alpha = 1;
    }
    numberValidator(alpha).greaterThanOrEqual(0);
    var invAlpha = 1.0 / alpha;
    return function() {
        return 1.0 / Math.pow(1.0 - random.next(), invAlpha);
    };
};
var RNGMathRandom = /*#__PURE__*/ function(_RNG) {
    _inheritsLoose(RNGMathRandom, _RNG);
    function RNGMathRandom() {
        return _RNG.apply(this, arguments) || this;
    }
    var _proto = RNGMathRandom.prototype;
    _proto.next = function next() {
        return Math.random();
    };
    _proto.seed = function seed(_seed, _opts) {
    // intentionally empty
    };
    _proto.clone = function clone() {
        return new RNGMathRandom();
    };
    _createClass(RNGMathRandom, [
        {
            key: "name",
            get: function get() {
                return "default";
            }
        }
    ]);
    return RNGMathRandom;
}(RNG);
/**
 * Seedable random number generator supporting many common distributions.
 *
 * Defaults to Math.random as its underlying pseudorandom number generator.
 *
 * @name Random
 * @class
 *
 * @param {RNG|function} [rng=Math.random] - Underlying pseudorandom number generator.
 */ var Random = /*#__PURE__*/ function() {
    function Random(rng) {
        var _this = this;
        this._rng = void 0;
        this._patch = void 0;
        this._cache = {};
        this.next = function() {
            return _this._rng.next();
        };
        this["float"] = function(min, max) {
            return _this.uniform(min, max)();
        };
        this["int"] = function(min, max) {
            return _this.uniformInt(min, max)();
        };
        this.integer = function(min, max) {
            return _this.uniformInt(min, max)();
        };
        this.bool = function() {
            return _this.uniformBoolean()();
        };
        this["boolean"] = function() {
            return _this.uniformBoolean()();
        };
        this.uniform = function(min, max) {
            return _this._memoize("uniform", uniform, min, max);
        };
        this.uniformInt = function(min, max) {
            return _this._memoize("uniformInt", uniformInt, min, max);
        };
        this.uniformBoolean = function() {
            return _this._memoize("uniformBoolean", uniformBoolean);
        };
        this.normal = function(mu, sigma) {
            return normal(_this, mu, sigma);
        };
        this.logNormal = function(mu, sigma) {
            return logNormal(_this, mu, sigma);
        };
        this.bernoulli = function(p) {
            return bernoulli(_this, p);
        };
        this.binomial = function(n, p) {
            return binomial(_this, n, p);
        };
        this.geometric = function(p) {
            return geometric(_this, p);
        };
        this.poisson = function(lambda) {
            return poisson(_this, lambda);
        };
        this.exponential = function(lambda) {
            return exponential(_this, lambda);
        };
        this.irwinHall = function(n) {
            return irwinHall(_this, n);
        };
        this.bates = function(n) {
            return bates(_this, n);
        };
        this.pareto = function(alpha) {
            return pareto(_this, alpha);
        };
        if (rng && rng instanceof RNG) {
            this.use(rng);
        } else {
            this.use(new RNGMathRandom());
        }
        this._cache = {};
    }
    /**
   * @member {RNG} Underlying pseudo-random number generator
   */ var _proto = Random.prototype;
    /**
   * Creates a new `Random` instance, optionally specifying parameters to
   * set a new seed.
   *
   * @see RNG.clone
   *
   * @param {string} [seed] - Optional seed for new RNG.
   * @param {object} [opts] - Optional config for new RNG options.
   * @return {Random}
   */ _proto.clone = function clone() {
        var args = [].slice.call(arguments);
        if (args.length) {
            return new Random(RNGFactory.apply(void 0, args));
        } else {
            return new Random(this.rng.clone());
        }
    } /**
   * Sets the underlying pseudorandom number generator used via
   * either an instance of `seedrandom`, a custom instance of RNG
   * (for PRNG plugins), or a string specifying the PRNG to use
   * along with an optional `seed` and `opts` to initialize the
   * RNG.
   *
   * @example
   * import random from 'random'
   *
   * random.use('example_seedrandom_string')
   * // or
   * random.use(seedrandom('kittens'))
   * // or
   * random.use(Math.random)
   *
   * @param {...*} args
   */ ;
    _proto.use = function use() {
        this._rng = RNGFactory.apply(void 0, [].slice.call(arguments));
    } /**
   * Patches `Math.random` with this Random instance's PRNG.
   */ ;
    _proto.patch = function patch() {
        if (this._patch) {
            throw new Error("Math.random already patched");
        }
        this._patch = Math.random;
        Math.random = this.uniform();
    } /**
   * Restores a previously patched `Math.random` to its original value.
   */ ;
    _proto.unpatch = function unpatch() {
        if (this._patch) {
            Math.random = this._patch;
            delete this._patch;
        }
    } /**
   * Convenience wrapper around `this.rng.next()`
   *
   * Returns a floating point number in [0, 1).
   *
   * @return {number}
   */ ;
    /**
   * Returns an item chosen uniformly at trandom from the given array.
   *
   * Convence wrapper around `random.uniformInt()`
   *
   * @param {Array<T>} [array] - Lower bound (integer, inclusive)
   * @return {T | undefined}
   */ _proto.choice = function choice(array) {
        if (!Array.isArray(array)) {
            throw new Error("Random.choice expected input to be an array, got " + typeof array);
        }
        var length = array == null ? void 0 : array.length;
        if (length > 0) {
            var index = this.uniformInt(0, length - 1)();
            return array[index];
        } else {
            return undefined;
        }
    } /**
   * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   * @return {function}
   */ ;
    // --------------------------------------------------------------------------
    // Internal
    // --------------------------------------------------------------------------
    /**
   * Memoizes distributions to ensure they're only created when necessary.
   *
   * Returns a thunk which that returns independent, identically distributed
   * samples from the specified distribution.
   *
   * @private
   *
   * @param {string} label - Name of distribution
   * @param {function} getter - Function which generates a new distribution
   * @param {...*} args - Distribution-specific arguments
   *
   * @return {function}
   */ _proto._memoize = function _memoize(label, getter) {
        var args = [].slice.call(arguments, 2);
        var key = "" + args.join(";");
        var value = this._cache[label];
        if (value === undefined || value.key !== key) {
            value = {
                key: key,
                distribution: getter.apply(void 0, [
                    this
                ].concat(args))
            };
            this._cache[label] = value;
        }
        return value.distribution;
    };
    _createClass(Random, [
        {
            key: "rng",
            get: function get() {
                return this._rng;
            }
        }
    ]);
    return Random;
}();
// defaults to Math.random as its RNG
var random = new Random();
 //# sourceMappingURL=random.module.js.map


/***/ })

};
;