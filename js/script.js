const cardsData = ((assetsPath)=>{
	const arr = [];
	for (let i = 1; i <= 9; i++) {
		arr.push({path: `${assetsPath}p${i}.svg`});
	}
	return arr;
})('assets/');

console.log(cardsData);
window.addEventListener('load', (e) => {
	/*const fragment = document.createDocumentFragment();
	cardsData.forEach(card =>{
		const img = document.createElement('img');
		img.src = card.path;
		fragment.appendChild(img);
	});
	document.body.appendChild(fragment);*/
});