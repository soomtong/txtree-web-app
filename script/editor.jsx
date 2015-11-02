var React = require('react');
var ReactDOM = require('react-dom');

var Common = require('./common.jsx');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            code: "# Markdown"
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
    render: function () {
        return (
            <div className="page">
                <form className="form-horizontal">
                    <div className="form-group">
                        <input name="title" type="text" className="form-control" placeholder="Title input if Exist" />
                    </div>
                    <div className="form-group">
                        <textarea name="content" className="form-control" rows="15"></textarea>
                        <div className="checkbox">
                            <label><input name="set" type="checkbox" value="" /> Set due to</label>
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        );
    }
});

var EditorBox = React.createClass({
    render: function() {
        return (
            <div className="editing">
                <Editor />
            </div>
        );
    }
});

module.exports = EditorBox;