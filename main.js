#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
class BankAccount {
    balance;
    transactionHistory;
    name;
    age;
    gender;
    constructor(name, age, gender) {
        this.balance = 0;
        this.transactionHistory = [];
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactionHistory.push(chalk.bold.yellow(`Deposited ${amount}`));
            console.log(chalk.bold.italic.green(`Deposited ${amount} successfully.`));
        }
        else {
            console.log(chalk.bold.italic.red('Invalid amount. Please enter a positive number.'));
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push(chalk.bold.yellow(`Withdrawn ${amount}`));
            console.log(chalk.bold.italic.green(`Withdrawn ${amount} successfully.`));
        }
        else {
            console.log(chalk.bold.italic.red('Insufficient funds or invalid amount.'));
        }
    }
    updateAccountInfo(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        console.log(chalk.bold.italic.green('Account information updated successfully.'));
    }
    viewAccountInfo() {
        console.log(chalk.bold.italic.cyan(`Name: ${this.name}`));
        console.log(chalk.bold.italic.cyan(`Age: ${this.age}`));
        console.log(chalk.bold.italic.cyan(`Gender: ${this.gender}`));
        console.log(chalk.bold.italic.cyan(`Balance: ${this.balance}`));
    }
    checkBalance() {
        console.log(chalk.bold.italic.green(`Your balance is: ${this.balance}`));
    }
    getTransactionHistory() {
        console.log(chalk.bold.italic.green("Transaction History:"));
        this.transactionHistory.forEach(transaction => console.log(transaction));
    }
}
async function startBankManagement() {
    console.log(chalk.bold.yellow.underline("\n\t\t\tWelcome to the OOP Bank Management!\n"));
    const { name, age, gender } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: chalk.italic.bold.magenta('Enter your name:')
        },
        {
            type: 'number',
            name: 'age',
            message: chalk.italic.bold.magenta('Enter your age:')
        },
        {
            type: 'list',
            name: 'gender',
            message: chalk.italic.bold.magenta('Select your gender:'),
            choices: ['Male', 'Female', 'Other']
        }
    ]);
    const bankAccount = new BankAccount(name, age, gender);
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: chalk.italic.bold.magenta('What would you like to do?'),
            choices: ['Deposit', 'Withdraw', 'Update Account Information', 'View Account Information', 'Check Balance', 'View Transaction History', 'Exit']
        });
        switch (action) {
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt({
                    type: 'number',
                    name: 'depositAmount',
                    message: chalk.italic.bold.magenta('Enter the amount to deposit:')
                });
                bankAccount.deposit(depositAmount);
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt({
                    type: 'number',
                    name: 'withdrawAmount',
                    message: chalk.italic.bold.magenta('Enter the amount to withdraw:')
                });
                bankAccount.withdraw(withdrawAmount);
                break;
            case 'Update Account Information':
                const { newName, newAge, newGender } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newName',
                        message: chalk.italic.bold.magenta('Enter your new name:')
                    },
                    {
                        type: 'number',
                        name: 'newAge',
                        message: chalk.italic.bold.magenta('Enter your new age:')
                    },
                    {
                        type: 'list',
                        name: 'newGender',
                        message: chalk.italic.bold.magenta('Select your new gender:'),
                        choices: ['Male', 'Female', 'Other']
                    }
                ]);
                bankAccount.updateAccountInfo(newName, newAge, newGender);
                break;
            case 'View Account Information':
                bankAccount.viewAccountInfo();
                break;
            case 'Check Balance':
                bankAccount.checkBalance();
                break;
            case 'View Transaction History':
                bankAccount.getTransactionHistory();
                break;
            case 'Exit':
                console.log(chalk.bold.red.underline('Goodbye!'));
                return;
        }
    }
}
startBankManagement();
