const modal = document.getElementById("modal");
const trigger = document.getElementById("trigger");
const closeButton = document.getElementById("close-button");
const play = document.getElementById("main-play-btn");
const isNew = document.getElementById("is-new"); 
const name1 = document.getElementById("name");
const level = document.getElementById("level");
let ifExistUser = document.getElementById("is-new");
let flag = 0;
// import axios from "axios";

// setInterval(()=>{
//     if(level.value != '' && isNew.value != '' && name1.value.length != 0){
//         play.onclick = function() {
//         if(flag === 0){
//             if(ifExistUser.value == 2){
//                 console.log("No")
//                 check_if_exist(0);
//             }
//             else{
//                 console.log("Yes")

//                 check_if_exist(1);
//             }
//             flag=1;
//         }
//         play.href="game.html"; 
//       };
// }},10);

play.onclick = function() {
    if(level.value == '' || name1.value == '' || ifExistUser.value == ''){
        alert("Please fill all the fields");
    }
    else if(ifExistUser.value == 2){
        console.log("No")
        check_if_exist(0);
    }
    else if(ifExistUser.value == 1){
        console.log("Yes")
        check_if_exist(1);
    }
}

// const axios = require('axios').default;
//--------an API call to check if the user name exists or not
async function check_if_exist(num){
    let userName= document.getElementById("name").value;
    let res = await axios.get('/api/get-user-name', { params: { userName: userName } });
    console.log(res.data);
    if(res.data == "Exists"){
        if(num == 1){
            alert("This name is already exist, please enter a different name");
        }
        else {
            let res2 = await axios.get('/api/get-high-score', { params: { userName: userName, level:level.value} });
            var para = new URLSearchParams();
            para.append("userName", userName);
            para.append("highScore", res2.data);
            para.append("level", level.value);
            location.href = "game.html?" + para.toString();//קישור לדף המשחק
        }   
    }
    else{
        if(num == 1){
            add_new_user_name(userName);
            let res3 = await axios.get('/api/get-high-score', { params: { userName: userName, level:level.value} });
            var para = new URLSearchParams();
            para.append("userName", userName);
            para.append("highScore", res3.data);
            para.append("level", level.value);
            location.href = "game.html?" + para.toString();//קישור לדף המשחק
        }
        else{
            alert("oops.. This name does not exist");
        }
    }
}

// ----------an API call to add a new user to the server
async function add_new_user_name(userName){
    let obj = {
        name: userName,
        // highScore: 0,
        highScores: [60,60,60]

    }
    await axios.post('/api/update-new-user', obj);
}

//----------an API call to fet the high score of the user from the server
// async function get_high_score(userName){
//     let res = await axios.get('/api/get-high-score', { params: { userName: userName }});
//     alert("השיא שצברת עד כה הוא: " + res.data +" נקודות");
// }

function toggleModal() { 
    modal.classList.toggle("show-modal"); 
} 


function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
		// modal.classList.toggle("block-modal");
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

(function() {
	setTimeout(function() {
		$('.fly-in-text').removeClass('hidden');
	},500);
})();

