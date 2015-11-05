var React = require('react');
var ReactDOM = require('react-dom');
var ReactMarkdown = require('react-markdown');
var Codemirror = require('react-codemirror');

require('codemirror/mode/markdown/markdown');

var Common = require('./common.jsx');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            mode: false,
            text: "# Markdown",
            hasKeep: false
        };
    },
    componentDidMount: function() {

    },
    onChangeHasKeep() {
        this.setState({
            hasKeep: !this.state.hasKeep
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var text = this.state.text.trim();

        if (!text) {
            return;
        }

        // TODO: send request to the server
        var content = {
            title: this.refs.title.value.trim() || '',
            text: text,
            keep: this.state.hasKeep,
            markdown: this.state.useMarkdown,
        };

        console.log(content);

        return;
    },
    handlePreviewToggle: function (e) {
        if (e.altKey && e.ctrlKey && e.keyCode === 13) {
            e.preventDefault();

            this.setState({ mode: !this.state.mode});
        }
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

        var panel = {
            edit: <Codemirror className="custom-editor" value={this.state.text} onChange={this.updateText} options={options} />,
            view: <ReactMarkdown className="custom-viewer" source={this.state.text} />
        };

        var toggle = this.state.mode ? icon.view : icon.edit;
        var preview = this.state.mode ? panel.view : panel.edit;

        return (
            <div className="page" onKeyUp={this.handlePreviewToggle}>
                <div className="form-group">
                    <input ref="title" type="text" className="form-control" placeholder="Title input if Exist" />
                </div>

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group position-holder">

                        {preview}

                        <div className="checkbox">
                            <label><input type="checkbox" checked={this.state.hasKeep} onChange={this.onChangeHasKeep}/> Set due to</label>
                        </div>
                        <div className="control">
                            {toggle}
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