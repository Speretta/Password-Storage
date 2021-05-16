
export function getCookie(cname: string): string{
	var value = "; " + document.cookie;
	var parts = value.split("; " + cname + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

export function setCookie(cname: string, cvalue: string, exdays:number) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}