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
            favoriteList: [],
            commendedList: [],
            claimedList: []
        };
    },
    componentDidMount: function () {
        var favoriteList = [], commendedList = [], claimedList = [];
        var favoriteData = storage.getItem('favorite-list'), commendedData = storage.getItem('commended-list'), claimedData = storage.getItem('claimed-list');

        if (favoriteData) {
            favoriteList = JSON.parse(favoriteData);
        }

        if (commendedData) {
            commendedList = JSON.parse(commendedData);
        }

        if (claimedData) {
            claimedList = JSON.parse(claimedData);
        }

        this.setState({
            favoriteList: favoriteList,
            commendedList: commendedList,
            claimedList: claimedList
        });
    },
    updateFeedbackToServer: function (id, params) {
        var content = {
            type: params.type,
            acc: params.acc
        };

        Request.post(Common.txtree.entryPoint + 'feedback/' + id)
            .send(content)
            .set('Accept', 'application/json')
            .set('x-access-host', 'txtree')
            .end(this.updateView);
    },
    setCommend: function (e) {
        e.preventDefault();

        this.updateFeedbackToServer(this.props.id, { type: 'commend', acc: true });

        var list = Array.isArray(this.state.commendedList) ? this.state.commendedList : [];

        if (list.length) {
            list.push(this.props.id);
        } else {
            list = [this.props.id];
        }

        this.setState({
            commendedList: list
        });

        storage.setItem('commended-list', JSON.stringify(list));
    },
    unsetCommend: function (e) {
        e.preventDefault();

        this.updateFeedbackToServer(this.props.id, { type: 'commend', acc: false });

        var list = Array.isArray(this.state.commendedList) ? this.state.commendedList : [];

        var that = this;
        var filtered = list.filter(function (item) {
            return item != that.props.id;
        });

        this.setState({
            commendedList: filtered
        });

        storage.setItem('commended-list', JSON.stringify(filtered));
    },
    setClaim: function (e) {
        e.preventDefault();

        this.updateFeedbackToServer(this.props.id, { type: 'claim', acc: true });

        var list = Array.isArray(this.state.claimedList) ? this.state.claimedList : [];

        if (list.length) {
            list.push(this.props.id);
        } else {
            list = [this.props.id];
        }

        this.setState({
            claimedList: list
        });

        storage.setItem('claimed-list', JSON.stringify(list));

        console.log('favorite',this.state.favoriteList);
        console.log('commended',this.state.commendedList);
        console.log('claimed',this.state.claimedList);
    },
    unsetClaim: function (e) {
        e.preventDefault();

        this.updateFeedbackToServer(this.props.id, { type: 'claim', acc: false });

        var list = Array.isArray(this.state.claimedList) ? this.state.claimedList : [];

        var that = this;
        var filtered = list.filter(function (item) {
            return item != that.props.id;
        });

        this.setState({
            claimedList: filtered
        });

        storage.setItem('claimed-list', JSON.stringify(filtered));

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

        storage.setItem('favorite-list', JSON.stringify(list));
    },
    unsetFavorite: function (e) {
        e.preventDefault();
        var list = Array.isArray(this.state.favoriteList) ? this.state.favoriteList : [];

        var that = this;
        var filtered = list.filter(function (item) {
            return item != that.props.id;
        });

        this.setState({
            favoriteList: filtered
        });

        storage.setItem('favorite-list', JSON.stringify(filtered));
    },
    render: function () {
        var title, feedback, favorite, commend, claim;
        var data = this.props.data, time = Moment(data.created_at).format('gggg-M-D h:mm:ss a');

        if (data.title) {
            title = <h2 className="entry-title page-header">{data.title}</h2>;
        }

        if (this.state.commendedList.indexOf(this.props.id) > -1) {
            commend = <span className="glyphicon glyphicon-thumbs-up" onClick={this.unsetCommend}></span>;
        } else {
            commend = <span className="glyphicon glyphicon-thumbs-up feedback-able" onClick={this.setCommend}></span>;
        }

        if (this.state.claimedList.indexOf(this.props.id) > -1) {
            claim = <span className="glyphicon glyphicon-thumbs-down" onClick={this.unsetClaim}></span>;
        } else {
            claim = <span className="glyphicon glyphicon-thumbs-down feedback-able" onClick={this.setClaim}></span>;
        }

        if (this.state.favoriteList.indexOf(this.props.id) > -1) {
            favorite = <span className="glyphicon glyphicon-star" title="Marked Favorite" onClick={this.unsetFavorite}></span>;
        } else {
            favorite = <span className="glyphicon glyphicon-star-empty" title="Click to Mark Favorite" onClick={this.setFavorite}></span>;
        }

        feedback = <p className="entry-date">{time}
            <span className="view"><span className="glyphicon glyphicon-eye-open"></span> {data['view_count'] || 0}</span>
            <span className="commend">{commend} {data['commend_count'] || 0}</span>
            <span className="claim">{claim} {data['claim_count'] || 0}</span>
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
        var theme = 'markdown/github';

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
