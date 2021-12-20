export default ()=>{

	const uploadPhoto = document.getElementById('uploadCircle');
	const imgInput = document.getElementById('headshot');
	const profilePreview = document.getElementById('profilePreview');
	const removeImg = document.getElementById('removeText');

	uploadPhoto.addEventListener('click', (event) =>{
  		imgInput.click();
	});

	imgInput.onchange = (event) =>{
		profilePreview.src = URL.createObjectURL(event.target.files[0]);
		removeImg.innerHTML = "remove";
	}

	removeImg.addEventListener('click', (event) =>{
		imgInput.value = null
  		profilePreview.src = "";
  		removeImg.innerHTML = "";
	});
}