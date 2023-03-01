// Find the number of times each team won the toss and also won the match

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function main() {

    let wonMatchAndTossCount = {};

    let matchFilePath = './../../data/matches.csv';
    let targetFilePath = './../../public/output/5-number-of-times-each-team-won-toss-and-also-won-the-match.json';

    fs.createReadStream(path.join(__dirname, matchFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            })).on('data', function (matchData) {
                if (matchData.toss_winner == matchData.winner && wonMatchAndTossCount[matchData.winner] == undefined) {
                    wonMatchAndTossCount[matchData.winner] = 1;
                } else if (matchData.toss_winner == matchData.winner && wonMatchAndTossCount[matchData.winner] != undefined) {
                    wonMatchAndTossCount[matchData.winner] += 1;
                }
            }).on('end', function () {
                fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(wonMatchAndTossCount), function (error) {
                    if (error) {
                        console.log(error);
                    }
                })
            })
}

main();