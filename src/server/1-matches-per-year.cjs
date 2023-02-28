const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

let matches = {};
let matchFilePath = './../../data/matches.csv';
let targetFilePath = './../../public/output/1-matches-per-year.json';

fs.createReadStream(path.join(__dirname, matchFilePath))
    .pipe(
        parse({
            columns: true, dslimiter: ','
        })).on('data', function (dataRow) {
            if (matches[dataRow.season] === undefined) {
                matches[dataRow.season] = 1;
            } else {
                matches[dataRow.season] += 1;
            }
        }).on('end', function () {
            fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(matches), function (error) {
                if (error) {
                    console.log(error);
                }
            })
        })