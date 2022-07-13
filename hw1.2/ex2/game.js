#!/usr/bin/env node
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');


const myNumber = Math.floor(Math.random() * 101)
const rl = readline.createInterface({ input, output });

const check = () => {
        rl.question('Введите число от 0 до 10: ', answer => {
            if (answer == myNumber) {
                console.log(`Отгадано число: ${answer}`)
                rl.close()
            } else if (answer > myNumber) {
                console.log(`Больше`)
                check()
            } else if (answer < myNumber) {
                console.log(`Меньше`)
                check()
            }
            
        })
}

check()


