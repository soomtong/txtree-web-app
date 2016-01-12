var React = require('react');

var Request = require('superagent');

var Common = require('./common.jsx');
var Entry = require('./entry.jsx');


var storage = window.localStorage;


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

var SearchBox = React.createClass({
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
        // http://stackoverflow.com/questions/28889826/react-set-focus-on-input-after-render
        //React.findDOMNode(this.refs.queryInput).focus();
        this.refs.queryInput.focus();

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
            <div className="search-box">
                <div className="listing query-box">
                    <form>
                        <input type="text" ref="queryInput" className="query-text" placeholder="Search" />
                        <button type="submit" className="query-button glyphicon glyphicon-search" />
                        <div className="sk-spinning-loader"></div>
                    </form>
                </div>
                <EntryList list={this.state.list} />
            </div>
        );
    }
});

module.exports = SearchBox;
