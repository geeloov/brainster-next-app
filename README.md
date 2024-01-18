This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Endpoints

- Get all Surveys
- Get a Survey
- Create Survey
- Update Survey
- Create Survey Question
- Update Survey Question
- Delete Survey Question

- Participate in a Survey

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
