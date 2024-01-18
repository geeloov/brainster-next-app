import { fibonacci } from '.'

describe('Exercise 02: Fibonacci sequence', () => {
  it.each([
    [0, []], // Fibonacci sequence up to 0th term: []
    [1, [0]], // Fibonacci sequence up to 1st term: [0]
    [2, [0, 1]], // Fibonacci sequence up to 2nd term: [0, 1]
    [5, [0, 1, 1, 2, 3]], // Fibonacci sequence up to 5th term
    [8, [0, 1, 1, 2, 3, 5, 8, 13]], // Fibonacci sequence up to 8th term
    [10, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]], // Fibonacci sequence up to 10th term
  ])('should generate the correct Fibonacci sequence up to %d terms', (n, expectedSequence) => {
    expect(fibonacci(n)).toEqual(expectedSequence)
  })
})
