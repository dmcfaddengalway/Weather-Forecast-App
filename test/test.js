const assert = require('chai').assert;
const app = require('../app');

/*
const sayHello = require("../app").sayHello;
const sayGoodbye = require("../app").sayGoodbye;
const addNumbers = require("../app").addNumbers;
*/

//Results
sayHelloResult = app.sayHello();
sayGoodbyeResult = app.sayGoodbye();
addNumbersResult = app.addNumbers(5, 5);

describe("app", function() {

    describe("sayHello function tests", function() {

        it("sayHello should return hello", function() {
            //let result = app.sayHello();
            assert.equal(sayHelloResult, "hello");
        });

        it("sayHello should return a string", function() {
            //let result = app.sayHello();
            assert.typeOf(sayHelloResult, "string");
        });

    });

    describe("sayGoodbye functon tests", function() {

        it("sayGoodbye should return goodbye", function() {
            //let result = app.sayGoodbye();
            assert.equal(sayGoodbyeResult, "goodbye");
        });

    });

    describe("addNumbers function tests", function() {

        it("addNumbers result should be greater than 5", function() {
            //let result = app.addNumbers(5, 5);
            assert.isAbove(addNumbersResult, 5);
        });

        it("addNumbers should return a number", function() {
            //let result = app.addNumbers();
            assert.typeOf(addNumbersResult, "number");
        });

    });

});