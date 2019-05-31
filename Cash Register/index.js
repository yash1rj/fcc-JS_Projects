var currencies = [
    { name: 'ONE HUNDRED', val: 100.00},
    { name: 'TWENTY', val: 20.00},
    { name: 'TEN', val: 10.00},
    { name: 'FIVE', val: 5.00},
    { name: 'ONE', val: 1.00},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.10},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01}
];

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
  
	// console.log(register);
	currencies.forEach((curr) => {
		let ttl = 0;
		// console.log(curr);
		// console.log(register[curr.name]);
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
  
	if (newArr.length < 1 || change > 0) {
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

check.addEventListener("click", () => {
	checkCashRegister(price.value, cash.value, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
}, false);