let speakerObject = {
	"parent": { "database_id": "815035805b6d4a53ab7a74c81ee7fa0b" },
	"properties": {
		"Status": { "select": {"name": "Draft" }},
		"Slug": {"rich_text": [{ "text": { "content": ""}}]},
		"Role": {"rich_text": [{"text": {"content": ""}}]},
		"Email": {"rich_text": [{"text": {"content": ""}}]},
		"Bio": {"rich_text": [{"text": {"content": ""}}]},
		"Topic": {"rich_text": [{"text": {"content": ""}}]},
		"Name": {"title": [{"text": {"content": ""}}]}
	}
}

const form = document.querySelector('form');
const message = document.getElementById('message');
const urlParams = new URLSearchParams(window.location.search.substr(1));

form.addEventListener('submit', (e) => {
	e.preventDefault();

	oData = new FormData(form);
 
 	speakerObject.properties.Name.title[0].text.content = `${oData.get("firstName")} ${oData.get("lastName")}`
 	speakerObject.properties.Topic.rich_text[0].text.content = oData.get("talkTitle")
 	speakerObject.properties.Slug.rich_text[0].text.content = oData.get("talkTitle").replace(/\s/g , "-");
 	speakerObject.properties.Bio.rich_text[0].text.content = oData.get("bio").replace(/\s/g , "-");
 	speakerObject.properties.Email.rich_text[0].text.content = oData.get("Email").replace(/\s/g , "-");
 	speakerObject.properties.Role.rich_text[0].text.content = oData.get("Role").replace(/\s/g , "-");
 	// Set url for dev http://localhost:3000/guest-speaker-form?token=abc
 	// Set url for prod https://api.nwacoders.com/guest-speaker-form?token=abc
 	axios.post(`http://localhost:3000/guest-speaker-form?token=${urlParams.get('token')}`, speakerObject)
	.then(function (response) {
		message.innerHTML = "submission sent"
		// console.log(response);
	})
	.catch(function (error) {
		message.innerHTML = "Error please try again"
		// console.log(error);
	});

});

function uploadPhoto() {
    document.getElementById("headshot").click();
}

