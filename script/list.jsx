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
            title = <h2 className="entry-title">
                <Link href={'/view/' + this.props.data._id}>
                    {this.props.data.title}
                </Link>
            </h2>;
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
                <Link href={'/view/' + this.props.data._id} className="entry-thumb">
                    {text}
                </Link>

                <div className="entry-content">
                    {title}
                    {createdAt}
                </div>
            </div>
        );
    }
});

var PageNav = React.createClass({
    render: function () {
        var next, prev, now = this.props.now || 0;

        if (now > 0) {
            if (now == 1) {
                prev = <Link href='/' className="paginate newer">Newer</Link>;
            } else {
                prev = <Link href={'/page/' + `${Number(now) - 1}`} className="paginate newer">Newer</Link>;
            }
        } else {
            prev = <span className="paginate previous">Newer</span>;
        }

        if (this.props.total > Number(now) + 1) {
            next = <Link href={'/page/' + `${Number(now) + 1}`} className="paginate older">Older</Link>;
        } else {
            next = <span className="paginate next">Older</span>;
        }

        return (
            <div className="paginator">
                {next}
                {prev}
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
                <PageNav now={this.props.now} total={this.props.page.total}/>
            </div>
        );
    }
});

var ListBox = React.createClass({
    updateList: function (error, result) {
        if (error) {
            this.setState({
                page: {
                    now: 0,
                    total: Common.list.totalPage
                },
                list: Common.list.data
            });
        } else {
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
        }
    },
    loadFromServer: function (page) {
        Request.get(Common.txtree.entryPoint + 'list')
            //.withCredentials()
            .query({ p: page, s: Common.list.pageSize, order: 'newest' })
            //.set('x-access-host', 'txtree')
            //.set('Access-Control-Allow-Origin', '*')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Accept', 'application/json')
            .end(this.updateList);
    },
    getInitialState: function () {
        return {
            list: [],
            page: {
                now: 0,
                total: 0
            }
        }
    },
    componentDidMount: function() {
        this.loadFromServer(this.props.page);
    },
    componentWillReceiveProps: function (nextProps) {
        this.loadFromServer(nextProps.page);
    },
    render: function() {
        return (
            <EntryList list={this.state.list} page={this.state.page} now={this.props.page} />
        );
    }
});

module.exports = ListBox;
