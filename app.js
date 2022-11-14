const colordivs = document.querySelectorAll(".colors");
const quizs = document.querySelector(".quizs");
const quizText = document.querySelector(".quiz-texts");

let getColorValue;
let getdata;
let quizidx = 0;

colordivs.forEach( colordiv => colordiv.addEventListener("dragstart", dragstart));

colordivs.forEach( colordiv => colordiv.addEventListener("dragend", dragend));

function dragstart(){
    this.className += " hold";
    getColorValue = this.getAttribute("value");
    setTimeout(()=>this.className = "", 0);
}

function dragend(){
    this.className = "colors";
}

quizs.addEventListener("dragover", dragover);
quizs.addEventListener("dragenter", dragenter);
quizs.addEventListener("dragleave", dragleave);
quizs.addEventListener("drop", dragdrop);

function dragover(e){
    e.preventDefault();
}
function dragenter(e){
    e.preventDefault();
    this.className += " hovered";
}
function dragleave(e){
    e.preventDefault();
    this.className = "border border-light rounded quizs";
}
function dragdrop(e){
    this.className = "border border-light rounded quizs";
    checkAns(e.target);
    if(quizidx <= 4) {setTimeout(loadquiz , 2000)} 
    else {
        changeDisplay();
    }
}

function checkAns(e){
    let key;
    if(e.classList.contains("border")) {
        key = e.children[0].classList[1]
    }else {
        key = e.classList[1]
    }
    getdata = quizdata1[`${key}`];
    
    if(getdata.color === getColorValue) {
        if(e.classList.contains("border")) {
            e.children[0].style.color = getdata.color;
            quizidx++;
        }else {
            e.style.color = getdata.color;
            quizidx++;
        }
    } else{
        quizs.innerHTML = `Please Try Again`;
        quizs.style.color = "white";
        setTimeout( ()=>{
            quizs.innerHTML = `<i class="fas fa-lemon fa-5x"></i>`;
            quizs.style.color = "#000";
        }, 2000);
    }

}

function loadquiz(){
    let data = quizdata[quizidx];

    quizText.innerText = data.text;
    quizs.innerHTML = data.icon;
}

loadquiz();

const feedback = document.getElementById("feedbacks");
const feedbackcontainer = document.querySelector(".feedbacks");
const ratings = document.querySelectorAll('.emojis');
const sendbtn = document.querySelector('#send');

let selectedrating = 'Satisfied';
let photorating;

feedbackcontainer.addEventListener('click',(e)=>{
    // console.log("hey");
    // console.log(e.target);

    if(e.target.parentNode.classList.contains('emojis')){
        // console.log(e.target);
        removeactive();
        
        e.target.parentNode.classList.add('active');

        // selectedrating = e.target.nextElementSibling.textContent;

        selectedrating = e.target.parentNode.lastElementChild.textContent;
        // console.log(selectedrating);
        photorating = e.target.parentNode.firstElementChild.src;
       

    }else if(e.target.classList.contains('emojis')){
        removeactive();
        e.target.classList.add('active');
        selectedrating = e.target.lastElementChild.textContent;
        e.target.firstElementChild.src
    }
});

function removeactive(){

    // ratings.forEach(rating=>{
    //     rating.classList.remove('active');
    // });

    for(let i = 0; i < ratings.length; i++){
        ratings[i].classList.remove('active');
    }
}


sendbtn.addEventListener('click',()=>{
    // console.log("hey");
    feedback.innerHTML = `
    <img src="${photorating}" class="emojis" alt="">
    <strong class="text-light display-6">Thank You</strong>
    <strong class="text-light display-6">Feedback : ${selectedrating}</strong>
    <p class="text-light display-6">We'll use your feedback to improve our customer support</p>
    `;
});

const quizcontainer = document.getElementById("quizsection");
function changeDisplay(){
    feedback.classList.replace("d-none", "d-flex");
    quizcontainer.style.display = "none";
}



