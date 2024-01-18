import { sumOfMultiples } from '.'

describe('Exercise 01: Sum of multiples', () => {
  it.each([
    [3, 10, 18], // multiple of 3 up to 10: 3 + 6 + 9 = 18
    [5, 20, 50], // multiple of 5 up to 20: 5 + 10 + 15 + 20 = 50
    [4, 3, 0], // multiple of 4 up to 3 (no multiples): 0
    [2, 15, 56], // multiple of 2 up to 15: 2 + 4 + 6 + ... + 14 = 56
    [1, 100, 5050], // multiple of 1 up to 100: sum of natural numbers 1 to 100
    [7, 21, 42], // multiple of 7 up to 21: 7 + 14 + 21 = 42
  ])(
    'should return the correct sum when provided multiple = %d and max = %d',
    (multiple, max, expectedSum) => {
      expect(sumOfMultiples(multiple, max)).toBe(expectedSum)
    },
  )
})
