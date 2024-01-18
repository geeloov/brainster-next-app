# Exercise 03: Email extractor

The problem we are trying to solve with the `extractEmails` function is to extract a specific property value from a list of objects. In this case, the function should be designed to take an array of user objects and extract their email addresses.

Example:

    const users = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
    ]
    const emails = extractEmails(users)
    console.log(emails); // ["alice@example.com", "bob@example.com", "charlie@example.com"]
