const modal = document.getElementById("modal");
const trigger = document.getElementById("trigger");
const closeButton = document.getElementById("close-button");
const play = document.getElementById("main-play-btn");
const isNew = document.getElementById("is-new"); 
const name1 = document.getElementById("name");
const level = document.getElementById("level");




let userName= document.getElementById("name").value;
// const axios = require('axios').default;

// document.getElementById("main-play-btn").onclick = function () {

//     // userName= document.getElementById("userName").value;
//     let ifExistUser = document.getElementById("is-new");
//     if(ifExistUser.value == "No"){
//         console.log("No")
//         check_if_exist(userName, 0);
//     }
//     else{
//         console.log("Yes")

//         check_if_exist( 1);
//     }
// }

//--------an API call to check if the user name exists or not
async function check_if_exist(num){
    let userName= document.getElementById("name").value;
    let res = await axios.get('/api/get-user-name', { params: { userName: userName } });
    if(res.data == "Exists"){
        if(num == 1){
            alert("שם המשתמש קיים כבר. נא בחר שם אחר");
        }
        else {
            get_high_score(userName);
            var para = new URLSearchParams();
            para.append("userName", userName);
            location.href = "game.html?" + para.toString();//קישור לדף המשחק
        
        }   
    }
    else{
        if(num == 1){
            add_new_user_name(userName);
            var para = new URLSearchParams();
            para.append("userName", userName);
            location.href = "theGame.html?" + para.toString();//קישור לדף המשחק
        
        }
        else{
            alert("שם המשתמש אינו נמצא במערכת. נא הכנס את שם המשתמש איתו נכנסת")
        }
    }
}

//----------an API call to add a new user to the server
async function add_new_user_name(userName){
    let obj = {
        name: userName,
        highScore: 0
    }
    let res = await axios.post('/api/update-new-user', obj);
}

//----------an API call to fet the high score of the user from the server
async function get_high_score(userName){
    let res = await axios.get('/api/get-high-score', { params: { userName: userName }});
    alert("השיא שצברת עד כה הוא: " + res.data +" נקודות");
}





let flag = 0;
setInterval(()=>{
    if(level.value != '' && isNew.value != '' && name1.value != ''){
        play.onclick = function() {
        if(flag === 0){
            let ifExistUser = document.getElementById("is-new");
            if(ifExistUser.value == 2){
                console.log("No")
                check_if_exist(0);
            }
            else{
                console.log("Yes")

                check_if_exist( 1);
            }
            flag=1;
        }
        play.href="game.html"; 
      };
}},10);

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