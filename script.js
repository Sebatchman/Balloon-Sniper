const startBtn = document.querySelector('.start-button');
const instructions = document.querySelector('.instructions');
const Timer = document.querySelector('#Timer');
const scoreEl = document.querySelector('#scoreEl');
const balloonText = document.querySelector('#ballons-text');
const finalScore = document.querySelector('#final-score');
const flashScreen = document.querySelector('#flash-screen');
const wrapper = document.querySelector('.wrapper');
const scope = document.querySelector('#scope');
const rightBlack = document.querySelector('.right-black');
const leftBlack = document.querySelector('.left-black');
const topBlack = document.querySelector('.top-black');
const bottomBlack = document.querySelector('.bottom-black');
const blueBalloon = document.querySelector('.blue-balloon');
const greenBalloon = document.querySelector('.green-balloon');
const redBalloon = document.querySelector('.red-balloon');
const yellowBalloon = document.querySelector('.yellow-balloon');
const blueBalloon2 = document.querySelector('.blue-balloon-2');
const greenBalloon2 = document.querySelector('.green-balloon-2');
const redBalloon2 = document.querySelector('.red-balloon-2');
const yellowBalloon2 = document.querySelector('.yellow-balloon-2');
const gunShotHole = document.querySelector('.gunshot-hole');
const skull1 = document.querySelector('#balloon-skull-1');
const skull2 = document.querySelector('#balloon-skull-2');
const skull3 = document.querySelector('#balloon-skull-3');

let blue_balloon_x = generateRandomNumber(5, 95);
let blue_balloon_y = generateRandomNumber(110, 150);
let green_balloon_x = generateRandomNumber(5, 95);
let green_balloon_y = generateRandomNumber(110, 150);
let red_balloon_x = generateRandomNumber(5, 95);
let red_balloon_y = generateRandomNumber(110, 150);
let yellow_balloon_x = generateRandomNumber(5, 95);
let yellow_balloon_y = generateRandomNumber(110, 150);

let blue_balloon_x_2 = generateRandomNumber(5, 95);
let blue_balloon_y_2 = generateRandomNumber(-50, -100);
let green_balloon_x_2 = generateRandomNumber(5, 95);
let green_balloon_y_2 = generateRandomNumber(-50, -100);
let red_balloon_x_2 = generateRandomNumber(5, 95);
let red_balloon_y_2 = generateRandomNumber(-50, -100);
let yellow_balloon_x_2 = generateRandomNumber(5, 95);
let yellow_balloon_y_2 = generateRandomNumber(-50, -100);

let balloonSpeed = 0.5;
let timer_interval_Id;
let startingMinutes = 1;
let time = startingMinutes * 60;
let score = 0;

function resetElements() {
	blueBalloon.style.left = -10 + '%';
	greenBalloon.style.left = -10 + '%';
	redBalloon.style.left = -10 + '%';
	yellowBalloon.style.left = -10 + '%';

	blueBalloon2.style.left = -10 + '%';
	greenBalloon2.style.left = -10 + '%';
	redBalloon2.style.left = -10 + '%';
	yellowBalloon2.style.left = -10 + '%';

	skull1.style.left = -10 + '%';
	skull2.style.left = -10 + '%';
	skull3.style.left = -10 + '%';

	gunShotHole.style.left = -10 + '%';
	Timer.style.opacity = '0';
	Timer.style.zIndex = '-2';
	startBtn.style.opacity = '1';
	startBtn.style.zIndex = '3';
	instructions.style.opacity = '1';
	instructions.style.zIndex= '3';
}

window.addEventListener('click', (e) => {
	gunShotHole.style.top = e.pageY + 'px';
	gunShotHole.style.left = e.pageX + 'px';
	flashScreen.classList.add('flashing');
	playAudio('gunshot.mp3');
	setTimeout(() => {
		flashScreen.classList.remove('flashing');
	}, 300);
	checkIfBalloonPopped(e);
	checkIfSkullPopped(e);
});

