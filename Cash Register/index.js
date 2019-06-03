function cashCounter(cid) {
	var reg = {total: 0};

	cid.forEach((money) => {
		// console.log(money);
		reg.total += money[1];
		reg[money[0]] = money[1];
	});

	return reg;
}

function checkCashRegister(price, cash, cid) {
	// console.log(cid);
	if(price.length == 0 || cash.length == 0) {
		outputf.innerHTML = "Enter price of item and cash taken";
		outputf.style.backgroundColor = "#ffcd00";
		return false;
	}
	
	let output = { status: null, change: [] };
	var change = cash - price;
	// console.log(change);

	var register = cashCounter(cid);
	// console.log(register);

	// Exact change
	if (register.total === change) {
		output.status = "CLOSED";
		output.change = cid;
		outputS.innerHTML = JSON.stringify(output["status"]);
		outputC.innerHTML = JSON.stringify(output["change"]);
		// return output;
		outputS.style.backgroundColor = "#00dcff";
		outputC.style.backgroundColor = "#00dcff";
		return false;
	}
  
  // Insufficient funds
	if (register.total < change) {
		output.status = "INSUFFICIENT_FUNDS";
		outputS.innerHTML = JSON.stringify(output["status"]);
		outputC.innerHTML = JSON.stringify(output["change"]);
		// return output;
		outputS.style.backgroundColor = "#ff0000";
		outputC.style.backgroundColor = "#ff0000";
		return false;
	}

	let newArr = [];
	
	var url = "./currencies.json";
	var xhr = new XMLHttpRequest();
	xhr.open("GET",url);
	
	
	xhr.onload = function () {
		obj = JSON.parse(xhr.responseText);
		// console.log(obj);
		obj.forEach((curr) => {
			let ttl = 0;
			// console.log(curr);
			while (register[curr.name] > 0 && change >= curr.val) {
				change -= curr.val;
				register[curr.name] -= curr.val;
				ttl += curr.val;
				// console.log(ttl);

				// Round change to the nearest hundreth deals with precision errors
				change = Math.round(change * 100) / 100;
				// console.log(change);
			}
			
			if(ttl > 0) {
				newArr.push([ curr.name, ttl ]);
			}
		});
		
		// console.log(newArr.length);
		
		if (newArr.length < 1 || change > 0) {
			// console.log(newArr.length, change);
			// console.log("Scenario x");
			output.status = 'INSUFFICIENT_FUNDS';
			outputS.innerHTML = JSON.stringify(output["status"]);
			outputC.innerHTML = JSON.stringify(output["change"]);
			// return output;
			outputS.style.backgroundColor = "#ff0000";
			outputC.style.backgroundColor = "#ff0000";
			return false;
		}
		
		// Here is your change, ma'am.
		output.status = 'OPEN';
		output.change = newArr;
		outputS.innerHTML = JSON.stringify(output["status"]);
		outputC.innerHTML = JSON.stringify(output["change"]);
		// return output;
		outputS.style.backgroundColor = "#00dcff";
		outputC.style.backgroundColor = "#00dcff";
	}

	xhr.send();
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

/*
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
*/

let price = document.getElementById("myInput1");
let cash = document.getElementById("myInput2");
let check = document.getElementById("check");

let outputS = document.getElementById("myOutput");
let outputC = document.getElementById("myOutput2");

outputS.innerHTML = "Enter price of item and cash taken";
outputS.style.backgroundColor = "#ffcd00";

let regDrop = document.getElementById("registers");

var opt = document.createElement('option');
opt.value = "-Select Register-";
opt.innerHTML = "-Select Register-";
regDrop.appendChild(opt);

let regI = [];

var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "./registers.json");
    xhr1.onload = () => {
        obj2 = JSON.parse(xhr1.responseText);
		let i = 0;
		obj2.forEach((cur) => {
			// console.log(cur.register);
			regI.push(cur.register);
			opt = document.createElement('option');
			opt.value = cur.register;
			opt.innerHTML = `Register ${i++}`;
			regDrop.appendChild(opt);
		});
    };
xhr1.send();

check.addEventListener("click", () => {
	// console.log(regI);
	let regIndex = regDrop.selectedIndex - 1;
	// console.log(regIndex);
	// console.log(regI[regIndex]);
	checkCashRegister(price.value, cash.value, regI[regIndex]);
}, false);