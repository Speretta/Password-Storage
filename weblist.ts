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
			var div = document.createElement("div");
			var logo = document.createElement("img");
			var text = document.createElement("label");
			text.innerHTML = website.name;
			text.setAttribute("siteid", id);
			text.className += "logoText";
			div.className += "logoDiv";
			div.setAttribute('siteid', id);
			logo.className += "logo";
			logo.setAttribute('siteid', id);
			li.setAttribute('siteid', id);
			checkImgAndSet(website.url, logo); //Maybe await
			WebList._ul.appendChild(li);
			li.appendChild(div);
			div.appendChild(logo);
			div.appendChild(text);

			var menu = new WebsiteMenu(website.url, li, div, logo, text);
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

	async reloadMenu(id: number, website: Website) {
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

	deleteMenu(id){
		delete this._list[id];
	}
}


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