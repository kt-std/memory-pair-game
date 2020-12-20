const container = document.querySelector('.container'),
	  checkedCards = [];
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
	if(checkedCards.length < 2){
		checkedCards.push(e.target.nextSibling.attributes.name);
		flipCard(e.target.offsetParent);
	}	
});

function flipCard(card){
	card.classList.toggle('flip');
	setTimeout(()=>{
		card.classList.toggle('flip');
	}, 1500);
}