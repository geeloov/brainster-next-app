# brainster-next-typescript

Before diving into the exercises, please read the instructions below on how to install the necessary dependencies required to run the tests and code style checks on your code.

## Installation

Before running linting and testing commands, make sure to install project dependencies. Execute the following command in the root directory of the project:

```bash
npm install
```

## Code Formatting

Code formatting ensures consistent code style and formatting. To run the formatting process, execute the following command in the root directory of the project:

```bash
npm run format
```

## Linting

Linting ensures that the TypeScript code adheres to coding standards and best practices. To run the linting process, execute the following command in the root directory of the project:

```bash
npm run lint
```

## Testing

Testing verifies the correctness of the exercises by running test cases. To initiate the testing process, execute the following command in the root directory of the project:

```bash
npm run test
```

During development, it will be handy to run the tests one by one instead of running the tests for all of the exercises at once. It's a good trade-off for more coding time rather than waiting for the tests to pass.

```bash
npm run test -- -t "Exercise 01: Sum of multiples"
```

Valid values for the `-t` argument are the strings that can be found at the beginning of each `index.test.ts` file in the `describe` function.

# Note on Un-Solved Exercises

If you choose not to work on specific exercises or decide to skip them, it is recommended to remove the un-solved exercises from the src directory. This practice helps maintain a focused and organized codebase, making it easier to review and manage your completed work.

Feel free to explore and experiment with the exercises, and don't hesitate to reach out if you have any questions or need assistance.

### Happy coding! 🍻
