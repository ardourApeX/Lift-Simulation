//Global Variables
window.softPadding = 10;
window.levelHalfHeight = 50;
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
	renderFloorsAndLifts();
}

function renderFloorsAndLifts() {
	hideElement(form);
	let innerHTML = '';
	for (let i = 0; i < noOfFloors; i++) {
		liftStatus[i] = {
			moving: false,
			transitioning: false,
			floorNumber: 0,
		};
		innerHTML += `
            <div id=${'level-' + i} class="level">
				<div class="button">
                    ${i == 0 ? '' : '<button>Up</button>'}
					${i == noOfFloors - 1 ? '' : '<button>Down</button>'}
				</div>
				<div class="floor">
					<hr />
					floor
				</div>
			</div>`;
	}

	let liftInnerHTML = '';
	for (let i = 0; i < noOfLifts; i++) {
		liftInnerHTML += `<div class="lift"></div>`;
	}
	lifts.innerHTML = liftInnerHTML;
	building.innerHTML += innerHTML;
	viewElement(lifts);
	viewElement(building);
}
hideElement(building);
