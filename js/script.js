const container = document.querySelector('.container');
let checkedCards = [],
	score = 0;
let checkedCardsContainers = [];
let foundMatches = [];
const cardsData = ((assetsPath)=>{
	const arr = [];
	for (let i = 1; i <= 9; i++) {
		const card = {path: `${assetsPath}p${i}.svg`, name: `p${i}`};
		arr.push(card, card);
	}
	return arr;
})('assets/');

const shuffledCards = cardsData.sort(()=> 0.5 - Math.random());



console.log(shuffledCards);
window.addEventListener('load', (e) => {	
	const fragment = document.createDocumentFragment();
	for (let card of shuffledCards) {
		fragment.appendChild(createCard(card.name, card.path));
	}	
	container.appendChild(fragment);
});


function createCard(cardName, cardImgPath) {
	const card = document.createElement('div'),
		  cardContainer = document.createElement('div'),
		  cardBack = document.createElement('div'),
		  cardFront = document.createElement('div'),
		  img = document.createElement('img');
	img.src = cardImgPath;
	img.classList.add('card__image');
	cardFront.appendChild(img);
	card.classList.add('card'); 
	cardBack.classList.add('card_back'); 
	cardFront.classList.add('card_front'); 
	cardFront.setAttribute('name', cardName);
	cardContainer.classList.add('card__container'); 
	cardContainer.appendChild(cardBack);
	cardContainer.appendChild(cardFront);
	card.appendChild(cardContainer);
	return card;
}

container.addEventListener('click', (e)=>{
	if(e.target.classList[0]==='card_back') {
		console.log(e.target.offsetParent);
		console.log(e.target);
		if(checkedCards.length <= 2){
			const cardContainer = e.target.offsetParent;
			cardContainer.classList.toggle('flip');
			checkedCards.push(e.target.nextSibling.attributes.name.value);
			checkedCardsContainers.push(cardContainer);
			if(checkedCards.length == 2){
				if(checkedCards[0] === checkedCards[1]){
					foundMatches = foundMatches.concat(checkedCards);
					checkedCardsContainers.forEach(el =>{
						console.log(el);
						changeOpacity(el);
					});
					console.log(score++);
				}
				checkedCardsContainers.forEach(el =>{
						flipBack(el);
				});
				checkedCardsContainers = [];
				checkedCards = [];
			}
		}
	}	
});

function changeOpacity(card){
	setTimeout(()=>{
		card.style.opacity = '0';
	}, 1500);
}

function flipBack(card){
	setTimeout(()=>{
		card.classList.toggle('flip');
	}, 1500);
}