window.addEventListener("mousemove", (e) => {
	scope.style.top = e.pageY + 'px';
	scope.style.left = e.pageX + 'px';
	rightBlack.style.top = e.pageY + 'px';
	rightBlack.style.left = e.pageX + 'px';
	leftBlack.style.top = e.pageY + 'px';
	leftBlack.style.left = e.pageX + 'px';
	topBlack.style.top = e.pageY + 'px';
	topBlack.style.left = e.pageX + 'px';
	bottomBlack.style.top = e.pageY + 'px';
	bottomBlack.style.left = e.pageX + 'px';
});

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function updateTimer() {
	const minutes = Math.floor(time /  60);
	let seconds = time % 60;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	Timer.innerHTML = `${minutes}:${seconds}`;
	time--;
}

const positionBalloons = () => {
	blueBalloon.style.left = blue_balloon_x + '%';
	blueBalloon.style.top = blue_balloon_y + '%';
	greenBalloon.style.left = green_balloon_x + '%';
	greenBalloon.style.top = green_balloon_y + '%';
	redBalloon.style.left = red_balloon_x + '%';
	redBalloon.style.top = red_balloon_y + '%';
	yellowBalloon.style.left = yellow_balloon_x + '%';
	yellowBalloon.style.top = yellow_balloon_y + '%';
}

const positionBalloons2 = () => {
	blueBalloon2.style.left = blue_balloon_x_2 + '%';
	blueBalloon2.style.top = blue_balloon_y_2 + '%';
	greenBalloon2.style.left = green_balloon_x_2 + '%';
	greenBalloon2.style.top = green_balloon_y_2 + '%';
	redBalloon2.style.left = red_balloon_x_2 + '%';
	redBalloon2.style.top = red_balloon_y_2 + '%';
	yellowBalloon2.style.left = yellow_balloon_x_2 + '%';
	yellowBalloon2.style.top = yellow_balloon_y_2 + '%';
}

const positionSkulls = () => {
	let skull_x_1 = blue_balloon_x;
	let skull_y_1 = blue_balloon_y;
	let skull_x_2 = red_balloon_x;
	let skull_y_2 = red_balloon_y;
	let skull_x_3 = yellow_balloon_x_2;
	let skull_y_3 = yellow_balloon_y_2;

	skull1.style.left = skull_x_1 + '%';
	skull1.style.top = skull_y_1 + '%';
	skull2.style.left = skull_x_2 + '%';
	skull2.style.top = skull_y_2 + '%';
	skull3.style.left = skull_x_3 + '%';
	skull3.style.top = skull_y_3 + '%';
}

const moveBalloons = () => {
	blue_balloon_y -= balloonSpeed;
	green_balloon_y -= balloonSpeed;
	red_balloon_y -= balloonSpeed;
	yellow_balloon_y -= balloonSpeed;
}

const moveBalloons2 = () => {
	blue_balloon_y_2 += balloonSpeed;
	green_balloon_y_2 += balloonSpeed;
	red_balloon_y_2 += balloonSpeed;
	yellow_balloon_y_2 += balloonSpeed;
}

const checkIfOutOfBounds = () => {
	blue_balloon_y <= generateRandomNumber(-20, -50) ? 
	(blue_balloon_y = generateRandomNumber(110, 150),
		blue_balloon_x = generateRandomNumber(5, 95)) : 
	null;
	green_balloon_y <= generateRandomNumber(-20, -50) ? 
	(green_balloon_y = generateRandomNumber(110, 150),
		green_balloon_x = generateRandomNumber(5, 95)) : 
	null;
	red_balloon_y <= generateRandomNumber(-20, -50) ? 
	(red_balloon_y = generateRandomNumber(110, 150),
		red_balloon_x = generateRandomNumber(5, 95)) : 
	null;
	yellow_balloon_y <= generateRandomNumber(-20, -50) ? 
	(yellow_balloon_y = generateRandomNumber(110, 150),
		yellow_balloon_x = generateRandomNumber(5, 95)) : 
	null;
}

