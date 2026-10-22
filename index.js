import { randomInt } from 'crypto';
import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs';

let gameLog = '';
function logAndPrint(message, rawMessage = message) {
    console.log(message);
    gameLog += rawMessage + '\n';
}

logAndPrint(chalk.magenta.bold('GUESS THE NUMBER!'));
logAndPrint(chalk.cyan('----------------------------------------'));
logAndPrint(chalk.white('Guess a number between 1 and 10.'));
logAndPrint(chalk.yellow('You have 3 attempts!\n'));

const secretNum = randomInt(1, 11);
const maxAttempts = 3;
let hasWon = false;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
        const response = await prompts({
            type: 'text',
            name: 'guess',
            message: `Attempt ${attempt}/${maxAttempts}: Enter your guess`
        });

        const rawInput = response.guess;

        if (rawInput === undefined || rawInput.trim() === '') {
            throw new Error('A guess is required.');
        }

        const trimmedInput = rawInput.trim();

        if (!/^-?\d+$/.test(trimmedInput)) {
            throw newErrorf('Guess must be a valid integer.');
        }

        const guessVal = Number(trimmedInput);

        if (guessVal < 1) {
            throw new Error('Guess must be at least 1.');
        }

        if (guessVal > 10) {
            throw new Error('Guess cannot exceed 10.');
        }

        if (guessVal === secretNum) {
            logAndPrint(chalk.green(`\n🎉 Correct! You guessed the secret number!`));
            hasWon = true;
            break;
        } else if (guessVal < secretNum) {
            logAndPrint(chalk.yellow('Too low!\n'));
        } else {
            logAndPrint(chalk.yellow('Too high!\n'));
        }

    } catch (error) {
        logAndPrint(chalk.red(`${error.message}\n`));
    }
}

if (!hasWon) {
    logAndPrint(chalk.red.bold('GAME OVER!'));
    logAndPrint(chalk.white(`The secret number was ${secretNum}.\n`));
}

logAndPrint(chalk.magenta('Thanks for playing!'));
fs.writeFileSync('game-output.txt', gameLog);