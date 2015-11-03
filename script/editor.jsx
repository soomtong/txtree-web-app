var React = require('react');
var ReactDOM = require('react-dom');
var ReactMarkdown = require('react-markdown');

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
            hasKeep: !this.state.hasKeep
        });
    },
    onChangeUseMarkdown() {
        this.setState({
            useMarkdown: !this.state.useMarkdown
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var text = this.refs.content.value.trim();

        if (!text) {
            return;
        }

        // TODO: send request to the server
        var content = {
            title: this.refs.title.value.trim() || '',
            text: text,
            keep: this.refs.keep.value.trim() || '',
            markdown: this.refs.markdown.value.trim() || ''
        };

        //console.log(content);

        return;
    },
    updateText: function() {
        this.setState({
            text: this.refs.content.value.trim()
        });
        console.log(this.refs.content.value.trim());
    },
    render: function () {
        return (
            <div className="page">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input ref="title" type="text" className="form-control" placeholder="Title input if Exist" />
                    </div>
                    <div className="form-group position-holder">
                        <textarea ref="content" className="form-control" rows="15" onChange={this.updateText} ></textarea>
                        <div className="checkbox">
                            <label><input ref="keep" type="checkbox" checked={this.state.hasKeep} onChange={this.onChangeHasKeep}/> Set due to</label>
                        </div>
                        <div className="checkbox">
                            <label><input ref="markdown" type="checkbox" checked={this.state.useMarkdown} onChange={this.onChangeUseMarkdown}/> Use markdown</label>
                        </div>
                        <div className="control">
                            <div className="preview">
                                <span className="glyphicon glyphicon-check"></span>
                            </div>
                            <div className="edit">
                                <span className="glyphicon glyphicon-edit"></span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" className="btn">Submit</button>
                    <hr/>
                    <ReactMarkdown source={this.state.text} />
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