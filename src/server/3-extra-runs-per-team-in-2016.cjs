// Extra runs conceded per team in the year 2016

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function main() {
    
    let matches = [];
    let extraRunsStore = {};

    let matchFilePath = './../data/matches.csv';
    let deliveryFilePath = './../data/deliveries.csv';
    let targetFilePath = './../public/output/3-extra-runs-per-team-in-2016.json';

    fs.createReadStream(path.join(__dirname, matchFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            })).on('data', function (matchData) {
                if (matchData.season == 2016) {
                    matches.push(matchData);
                }
            }).on('end', function () {
                fs.createReadStream(path.join(__dirname, deliveryFilePath))
                    .pipe(parse({
                        columns: true, delimiter: ','
                    })).on('data', function (deliveryData) {
                        if (matches.some((item) => item.id == deliveryData.match_id)) {
                            if (extraRunsStore[deliveryData.bowling_team] == undefined) {
                                extraRunsStore[deliveryData.bowling_team] = +(deliveryData.extra_runs);
                            } else if (extraRunsStore[deliveryData.bowling_team] != undefined) {
                                extraRunsStore[deliveryData.bowling_team] += +(deliveryData.extra_runs);
                            }
                        }
                    }).on('end', function () {
                        fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(extraRunsStore), function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })
                    })
            })
}

main();