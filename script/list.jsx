var React = require('react');

var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var Common = require('./common.jsx');

var Link = Router.Link;

var Entry = React.createClass({
    render: function () {
        var data = this.props.data || {};
        var title, createdAt, time;

        if (data.title) {
            title = <h2 className="entry-title">
                <Link href={'/view/' + data._id}>
                    {data.title}
                </Link>
            </h2>;
        } else {
            title = <h2 className="entry-title"></h2>
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
                <Link href={'/view/' + data._id} className="entry-thumb">
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

var PageNav = React.createClass({
    render: function () {
        var next, prev, now = this.props.now || 0;
        var menu = this.props.menu;

        // go simple, it's better for string manipulation or inject string
        if (menu) {
            if (now > 0) {
                if (now == 1) {
                    prev = <Link href={'/' + menu} className="paginate newer">Newer</Link>;
                } else {
                    prev = <Link href={'/' + menu + '/page/' + `${Number(now) - 1}`} className="paginate newer">Newer</Link>;
                }
            } else {
                prev = <span className="paginate previous">Newer</span>;
            }

            if (this.props.total > Number(now) + 1) {
                next = <Link href={'/' + menu + '/page/' + `${Number(now) + 1}`} className="paginate older">Older</Link>;
            } else {
                next = <span className="paginate next">Older</span>;
            }
        } else {
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
                <PageNav now={this.props.now} total={this.props.page.total} menu={this.props.menu}/>
            </div>
        );
    }
});

var ListBox = React.createClass({
    propTypes: {
        menu: React.PropTypes.string,
        page: React.PropTypes.string,
        id: React.PropTypes.string
        //_query: React.PropTypes.object
    },
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
        console.log('mounted',this.props);
        this.loadFromServer(this.props.page);
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('received',nextProps);
        this.loadFromServer(nextProps.page);
    },
    render: function() {
        console.log('rendered');
        return (
            <EntryList list={this.state.list} page={this.state.page} now={this.props.page} menu={this.props.menu} />
        );
    }
});

module.exports = ListBox;
