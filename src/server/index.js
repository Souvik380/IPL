const path=require('path')
const fs=require('fs')
const csv=require("csvtojson")
const ipl=require("./ipl")

const main=async()=>{
    await csv().fromFile("../data/matches.csv").then((matches)=>{
        csv().fromFile("../data/deliveries.csv").then((deliveries)=>{
            ipl.matchPerYear(matches)
            ipl.matchWonPerYear(matches)
            ipl.extraRuns2016(matches,deliveries)
            ipl.toss_and_match(matches)
            ipl.playerOfTheMatch(matches)
            ipl.StrikeRate(matches,deliveries)
            ipl.dismissal(deliveries)
            ipl.superEconomicBowler(deliveries)
        })
    })
}

main()







