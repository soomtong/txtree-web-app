var React = require('react');
var ReactDOM = require('react-dom');
var ReactMarkdown = require('react-markdown');
var Codemirror = require('react-codemirror');

require('codemirror/mode/markdown/markdown');

var Common = require('./common.jsx');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            mode: 0,
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

        var text = this.state.text.value.trim();

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

        console.log(content);

        return;
    },
    updateText: function(newText) {
        this.setState({
            text: newText
        });
    },
    render: function () {
        var options = {
            lineNumbers: true,
            mode: 'markdown'
        };

        var icon = {
            edit: <span className="preview glyphicon glyphicon-check"></span>,
            view: <span className="edit glyphicon glyphicon-edit"></span>
        };

        var toggle = this.state.mode ? icon.view : icon.edit;

        return (
            <div className="page">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input ref="title" type="text" className="form-control" placeholder="Title input if Exist" />
                    </div>
                    <div className="form-group position-holder">
                        <Codemirror className="custom-editor" value={this.state.text} onChange={this.updateText} options={options} />

                        <div className="checkbox">
                            <label><input ref="keep" type="checkbox" checked={this.state.hasKeep} onChange={this.onChangeHasKeep}/> Set due to</label>
                        </div>
                        <div className="checkbox">
                            <label><input ref="markdown" type="checkbox" checked={this.state.useMarkdown} onChange={this.onChangeUseMarkdown}/> Use markdown</label>
                        </div>
                        <div className="control">
                            {toggle}
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