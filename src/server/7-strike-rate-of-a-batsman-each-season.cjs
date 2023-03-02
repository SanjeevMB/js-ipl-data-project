// Find the strike rate of a batsman for each season

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');


function main(Batsman) {

    let matches = [];
    let deliveryData = [];
    let seasonId = {};
    let batterStrike = {};

    let matchFilePath = './../../data/matches.csv';
    let deliveryFilePath = './../../data/deliveries.csv';
    let targetFilePath = './../../public/output/7-strike-rate-of-a-batsman-each-season.json';


    fs.createReadStream(path.join(__dirname, matchFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            })).on('data', (data) => {
                matches.push(data);
            }).on('end', () => {
                fs.createReadStream(path.join(__dirname, deliveryFilePath))
                    .pipe(
                        parse({
                            columns: true, delimiter: ','
                        })).on('data', (data) => {
                            deliveryData.push(data);
                        }).on('end', () => {
                            matches.map((element, index, array) => seasonId[element.id] = element.season);
                            deliveryData.map((element, index, array) => {
                                if (seasonId.hasOwnProperty(element.match_id) && element.batsman == Batsman) {
                                    if (batterStrike[seasonId[element.match_id]]) {
                                        if (element.wide_runs == 0) {
                                            batterStrike[seasonId[element.match_id]].balls++;
                                        }
                                        batterStrike[seasonId[element.match_id]].runs += parseInt(element.batsman_runs);
                                    }
                                    else {
                                        let ball = 0;
                                        if (element.wide_runs == 0) {

                                            ball = 1;
                                        }
                                        batterStrike[seasonId[element.match_id]] = { balls: ball, runs: parseInt(element.batsman_runs) };
                                    }

                                }

                            })
                            Object.entries(batterStrike).map((element, index, array) => {
                                let strikeRate = ((parseInt(element[1].runs) / parseInt(element[1].balls)) * 100);
                                element[1]["Strike_rate"] = strikeRate;
                            })

                            fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(batterStrike), function (error) {
                                if (error) {
                                    console.log(error);
                                }
                            })
                            console.log(batterStrike);
                        })

            })

}

main('DA Warner')
