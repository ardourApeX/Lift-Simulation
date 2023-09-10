function hideElement(element) {
	element.classList.add('hidden');
}
function viewElement(element) {
	element.classList.remove('hidden');
}

function nearestLift(floornumber) {
	let closestLift = 0;
	let closestFloor = liftStatus[0].floorNumber;
	liftStatus.forEach((lift) => {
		if (
			Math.abs(lift.floorNumber - floornumber) <
			Math.abs(closestFloor - floornumber)
		) {
			closestFloor = lift.floorNumber;
		}
	});
}
