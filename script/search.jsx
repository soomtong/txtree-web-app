var React = require('react');

var Request = require('superagent');

var Common = require('./common.jsx');
var Entry = require('./entry.jsx');

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
            list: []
        };
    },
    componentDidMount: function () {
        // http://stackoverflow.com/questions/28889826/react-set-focus-on-input-after-render
        //React.findDOMNode(this.refs.queryInput).focus();
        this.refs.queryInput.focus();
    },
    componentWillReceiveProps: function (nextProps) {
        //console.log('receive props', nextProps);
        this.loadFromServer();
    },
    handleSubmit: function (e) {
        e.preventDefault();
        return false;
    },
    loadFromServer: function () {
        var param = 'search';
        var query = this.refs.queryInput.value;

        this.refs.queryButton.style.display = 'none';
        this.refs.queryLoader.style.display = 'block';

        //console.log(query);

        Request.post(Common.txtree.entryPoint + param)
            //.withCredentials()
            .send({ query: query, order: 'newest' })
            //.set('x-access-host', 'txtree')
            //.set('Access-Control-Allow-Origin', '*')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Accept', 'application/json')
            .end(this.updateList);

    },
    updateList: function (error, result) {
        this.refs.queryButton.style.display = 'block';
        this.refs.queryLoader.style.display = 'none';

        if (error) {
            this.setState({
                list: Common.list.data
            });
        } else {
            var data = result.body.data;

            if (this.isMounted() && data.count !== 0) {
                // remove unbound item
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
    render: function() {
        return (
            <div className="search-box">
                <div className="listing query-box">
                    <form id="search_form" onSubmit={this.handleSubmit}>
                        <input type="text" ref="queryInput" className="query-text" placeholder="Search" />
                        <button type="submit" ref="queryButton" className="query-button glyphicon glyphicon-search" onClick={this.loadFromServer} />
                        <div ref="queryLoader" className="query-loader sk-spinning-loader"></div>
                    </form>
                </div>
                <EntryList list={this.state.list} />
            </div>
        );
    }
});

module.exports = SearchBox;
