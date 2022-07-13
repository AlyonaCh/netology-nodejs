#!/usr/bin/env node

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y'
    })
    .option('month', {
        alias: 'm'
    })
    .option('date', {
        alias: 'd'
    })
    .argv
let date = new Date()
console.log(argv)
if (argv['y']) {
    console.log(date.getFullYear())
} else if (argv['m']) {
    let month = Number(date.getMonth())
    console.log(++month)
} else if (argv['d']) {
    console.log(date.getDate())
} else {
    console.log(date)
}