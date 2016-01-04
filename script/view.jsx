var React = require('react');

var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var ReactMarkdown = require('react-markdown');

var Common = require('./common.jsx');

var storage = window.localStorage;

var Entry = React.createClass({
    getInitialState: function() {
        return {
            favoriteList: []
        };
    },
    componentDidMount: function () {
        var list = [], data = storage.getItem('fav-list');

        if (data) {
            list = JSON.parse(data);
        }

        this.setState({
            favoriteList: list
        });
    },
    setFavorite: function (e) {
        e.preventDefault();

        var list = Array.isArray(this.state.favoriteList) ? this.state.favoriteList : [];

        if (list.length) {
            list.push(this.props.id);
        } else {
            list = [this.props.id];
        }

        this.setState({
            favoriteList: list
        });

        storage.setItem('fav-list', JSON.stringify(list));
    },
    unsetFavorite: function (e) {
        e.preventDefault();
        var list = Array.isArray(this.state.favoriteList) ? this.state.favoriteList : [];

        var that = this;
        var filtered = list.filter(function (item) {
            return item != that.props.id;
        });
        //list.filter(item => item != this.props.id);

        this.setState({
            favoriteList: filtered
        });

        storage.setItem('fav-list', JSON.stringify(filtered));
    },
    render: function () {
        var title, feedback, favorite, data = this.props.data, time = Moment(data.created_at).format('gggg-M-D h:mm:ss a');

        if (data.title) {
            title = <h2 className="entry-title page-header">{data.title}</h2>;
        }

        if (this.state.favoriteList.indexOf(this.props.id) > -1) {
            favorite = <span className="glyphicon glyphicon-star" title="Marked Favorite" onClick={this.unsetFavorite}></span>;
        } else {
            favorite = <span className="glyphicon glyphicon-star-empty" title="Click to Mark Favorite" onClick={this.setFavorite}></span>;
        }

        feedback = <p className="entry-date">{time}
            <span className="view"><span className="glyphicon glyphicon-eye-open"></span> {data['view_count'] || 0}</span>
            <span className="commend"><span className="glyphicon glyphicon-thumbs-up"></span> {data['commend_count'] || 0}</span>
            <span className="claim"><span className="glyphicon glyphicon-thumbs-down"></span> {data['claim_count'] || 0}</span>
            <span className="divider"></span>
            <span className="favorite">{favorite}</span>
        </p>;

        return (
            <div className="view">
                {title}
                {feedback}
                <ReactMarkdown className="custom-viewer markdown-body" source={data.text || ''} />
            </div>
        );
    }
});

var ViewBox = React.createClass({
    getInitialState: function () {
        return {
            data: {}
        }
    },
    componentDidMount: function() {
        this.loadFromServer(this.props.id);
    },
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
    render: function() {
        return (
            <div className="viewing">
                <Entry data={this.state.data} id={this.props.id}/>
            </div>
        );
    }
});

module.exports = ViewBox;
