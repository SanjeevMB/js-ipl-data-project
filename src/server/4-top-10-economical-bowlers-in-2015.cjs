// Top 10 economical bowlers in the year 2015
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function main() {

    let matches = [];
    let bowlersEconomyStore = [];
    let bowlersRecord = {};

    let matchFilePath = './../../data/matches.csv';
    let deliveryFilePath = './../../data/deliveries.csv';
    let targetFilePath = './../../public/output/4-top-10-economical-bowlers-in-2015.json';

    fs.createReadStream(path.join(__dirname, matchFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            })).on('data', function (matchData) {
                if (matchData.season == 2015) {
                    matches.push(matchData);
                }
            }).on('end', function () {
                fs.createReadStream(path.join(__dirname, deliveryFilePath))
                    .pipe(parse({
                        columns: true, delimiter: ','
                    })).on('data', function (deliveryData) {
                        if (matches.some((item) => deliveryData.match_id == item.id && bowlersRecord[deliveryData.bowler] == undefined)) {
                            bowlersRecord[deliveryData.bowler] = { ball: +deliveryData.ball, runs: +deliveryData.total_runs };
                        }else if(matches.some((item) => deliveryData.match_id == item.id && bowlersRecord[deliveryData.bowler] != undefined)){
                            bowlersRecord[deliveryData.bowler].ball += +deliveryData.ball;
                            bowlersRecord[deliveryData.bowler].runs += +deliveryData.total_runs;
                            bowlersRecord[deliveryData.bowler].economy = (bowlersRecord[deliveryData.bowler].runs)/((bowlersRecord[deliveryData.bowler].ball)/6);
                        }
                    }).on('end', function () {
                        for(let bowler in bowlersRecord){
                            bowlersEconomyStore.push([bowler, bowlersRecord[bowler].economy]);
                        }
                        let topTen = bowlersEconomyStore.sort((element1, element2) => element1[1]-element2[1]).slice(0, 10);
                        fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(topTen), function (error) {
                            if (error) {
                                console.log(error);
                            }
                        })
                        console.log(topTen);
                    })
            })
}

main();