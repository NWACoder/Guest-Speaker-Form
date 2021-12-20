let speakerObject = {
	"parent": { "database_id": "815035805b6d4a53ab7a74c81ee7fa0b" },
	"properties": {
		"Status": { "select": { "name": "Draft" } },
		"Slug": { "rich_text": [{ "text": { "content": "" } }] },
		"Role": { "rich_text": [{ "text": { "content": "" } }] },
		"Email": { "rich_text": [{ "text": { "content": "" } }] },
		"Bio": { "rich_text": [{ "text": { "content": "" } }] },
		"Topic": { "rich_text": [{ "text": { "content": "" } }] },
		"Name": { "title": [{ "text": { "content": "" } }] }
	}
}

const endpoint = process.env.endpoint
const form = document.querySelector('form');
const message = document.getElementById('message');
const urlParams = new URLSearchParams(window.location.search.substr(1));
// const uploadPhoto = document.getElementById('uploadCircle');
// const headshot = document.getElementById("headshot")

form.addEventListener('submit', (e) => {
	e.preventDefault();

	oData = new FormData(form);
	//ToDo: resolve sumbitting the image
	speakerObject.properties.Name.title[0].text.content = oData.get("fullName");
	speakerObject.properties.Email.rich_text[0].text.content = oData.get("email");
	speakerObject.properties.Role.rich_text[0].text.content = oData.get("role");

	// will need to create these fields within notion
	// speakerObject.properties.TwitterUrl.rich_text[0].text.content = oData.get("twitter");
	// speakerObject.properties.LinkedInUrl.rich_text[0].text.content = oData.get("linkedIn");
	// speakerObject.properties.PersonalSiteUrl.rich_text[0].text.content = oData.get("personalSite");


	speakerObject.properties.Topic.rich_text[0].text.content = oData.get("talkTitle").replace(/\s/g, "-");
	// speakerObject.properties.Slug.rich_text[0].text.content = oData.get("talkTitle")
	speakerObject.properties.Bio.rich_text[0].text.content = oData.get("bio");

	axios.post(`${endpoint}?token=${urlParams.get('token')}`, speakerObject)
		.then(function (response) {
			message.innerHTML = "submission sent"
		})
		.catch(function (error) {
			message.innerHTML = "Error please try again"
		});

});

// function uploadPhoto() {
// 	document.getElementById("headshot").click();
// };
document.getElementById("uploadCircle").addEventListener("click", () => {
	document.getElementById("headshot").click();
})

document.getElementById("headshot").addEventListener("change", () => {
	encodeImageFileAsURL();
})

document.getElementById('removeText').addEventListener("click", () => {
	removeImg();
})

function removeImg() {
	//grab element and remove inner element(the preview image)
	const uploadCircle = document.getElementById("uploadCircle");

	document.getElementById('previewImg').remove();
	//recreate all of the elements and attributes that were there on load
	let newPElem = document.createElement('p');
	newPElem.innerHTML = "Upload";
	let newInputElem = document.createElement('input');
	newInputElem.setAttribute('id', 'headshot');
	newInputElem.setAttribute('type', 'file');
	newInputElem.setAttribute('accept', "image/png, image/jpeg");
	newInputElem.setAttribute('name', 'headshot')
	newInputElem.setAttribute('onchange', 'encodeImageFileAsURL()')
	uploadCircle.innerHTML = newPElem.outerHTML + newInputElem.outerHTML;
	document.getElementById('removeText').innerHTML = "";
}



function encodeImageFileAsURL() {
	var filesSelected = document.getElementById("headshot").files;
	if (filesSelected.length > 0) {
		var fileToLoad = filesSelected[0]; //delete
		var fileReader = new FileReader();

		fileReader.onload = function (fileLoadedEvent) {
			var srcData = fileLoadedEvent.target.result; // <--- data: base64

			var newImage = document.createElement('img');
			newImage.src = srcData;
			newImage.setAttribute('id', 'previewImg');

			const uploadCircle = document.getElementById("uploadCircle");
			uploadCircle.innerHTML = newImage.outerHTML;
		}
		fileReader.readAsDataURL(fileToLoad);
		document.getElementById('removeText').innerHTML = "Remove";
		console.log(document.getElementById("previewImg"))
		setTimeout(() => {
			document.getElementById("previewImg").addEventListener('click', () => {
				document.getElementById("headshot").click();
			})
		}, 0)

	} else {
		document.getElementById("headshot").click();
	}
}
window.encodeImageFileAsURL = encodeImageFileAsURL();

