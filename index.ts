#! /usr/bin/env node

import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.hex("#FFC0CB")("\n\t\t\t\tWELCOME TO MY COUNTDOWNTIMER\n"));

function* countdownTimer(second:number) {
    while (second>0) {
        yield second;
        second--;
    }
};
const userAns = await inquirer.prompt({
    type : "number",
    name : "seconds",
    message : chalk.magentaBright("Enter the number of seconds to start the Countdown Timer:","\n")
});

//Counter Initialization
let timerIterator = countdownTimer(userAns.seconds);  

//Creating Timer
function displayCountdown(){
    let result = timerIterator.next();

    if(!result.done){
        const now = new Date();  
        const countdownTime = new Date(now.getTime() + (result.value * 1000));  //seconds ahead
        const remainingSeconds = differenceInSeconds(countdownTime,now);
        console.log(chalk.bold.greenBright(`Remaining Seconds: ${remainingSeconds}`));
        setTimeout(displayCountdown,1000);                                     //next call after one second
    }else{
        console.log(chalk.bold.yellowBright("\n\t\t\t\tCountdown Complete!"));
    };
};
displayCountdown();
