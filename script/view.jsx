var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var ReactMarkdown = require('react-markdown');

var Common = require('./common.jsx');

var Entry = React.createClass({
    render: function () {
        var data = this.props.data;

        // todo: dynamic update for past time
        var time = Moment(data.created_at).format('h:mm:ss a');

        return (
            <div className="view">
                <h2 className="entry-title page-header">{data.title || ''}</h2>
                <p className="entry-date">{time}</p>
                <ReactMarkdown className="custom-viewer" source={data.text || ''} />
            </div>
        );
    }
});

var ViewBox = React.createClass({
    updateView: function (err, res) {
        if (res && res.ok) {
            var data = res.body.data;

            this.setState({ data: data });
        } else {
            this.setState({ data: {} });
        }
    },
    loadFromServer: function (id) {
        var theme = 'default';

        Request.get(Common.txtree.entryPoint + 'doc/' + id)
            //.withCredentials()
            .set('Accept', 'application/json')
            .query({ t: theme })
            .set('x-access-host', 'txtree')
            .end(this.updateView);
    },
    getInitialState: function () {
        return {
            data: {}
        }
    },
    componentDidMount: function() {
        this.loadFromServer(this.props.id);
    },
/*
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log(nextProps, nextState);
        return nextState.data && nextProps.id !== nextState.data._id;
    },
*/
    render: function() {
        return (
            <div className="viewing">
                <Entry data={this.state.data}/>
            </div>
        );
    }
});

module.exports = ViewBox;
