import { getPascalsTriangleRow } from '.'

describe("Exercise 04: Pascal's Triangle", () => {
  it.each([
    [0, [1]],
    [1, [1, 1]],
    [2, [1, 2, 1]],
    [3, [1, 3, 3, 1]],
    [4, [1, 4, 6, 4, 1]],
    [5, [1, 5, 10, 10, 5, 1]],
  ])('should return the correct row for rowIndex: %p', (rowIndex, expected) => {
    const result = getPascalsTriangleRow(rowIndex)
    expect(result).toEqual(expected)
  })
})
