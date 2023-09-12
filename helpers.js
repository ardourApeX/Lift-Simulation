function hideElement(element) {
	element.classList.add('hidden');
}
function viewElement(element) {
	element.classList.remove('hidden');
}

function delayedFunction(duration, callback) {
	setTimeout(callback, duration);
}
function closestLift(floornumber) {
	let leastFloorDifference = window.noOfFloors - 1; //Initial value to compare with
	let nearestLift = -1; //Initial value to compare with
	for (let [key, value] of Object.entries(liftStatus)) {
		if (
			!value.moving &&
			!value.transitioning &&
			Math.abs(value.floorNumber - floornumber) < leastFloorDifference
		) {
			leastFloorDifference = Math.abs(value.floorNumber - floornumber);
			nearestLift = key;
		}
	}

	return nearestLift;
}

function moveLift(liftNumber, floorNumber, direction) {
	liftStatus[liftNumber].moving = true;
	if (liftStatus[liftNumber].floorNumber === floorNumber) {
		liftStatus[liftNumber].moving = false;
		return openLiftGate(liftNumber);
	}
	const lift = document.getElementById('lift-' + liftNumber);
	lift.style.translate = `0px -${
		floorHeight * parseInt(floorNumber) + 2 * floorNumber
	}px`;

	lift.style.transitionDuration = '2s';
	lift.style.transitionTimingFunction = 'ease-in-out';
	delayedFunction(2000, () => {
		liftStatus[liftNumber].floorNumber = parseInt(floorNumber);
		liftStatus[liftNumber].moving = false;
		openLiftGate(liftNumber);
	});
}
function callLift(floorNumber, direction) {
	const nearestLift = closestLift(floorNumber);
	nearestLift != -1 && moveLift(nearestLift, floorNumber, direction);
}

function closeLiftGate(liftNumber) {
	const parentDiv = document.getElementById(`lift-${liftNumber}`);
	// Get the child divs
	const childDivs = parentDiv.querySelectorAll('div');

	// Lift Door
	childDivs[0].classList.remove('left-opening-gate');
	childDivs[0].classList.add('left-closing-gate');

	// Right Door
	childDivs[1].classList.remove('right-opening-gate');
	childDivs[1].classList.add('right-closing-gate');

	delayedFunction(2500, () => {
		childDivs[0].classList.remove('left-closing-gate');
		childDivs[1].classList.remove('right-closing-gate');
		liftStatus[liftNumber].transitioning = false;
	});
}
function openLiftGate(liftNumber) {
	liftStatus[liftNumber].transitioning = true;

	const parentDiv = document.getElementById(`lift-${liftNumber}`);
	// Get the child divs
	const childDivs = parentDiv.querySelectorAll('div');
	childDivs[1].classList.add('right-opening-gate');
	childDivs[0].classList.add('left-opening-gate');

	delayedFunction(2500, () => {
		closeLiftGate(liftNumber);
	});
}
