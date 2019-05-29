function telephoneCheck(str) {
	if(str.length == 0) {
		output.innerHTML = "Enter a phone number";
		output.style.backgroundColor = "#ffcd00";
		return false;
	}
  
	let re = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/gi;
	
	output.innerHTML = re.test(str);
	if (output.innerHTML === "true") {
		output.style.backgroundColor = "#00dcff";
	}
	else {
		output.style.backgroundColor = "#ff0000";
	}
	// return re.test(str);
  
}

// telephoneCheck("555-555-5555");

let input = document.getElementById("myInput");
let check = document.getElementById("check");

let output = document.getElementById("myOutput");
output.innerHTML = "Enter a phone number";
output.style.backgroundColor = "#ffcd00";

check.addEventListener("click", () => {
	telephoneCheck(input.value);
}, false);