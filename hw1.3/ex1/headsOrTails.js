#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const  myNumber = Math.round( Math.random() * (2 - 1) + 1 )
console.log(myNumber)

const rl = readline.createInterface({ input, output });
const re = /\n/;
const check = () => {
        rl.question('Введите путь к файлу: ', pathUser => {
            const answerFile = path.join(__dirname, pathUser)
            let answer = ''
            fs.readFile(answerFile , 'utf-8', (err, data) => {
                if (err) throw Error(err)
                answer = data.split(re).pop()
                if (answer == myNumber) {
                    const result = `\nОтгадано число: ${myNumber}`
                    fs.appendFile(answerFile, result, (err) => {
                        if (err) throw Error(err)
                    })
                    console.log(result)
                    rl.close()
                } else {
                    const result = `\nВы не угадали число: ${myNumber}`
                    fs.appendFile(answerFile, result, (err) => {
                        if (err) throw Error(err)
                    })
                    console.log(result)
                    rl.close()
                } 
            })
            console.log(answer)
            
            
        })
}

check()

