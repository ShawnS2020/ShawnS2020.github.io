const sections = Array.from(document.getElementsByTagName('section'));
const syllables = Array.from(document.getElementsByClassName('syllables'));
const wrapper = document.getElementById('show4Wrapper');
const max = 75;
const min = -75;

// Event listener for show4
wrapper.addEventListener('mouseenter', () => {
	for (let i = 0; i < syllables.length; i ++ ) {
		const randX = Math.floor(Math.random() * (max - min) + min);
		const randY = Math.floor(Math.random() * (max - min) + min);
		syllables[i].style.transform = 'translate(' + randX + 'px, ' + randY + 'px)';
	}
});



// JS for section background fade

// This function returns the distance from the middle of an HTML element to the middle of the window
function distFromMid(elem) {
	const distFromTop = elem.getBoundingClientRect().top;
	const elemHeight = elem.offsetHeight;
	const winHeight = window.innerHeight;

	return Math.floor((distFromTop + (elemHeight / 2) - (winHeight / 2)));
}

const faders = Array.from(document.getElementsByClassName('scrollfade'));
// a: alpha for the opacity of the div that reveals section background circles
// d: distance of the element from middle of window
// a = 1 past the upper bound and 0 past the lower bound
var a;
var d;
const upperBound = 350;
const lowerBound = 50;
document.addEventListener('scroll', () => {
	faders.forEach(e => {
		d = distFromMid(e);

		if (d > upperBound || d < -upperBound) {
			a = 1;
		} else if (d < lowerBound && d > -lowerBound) {
			a = 0;
		} else if (d > lowerBound && d < upperBound) {
			a = ((d - lowerBound) * (d - lowerBound)) / ((upperBound - lowerBound) * (upperBound - lowerBound));
		} else if (d < -lowerBound && d > -upperBound) {
			// make d negative to reflect parabola by the x-axis
			a = ((-d - lowerBound) * (-d - lowerBound)) / ((upperBound - lowerBound) * (upperBound - lowerBound));
		}

		e.style.backgroundColor = 'rgba(17, 17, 17, ' + a + ')';
	});
});
