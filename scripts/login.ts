var password_input_1: HTMLInputElement = document.getElementById("loginInput0") as HTMLInputElement;
var password_input_2: HTMLInputElement;
import { b64EncodeUnicode, sha256 } from "./crypto.js";
import { getCookie, setCookie } from "./cookie.js";


if(!getCookie("password")){
	var ul = document.getElementById("loginUl");

	var li = document.createElement("li");
	li.classList.add("loginLi");

	password_input_2 = document.createElement("input");
	password_input_2.id = "loginInput1";
	password_input_2.classList.add("loginInput");
	password_input_2.placeholder = "Password";
	password_input_2.type = "password";

	li.appendChild(password_input_2);
	ul.insertBefore(li, ul.childNodes[3]);

	document.getElementById("loginButton").innerHTML = "Register";
}


document.getElementById("loginButton").onclick = async function() {
	if (!getCookie("password")) {
		if(password_input_1 && password_input_2){
			if (password_input_1.value == password_input_2.value){
				if (password_input_1.value == "" || password_input_1.value == " ") {
					alert("Empty password, clever but not secure.");
				}else {
					var string_hash = await sha256(password_input_1.value);
					setCookie("password", string_hash, 20);
					alert("Your password has been saved in cookies.");
					location.reload();
				}
			}else{
				alert("Passwords are not the same.");
			}
		}
	}else {
		if (await sha256(password_input_1.value) == getCookie("password")){
			location.href = "/";
			sessionStorage.setItem("not_hashed_password", b64EncodeUnicode(password_input_1.value));
		}
	}
}
