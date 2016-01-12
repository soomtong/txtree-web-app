var React = require('react');

var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var Common = require('./common.jsx');

var Link = Router.Link;

var storage = window.localStorage;

var Entry = React.createClass({
    render: function () {
        var data = this.props.data || {};
        var title, createdAt, time;

        if (data.title) {
            title = <h2 className="entry-title">
                <Link href={"/view/" + data._id}>
                    {data.title}
                </Link>
            </h2>;
        } else {
            title = <h2 className="entry-title" />
        }

        var text = data.text.split(/\r*\n/);
        var text_index = 0;
        var textNodes = text.map(function (item) {
            text_index++;
            return (
                <p className="summery" key={text_index}>{item}</p>
            );
        });

        time = Moment(data.created_at).fromNow();
        createdAt = <p className="entry-date">{time}</p>;

        return (
            <div className="entry">
                <Link href={"/view/" + data._id} className="entry-thumb">
                    {textNodes}
                </Link>

                <div className="entry-content">
                    {title}
                    {createdAt}
                </div>
            </div>
        );
    }
});

var EntryList = React.createClass({
    render: function () {
        var entryNodes = this.props.list.map(function (item) {
            return (
                <Entry data={item} key={item._id} />
            );
        });
        return (
            <div className="listing">
                {entryNodes}
            </div>
        );
    }
});

var FavoriteBox = React.createClass({
    getInitialState: function() {
        return {
            list: [],
            favoriteList: []
        };
    },
    updateList: function (error, result) {
        if (error) {
            this.setState({
                list: Common.list.data
            });
        } else {
            var data = result.body.data;

            if (this.isMounted() && data.count !== 0) {
                // remove unbound item
                if (this.state.favoriteList.length != data.count) {
                    var favoriteList = [];

                    data.list.map(function (item) {
                        favoriteList.push(item._id);
                    });

                    storage.setItem('favorite-list', JSON.stringify(favoriteList));
                }

                this.setState({
                    list: data.list
                });
            } else {
                this.setState({
                    list: Common.list.data
                });
            }
        }
    },
    loadFromServer: function (list) {
        var param = 'list';

        Request.post(Common.txtree.entryPoint + param)
            //.withCredentials()
            .send({ list: list, order: 'newest' })
            //.set('x-access-host', 'txtree')
            //.set('Access-Control-Allow-Origin', '*')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Accept', 'application/json')
            .end(this.updateList);
    },
    componentDidMount: function () {
        var list = [], data = storage.getItem('favorite-list');

        if (data) {
            list = JSON.parse(data);
        }

        this.setState({
            favoriteList: list
        });

        this.loadFromServer(list);
    },
    componentWillReceiveProps: function (nextProps) {
        //console.log('receive props', nextProps);
        this.loadFromServer(this.state.favoriteList);
    },
    render: function() {
        return (
            <EntryList list={this.state.list} />
        );
    }
});

module.exports = FavoriteBox;
