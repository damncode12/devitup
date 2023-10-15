const timeDisplay= document.querySelector("#timeDisplay");
const startBtn= document.querySelector("#startBtn");
const pauseBtn= document.querySelector("#pauseBtn");
const resetBtn= document.querySelector("#resetBtn");

let starttime=0;
let elapsedtime=0;
let currenttime=0;
let paused=true;
let intervalid;
let hrs=0;
let mins=0;
let secs=0;

startBtn.addEventListener("click", ()=>{
    if(paused){
        paused=false;
        starttime=Date.now() - elapsedtime;
        intervalid=setInterval(updateTime, 75);
    }
});
pauseBtn.addEventListener("click",()=>{
    if(!paused){
        paused=true;
        elapsedtime=Date.now -starttime;
        clearInterval(intervalid);
    }
});
resetBtn.addEventListener("click",()=>{
    paused=true;
    clearInterval(intervalid);
    let starttime=0;
    let elapsedtime=0;
    let currenttime=0;
    let hrs=0;
    let mins=0;
    let secs=0;
    timeDisplay.textContent="00:00:00";
});

function updateTime(){
    elapsedtime=Date.now()-starttime;

    secs=Math.floor((elapsedtime/1000)%60);
    mins=Math.floor((elapsedtime/1000*60)%60);
    hrs=Math.floor((elapsedtime/1000*60*60)%60);

    secs= pad(secs);
    mins= pad(mins);
    hrs= pad(hrs);

    timeDisplay.textContent=`${hrs}:${mins}:${secs}`;

    function pad(unit){
        return (("0") +unit).length > 2 ? unit : "0" + unit;
    }
}