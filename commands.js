#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import { addCar, findCar, removeCar, updateCar, initializeCars } from './index.js';

const program = new Command();


//Car questions
const questions = [
    {
        name: 'make',
        type: 'input',
        message: 'Car Make'
    },
    {
        name: 'model',
        type: 'input',
        message: 'Car Model'
    },
    {
        name: 'year',
        type: 'input',
        message: 'Car Year'
    }
];

program
    .version('1.0.0')
    .description('Car Management System');

program
    .command('add')
    .alias('a')
    .description('Add a car')
    .action(() => {
        inquirer.prompt(questions).then(answers => addCar(answers));
    });

program
    .command('find <name>')
    .alias('f')
    .description('Find a car')
    .action((name) => findCar(name));

program
    .command('update <_id>')
    .alias('u')
    .description('Update a cars info')
    .action((_id) => {
        inquirer.prompt(questions).then(answers => updateCar(_id, answers));
    });

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a car')
    .action(_id => {
        removeCar(_id);
    });

program
    .command('init')
    .description('Inisialized a database of Cars')
    .action(() => {
        initializeCars();
    });

program.parse(process.argv);