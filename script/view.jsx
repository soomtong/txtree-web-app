var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var Common = require('./common.jsx');

var Link = Router.Link;

var Entry = React.createClass({
    render: function () {
        var title, text, createdAt, time;

        if (this.props.data.title) {
            title = <h2 className="entry-title"><a href="/">{this.props.data.title}</a></h2>;
        } else {
            title = <h2 className="entry-title"></h2>
        }

        // need to check doc type or theme cuz, markdown parsing
        // and trim string by 3 line
        text = <p>{this.props.data.text}</p>;

        // use moment by require with browserify
        // todo: dynamic update for past time
        time = Moment(this.props.date).format('h:mm:ss a');
        createdAt = <p className="entry-date">{time}</p>;

        return (
            <div className="entry">
                <a className="entry-thumb" href={this.props.data._id}>
                    {text}
                </a>
                <div className="entry-content">
                    {title}
                    {createdAt}
                </div>
            </div>
        );
    }
});

var ViewBox = React.createClass({
    loadFromServer: function (id) {
        var theme = 'default';

        Request.get(Common.txtree.entryPoint + 'doc/' + id)
            //.withCredentials()
            .set('Accept', 'application/json')
            .query({ t: theme })
            .set('x-access-host', 'txtree')
            .end(function (err, res) {
                if (res && res.ok) {
                    console.log('yay got ' + JSON.stringify(res.body));
                    var data = result.body.data;

                    if (this.isMounted() && data.count !== 0) {
                        this.setState({
                            page: {
                                now: data.now,
                                total: data.total
                            },
                            list: data.list
                        });
                    } else {
                        this.setState({
                            page: {
                                now: 0,
                                total: Common.list.totalPage
                            },
                            list: Common.list.data
                        });
                    }
                } else {
                    alert('Oh no! errors there ' + res.text);
                }
            });
    },
    getInitialState: function () {
        return {
            data: this.props.id
        }
    },
    componentDidMount: function() {
        this.loadFromServer(this.props.id);
    },
    render: function() {
        return (
            <Entry data={this.state.data} />
        );
    }
});

module.exports = ViewBox;
