// Find the bowler with the best economy in super overs

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');


function main() {

    let delivery = [];
    let superOver = {};

    let deliveryFilePath = './../../data/deliveries.csv';
    let targetFilePath = './../../public/output/9-bowler-with-best-economy-in-super-overs.json';

    fs.createReadStream(path.join(__dirname, deliveryFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            }))
        .on('data', (deliveryData) => {
            delivery.push(deliveryData);
        }).on('end', function () {
            delivery.map((element, index, array) => {
                if (element.is_super_over == 1) {
                    if (superOver[element.bowler]) {
                        if (element.wide_runs == 0 && element.noball_runs == 0) {
                            superOver[element.bowler].numberOfBalls++;
                            superOver[element.bowler].runsScored += parseInt(element.batsman_runs) + parseInt(element.extra_runs);
                        }
                        else if (element.wide_runs == 1 && element.noball_runs == 0) {
                            superOver[element.bowler].runsScored += parseInt(element.batsman_runs) + parseInt(element.extra_runs);
                        }
                        else if (element.wide_runs == 0 && element.noball_runs == 1) {
                            superOver[element.bowler].runsScored += parseInt(element.batsman_runs) + parseInt(element.extra_runs);
                        }
                    } else {
                        if (element.wide_runs == 0 && element.noball_runs == 0 && element.legbye_runs == 0 && element.legbye_runs == 0) {
                            superOver[element.bowler] = { numberOfBalls: 1, runsScored: parseInt(element.batsman_runs) + parseInt(element.extra_runs) };
                        }
                        else if (element.wide_runs == 0 && element.noball_runs == 0 && element.extra_runs !== 0) {
                            superOver[element.bowler] = { numberOfBalls: 1, runsScored: 0 };
                        }
                    }
                }
            })

            let bestEconomy = {};

            Object.entries(superOver).map((element, index, array) => {
                bestEconomy[element[0]] = (parseInt(element[1].runsScored) / parseInt(element[1].numberOfBalls)) * 6;
            })

            let bestEconomicalBowler = {};

            bestEconomicalBowler.bestEconomySuperOverbowler = (Object.entries(bestEconomy).sort((bowler1, bowler2) => bowler1[1] - bowler2[1])[0]);

            fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(bestEconomicalBowler), function (error) {
                if (error) {
                    console.log(error);
                }
            })
        })
    }

main();