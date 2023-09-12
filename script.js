//Global Variables
window.softPadding = 10;
window.floorHeight = 100;
window.noOfLifts = 0;
window.noOfFloors = 0;
window.liftStatus = {};

//HTML Elements
const form = document.getElementById('form');
const floorInput = document.getElementById('floor-input');
const liftInput = document.getElementById('lift-input');
const building = document.getElementById('building');
const lifts = document.getElementById('lifts');

function onSubmitHandler() {
	window.noOfLifts = parseInt(liftInput.value || '0');
	window.noOfFloors = parseInt(floorInput.value || '0');
	if (window.noOfFloors === 0 || window.noOfLifts === 0) {
		return alert('Please enter valid no of floors or lifts');
	}
	renderFloorsAndLifts();
}

function liftButtonHandler(event) {
	const target = event.target;

	if (target.tagName === 'BUTTON') {
		const buttonType = target.innerText; // 'Up' or 'Down'
		const floorNumber = target.parentElement.parentElement.id.split('-')[1];
		callLift(parseInt(floorNumber), buttonType);
	}
}

function renderFloorsAndLifts() {
	hideElement(form); //Hide form

	let floorInnerHTML = '';
	for (let i = 0; i < noOfFloors; i++) {
		//Adding floors in backward direction
		floorInnerHTML =
			`
				<div id=${'level-' + i} class="level">
					<div class="button">
						${i == noOfFloors - 1 ? '' : '<button>Up</button>'}
						${i == 0 ? '' : '<button>Down</button>'}
						<h3>floor ${i}</h3>
					</div>
				</div>
			` + floorInnerHTML;
	}

	let liftInnerHTML = '';
	for (let i = 0; i < noOfLifts; i++) {
		liftStatus[i] = {
			moving: false,
			transitioning: false,
			floorNumber: 0,
		};
		liftInnerHTML += `<div id=${'lift-' + i} class="lift">
				<div></div>
				<div></div>
			</div>`;
	}

	lifts.innerHTML = liftInnerHTML;
	building.innerHTML += floorInnerHTML;
	building.style.width = `${noOfLifts * 60 + 200}px`; //Building width based on input

	viewElement(building); //Make building visible

	//Attached event handler
	building.addEventListener('click', liftButtonHandler);
}
hideElement(building);
