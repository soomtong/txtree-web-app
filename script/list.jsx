var React = require('react');
var ReactDOM = require('react-dom');

var Moment = require('moment');
var Request = require('superagent');

var Common = require('./common.jsx');

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

var PageNav = React.createClass({
    render: function () {
        var next, prev;

        if (this.props.now > 0) {
            if (this.props.now == 1) {
                prev = <a href='./' className="paginate newer">Newer</a>;
            } else {
                prev = <a href={this.props.now - 1} className="paginate newer">Newer</a>;
            }
        } else {
            prev = <span className="paginate previous">Newer</span>;
        }
        if (this.props.total > this.props.now) {
            next = <a href={Number(this.props.now) + 1} className="paginate older">Older</a>;
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
                <PageNav now={this.props.page.now} total={this.props.page.total}/>
            </div>
        );
    }
});

var ListBox = React.createClass({
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
        Request.get(Common.txtree.server + 'list')
            //.withCredentials()
            .query({ p: this.props.page, s: 2, order: 'newest' })
            //.set('x-access-host', 'txtree')
            //.set('Access-Control-Allow-Origin', '*')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Accept', 'application/json')
            .end(function(error, result){

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

                    if (this.isMounted()) {
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
                }               // Calling the end function will send the request
            }.bind(this));
    },
    render: function() {
        return (
            <EntryList list={this.state.list} page={this.state.page} />
        );
    }
});

ReactDOM.render(<ListBox page='1' />, document.getElementById('txtree_list'));
