var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router-component');

//var Common = require('./common.jsx');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;
//var Link = Router.Link;

var MenuBox = require('./menu.jsx');

var ListBox = require('./list.jsx');
var EditorBox = require('./editor.jsx');
var FavoriteBox = require('./favorite.jsx');
var SearchBox = require('./search.jsx');
var ViewBox = require('./view.jsx');
var AboutBox = require('./about.jsx');
var BookmarkletBox = require('./bookmarklet.jsx');

var Menu = React.createClass({
    render: function() {
        return (
            <Locations>
                <Location path="/:menu" handler={MenuBox} />
                <Location path="/:menu/page/:page" handler={MenuBox} />
                <NotFound handler={MenuBox} />
            </Locations>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <Locations>
                <Location path="/" handler={ListBox} />
                <Location path="/about" handler={AboutBox} />
                <Location path="/bookmarklet" handler={BookmarkletBox} />
                <Location path="/create" handler={EditorBox} />
                <Location path="/favorite" handler={FavoriteBox} />
                <Location path="/search" handler={SearchBox} />
                <Location path="/page/:page" handler={ListBox} />
                <Location path="/:menu" handler={ListBox} />
                <Location path="/:menu/page/:page" handler={ListBox} />
                <Location path="/view/:id" handler={ViewBox} />
                <NotFound handler={ListBox} />
            </Locations>
        );
    }
});

ReactDOM.render(<Menu />, document.getElementById('txtree_menu'));
ReactDOM.render(<Main />, document.getElementById('txtree_main'));
