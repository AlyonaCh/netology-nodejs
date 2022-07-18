#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const re = /\n/;
let count = 0
let win = 0
let lose = 0
const check = () => {
        rl.question('Введите путь к файлу: ', pathUser => {
            const answerFile = path.join(__dirname, pathUser)
            fs.readFile(answerFile , 'utf-8', (err, data) => {
                if (err) throw Error(err)
                data = data.split(re)
                
                data.forEach(element => {
                    if (element.includes('Отгадано число')) {
                        win++
                        count++
                    } else if (element.includes('Вы не угадали число')) {
                        lose++
                        count++
                    }
                });
                console.log(`
                    Количество партий: ${count}\n
                    Количество побед: ${win}\n
                    Количество проигрышей: ${lose}\n
                    Процент выигрышей: ${Math.round(win / count * 100)} %\n
                `)
                rl.close()
            })
            
        })
        
}

check()

