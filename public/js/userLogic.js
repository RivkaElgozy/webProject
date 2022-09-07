let userName= document.getElementById("name").value;
// const axios = require('axios').default;

document.getElementById("main-play-btn").onclick = function () {

    // userName= document.getElementById("userName").value;
    let ifExistUser = document.getElementById("is-new");
    if(ifExistUser.value == "No"){
        console.log("No")
        check_if_exist(userName, 0);
    }
    else{
        console.log("Yes")

        check_if_exist( 1);
    }
}

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
