import { Website } from "./data.js";

class WebsiteMenu {
	constructor(private _url: string, private _li: HTMLElement, private _div: HTMLDivElement, private _logo: HTMLImageElement, private _label: HTMLLabelElement){

	}

	public getText(): string{
		return this._label.innerHTML;
	}

	public setText(text: string){
		this._label.innerHTML = text;
	}

	public setUrl(text: string){
		checkImgAndSet(text, this._logo);
	}

	public get url(){
		return this._url;
	}

	public set url(text: string){
		this._url = text;
	}

	public get li(){
		return this._li;
	}

	public async clearMe(): Promise<void>{
		return new Promise(resolve =>{
			this._logo.remove();
			this._label.remove();
			this._div.remove();
			this._li.remove();
			resolve();
		});
	}
}


export class WebList{
	private static _ul = document.getElementById("webList");
	private _list: Array<WebsiteMenu>;

	private _pass_pop_up : HTMLElement;
	private _pass_button: HTMLElement;
	private _pass_save_button: HTMLElement;
	private _pass_name: HTMLInputElement;
	private _pass_url: HTMLInputElement;
	private _pass_account: HTMLInputElement;
	private _pass_Pass: HTMLInputElement;
	private _pass_img: HTMLImageElement;
	constructor(){
		this._list = [];
		this._pass_pop_up = document.getElementById("passPopUp");
		this._pass_button = document.getElementById("popupButton");
		this._pass_save_button = document.getElementById("passSaveButton");
		var self = this;
		this._pass_button.onclick = function() { self._pass_pop_up.style.display = "none"; self._pass_save_button.removeAttribute('siteid'); };
		this._pass_name = document.getElementById("passName") as HTMLInputElement;
		this._pass_url = document.getElementById("passUrl") as HTMLInputElement;
		this._pass_account = document.getElementById("passAccount") as HTMLInputElement;
		this._pass_Pass = document.getElementById("passPass") as HTMLInputElement;
		this._pass_img = document.getElementById("passImg") as HTMLImageElement;
	}

	async createMenuFromArray(websites: Array<Website>){
		for (var id in websites){
			var ws = websites[id];
			await this.createMenu(id, ws);
		}
	}

	async createMenu(id: string, website: Website): Promise<void>{
		return new Promise(async resolve =>{
			var li = document.createElement("li");
			var logoDiv = document.createElement("div");
			var logo = document.createElement("img");
			var nameDiv = document.createElement("div");
			var name = document.createElement("label");
			var account = document.createElement("label");
			var settingDiv = document.createElement("div");
			var settingDot = document.createElement("img");
			var settingTrashButton = document.createElement("button");
			var settingTrashImage = document.createElement("img");

			logoDiv.classList.add("logoDiv");
			logo.classList.add("logo");
			checkImgAndSet(website.url, logo as HTMLImageElement); //Maybe await

			nameDiv.style.textOverflow = "ellipsis";
			nameDiv.style.overflow = "hidden";

			name.innerHTML = website.name;
			name.classList.add("menuName");
			account.innerHTML = website.account;
			account.classList.add("menuAccount");

			settingDiv.classList.add("menuSettingDiv");
			settingDiv.classList.add("menuSetting");
			settingDiv.id = "menuSettingDiv" + this._list.length;

			(settingDot as HTMLImageElement).src = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2Fdot.png?v=1620997092665";
			settingDot.classList.add("menuDot");
			settingDot.classList.add("menuSetting");
			settingDot.id = "menuDot" + this._list.length;

			settingTrashButton.style.display = "none";
			settingTrashButton.id = "menuSettingTrash" + this._list.length;
			settingTrashButton.classList.add("menuSetting");
			settingTrashButton.classList.add("menuSettingTrash");

			(settingTrashImage as HTMLImageElement).src = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2Ftrash.png?v=1621001711425";
			settingTrashImage.classList.add("menuSettingTrash");
			settingTrashImage.classList.add("menuSetting");


			WebList._ul.appendChild(li);
			li.appendChild(logoDiv);
			logoDiv.appendChild(logo);
			nameDiv.appendChild(name);
			nameDiv.appendChild(account);
			settingTrashButton.appendChild(settingTrashImage);
			settingDiv.appendChild(settingDot);
			settingDiv.appendChild(settingTrashButton);
			logoDiv.appendChild(settingDiv);
			logoDiv.appendChild(nameDiv);

			this.setIdChildElements(id, li);

			var menu = new WebsiteMenu(website.url, li, logoDiv, logo, name);
			this._list.push(menu);
			resolve();
		});
	}

	public openPopUp(id: number, website: Website) {
		this._pass_name.value = website['name'];
		this._pass_url.value = website['url'];
		if (website['url'] == ""){
			checkImgAndSet("default.png", this._pass_img);
		}else{
			checkImgAndSet(website.url, this._pass_img);
		}
		this._pass_account.value = website['account'];
		this._pass_Pass.value = website['pass'];
		this._pass_save_button.setAttribute('siteid', id as any as string);
		this._pass_pop_up.style.display = "block";
	}

	public getPopUpWebsite(): Website{
		var website = new Website(this._pass_name.value, this._pass_url.value, this._pass_account.value, this._pass_Pass.value);
		return website;
	}

	public closPopUp(){
		this._pass_pop_up.style.display = "none";
	}

	async reloadOrCreateMenu(id: number, website: Website) {
		var old_website = this._list[id];
		if (old_website != undefined){
			if (website.name != old_website.getText()){
				this._list[id].setText(website.name);	
			}
			if (website.url != old_website.url){
				this._list[id].setUrl(website.url);
			}
		}else {
			this.createMenu(id as any as string, website);
		}
	}

	setIdChildElements(id, element: HTMLElement){
		var child_elements = element.querySelectorAll("*");
		for (var id2 in child_elements) {
			if (typeof child_elements[id2] == "object") {
				child_elements[id2].setAttribute("siteid", id);
				if (child_elements[id2].id.includes("menuDot")) child_elements[id2].id = "menuDot" + id;
				else if (child_elements[id2].id.includes("menuSettingTrash")) child_elements[id2].id = "menuSettingTrash" + id;
				else if (child_elements[id2].id.includes("menuSettingDiv")) child_elements[id2].id = "menuSettingDiv" + id;
			}

		}
	}

	async deleteMenu(id){
		if (this._list[id]){
			await this._list[id].clearMe();
			this._list.splice(id, 1);
			for (var k = id; k < this._list.length; k++) {
				this.setIdChildElements(k, this._list[k].li);
			}
		}
	}
}



/*
I need help here. Gets error when assigning image resource. An ugly sight.
*/
export async function checkImgAndSet(logo_link: string, logo: HTMLImageElement): Promise<void>{
	return new Promise(resolve => {
		let req = new XMLHttpRequest();
		var url = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2F" + logo_link + ".webp";
		if(logo_link == "default.png"){
			var url = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2F" + logo_link;
		}
		
		req.open('GET', url, true);
		req.onload = function() {
			if (req.status == 200) {
				logo.src = url;
			} else {
				logo.src = "//besticon-demo.herokuapp.com/icon?url=" + logo_link + "&size=80..120..200";
			}
			resolve();
		}
		req.onerror = function() {
			resolve();
		}
		req.send();
	});
}