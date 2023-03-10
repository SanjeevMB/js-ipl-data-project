// Number of matches played per year for all the years in IPL.

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');


function main() {

    let matches = {};
    
    let matchFilePath = './../data/matches.csv';
    let targetFilePath = './../public/output/1-matches-per-year.json';

    fs.createReadStream(path.join(__dirname, matchFilePath))
        .pipe(
            parse({
                columns: true, delimiter: ','
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
}

main();