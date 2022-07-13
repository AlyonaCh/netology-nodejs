#!/usr/bin/env node

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: "intager"
    })
    .option('month', {
        alias: 'm',
        type: "intager"
    })
    .option('date', {
        alias: 'd',
        type: "intager"
    })
    .argv
let date = new Date()

if (argv['y'] && argv['y'] > 0) {
    let year = Number(date.getFullYear())
    date.setFullYear(year + argv['y'])
} else if (argv['m'] && argv['m'] > 0) {
    let month = Number(date.getMonth())
    date.setMonth(month + argv['m'])
} else if (argv['d'] && argv['d'] > 0) {
    let day = Number(date.getDate())
    date.setDate(day + argv['d'])
} 
console.log(date)