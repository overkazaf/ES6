{
    //let a = 1;
	var b = 2;
}

//console.log(a);
console.log(b);

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
	    console.log(i);
	}
}

a[4]();
