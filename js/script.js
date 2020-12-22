const container = document.querySelector('.container'),
	  fadeIn = [{ transform: 'rotateY(0deg)'}, { transform: 'rotateY(360deg)' }],
	  cardsData = ((assetsPath)=>{
		  const arr = [];
		  for (let i = 1; i <= 9; i++) {
		      const card = {path: `${assetsPath}p${i}.svg`, name: `p${i}`};
			  arr.push(card, card);
		  }
		  return arr;
	  })('assets/');

let checkedCards = [],
	checkedCardsContainers = [],
	shuffledCards = shuffleArray(cardsData),
	foundMatches = [];



function shuffleArray(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}


document.addEventListener('DOMContentLoaded', () => {	
	appendCards(shuffledCards);
});

function appendCards(shuffledCards){
	const fragment = document.createDocumentFragment();
	shuffledCards.forEach((card, index) =>{	
		fragment.appendChild(createCard(card.name, card.path, index));
	});	
	container.appendChild(fragment);
}


function createCard(cardName, cardImgPath, index) {
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
	cardBack.addEventListener('click', checkCard);
	cardFront.classList.add('card_front'); 
	cardFront.setAttribute('name', cardName);
	cardContainer.classList.add('card__container'); 
	cardContainer.appendChild(cardBack);
	cardContainer.appendChild(cardFront);
	cardContainer.animate(fadeIn, {delay: index*500, duration: 700, direction: 'alternate-reverse'});
	card.appendChild(cardContainer);
	return card;
}


function checkCard(e){
	if (checkedCards.length < 2) {
		const cardContainer = e.target.offsetParent;
		cardContainer.classList.add('flip');
		checkedCards.push(e.target.nextSibling.attributes.name.value);
		checkedCardsContainers.push(cardContainer);
		if(checkedCards.length == 2){
			if(checkedCards[0] === checkedCards[1]){
				foundMatches = foundMatches.concat(checkedCards);
				checkedCardsContainers.forEach(el =>{
					changeSize(el);
				});
			}else{
				checkedCardsContainers.forEach(el =>{
					flipBack(el);
				});
			}
			setTimeout(()=>{
				checkedCardsContainers = [];
				checkedCards = [];
			}, 600);
		}
	}
	if (foundMatches.length === shuffledCards.length) {
		const winContainer = document.querySelector('.win__container');
		if ( winContainer !== null) {
			document.querySelector('.win__container').style.display = 'flex';
		}else{
			showWinMessage();
		}
	}	
}

function changeSize(card){
	setTimeout(()=>{
		card.style.width = '0';
		card.style.height = '0';
		card.childNodes.forEach(cardInnerStyle => cardInnerStyle.style.display = "none");
	}, 500);
}

function flipBack(card){
	setTimeout(()=>{
		card.classList.remove('flip');
	}, 500);
}

function showWinMessage(){
	const winMessage = document.createElement('div'),
		  heading = document.createElement('h1'),
		  button = document.createElement('button');
	winMessage.classList.add('win__container');
	heading.classList.add('win__heading');
	button.classList.add('win__button');
	button.innerText = 'Restart!';
	heading.innerHTML= 'Congratulations!<br>You won!';
	button.addEventListener('click', reset);
	winMessage.appendChild(heading);
	winMessage.appendChild(button);
	document.body.appendChild(winMessage);
}

function reset(){
	shuffledCards = shuffleArray(cardsData);
	const clearVars = [checkedCards, checkedCardsContainers, foundMatches].map(variable =>  variable = []);
	[checkedCards, checkedCardsContainers, foundMatches] = clearVars;
	container.innerHTML = '';
	document.querySelector('.win__container').style.display = 'none';
	appendCards(shuffledCards);
}