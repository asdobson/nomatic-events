var expect = require('chai').expect;
var Emitter = require('../../EventEmitter');
var beforeEach = require("mocha").beforeEach;
var it = require("mocha").it;
var describe = require("mocha").describe;

describe('EventEmitter', function() {
    var emitter;
    var listener;
    var listenerResult = null;
    var callback = function(data) { listenerResult = data; };

    beforeEach(function() {
        emitter = new Emitter();
        listener = emitter.on('test', callback, true);
    });

    describe('new', function() {
        it('should create a new EventEmitter object', function() {
            //noinspection BadExpressionStatementJS,JSUnresolvedVariable
            expect(emitter).to.have.keys([
                'listeners',
                'separator',
                'maxListeners'
            ]);
        });
    });

    describe('#listeners', function() {
        it('should have one listener', function() {
            //noinspection JSUnresolvedVariable
            expect(emitter.listeners).to.have.length(1);
        });
    });

    describe('#on()', function() {
        it('should return an EventListener type', function() {
            //noinspection BadExpressionStatementJS,JSUnresolvedVariable
            expect(listener).to.be.an.EventListener;
        });

        it('should return an executable EventListener type', function () {
            listener.execute(true);
            //noinspection BadExpressionStatementJS,JSUnresolvedVariable
            expect(listenerResult).to.equal(true);
        });
    });

    describe('#emit()', function() {
        it('should execute listener', function() {
            expect(emitter.listeners.length).to.equal(1);
            expect(emitter.emit('test', [1, 2, 3, 4])).to.equal(true);
            expect(listenerResult).to.deep.equal([1, 2, 3, 4]);
        });
    });

    describe('#pop()', function() {
        it('should remove the EventListener object from the EventEmitter', function() {
            expect(emitter.pop(listener)).to.equal(true);
            expect(emitter.listeners.length).to.equal(0);
        });
    });
});

