var React = require('react');

//var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var ReactMarkdown = require('react-markdown');

var Common = require('./common.jsx');

var storage = window.localStorage;

var Entry = React.createClass({
    getInitialState: function() {
        return {
            feedback: {
                commend: this.props.data['commend_count'],
                claim: this.props.data['claim_count']
            },
            favoriteList: [],
            commendList: [],
            claimList: []
        };
    },
    componentDidMount: function () {
        var favoriteList = [], commendedList = [], claimedList = [];
        var favoriteData = storage.getItem('favorite-list'),
            commendData = storage.getItem('commend-list'),
            claimData = storage.getItem('claim-list');

        if (favoriteData) {
            favoriteList = JSON.parse(favoriteData);
        }

        if (commendData) {
            commendedList = JSON.parse(commendData);
        }

        if (claimData) {
            claimedList = JSON.parse(claimData);
        }

        this.setState({
            favoriteList: favoriteList,
            commendList: commendedList,
            claimList: claimedList
        });
    },
    updateFeedbackToServer: function (id, params, callback) {
        var content = {
            type: params.type,
            acc: params.acc
        };

        Request.post(Common.txtree.entryPoint + 'feedback/' + id)
            .send(content)
            .set('Accept', 'application/json')
            .set('x-access-host', 'txtree')
            .end(callback);
    },
    setCommend: function (e) {
        e.preventDefault();
        var that = this;
        this.updateFeedbackToServer(this.props.id, { type: 'commend', acc: '+1' }, function (req, res) {
            var list = Array.isArray(that.state.commendList) ? that.state.commendList : [];

            if (list.length) {
                list.push(that.props.id);
            } else {
                list = [that.props.id];
            }

            if (res && res.ok) {
                var feedback = {
                    commend: res.body.data['commend_count'],
                    claim: res.body.data['claim_count']
                };
                that.setState({
                    commendList: list,
                    feedback: feedback
                });

                storage.setItem('commend-list', JSON.stringify(list));
            }
        });
    },
    unsetCommend: function (e) {
        e.preventDefault();
        var that = this;
        this.updateFeedbackToServer(this.props.id, { type: 'commend', acc: '-1' }, function (req, res) {
            var list = Array.isArray(that.state.commendList) ? that.state.commendList : [];

            var filtered = list.filter(function (item) {
                return item != that.props.id;
            });

            if (res && res.ok) {
                var feedback = {
                    commend: res.body.data['commend_count'],
                    claim: res.body.data['claim_count']
                };

                that.setState({
                    commendList: filtered,
                    feedback: feedback
                });

                storage.setItem('commend-list', JSON.stringify(filtered));
            }
        });
    },
    setClaim: function (e) {
        e.preventDefault();
        var that = this;
        this.updateFeedbackToServer(this.props.id, { type: 'claim', acc: '+1' }, function (req, res) {
            var list = Array.isArray(that.state.claimList) ? that.state.claimList : [];

            if (list.length) {
                list.push(that.props.id);
            } else {
                list = [that.props.id];
            }

            if (res && res.ok) {
                var feedback = {
                    commend: res.body.data['commend_count'],
                    claim: res.body.data['claim_count']
                };

                that.setState({
                    claimList: list,
                    feedback: feedback
                });

                storage.setItem('claim-list', JSON.stringify(list));
            }
        });
    },
    unsetClaim: function (e) {
        e.preventDefault();
        var that = this;
        this.updateFeedbackToServer(this.props.id, { type: 'claim', acc: '-1' }, function (req, res) {
            var list = Array.isArray(that.state.claimList) ? that.state.claimList : [];

            var filtered = list.filter(function (item) {
                return item != that.props.id;
            });

            if (res && res.ok) {
                var feedback = {
                    commend: res.body.data['commend_count'],
                    claim: res.body.data['claim_count']
                };

                that.setState({
                    claimList: filtered,
                    feedback: feedback
                });

                storage.setItem('claim-list', JSON.stringify(filtered));
            }
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

        if (this.state.commendList.indexOf(this.props.id) > -1) {
            commend = <span className="glyphicon glyphicon-thumbs-up" onClick={this.unsetCommend} />;
        } else {
            commend = <span className="glyphicon glyphicon-thumbs-up feedback-able" onClick={this.setCommend} />;
        }

        if (this.state.claimList.indexOf(this.props.id) > -1) {
            claim = <span className="glyphicon glyphicon-thumbs-down" onClick={this.unsetClaim} />;
        } else {
            claim = <span className="glyphicon glyphicon-thumbs-down feedback-able" onClick={this.setClaim} />;
        }

        if (this.state.favoriteList.indexOf(this.props.id) > -1) {
            favorite = <span className="glyphicon glyphicon-star" title="Marked Favorite" onClick={this.unsetFavorite} />;
        } else {
            favorite = <span className="glyphicon glyphicon-star-empty" title="Click to Mark Favorite" onClick={this.setFavorite} />;
        }

        feedback = <p className="entry-date">{time}
            <span className="view"><span className="glyphicon glyphicon-eye-open" /> {data['view_count'] || 0}</span>
            <span className="commend">{commend} {this.state.feedback['commend'] > -1 ? this.state.feedback['commend'] : data['commend_count']}</span>
            <span className="claim">{claim} {this.state.feedback['claim'] > -1 ? this.state.feedback['claim'] : data['claim_count']}</span>
            <span className="divider" />
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
                <Entry data={this.state.data} id={this.props.id} />
            </div>
        );
    }
});

module.exports = ViewBox;
