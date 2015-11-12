var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router-component');
var environment = Router.environment;

var Request = require('superagent');
var Keymage = require('keymage');

var ReactMarkdown = require('react-markdown');
var Codemirror = require('react-codemirror');

require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var Common = require('./common.jsx');

var isMac = navigator.userAgent.indexOf("Mac OS X") != -1;

var Editor = React.createClass({
    getInitialState: function() {
        return {
            mode: false,
            text: "## Txtree document based on Markdown",
            hasKeep: false
        };
    },
    componentDidMount: function() {
        var that = this;

        if (isMac) {
            Keymage('cmd-enter', function() {
                that.toggleState();
            });
        } else {
            Keymage('ctrl-enter', function() {
                that.toggleState();
            });
        }
    },
    componentWillUnmount: function () {
        var that = this;

        if (isMac) {
            Keymage.unbind('cmd-enter', function () {
                that.toggleState();
            });
        } else {
            Keymage.unbind('ctrl-enter', function () {
                that.toggleState();
            });
        }
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
            keep: this.state.hasKeep
        };

        Request.post(Common.txtree.entryPoint + 'doc')
            .send(content)
            .set('Accept', 'application/json')
            .set('x-access-host', 'txtree')
            .end(function (err, res) {
                if (res && res.ok) {
                    console.log('yay got ' + JSON.stringify(res.body));

                    // move to that document view pag
                    // http://stackoverflow.com/questions/25374945/redirection-with-react-router-component
                    environment.defaultEnvironment.navigate("/");
                } else {
                    alert('Oh no! errors there ' + res.text);
                }
            });

        return false;
    },
    handlePreviewToggle: function (e) {
        if (e.altKey && e.ctrlKey && e.keyCode === 13) {
            e.preventDefault();

            this.toggleState();
        }
    },
    toggleState: function () {
        this.setState({ mode: !this.state.mode});
    },
    updateText: function(newText) {
        this.setState({
            text: newText
        });
    },
    render: function () {
        var editorOptions = {
            lineNumbers: true,
            viewportMargin: Infinity,
            mode: 'markdown'
        };

        var icon = {
            edit: <span onClick={this.toggleState} className="preview glyphicon glyphicon-check" title={ (isMac? 'CMD':'Ctrl') + 'Enter'}></span>,
            view: <span onClick={this.toggleState} className="edit glyphicon glyphicon-edit" title={ (isMac? 'CMD':'Ctrl') + 'Enter'}></span>
        };

        var panel = {
            edit: <Codemirror className="custom-editor" value={this.state.text} onChange={this.updateText} options={editorOptions} />,
            view: <ReactMarkdown className="custom-viewer" source={this.state.text} />
        };

        var selectedIcon = this.state.mode ? icon.view : icon.edit;
        var selectedPanel = this.state.mode ? panel.view : panel.edit;

        return (
            <div className="page">
                <div className="form-group">
                    <input ref="title" type="text" className="form-control" placeholder="Title input if Exist" />
                </div>

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group position-holder">

                        {selectedPanel}

                        <div className="checkbox">
                            <label><input type="checkbox" checked={this.state.hasKeep} onChange={this.onChangeHasKeep}/> Set due to</label>
                        </div>
                        <div className="control">
                            {selectedIcon}
                        </div>
                    </div>
                    <hr/>
                    <button type="submit" className="btn btn-default">Submit</button>
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