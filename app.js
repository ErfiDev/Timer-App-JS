//DOM Selectors
const divContainer = document.querySelector(".ul-container");
const input = document.querySelector('input[name="dateS"]');
const ul = document.querySelector(".ul");
const btnClear = document.querySelector(".btn-clear");
const li = document.querySelectorAll(".results");
const section = document.getElementById("sec");
const p = document.querySelector(".alert-date-low");
const btnOk = document.querySelector(".okbtn");
const divCover = document.querySelector(".cover");


//Add EventListener
input.addEventListener("change" , changedDate);
btnClear.addEventListener("click" , clear);
btnOk.addEventListener("click" , okok);

//Add timer to Update Li
let timerUpdate;
let timerStop = true;

//Function
function changedDate()
{
    const value = new Date(input.value);
    startCorno(value);
}

function startCorno(d)
{   
    let seda = (changeToReal(d));

    if(seda.selected <= seda.currentParse)
    {
        divCover.classList.remove("display-off");
        input.value = "";
    }

    function updateLI()
    {
        let p = (changeToReal(d));
        for(let i in p)
        {
            const lis = ul.querySelector("." + i);
            if(lis)
            {
                lis.innerHTML = p[i];
            }
            if(p.selected <= p.currentParse)
            {
                clearInterval(timerUpdate);
                lis.textContent = "0";
            }
        }
    }

    timerUpdate = setInterval(updateLI,1000);
}

function changeToReal(p)
{
    const currentDate = new Date();
    const currentParse = Date.parse(currentDate);
    const selectDate = Date.parse(p);

    const tt = selectDate - currentParse;

    const seconds = Math.floor((tt / 1000) %60);
    const minutes = Math.floor(((tt / 1000) /60) %60);
    const hourse = Math.floor(((tt/ 1000) /60) %24);
    const days = Math.floor(((((tt / 1000) /60) /60) /24) %356);

    return {
        "seconds" : seconds ,
        "minutes" : minutes ,
        "hourse" : hourse ,
        "days" : days , 
        "currentParse": currentParse ,
        "selected" : selectDate
    };


}

function clear()
{
    li.forEach((item)=>{
        item.innerHTML = "0";
    });

    input.value = "";

    clearInterval(timerUpdate);
}

function okok()
{
    divCover.classList.add("display-off");

    input.value = "";

    clearInterval(timerUpdate);
}


window.addEventListener("resize" , ()=>{
    const width = window.innerWidth;
    if(width >= "560")
    {
        btnClear.style.cssText = `
            height: 10%;
        `;
    }
    else{
        btnClear.style.cssText = `
            height: 20%;
        `;
    }

    if(width >= "400")
    {
        btnClear.innerHTML = "Stop and Clear";
    }
    else{
        btnClear.innerHTML = "Clear";
    }
});