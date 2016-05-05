var expect = require('chai').expect;
var React = require('react');
var render = require('../utils/cheerio-react');

require("babel-register");
var Row = require('../src/components/Row').default

var testChild = React.createElement('div', {}, 'Test');
var testRow = React.createElement(Row, {}, testChild);

describe('Row', function() {
    var output = render(testRow);

    it('should render to a section', function() {
        expect(output.is('section')).to.equal(true);
    });
    describe('className', function() {
        var classes = output.attr("class").split(' ');

        it('Should have one class called timber-row', function() {
            expect(classes.length).to.equal(1);
            expect(output.hasClass('ruip-row')).to.equal(true);
        });
    });
    describe('children', function() {
        describe('when there is only one child', function() {
            it('should render with a child', function() {
                expect(output.children().length).to.equal(1);
            });
        });
        describe('when there are more than one child', function() {
            it('should not render and warn', function() {
                var rowWithTooManyChildren = React.createElement(Row, {}, testChild, testChild);
                var output;
                output = render(rowWithTooManyChildren);
                expect(output.children().length).to.equal(0);
            });
        });
        describe('when no child is provided', function() {
            it('should not render and warn', function() {
                var rowWithNoManyChildren = React.createElement(Row, {});
                var output;
                output = render(rowWithNoManyChildren);
                expect(output.children().length).to.equal(0);
            });
        })
    });
});