function palindrome(str) {
  // Good luck
  // console.log(str);
  
  if(str.length == 0) {
	  output.innerHTML = "Enter a string";
	  output.style.backgroundColor = "#ffcd00";
	  return false;
  }
  
  str = str.replace(/\W|_/gi, "");
  // console.log(str);
  
  let palin = [];
  for(let i=str.length-1; i >= 0; i--) {
    palin.push(str[i]);
  }
  // console.log(palin.join(""));
  outputValue = palin.join("").toLowerCase() === str.toLowerCase();
  // console.log(outputValue);
  
  if(outputValue) {
	  output.innerHTML = "Yes, it's a palindrome!";
	  output.style.backgroundColor = "green";
  }
  else {
	  output.innerHTML = "Nope, not a palindrome!";
	  output.style.backgroundColor = "red";
  }
}


let input = document.getElementById("myInput");
let chkPalin = document.getElementById("chkPalin");

let output = document.getElementById("myOutput");
output.innerHTML = "Enter a string";
output.style.backgroundColor = "#ffcd00";

// console.log(palindrome("A man, a plan, a canal. Panama"));

chkPalin.addEventListener("click", () => {
	palindrome(input.value);
}, false);