const checkIfOutOfBounds2 = () => {
	blue_balloon_y_2 >= generateRandomNumber(120, 130) ? 
	(blue_balloon_y_2 = generateRandomNumber(-50, -100),
		blue_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
	green_balloon_y_2 >= generateRandomNumber(120, 130) ? 
	(green_balloon_y_2 = generateRandomNumber(-50, -100),
		green_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
	red_balloon_y_2 >= generateRandomNumber(120, 130) ? 
	(red_balloon_y_2 = generateRandomNumber(-50, -100),
		red_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
	yellow_balloon_y_2 >= generateRandomNumber(120, 130) ? 
	(yellow_balloon_y_2 = generateRandomNumber(-50, -100),
		yellow_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
}

const checkIfBalloonPopped = (e) => {
	e.target === (greenBalloon) ?
	(generateGreenSplash(), score++, green_balloon_y = generateRandomNumber(110, 150),
		green_balloon_x = generateRandomNumber(5, 95)) : 
	null;
	e.target === (yellowBalloon) ?
	(generateYellowSplash(), score++, yellow_balloon_y = generateRandomNumber(110, 150),
		yellow_balloon_x = generateRandomNumber(5, 95)) : 
	null;
	e.target === (blueBalloon2) ?
	(generateBlueSplash(), score++, blue_balloon_y_2 = generateRandomNumber(-50, -100),
		blue_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
	e.target === (greenBalloon2) ?
	(generateGreenSplash2(), score++, green_balloon_y_2 = generateRandomNumber(-50, -100),
		green_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
	e.target === (redBalloon2) ?
	(generateRedSplash(), score++, red_balloon_y_2 = generateRandomNumber(-50, -100),
		red_balloon_x_2 = generateRandomNumber(5, 95)) : 
	null;
}

const checkIfSkullPopped = (e) => {
	if (e.target === skull1 || e.target === blueBalloon) {
		generateBlueSkullSplash();
		blue_balloon_x = generateRandomNumber(5, 95);
		blue_balloon_y = generateRandomNumber(110, 150);
		score = score - 3;
		playAudio('skullHit.wav');
	}
	if (e.target === skull2 || e.target === redBalloon) {
		generateRedSkullSplash();
		red_balloon_x = generateRandomNumber(5, 95);
		red_balloon_y = generateRandomNumber(110, 150);
		score = score - 3;
		playAudio('skullHit.wav');
	}
	if (e.target === skull3 || e.target === yellowBalloon2) {
		generateYellowSkullSplash();
		yellow_balloon_x_2 = generateRandomNumber(5, 95);
		yellow_balloon_y_2 = generateRandomNumber(-50, -100);
		score = score - 3;
		playAudio('skullHit.wav');
	}
}

function generateBlueSplash() {
	const blueSplash = document.createElement('img');
	blueSplash.src = './blue-splash.png';
	blueSplash.classList.add('blue-splash');
	wrapper.appendChild(blueSplash);
	blueSplash.style.top = blue_balloon_y_2 + '%';
	blueSplash.style.left = blue_balloon_x_2 + '%';
	setTimeout(() => {
		blueSplash.remove();
	}, 3000);
}

function generateGreenSplash2() {
	const greenSplash2 = document.createElement('img');
	greenSplash2.src = './green-splash.png';
	greenSplash2.classList.add('green-splash-2');
	wrapper.appendChild(greenSplash2);
	greenSplash2.style.top = green_balloon_y_2 + '%';
	greenSplash2.style.left = green_balloon_x_2 + '%';
	setTimeout(() => {
		greenSplash2.remove();
	}, 3000);
}

function generateRedSplash() {
	const redSplash = document.createElement('img');
	redSplash.src = './red-splash.png';
	redSplash.classList.add('red-splash');
	wrapper.appendChild(redSplash);
	redSplash.style.top = red_balloon_y_2 + '%';
	redSplash.style.left = red_balloon_x_2 + '%';
	setTimeout(() => {
		redSplash.remove();
	}, 3000);
}

function generateGreenSplash() {
	const greenSplash = document.createElement('img');
	greenSplash.src = './green-splash.png';
	greenSplash.classList.add('green-splash');
	wrapper.appendChild(greenSplash);
	greenSplash.style.top = green_balloon_y + '%';
	greenSplash.style.left = green_balloon_x + '%';
	setTimeout(() => {
		greenSplash.remove();
	}, 3000);
}

function generateYellowSplash() {
	const yellowSplash = document.createElement('img');
	yellowSplash.src = './yellow-splash.png';
	yellowSplash.classList.add('yellow-splash');
	wrapper.appendChild(yellowSplash);
	yellowSplash.style.top = yellow_balloon_y + '%';
	yellowSplash.style.left = yellow_balloon_x + '%';
	setTimeout(() => {
		yellowSplash.remove();
	}, 3000);
}

function generateBlueSkullSplash() {
	const blueSkullSplash = document.createElement('img');
	blueSkullSplash.src = './skull.png';
	blueSkullSplash.classList.add('blue-skull');
	wrapper.appendChild(blueSkullSplash);
	blueSkullSplash.style.top = blue_balloon_y + '%';
	blueSkullSplash.style.left = blue_balloon_x + '%';
	setTimeout(() => {
		blueSkullSplash.remove();
	}, 1500);
}

function generateRedSkullSplash() {
	const redSkullSplash = document.createElement('img');
	redSkullSplash.src = './skull.png';
	redSkullSplash.classList.add('red-skull');
	wrapper.appendChild(redSkullSplash);
	redSkullSplash.style.top = red_balloon_y + '%';
	redSkullSplash.style.left = red_balloon_x + '%';
	setTimeout(() => {
		redSkullSplash.remove();
	}, 1500);
}

function generateYellowSkullSplash() {
	const yellowSkullSplash = document.createElement('img');
	yellowSkullSplash.src = './skull.png';
	yellowSkullSplash.classList.add('yellow-skull');
	wrapper.appendChild(yellowSkullSplash);
	yellowSkullSplash.style.top = yellow_balloon_y_2 + '%';
	yellowSkullSplash.style.left = yellow_balloon_x_2 + '%';
	setTimeout(() => {
		yellowSkullSplash.remove();
	}, 1500);
}

function setFinalScore() {
	finalScore.style.opacity = '1';
	finalScore.style.zIndex = '3';
	finalScore.style.left = 21 + '%';
	finalScore.innerText = `You Popped ${score} Ballons In Under 1 Minute!`;
}

function loseGame() {
	finalScore.style.opacity = '1';
	finalScore.style.zIndex = '3';
	finalScore.style.left = 25 + '%';
	finalScore.innerText = `Game Over... Better Luck Next Time`;
}

function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

startBtn.addEventListener('click', () => {
	gameLoop();
	playAudio('gameStart.wav');
	startBtn.style.opacity = '0';
	startBtn.style.zIndex = '-2';
	instructions.style.opacity = '0';
	instructions.style.zIndex= '-2';
	timer_Interval_Id = setInterval(updateTimer, 1000);
	Timer.style.opacity = '1';
	Timer.style.zIndex = '3';
	startingMinutes = 1;
	time = startingMinutes * 60;
	scoreEl.style.opacity = '1';
	scoreEl.style.zIndex = '3';
	balloonText.style.opacity = '1';
	balloonText.style.zIndex = '3';
	finalScore.style.opacity = '0';
	finalScore.style.zIndex = '-2';
	score = 0;
	gameStarted = true;
});

function gameLoop() {
	game_Interval_Id = setInterval(() => {
		moveBalloons();
		moveBalloons2();
		positionBalloons();
		positionBalloons2();
		positionSkulls();
		checkIfOutOfBounds();
		checkIfOutOfBounds2();
		scoreEl.innerText = score;
		if (time <= -1) {
			clearInterval(game_Interval_Id);
			clearInterval(timer_Interval_Id);
			resetElements();
			setFinalScore();
			scoreEl.style.opacity = '0';
			scoreEl.style.zIndex = '-2';
			balloonText.style.opacity = '0';
			balloonText.style.zIndex = '-2';
			playAudio('GameEnd.wav');
		}
		if (score <= -1) {
			clearInterval(game_Interval_Id);
			clearInterval(timer_Interval_Id);
			resetElements();
			loseGame();
			scoreEl.style.opacity = '0';
			scoreEl.style.zIndex = '-2';
			balloonText.style.opacity = '0';
			balloonText.style.zIndex = '-2';
			playAudio('gameOver.wav');
		}
	}, 20);
}

resetElements();





