const usage = require('../../commands/usage');
const plans = require('../../plans.json');

// describe('usage tests', () => {
//     it('should return the correct usage for edf', () => {
//         expect(usage({supplier: 'edf', plan: 'fixed', price: 350}, plans)).toEqual(44267)
//     });
//
//     it('should return the correct usage for ovo', () => {
//         expect(usage({supplier: 'ovo', plan: 'standard', price: 1000}, plans)).toEqual(103855)
//     });
//
//     it('should return the correct usage for bg', () => {
//         expect(usage({supplier: 'bg', plan: 'standing-charge', price: 120}, plans)).toEqual(14954)
//     });
//
//     it('should throw an error when the supplier cannot be found', () => {
//         expect(() => usage({supplier: 'ants supplier', plan: 'standing-charge', price: 120}, plans)).toThrow();
//     });
// });

describe('usage tests', () => {
    it('should return the correct usage for ovo', () => {
        expect(usage({supplier: 'ovo', plan: 'Better Energy Fixed', price: 347.65}, plans)).toEqual(51560) // expected price 350?
    });

    it('should return the correct usage for extra-energy', () => {
        expect(usage({supplier: 'extra-energy', plan: 'Variable Price v1', price: 1000}, plans)).toEqual(183441)
    });

    it('should return the correct usage for ovo', () => {
        expect(usage({supplier: 'ovo', plan: 'Greener Energy Fixed (Online)', price: 48.63}, plans)).toEqual(5000)
    });

    it('should return the correct usage for extra-energy', () => {
        expect(usage({supplier: 'extra-energy', plan: 'SaverPlus Fixed Price Sept 2015 v1', price: 27.68}, plans)).toEqual(5000)
    });

    it('should return the correct usage for southern-electric', () => {
        expect(usage({supplier: 'southern-electric', plan: '1 Year Fixed Price', price: 63.07}, plans)).toEqual(5000)
    });

    it('should return the correct usage for ovo 10', () => {
        expect(usage({supplier: 'ovo', plan: 'Greener Energy Fixed (Online)', price: 8.85}, plans)).toEqual(10)
    });
});
