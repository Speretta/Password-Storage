import { SyncDot } from "./dot.js";
import { DataSystem } from "./data.js";

export class AuthSystem{
    private _dbxAuth: any;
    private _dbx: any;
    private _sync_dot: SyncDot;
    private _data_system: DataSystem;
	constructor(private _client_id: string, private _redirect_uri: string){
		this._dbxAuth = new Dropbox.DropboxAuth({clientId: this._client_id});
		this._dbx = new Dropbox.Dropbox({ auth: this._dbxAuth });
		this._data_system = new DataSystem(this._dbx, this._sync_dot);
		this._sync_dot = new SyncDot("red");
	}
	getAuthUrl(): Promise<boolean>{
		return new Promise(resolve => {
             if (AuthSystem.getCode()){
		        this._dbxAuth.getAuthenticationUrl(this._redirect_uri, undefined, 'code', 'offline', undefined, undefined, true)
		        .then((authUrl: string) => {
		          window.sessionStorage.setItem("codeVerifier", "");
		          window.sessionStorage.setItem("codeVerifier", this._dbxAuth.codeVerifier);
		          window.location.href = authUrl;
		          this._sync_dot.color = "yellow";
		          resolve(true);
		        })
		        .catch((error: unknown) => {
		          console.log(error);
		          this._sync_dot.color = "red";
		          resolve(false);
		        });
		    }else {
		      resolve(false);
		    }
        });
	}

	connectAuth(): Promise<boolean>{
		return new Promise(resolve => {
	    	var code = AuthSystem.getCode();
			this._dbxAuth.setCodeVerifier(window.sessionStorage.getItem('codeVerifier'));
			this._dbxAuth.getAccessTokenFromCode(this._redirect_uri, code)
				.then((response: { result: { access_token: any; }; }) => {
					this._dbxAuth.setAccessToken(response.result.access_token);
					this._dbx = new Dropbox.Dropbox({ auth: this._dbxAuth });
					this._data_system = new DataSystem(this._dbx, this._sync_dot);
					this._data_system.startSync();
					window.sessionStorage.setItem("codeAuth", code);
					this._sync_dot.color = "yellow";
					resolve(true);
				}).catch((error: unknown) => { this._sync_dot.color = "red"; console.log(error); resolve(false); });
	    });
	}
	public get DataSystem(){
		return this._data_system;
	}

	static getCode(): string{
		var params = new URLSearchParams(window.location.search);
	    var code = params.get("code");
	    if (code){
	       return code;
	    } 
	    return "false";
	}

	public get dataSystem(){
		return this._data_system;
	}
}