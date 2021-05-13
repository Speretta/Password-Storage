import {SyncDot} from "./dot.js";
import {WebList} from "./weblist.js";

export class Website{
	constructor(private _name: string, private _url:string, private _account: string, private _pass: string){};

	toJSON(){
		return {
			name: this._name,
			url: this._url,
			account: this._account,
			pass: this._pass,
		};
	}

	public get url(){
		return this._url;
	}

	public get name(){
		return this._name;
	}

	public get account(){
		return this._account;
	}

	public get pass(){
		return this._pass;
	}
}

export class DataSystem{
	private _websites: Array<Website>;
	private _weblist: WebList;
	constructor(private _dbx: any, private _sync_dot: SyncDot){
		this._weblist = new WebList();
		this._websites = [];
	}
	getWebsitesJSONString(){
		return JSON.stringify(this._websites);
	}
	async isAvailablePassFile(): Promise<boolean>{
		var dot = this._sync_dot;
		return new Promise(resolve => {
			this._dbx.filesListFolder({path:""})
			.then(function(response){
				if(response.result.entries[0]){
					dot.color = "yellow";
					resolve(true);
				}
				resolve(false);
			}).catch(function(error){
				dot.color = "red";
				resolve(false);
			});
		});
	}

	async getPassAndSet(): Promise<boolean>{
		var dot = this._sync_dot;
		var websites = this._websites;
		return new Promise(resolve => {
			this._dbx.filesDownload({ path: "/" + "passwords.json" })
			.then(function(response) {
				var json: JSON= JSON.parse("{}");
				var reader = new FileReader();
				reader.readAsText(response.result.fileBlob);
				reader.onload = function(e) {
					json = JSON.parse(reader.result as string);
					console.log(json);
					for (var id in json) {
						var website = new Website(json[id].name, json[id].url, json[id].account, json[id].pass);
						websites.push(website);
					}
					dot.color = "yellow";
					resolve(true);
				};
			}).catch(function(error){
				dot.color = "red";
				resolve(false);
			})
		});
	}

	async deletePassInDbx(): Promise<void>{
		return new Promise(resolve =>{
			this._dbx.filesDelete({ path: "/" + "passwords.json" });
			resolve();
		});
	}

	async startSync(){
		var self = this;
		await this.isAvailablePassFile().then(async function(value) {if(value == true){
			await self.getPassAndSet().then(function(value) {if(value == true){
				self._weblist.createMenuFromArray(self._websites);
			}});
			
		}});
		this._sync_dot.color = "greenyellow";
		if (this._sync_dot.color != "red") {
			this._sync_dot.color = "green";
		}

	}

	async updateCloudFile(): Promise<boolean>{
		var dot = this._sync_dot;
		dot.color = "yellow";
		return new Promise(resolve => {
			var file = new File([this.getWebsitesJSONString()], "passwords.json", { type: "application/json" });
			this._dbx.filesUpload({ path: "/" + "passwords.json", contents: file, mode: 'overwrite' })
				.then(function response() {
					dot.color = "green";
					resolve(true);
				}).catch(function error() { dot.color = "red"; resolve(false); });
		});
	}

	public get websites(){
		return this._websites;
	}

	public get weblist(){
		return this._weblist;
	}

	setWebsiteData(id: number, website: Website){
		this._websites[id] = website;
		this._weblist.reloadMenu(id, website);
	}
}