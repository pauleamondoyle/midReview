var mocha = require('mocha'),
    chai = require('chai')

var assert = chai.assert;
var expect = chai.expect;

// 9. write a function called pipeline. it should take three inputs: (1) a string of text, (2) a function, and (3) another function. it should use functions (2) and (3) on the input, one after the other, and return a new string that has been processed by both function (2) and function (3).



// for example, presuming i have a function called capitalize() and a function called removeFirstLetter, i should be able to do this

// >>> var newWord = pipeline('america')
// >>> 'Americ'

var pipeline = function(string,func,funcTwo){
	return(funcTwo(func(string)))
}

// 10. write a function called map that will take an array and a callback as input.

var map = function(array,func){
	var newArray = []
	for(i=0;i<array.length;i++){
		newArray.push(func(array[i]))
	}
	return newArray
}

// 11. this one will be tricky and also really interesting. your task is to hack the built-in array method (hint: where do the methods on an array live?). replace map with a method that does ALMOST the same thing as the built-in map. the difference is, your map will add an extra element to the end: an "X." (feel free to replace the X with your own tag, but the mocha test will fail.)

// (not working)

Array.prototype.map=(function(){
    var original = Array.prototype.map;
    return function(array,func) {
        var newArray = []
		for(i=0;i<array.length;i++){
			newArray.push(func(array[i]))
		}
		newArray.push('X')
		return newArray
        return original.apply(this,arguments);
    };
})();

// 12. create a jquery promise/deferred object that will resolve true, and execute an associated callback, after 1 second. 

var callback = function(){
	console.log('short delay')
}

$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search',
		data:{
			q: 'sad lion',
			api_key: 'dc6zaTOxFJmzC'
		}
		}).done(setTimeout(callback,1000))


// 13. create a constructor called Place. the important methods on place are .fetchData() and .getCoords(). fetchData should take the name of a place as input, make a request to an api of your choosing (hint: googlemaps geocoding), and store the latitude and longitude of the place in an object, retrievable with the getCoords method. 

function Place(location){

	var self = this

	this.location = location

	this.fetchData = function(){
		var coords = ''
		var deferredObj = $.ajax({
				url: 'https://maps.googleapis.com/maps/api/geocode/json',
				data:{
					address: self.location,
					key: 'AIzaSyAMCk-bRfMFdovo1UtM1lnM7AxaF2h-0EY'
				}
		})

		var makeCoordObj = function(data){
			console.log(self)
			self.coords = {
				lat: data.results[0].geometry.location.lat,
				lng: data.results[0].geometry.location.lng
			}

			console.log(self.coords)
		}

		deferredObj.done(makeCoordObj)
	}

	this.getCoords = function(){
		return this.coords
	}
}



// test for #9
describe("pipeline()",function(){
    it("should pipe the outputs of the functions passed in as arguments into a final value",function(){
    	var squareNum = function(num) {return num * num},
    		doubleNum = function(num) {return num * 2},
    		inverseNum = function(num) {return 1 / num}

        expect(pipeline(5,doubleNum,squareNum)).to.equal(100)
        expect(pipeline(10,squareNum,inverseNum)).to.equal(.01)
    })
})


// test for #10
describe("map()",function(){
    it("should return a new copy of the array after the given transformation",function(){

    	expect(map([4,9,16],Math.sqrt)).to.deep.equal([2,3,4])
    })
})


//test for #11
describe("Array", function(){ // a Constructor name
    describe("#map()", function(){ // a method of said Constructor
		it("should behave as normal, except with an extra 'X' at the end of the array",function(){
			expect([5.5,2.1,100.9].map(Math.floor)).to.deep.equal([5,2,100,"X"])
		})
	})
})

// no tests for the last two, as jquery is required, but i'll review them by sight. 
