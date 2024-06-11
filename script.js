const inputslider=document.querySelector('[data-length-slider]');
const lengthdisplay=document.querySelector('[data-length-num]');

const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copybtn=document.querySelector('[data-copybtn]');
const copymsg=document.querySelector('[data-copyMsg]');
const uppercasecheck=document.querySelector('#uppercase');
const lowercasecheck=document.querySelector('#lowercase');
const numbercheck=document.querySelector('#numbers');
const symbolcheck=document.querySelector('#symbols');
const indicator=document.querySelector('[data-indicator]');
const generatebtn=document.querySelector('.generate-button');
const allcheckbox=document.querySelectorAll('input[type=checkbox]');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//initially
let password="";
let passwordlength=10;
let checkcount=0;
handleslider();
setIndicator("#ccc")

function handleslider(){
    inputslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ( (passwordlength - min)*100/(max - min)) + "% 100%"

}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomNum(){
    return getRandomInt(0,10);
}

function getlowercase(){
    return String.fromCharCode(getRandomInt(97,123))
}

function getuppercase(){
    return String.fromCharCode(getRandomInt(65,91))
}

function getsymbol(){
    const index=getRandomInt(0,symbols.length);
    return symbols.charAt(index);
}

function strengthcal(){
    let isupper=false;
    let islower=false;
    let isnumber=false;
    let issymbol=false;
    if(uppercasecheck.checked) isupper=true;
    if(lowercasecheck.checked) islower=true;
    if(numbercheck.checked) isnumber=true;
    if(symbolcheck.checked) issymbol=true;

    if (isupper && islower && (isnumber || issymbol) && passwordlength >= 8) {
        setIndicator("#0f0");
      } else if (
        (islower || isupper) &&
        (isnumber || issymbol) &&
        passwordlength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
};

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText="copied";
    }
    catch(err){
        copymsg.innerText="failed";
    }
    copymsg.classList.add("active");

    setTimeout(function(){
        copymsg.classList.remove("active");
    },2000);
}

inputslider.addEventListener('input', function(e){
    passwordlength=e.target.value;
    handleslider();
})

copybtn.addEventListener('click',function(e){
    if(passwordDisplay.value){
        copycontent();
    }
})

function handlecheckbox(){
    checkcount=0;
    for(let i=0;i<allcheckbox.length;i++){
        if(allcheckbox[i].checked){
            checkcount++;
        }
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}

for(let j=0;j<allcheckbox.length;j++){
    allcheckbox[j].addEventListener('change',handlecheckbox);
};

generatebtn.addEventListener('click', function(){
    if(checkcount==0){
        return;
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    console.log("Starting the Journey");
    password="";

    // if(uppercasecheck.checked){
    //     password+=getuppercase();
    // }

    // if(lowercasecheck.checked){
    //     password+=getlowercase();
    // }

    // if(numbercheck.checked){
    //     password+=getRandomNum();
    // }

    // if(symbolcheck.checked){
    //     password+=getsymbol();
    // }

    let funcarr=[];
    if(uppercasecheck.checked){
        funcarr.push(getuppercase);
    }
    if(lowercasecheck.checked){
        funcarr.push(getlowercase);
    }
    if(numbercheck.checked){
        funcarr.push(getRandomNum);
    }
    if(symbolcheck.checked){
        funcarr.push(getsymbol);
    }
    for(let x=0;x<funcarr.length;x++){
        password+=funcarr[x]();
    }
    console.log("COmpulsory adddition done");

    for(let i=0;i<passwordlength-funcarr.length;i++){
        let randindex=getRandomInt(0,funcarr.length);
        password+=funcarr[randindex](); 
    } 
    console.log("Remaining adddition done");
    //shuffle the password
    password=shufflepassword(password.split(''));
    console.log("Shuffling done");
    passwordDisplay.value=password;
    console.log("UI adddition done");
    strengthcal();
})

function shufflepassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
