var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router-component');

var Moment = require('moment');
var Request = require('superagent');

var Common = require('./common.jsx');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;
var Link = Router.Link;

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
        var next, prev, now = this.props.now || 0;

        console.log('now : ' , now);
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
    loadFromServer: function () {
        Request.get(Common.txtree.entryPoint + 'list')
            //.withCredentials()
            .query({ p: this.props.page, s: Common.list.pageSize, order: 'newest' })
            //.set('x-access-host', 'txtree')
            //.set('Access-Control-Allow-Origin', '*')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Accept', 'application/json')
            .end(Common.updateList.bind(this));
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
        console.log('mount :', this.props.page);
        this.loadFromServer();
    },
    render: function() {
        console.log('render : ', this.props.page);

        return (
            <EntryList list={this.state.list} page={this.state.page} now={this.props.page} />
        );
    }
});

/*
var ListBoxWithPage = React.createClass({
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
        console.log('mount :', this.props.page);

        Request.get(Common.txtree.entryPoint + 'list')
            //.withCredentials()
            .query({ p: this.props.page, s: Common.list.pageSize, order: 'newest' })
            //.set('x-access-host', 'txtree')
            //.set('Access-Control-Allow-Origin', '*')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Accept', 'application/json')
            .end(Common.updateList.bind(this));
    },
    render: function() {
        console.log('render : ', this.props.page);

        return (
            <EntryList list={this.state.list} page={this.state.page} now={this.props.page} />
        );
    }
});
*/

var List = React.createClass({
    render: function() {
        return (
            <Locations>
                <Location path="/" handler={ListBox}/>
                <Location path="/page/:page" handler={ListBox}/>
                <NotFound handler={ListBox} />
            </Locations>
        );
    }
});

ReactDOM.render(<List />, document.getElementById('txtree_list'));
