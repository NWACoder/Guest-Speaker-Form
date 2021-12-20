import profile from "./profile";

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

profile();