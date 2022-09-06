const modal = document.getElementById("modal");
const trigger = document.getElementById("trigger");
const closeButton = document.getElementById("close-button");

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


$(function() {
	setTimeout(function() {
		$('.fly-in-text').removeClass('hidden');
	},500);
})();