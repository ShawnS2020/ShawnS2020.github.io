const div = document.getElementById('divGrad');


const red = "FF0000";
const orange = "FF8000"
const yellow = "FFFF00"
const green = "00FF00";
const blue = "0000FF";
const purple = "800080";
const colors = [red, orange, yellow, green, blue, purple]
function rand20() {
	return Math.floor(Math.random() * (20 - 1) + 1);
}
function rand200() {
	return Math.floor((Math.random() * 200) + 1);
}

const layers = [];

var randLayerCount = rand20();
for (let i = 0; i < 10; i ++) {
	layers.push([]);
}

for (let i = 0; i < layers.length; i ++) {
	var randStageCount = rand20();
	for (let j = 0; j < randStageCount; j ++) {
		layers[i].push(randRGB());
	}
}
console.log(layers);

// Generates a random color hex
function randRGB() {
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	var r16 = r.toString(16);
	var g16 = g.toString(16);
	var b16 = b.toString(16);
	if (r16.length == 1) {
		r16 = "0" + r16;
	}
	if (g16.length == 1) {
		g16 = "0" + g16;
	}
	if (b16.length == 1) {
		b16 = "0" + b16;
	}
	const rgb = r16 + g16 + b16
	return rgb;
}

// animate(divGrad, "linear", 45, layers, 5, 24);
const head = document.getElementsByTagName("header")[0];
animate(head, "radial", 0, layers, 5, 25);

function animate(element, type, degrees, hexes, seconds, fps) {
	const frames = getFrames(hexes, seconds, fps);
	const msPerFrame = (1 / fps) * 1000;

	for (let i = 0; i < frames.length; i ++) {
		setTimeout(() => {
			if (frames[i].length == 1) {
				element.style.backgroundColor = frames[i];
			} else {
				if (type == "linear") {
					element.style.backgroundImage = "linear-gradient(" + degrees + "deg, " + frames[i].join(", ") + ')';
				}
				if (type == "radial") {
					element.style.backgroundImage = "radial-gradient(" + frames[i].join(", ") + ')';
				}
			}
		}, msPerFrame + msPerFrame * i);
	}
}

// function getFrames(hex1Stage1, hex1Stage2, hex2Stage1, hex2Stage2, seconds, fps) {
function getFrames(hexes, seconds, fps) {
	const frameCount = Math.round(fps * seconds);
	const frames = [];
	
	for (let i = 0; i < frameCount; i ++) {
		const frame = [];
		for (let j = 0; j < hexes.length; j ++) {
			frame.push(getTweens(hexes[j], frameCount)[i]);
		}
		frames.push(frame);
	}
	return frames;
}

// Gets a specific number of between colors for an array of colors
function getTweens(colors, tweenCount) {
	const tweens = [];

	if (colors.length == 1) {
		for (let i = 0; i < tweenCount; i ++) {
			tweens.push("#" + colors[0]);
		}
	}

	const tweensPerPair = getTweensPerPair(colors.length, tweenCount);
	if (colors.length > 1) {
		for (let i = 0; i < colors.length - 1; i ++) {
			for (let j = 0; j < tweensPerPair[i]; j ++) {
				tweens.push("#" + mixByPercent(colors[i], colors[i + 1], (j + 1) / tweensPerPair[i]));
			}
		}

	}
	return tweens;
}

// Function that returns an array whose values are the number of between colors for each pair of colors
// Should add a function that evenly distributes the values
function getTweensPerPair(colorsCount, tweenCount) {
	const pairsCount = colorsCount - 1;
	const unrounded = tweenCount / pairsCount;
	const frac = unrounded % 1;
	const limit1 = Math.round(frac * pairsCount);
	const limit2 = Math.round((1 - frac) * pairsCount);
	const arr = [];
	
	for (i = 0; i < limit1; i ++) {
		arr.push(Math.ceil(unrounded));
	}
		
	for (i = 0; i < limit2; i ++) {
		arr.push(Math.floor(unrounded));
	}
	return arr;
}

// This function mixes two colors by adding a fraction of the second color with 1 - the fraction of the first color
function mixByPercent(hex1, hex2, frac) {
	const arr1 = hex1.split('');
	const arr2 = hex2.split('');
	const rArr1 = arr1[0] + arr1[1];
	const gArr1 = arr1[2] + arr1[3];
	const bArr1 = arr1[4] + arr1[5];
	const rArr2 = arr2[0] + arr2[1];
	const gArr2 = arr2[2] + arr2[3];
	const bArr2 = arr2[4] + arr2[5];
	const rDeci1 = parseInt(rArr1, 16);
	const gDeci1 = parseInt(gArr1, 16);
	const bDeci1 = parseInt(bArr1, 16);
	const rDeci2 = parseInt(rArr2, 16);
	const gDeci2 = parseInt(gArr2, 16);
	const bDeci2 = parseInt(bArr2, 16);
	
	var rDeciMin = Math.min(rDeci1, rDeci2);
	var rDeciMax = Math.max(rDeci1, rDeci2);
	var gDeciMin = Math.min(gDeci1, gDeci2);
	var gDeciMax = Math.max(gDeci1, gDeci2);
	var bDeciMin = Math.min(bDeci1, bDeci2);
	var bDeciMax = Math.max(bDeci1, bDeci2);

	// var rDeciMix = Math.ceil(rDeciMin + ((rDeciMax - rDeciMin) * frac));
	// var gDeciMix = Math.ceil(gDeciMin + ((gDeciMax - gDeciMin) * frac));
	// var bDeciMix = Math.ceil(bDeciMin + ((bDeciMax - bDeciMin) * frac));
	var rDeciMix = Math.round((rDeci1 * (1 - frac)) + (rDeci2 * frac));
	var gDeciMix = Math.round((gDeci1 * (1 - frac)) + (gDeci2 * frac));
	var bDeciMix = Math.round((bDeci1 * (1 - frac)) + (bDeci2 * frac));


	var rHexMix = rDeciMix.toString(16);
	var gHexMix = gDeciMix.toString(16);
	var bHexMix = bDeciMix.toString(16);

	if (rHexMix.length == 1) {
		rHexMix = "0" + rHexMix;
	}

	if (gHexMix.length == 1) {
		gHexMix = "0" + gHexMix;
	}

	if (bHexMix.length == 1) {
		bHexMix = "0" + bHexMix;
	}

	return rHexMix + gHexMix + bHexMix;
}
