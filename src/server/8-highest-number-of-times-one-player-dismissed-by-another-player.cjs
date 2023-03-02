// Find the highest number of times one player has been dismissed by another player

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function main(batsman) {

    let playerDismissed = {};

    let deliveryFilePath = './../../data/deliveries.csv';
    let targetFilePath = './../../public/output/8-highest-number-of-times-one-player-dismissed-by-another-player.json';

    fs.createReadStream(path.join(__dirname, deliveryFilePath))
    .pipe(
        parse({
            columns: true, dslimiter: ','
        })).on('data', function(matchData) {
            if (matchData.player_dismissed != "" && matchData.batsman == batsman) {
                if (playerDismissed[matchData.player_dismissed] === undefined) {
                    playerDismissed[matchData.player_dismissed] = {};
                    playerDismissed[matchData.player_dismissed][matchData.bowler] = 1;
                } else {

                    if (playerDismissed[matchData.player_dismissed].hasOwnProperty(matchData.bowler)) {
                        playerDismissed[matchData.player_dismissed][matchData.bowler] = playerDismissed[matchData.player_dismissed][matchData.bowler] + 1;
                    } else {
                        playerDismissed[matchData.player_dismissed][matchData.bowler] = 1;
                    }
                }
            }
        })
        .on("end", () => {
            let bowlerDissmiss = [];
            let bowler = [];
            Object.entries(playerDismissed).map((playerInfo) => bowlerDissmiss.push(playerInfo));
            bowler = (Object.entries(bowlerDissmiss[0][1]).sort((a, b) => a[1] - b[1]).reverse()[0]);
            let requiredObj = {};
            requiredObj[batsman] = bowler;

            fs.writeFile(path.join(__dirname, targetFilePath), JSON.stringify(bowler), function (error) {
                if (error) {
                    console.log(error);
                }
            })
            console.log(bowler);
        })
}

main("DA Warner");