var React = require('react');

var Router = require('react-router-component');
var environment = Router.environment;

var Request = require('superagent');
var Keymage = require('keymage');

var ReactMarkdown = require('react-markdown');
var Codemirror = require('react-codemirror');

require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var Common = require('./common.jsx');

var isMac = navigator.userAgent.indexOf('Mac OS X') != -1;
var storage = window.localStorage;

var Editor = React.createClass({
    getInitialState: function() {
        var today = new Date();
        return {
            mode: false,
            text: '## Txtree document based on Markdown',
            hasKeep: false,
            keep: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                date: today.getDate()
            }
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

        // load data from local storage
        this.setState({
            text: storage.getItem('last-text') || this.state.text
        });

        window.addEventListener('resize', this.onWindowResize);

        this.onWindowResize();
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

        // save data to local storage
        storage.setItem('last-text', this.state.text);

        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize () {
        // http://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
        var height = window.innerHeight - 275;
        //console.log({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
        document.getElementsByClassName('CodeMirror')[0].style.minHeight = height + 'px';
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
            hasKeep: this.state.hasKeep,
            keep: this.state.keep,
            theme: 'markdown/github'
        };

        Request.post(Common.txtree.entryPoint + 'doc')
            .send(content)
            .set('Accept', 'application/json')
            .set('x-access-host', 'txtree')
            .end(function (err, res) {
                if (res && res.ok) {
                    // move to that document view page
                    // http://stackoverflow.com/questions/25374945/redirection-with-react-router-component
                    environment.defaultEnvironment.navigate('/');
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
    updateYear: function (e) {
        var keep = this.state.keep;
        keep.year = Number(e.target.value);

        this.setState({ keep: keep })
    },
    updateMonth: function (e) {
        var keep = this.state.keep;
        keep.month = Number(e.target.value);

        this.setState({ keep: keep })
    },
    updateDate: function (e) {
        var keep = this.state.keep;
        keep.date = Number(e.target.value);

        this.setState({ keep: keep })
    },
    render: function () {
        var editorOptions = {
            lineNumbers: true,
            viewportMargin: Infinity,
            mode: 'markdown',
            autoHeight: true,
            minHeight: function () {
                return 600;
            }
        };

        var icon = {
            edit: <span onClick={this.toggleState} className="preview glyphicon glyphicon-check" title={ (isMac? "CMD":"Ctrl") + "Enter"}/>,
            view: <span onClick={this.toggleState} className="edit glyphicon glyphicon-edit" title={ (isMac? "CMD":"Ctrl") + "Enter"}/>
        };

        var yearEntry = [2015, 2016, 2017].map(function (item) {
            return (
                <option key={item} value={item}>{item}</option>
            );
        });

        var monthEntry = [1,2,3,4,5,6,7,8,9,10,11,12].map(function (item) {
            return (
                <option key={item} value={item}>{item}</option>
            );
        });

        var year = this.state.keep.year;
        var month = this.state.keep.month;

        var leaf = (year % 4 == 0 && ( year % 100 != 0 || year % 400 == 0 ) ) ? 29 : 28;
        var days = [1, 31, leaf, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        var dateEntry = Common.range(1, days[month]).map(function (item) {
            return (
                <option key={item} value={item}>{item}</option>
            );
        });

        var panel = {
            edit: <Codemirror className="custom-editor" value={this.state.text} onChange={this.updateText} options={editorOptions} />,
            view: <ReactMarkdown className="custom-viewer" source={this.state.text} />,
            calendar: <div className="calendar">
                <select className="due-to-year" name="year" value={this.state.keep.year} onChange={this.updateYear}>{yearEntry}</select>
                <select className="due-to-month" name="month" value={this.state.keep.month} onChange={this.updateMonth}>{monthEntry}</select>
                <select className="due-to-day" name="date"value={this.state.keep.date} onChange={this.updateDate}>{dateEntry}</select>
            </div>
        };

        var selectedIcon = this.state.mode ? icon.view : icon.edit;
        var selectedPanel = this.state.mode ? panel.view : panel.edit;

        var dueToSelector = this.state.hasKeep? panel.calendar : '';

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
                            {dueToSelector}
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