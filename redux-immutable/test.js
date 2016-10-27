var Immutable = require('immutable');


var map = Immutable.fromJS({
    name: 'John',
    age: 123,
    friends: [
        { name: 'a' },
        { name: 'b' }, 
        {
            name: 'c',
            friends: [
            	{name: 'd'},
            	{name: 'e'},
            	{name: 'f'},
            ],
        },
    ],

});

console.log(map);
var map2Obj = {a: {b: 'c'}};

var map2 = Immutable.fromJS(map2Obj);


map2 = map2.updateIn(['a', 'b'], function (value) {
	return value + '_updated';
});
console.log(map2);


map2 = map2.update('a', function (value) {
	return Immutable.fromJS([1, 2, 3, 4]);
});

console.log(map2);


