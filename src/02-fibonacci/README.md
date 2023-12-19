# Exercise 02: Fibonacci sequence

Write a TypeScript function fibonacci that generates the Fibonacci sequence up to the nth term.
The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.

Ensure that the function is typesafe by specifying that the n parameter should only accept numeric values. Attempting to call the function with non-numeric values should result in a TypeScript compilation error. The function should return an array of numbers representing the Fibonacci sequence.

Example 1:

    Input: n = 0
    Output: []

Example 2:

    Input: n = 1
    Output: [0]

Example 3:

    Input: n = 3
    Output: [0, 1, 1]
