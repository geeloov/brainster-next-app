import { extractEmails } from '.'

describe('Exercise 03: Email extractor', () => {
  it.each([
    ['Empty array', [], []],
    [
      'Single user',
      [{ id: 1, name: 'John', email: 'john@example.com', age: 25 }],
      ['john@example.com'],
    ],
    [
      'Multiple users with unique emails',
      [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 28 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
      ],
      ['alice@example.com', 'bob@example.com', 'charlie@example.com'],
    ],
    [
      'Multiple users with some duplicate emails',
      [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 28 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
        { id: 4, name: 'David', email: 'alice@example.com', age: 40 },
      ],
      ['alice@example.com', 'bob@example.com', 'charlie@example.com'],
    ],
    [
      'Array with null values',
      [
        { id: 1, name: 'John', email: 'john@example.com', age: 25 },
        null,
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
      ],
      ['john@example.com', 'charlie@example.com'],
    ],
    [
      'Array with undefined values',
      [
        { id: 1, name: 'John', email: 'john@example.com', age: 25 },
        undefined,
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
      ],
      ['john@example.com', 'charlie@example.com'],
    ],
  ])('should extract emails correctly when provided: %s', (_, users, expectedEmails) => {
    expect(extractEmails(users as any)).toEqual(expectedEmails)
  })
})
