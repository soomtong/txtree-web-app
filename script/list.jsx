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

        if (this.props.now > 1) {
            prev = <a href={this.props.now - 1} className="paginate newer">Newer</a>;
        }
        if (this.props.total > this.props.now) {
            next = <a href={this.props.now + 1} className="paginate older">Older</a>;
        }

        return (
            <div className="paginator">
                {prev}
                {next}
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
                now: 1,
                total: 1
            }
        }
    },
    componentDidMount: function() {
        Request.post('./api/pet.json')
            .send({ page: 1 })
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end(function(error, result){
                // Calling the end function will send the request
                if (this.isMounted()) {
                    this.setState({
                        page: {
                            now: result.body.thisPage,
                            total: result.body.totalPage
                        },
                        list: result.body.data
                    });
                }
            }.bind(this));
    },
    render: function() {
        return (
            <EntryList list={this.state.list} page={this.state.page} />
        );
    }
});

ReactDOM.render(<ListBox page={Common.txtree.page}/>, document.getElementById('txtree_list'));
