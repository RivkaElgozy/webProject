const modal = document.getElementById("modal");
const trigger = document.getElementById("trigger");
const closeButton = document.getElementById("close-button");
const play = document.getElementById("main-play-btn");
const isNew = document.getElementById("is-new"); 
const name1 = document.getElementById("name");
const level = document.getElementById("level");


setInterval(()=>{
    if(level.value != '' && isNew.value != '' && name1.value != ''){
    play.onclick = function() {
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


