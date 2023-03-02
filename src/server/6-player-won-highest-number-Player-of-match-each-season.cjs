// Find a player who has won the highest number of Player of the Match awards for each season
// player_of_match

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function main() {

    let matches = [];
    let playerOfMatch = {};
    let highestPlayerOfMatch = {};

    let matchFilePath = './../../data/matches.csv';
    let targetFilePath = './../../public/output/6-player-won-highest-number-Player-of-match-each-season.json';

    fs.createReadStream(path.join(__dirname, matchFilePath))
        .pipe(
            parse({
                columns: true, dslimiter: ','
            })).on('data', function (matchData) {
                matches.push(matchData);
            }).on('end', function () {

                matches.map((element, index, array) => {
                    if (playerOfMatch[element.season] == undefined) {
                        playerOfMatch[element.season] = { [element.player_of_match]: 1 };
                    } else if (playerOfMatch[element.season] != undefined) {
                        if (playerOfMatch[element.season][element.player_of_match] == undefined) {
                            playerOfMatch[element.season][element.player_of_match] = 1;
                        } else {
                            playerOfMatch[element.season][element.player_of_match] += 1;
                        }
                    }
                })

                let tempArray = [];

                tempArray = (Object.entries(playerOfMatch)
                    .map((info) => Object.entries(info[1]))
                    .map((player) => player.sort((a, b) => b[1] - a[1]))
                    .map((data) => data[0]));
                let year = 2008;
                tempArray.map((arrayElement) => {
                    highestPlayerOfMatch[year] = arrayElement;
                    year++;
                })

                fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(highestPlayerOfMatch), function (error) {
                    if (error) {
                        console.log(error);
                    }
                })
            })
}

main();





