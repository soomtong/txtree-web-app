var React = require('react');
var ReactDOM = require('react-dom');

var Common = require('./common.jsx');

var EditorBox = React.createClass({
    render: function() {
        return (
            <div className="editing">
                Markdown editor here
            </div>
        );
    }
});

module.exports = EditorBox;