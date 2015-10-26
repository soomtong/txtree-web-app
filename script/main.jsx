var Menu = require('./menu.jsx');
var List = require('./list.jsx');

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var MainPage = React.createClass({
    render: function () {
        return (
            <List load={this.props.page || '0'} />
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Menu />
                <Locations>
                    <Location path="/" handler={MainPage} />
                    <Location path="/page/:page" handler={MainPage} />
                </Locations>
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
