const CLIENT_ID = "null";
const REDIRECT_URI = "http://localhost:8080";

import { AuthSystem } from "./auth.js";
import { checkImgAndSet } from "./weblist.js";
import { Website } from "./data.js";

var auth = new AuthSystem(CLIENT_ID, REDIRECT_URI);

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
		if (confirm("Verilerinizi buluta yüklemek üzeresiniz, devam etmek için onaylayın.")) {
			try {
				auth.dataSystem.updateCloudFile();
			}catch(error){
				alert("Dropbox bulutuna bağlanılamadı: "+ error);
			}
			
		}
	}
}

var ul = document.getElementById("webList"); //Weblist elemanı burada tanımlanıyor 

document.getElementById("searchInput").addEventListener('input', searchFilter);
async function searchFilter(e) {

	//Debug için
	if (e.target.value == "başlat") {
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