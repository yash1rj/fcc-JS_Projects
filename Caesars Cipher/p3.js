function rot13(str) { // LBH QVQ VG!
	
	if(str.length == 0) {
		output.innerHTML = "Enter a string";
		output.style.backgroundColor = "#ffcd00";
		return false;
	}

	let nstr = "";
  
	for (var i = 0; i < str.length; i ++) {
    
		// Get the character we'll be appending
		let c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90)) {
				c = String.fromCharCode(((code - 65 + 13) % 26) + 65);
			}

			// Lowercase letters
			else if ((code >= 97) && (code <= 122)) {
				c = String.fromCharCode(((code - 97 + 13) % 26) + 97);
			}

		}

		// Append
		nstr += c;

	}

	// All done!
	output.innerHTML = nstr;
	output.style.backgroundColor = "#00dcff";
	// return nstr;
}

// Change the inputs below to test
// console.log(rot13("SERR PBQR PNZC"));

let input = document.getElementById("myInput");
let cipher = document.getElementById("cipher");

let output = document.getElementById("myOutput");
output.innerHTML = "Enter a string";
output.style.backgroundColor = "#ffcd00";

cipher.addEventListener("click", () => {
	rot13(input.value);
}, false);