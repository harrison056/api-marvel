	
	var envios = []
	
	const timestamp = 1657976818445;
	const apiKey = 'b0d70bbba69b0fef05a8818506d92a70';
	const hash = '4d6e54524d79ba858029e6021adee716';
	const limit = 48; //quantidade de comics na pagina

	const apiUrl = 'http://gateway.marvel.com/v1/public/comics?ts='+timestamp+'&apikey='+apiKey+'&hash='+hash+'&limit='+limit;
	
	const divHero = document.querySelector('#herois');
	const divModal = document.querySelector('#modal');
	
	var url = fetch(apiUrl)
	.then((response) => {
		return response.json();
	});


	url.then((jsonParsed) => {
		jsonParsed.data.results.forEach(element => {
			const id = 	element.id
			const srcImage = element.thumbnail.path + "." + element.thumbnail.extension
			const title = element.title

			createDivHero(srcImage, title, id, divHero);

		})
	})
	
	function createDivHero(srcImage ,title, id, divToAppend){
		const divPai = document.createElement('div')
		const divFilho = document.createElement('div')
		const textName = document.createElement('text')
		const img = document.createElement('img')

		textName.textContent = title
		img.src = srcImage
		img.addEventListener('click', function() {
			showModal(id);
		})

		divFilho.appendChild(img)
		divFilho.appendChild(textName)
		divPai.appendChild(divFilho)
		divToAppend.appendChild(divPai)
		divPai.classList.add("personagem")
	}
	
	function showModal(id){
		var endereco = document.querySelector("#location").value;

		let modal = document.querySelector('.modal')
		modal.style.display = 'block';
		
		const divPai = document.createElement('div')
        const divImg = document.createElement('div')
		const divText = document.createElement('div')
		const textTitle = document.createElement('h1')
		const textCreator = document.createElement('h4')
		const textSerie = document.createElement('text')
		const imgModal = document.createElement('img')

		
		
		url.then((jsonParsed) => {
			var obj = jsonParsed.data.results.find(function(_obj){
				return _obj.id == id
			})
			var creator = obj.creators.items.shift()

            imgModal.src = obj.thumbnail.path + "." + obj.thumbnail.extension
			textTitle.textContent = obj.title
			textSerie.textContent = 'Periodicidade - '+obj.series.name

			
			divImg.appendChild(imgModal)
			divText.appendChild(textTitle)
			divPai.appendChild(divImg)
			if(creator !== undefined){
				textCreator.textContent = 'Criador - '+creator.name
				divText.appendChild(textCreator)
			}
			divText.appendChild(textSerie)
			divPai.appendChild(divText)
			divPai.appendChild(createButton(obj.title, endereco))
			modal.appendChild(divPai)
			divText.setAttribute("id", "modal-body-text")
			divPai.setAttribute("id", "modal-body")
			
		})
	}

	function closeModal(){
		let modal = document.querySelector('.modal')
		modal.style.display = 'none';
		var el =document.getElementById('modal-body')
		el.parentNode.removeChild(el)
	}

	function createButton(title, endereco){
		const divBtn = document.createElement('div')
		const btn = document.createElement('input')

		btn.onclick = function()
		{
			envios.push({title, endereco})
			alert("Enviado!")
			closeModal()
			console.log(envios)
		}

		divBtn.appendChild(btn)
		btn.setAttribute("class", "modal-btn")
		btn.setAttribute("type", "button")
		btn.setAttribute("value", "Enviar")
		divBtn.setAttribute("class", "div-btn")

		return divBtn;
	}

	function showModalTable() {

		let modal = document.querySelector('.modal-table')
		modal.style.display = 'block';

		let tbody = document.getElementById('tbody')

		for(let i = 0; i < envios.length; i++){
			var tr = tbody.insertRow(i);
			var td_title = tr.insertCell(0);
			var td_endereco = tr.insertCell(1);
			td_title.innerHTML = envios[i].title;
			td_endereco.innerHTML = envios[i].endereco;
		}
	}

	function closeModalTable(){
		let modal = document.querySelector('.modal-table')
		modal.style.display = 'none';
	}