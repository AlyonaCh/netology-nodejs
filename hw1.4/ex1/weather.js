#!/usr/bin/env node

const http = require("http")
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const defaultCity = require('./config.js')

const rl = readline.createInterface({ input, output });

const myAPIkey = process.env.myAPIkey


rl.question('Введите город: ', city => {
    if (!city) {
        city = defaultCity.city
    }
    url =`http://api.weatherstack.com/current?access_key=${myAPIkey}&query=${city}`
    http.get(url, (res) => {
        const {statusCode} = res
        if (statusCode !== 200){
            console.log(`statusCode: ${statusCode}`)
            return
        }
    
        res.setEncoding('utf8')
        let rowData = ''
        res.on('data', (chunk) => rowData += chunk)
        res.on('end', () => {
            let parseData = JSON.parse(rowData)
            console.log(parseData)
        })
    }).on('error', (err) => {
        console.error(err)
    })
    rl.close()
    
    
})
