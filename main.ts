const CLIENT_ID = "ncss4bzotoyi4zm"; //This is my Dropbox Public App key. Please do not abuse this.
const REDIRECT_URI = "http://localhost:8080";

import { AuthSystem } from "./auth.js";
import { checkImgAndSet } from "./weblist.js";
import { Website } from "./data.js";

var auth = new AuthSystem(CLIENT_ID, REDIRECT_URI);


/*
Enter "start" in the search field for the actual startup process. 
During the development process, the dom changes every time the code is changed, 
this causes repeated requests to the api, of course, this is bad.
*/

var start = async () => {
	if (AuthSystem.getCode()) {
		await auth.connectAuth();
	}
}
start();

document.addEventListener("click", click);

function click(event){
	var id = event.target.getAttribute("siteid");
	if (event.target.hasAttribute("siteid") && event.target.id != "passSaveButton") {
		var site = auth.dataSystem.websites[id];
		if (site)
			auth.dataSystem.weblist.openPopUp(id, site);

	} else if (event.target.id == "passSaveButton") {
		var website = auth.dataSystem.weblist.getPopUpWebsite();
		auth.dataSystem.setWebsiteData(id, website);
		auth.dataSystem.weblist.closPopUp();
	} else if (event.target.classList.contains("addButton")){
		var new_site_id = auth.dataSystem.websites.length;
		var new_site = new Website("New Website", "", "", "");
		auth.dataSystem.weblist.openPopUp(new_site_id, new_site);
	} else if (event.target.id =="syncDot"){
		if (confirm("You are about to upload your data to the cloud, confirm to continue.")) {
			try {
				auth.dataSystem.updateCloudFile();
			}catch(error){
				alert("Could not connect to the Dropbox cloud: " + error);
			}
			
		}
	}
}

var ul = document.getElementById("webList"); //Weblist elemanı burada tanımlanıyor 

document.getElementById("searchInput").addEventListener('input', searchFilter);
async function searchFilter(e) {

	//Debug için
	if (e.target.value == "start") {
		await auth.getAuthUrl();
	}
	//Debug için

	var li = ul.getElementsByTagName('li');
	if (li.length > 0)
		for (var id = 0; id < li.length; id++) {
			var element = li[id];
			var text = (auth.dataSystem.websites[id].url + auth.dataSystem.websites[id].name).toUpperCase();
			if (text.includes(e.target.value.toUpperCase())) {
				element.style.display = "";
			} else {
				element.style.display = "none";
			}


		}
}