// Number of matches won per.team per year in IPL.

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function main() {

    let matchWon = [];

    let dataFilePath = './../data/matches.csv';
    let writeFilePath = './../public/output/2-matches-won-per-team-per-year.json';

    fs.createReadStream(path.join(__dirname, dataFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            })).on('data', function (dataRow) {
                let tempObj = {};

                if (matchWon.length === 0) {
                    tempObj.team = dataRow.winner;
                    tempObj[dataRow.season] = 1;
                    matchWon.push(tempObj);
                }

                if (matchWon.some((item) => item.team === dataRow.winner)) {
                    matchWon.map((element, index, array) => {
                        if (element.team === dataRow.winner && element[dataRow.season] === undefined) {
                            element[dataRow.season] = 1;
                        } else if (element.team === dataRow.winner && element[dataRow.season] !== undefined) {
                            element[dataRow.season] += 1;
                        }
                    })
                } else {
                    tempObj.team = dataRow.winner;
                    tempObj[dataRow.season] = 1;
                    matchWon.push(tempObj);
                }
            }).on('end', function () {
                fs.writeFile(path.join(__dirname, writeFilePath), JSON.stringify(matchWon), function (error) {
                    if (error) {
                        console.log(error);
                    }
                })
            })
}

main();