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
const uploadPhoto = document.getElementById('imgUpload');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	oData = new FormData(form);

	speakerObject.properties.Name.title[0].text.content = `${oData.get("firstName")} ${oData.get("lastName")}`
	speakerObject.properties.Topic.rich_text[0].text.content = oData.get("talkTitle")
	speakerObject.properties.Slug.rich_text[0].text.content = oData.get("talkTitle").replace(/\s/g, "-");
	speakerObject.properties.Bio.rich_text[0].text.content = oData.get("bio");
	speakerObject.properties.Email.rich_text[0].text.content = oData.get("Email");
	speakerObject.properties.Role.rich_text[0].text.content = oData.get("Role");
	//ToDo: resolve sumbitting the image
	axios.post(`${endpoint}?token=${urlParams.get('token')}`, speakerObject)
		.then(function (response) {
			message.innerHTML = "submission sent"
		})
		.catch(function (error) {
			message.innerHTML = "Error please try again"
		});

});

uploadPhoto.addEventListener('click', function(event) {
  document.getElementById("headshot").click();
});

function encodeImageFileAsURL() {
	var filesSelected = document.getElementById("headshot").files;
	if (filesSelected.length > 0) {
		var fileToLoad = filesSelected[0]; //delete
		var fileReader = new FileReader();

		fileReader.onload = function (fileLoadedEvent) {
			var srcData = fileLoadedEvent.target.result; // <--- data: base64

			var newImage = document.createElement('img');
			newImage.src = srcData;
			newImage.classList.add('previewImg');

			const previewWrapper = document.getElementById("previewWrapper");
			previewWrapper.innerHTML = newImage.outerHTML;
		}
		fileReader.readAsDataURL(fileToLoad);
	}
}

