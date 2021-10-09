const inputContainer = document.getElementById('input-container');
const countdownForm  = document.getElementById('countdownForm');
const dateEl  = document.getElementById('date-picker');

const countdownEl  = document.getElementById('countdown');
const countdownElTitle  = document.getElementById('countdown-title');
const countdownBtn  = document.getElementById('countdown-button');
const timesElments  = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Globel Variable
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive ;

const secound = 1000;
const minute = secound * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
    // const today =  new Date().toISOString().split('T')[0];
    const today2 = new moment().format("DD-MM-YYYY");
    dateEl.setAttribute("min", today2);



// Populate ContDown / Complete UI
function updateDom() {

    // setInterval(()=> {}, secound); 
    // To Run the function evry secound

     countdownActive = setInterval(() => {
        const now = new Date().getTime();    
        const distance = countdownValue - now;
        
    
        const days  =  Math.floor(distance / day);
        const hours  =  Math.floor((distance % day ) / hour);
        const minutes  =  Math.floor((distance % hour ) / minute);
        const secounds  =  Math.floor((distance % minute ) / secound);
    
        console.log('days' , days,'hours' , hours ,'minutes' , minutes,'secounds' , secounds);
    
        // Hide Input 
        inputContainer.hidden = true;

        // If the ContDowon has ended, show complete
        if(distance < 0 ){
            countdownEl.hidden = true;    
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished in ${countdownDate}`;
            completeEl.hidden = false;
        }else{
            //Else, show the countdown in progress
            // Populate ContDowon 
            countdownElTitle.textContent = `${countdownTitle}`;
            timesElments[0].textContent = `${days}`;
            timesElments[1].textContent = `${hours}`;
            timesElments[2].textContent = `${minutes}`;
            timesElments[3].textContent = `${secounds}`;
            completeEl.hidden =true;
            countdownEl.hidden = false;    

            
        }
     },  secound);
}

// Take Valuds from Form Input submit
function updateCountdown(e){

    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    // Check for valid date
    if (countdownDate === ''){
        alert('Please select a date for the countdown.');
    }else{
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        console.log('countdown value :  '  , countdownValue);
        updateDom();
    }
  
}

// Reset All values
function reset(){
  // Hide ContDowon, Show Input 
  countdownEl.hidden = true ;
  completeEl.hidden = true ;
  inputContainer.hidden = false ;
  //Stop the contdown 
  clearInterval(countdownActive);
  // Reset values 
  countdownTitle = '';
  countdownDate  = '';

}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
