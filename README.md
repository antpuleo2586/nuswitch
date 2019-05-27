# uswitch-antonio-puleo

## Installation

You can run `npm install` if you want to install the Javascript dependencies for this project.

## Test

Run `npm run test`, after installation, to run the test suite.

## Run

To run the program, type `./bin/comparison /path/to/plans.json < inputs` at the command line.

## Notes

I actually enjoyed this exercise! I've never had to convert a program to an executable that takes in params via the command line so it was a good learning exercise.

I approached this in a completely test-driven way, writing the test cases first, according to the expected output, adding the functionality to pass the tests then refactoring.

The program works as expected and I created the executable, as required.

There are a couple of ways I could improve the program: 
- better validating the user input and json data, possibly via models that provide some self-validation or some controller that validates input before it reaches the models
- make use of the command pattern for executing the commands `price`, `usage` and `exit`

I felt these were outside the scope of this simple program, however.

# nuswitch
