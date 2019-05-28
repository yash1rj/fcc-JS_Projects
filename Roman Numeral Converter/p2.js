function convertToRoman(num) {
	if(num.length == 0) {
		output.innerHTML = "Enter a number";
		output.style.backgroundColor = "#ffcd00";
		return false;
	}
	
	num = Number(num);
	if(isNaN(num)) {
		// console.log("nan");
		output.innerHTML = "Please enter a number";
		output.style.backgroundColor = "#ff0000";
		return false;
	}
	
	// console.log(num, typeof num);
	
	var roman = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};
	var str = '';

	for (var i of Object.keys(roman)) {
		// console.log(roman[i]);
		var q = Math.floor(num / roman[i]);
		// console.log(q);
		num -= q * roman[i];
		// console.log(num);
		str += i.repeat(q);
	}

	output.innerHTML = str;
	output.style.backgroundColor = "#00dcff";
}

// console.log(convertToRoman(36));

let input = document.getElementById("myInput");
let toRoman = document.getElementById("toRoman");

let output = document.getElementById("myOutput");
output.innerHTML = "Enter a number";
output.style.backgroundColor = "#ffcd00";

toRoman.addEventListener("click", () => {
	convertToRoman(input.value);
}, false);