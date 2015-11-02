var React = require('react');
var ReactDOM = require('react-dom');

var Common = require('./common.jsx');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            text: "# Markdown",
            hasKeep: false,
            useMarkdown: true
        };
    },
    componentDidMount: function() {

    },
    onChangeHasKeep() {
        this.setState({
            hasKeep: !this.state.hasEnd
        });
    },
    onChangeUseMarkdown() {
        this.setState({
            useMarkdown: !this.state.useMarkdown
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.refs.title.value.trim();
        var text = this.refs.content.value.trim();
        var keep = this.refs.keep.value.trim();
        var markdown = this.refs.markdown.value.trim();
        if (!text) {
            return;
        }
        // TODO: send request to the server

        return;
    },
    updateText: function() {
        console.log(this.refs.content.value.trim());
    },
    render: function () {
        return (
            <div className="page">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input ref="title" type="text" className="form-control" placeholder="Title input if Exist" />
                    </div>
                    <div className="form-group">
                        <textarea ref="content" className="form-control" rows="15" onChange={this.updateText} ></textarea>
                        <div className="checkbox">
                            <label><input ref="keep" type="checkbox" checked={this.state.hasKeep} onChange={this.onChangeHasKeep}/> Set due to</label>
                        </div>
                        <div className="checkbox">
                            <label><input ref="markdown" type="checkbox" checked={this.state.useMarkdown} onChange={this.onChangeUseMarkdown}/> Use markdown</label>
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