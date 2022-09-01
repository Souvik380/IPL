const path=require('path')
const fs=require('fs')

// Question-1
const matchPerYear=(matches)=>{
    let obj={}
    matches.map((match)=>{
        let year=match.season
        if(obj.hasOwnProperty(year)){
            obj[year]+=1
        }else{
            obj[year]=1
        }
    })

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_1.json',data)
}

//Question-2
const matchWonPerYear=(matches)=>{
    let obj={}
    matches.map((match)=>{
        let winner=match.winner
        let team1=match.team1
        let team2=match.team2
        let year=match.season

        function helper(year,wins,looses){
            if(!obj.hasOwnProperty(year)){
                obj[year]={}
            }

            if(!obj[year].hasOwnProperty(wins)){
                obj[year][wins]=0
            }
            
            if(!obj[year].hasOwnProperty(looses)){
                obj[year][looses]=0
            }

            obj[year][wins]+=1
        }

        team1===winner?helper(year,team1,team2):helper(year,team2,team1)
    
    })

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_2.json',data)
}

//Question-3
const extraRuns2016=(matches,deliveries)=>{
    let obj={}
    const ids=[]

    function helper(match){
        if(parseInt(match.season)===2016){
            ids.push(match.id)
        }
    }
    
    function helper2(bowling_team,runs){
        if(!obj.hasOwnProperty(bowling_team)){
            obj[bowling_team]=0
        }
        obj[bowling_team]+=parseInt(runs)
    }

    matches.map((match)=>{
        helper(match)
    })

    deliveries.map((delivery)=>{
        ids.map((id)=>{
            if(delivery.match_id===id){
                helper2(delivery.bowling_team,delivery.extra_runs)
            }
        })
    })

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_3.json',data)
}

//Question-5
const toss_and_match=(matches)=>{
    let obj={}

    matches.map((match)=>{
        let toss_win=match.toss_winner
        let match_win=match.winner
        let team1=match.team1
        let team2=match.team2

        function helper(wins,looses){
            if(!obj.hasOwnProperty(wins)){
                obj[wins]=0
            }

            if(!obj.hasOwnProperty(looses)){
                obj[looses]=0
            }

            obj[wins]+=1
        }

        if(toss_win===match_win){
            team1===toss_win?helper(team1,team2):helper(team2,team1)
        }
    })

    let data=JSON.stringify(obj,null,2)
    fs.writeFileSync('../public/output/QUESTION_5.json',data)
}

//Question-6
const playerOfTheMatch=(matches)=>{
    let obj={}
    let ans={}

    function helper(temp_obj){
        let max=-1
        let player_of_match

        for(player in temp_obj){
            if(max<temp_obj[player]){
                max=temp_obj[player]
                player_of_match=player
            }
        }

        return player_of_match
    }

    matches.map((match)=>{

        let year=match.season
        let player=match.player_of_match

        if(!obj.hasOwnProperty(year)){
            obj[year]={}
        }

        if(!obj[year].hasOwnProperty(player)){
            obj[year][player]=0
        }

        obj[year][player]+=1

    })

    for(year in obj){
        ans[year]=helper(obj[year])
    }

    let data=JSON.stringify(ans,null,2)
    fs.writeFileSync('../public/output/QUESTION_6.json',data)
}

//Question-7
const StrikeRate=(matches,deliveries)=>{
    let id_season={}
    let obj={}
    let ans={}

    function helper(temp_obj){
        let ans2={}

        for(man in temp_obj){
            ans2[man]=temp_obj[man].rate
        }
        
        return ans2
    }

    matches.map((match)=>{
        id_season[match.id]=match.season
    })

    deliveries.map((delivery)=>{
        let year=id_season[delivery.match_id]
        let batsman=delivery.batsman

        if(!obj.hasOwnProperty(year)){
            obj[year]={}
        }

        if(!obj[year].hasOwnProperty(batsman)){
            obj[year][batsman]={}
            obj[year][batsman].runs=0
            obj[year][batsman].balls=0
            obj[year][batsman].rate=0.0
        }

        obj[year][batsman].runs+=delivery.total_runs
        obj[year][batsman].balls+=1
        obj[year][batsman].rate=(parseFloat(obj[year][batsman].runs/obj[year][batsman].balls)*100 ).toPrecision(2)
    })

    for(year in obj){
        ans[year]=helper(obj[year])
    }

    let data=JSON.stringify(ans,null,2)
    fs.writeFileSync('../public/output/QUESTION_7.json',data)
}

//Question-8
const dismissal=(deliveries)=>{
    let obj={}
    let max=-1
    let players=""

    deliveries.map((delivery)=>{
        let str=delivery.batsman+'*'+delivery.bowler
        if(!obj.hasOwnProperty(str)){
            obj[str]=0
        }

        obj[str]+=1

        if(max<obj[str]){
            max=obj[str]
            players=str
        }    
    })

    let batsman=players.split("*")[0]
    let bowler=players.split("*")[1]
    let ans=batsman+" dismissed by "+bowler+" for "+max+" number of times"

    let data=JSON.stringify(ans,null,2)
    fs.writeFileSync('../public/output/QUESTION_8.json',data)
}

//Question-9
const superEconomicBowler=(deliveries)=>{
    let obj={}

    deliveries.map((delivery)=>{
        if(delivery.is_super_over!==0){
            let bowler=delivery.bowler
            let runs=delivery.total_runs

            if(!obj.hasOwnProperty(bowler)){
                obj[bowler]={"runs":runs,"balls":1}
            }else{
                const bowled=obj[bowler].balls<=6?obj[bowler].balls+1:obj[bowler].balls
                const overCalc = (Math.floor(bowled / 6))
                const economy = (runs / (overCalc + (((bowled - (overCalc * 6)) / 10)))).toFixed(1)

                obj[bowler]={"runs":runs,"balls":bowled,"ecomomy":economy}
            }
        }
    })

    let min=Number.POSITIVE_INFINITY
    let ultimate_bowler=""

    for(let bowler in obj){
        if(min>obj[bowler].ecomomy){
            min=obj[bowler].ecomomy
            ultimate_bowler=bowler
        }
    }

    let data=JSON.stringify(ultimate_bowler,null,2)
    fs.writeFileSync('../public/output/QUESTION_9.json',data)

}

module.exports={
    matchPerYear,
    matchWonPerYear,
    extraRuns2016,
    toss_and_match,
    playerOfTheMatch,
    StrikeRate,
    dismissal,
    superEconomicBowler
}




