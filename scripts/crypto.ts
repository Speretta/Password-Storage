export function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		function toSolidBytes(match, p1) {
			return String.fromCharCode(('0x' + p1) as any as number);
		}));
}

export function b64DecodeUnicode(str) {
	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

export async function sha256(pass: string) {
	const passUint8 = new TextEncoder().encode(pass);
	const hashBuffer = await crypto.subtle.digest('SHA-256', passUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => padStart(b.toString(16), 2, '0')).join('');
	return hashHex;
	function padStart(text: string, length: number, char: string) {
		while (text.length != length) {
			text = text.concat(char);
		}
		return text;
	}
}
