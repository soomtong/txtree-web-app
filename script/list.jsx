var React = require('react');

var Router = require('react-router-component');

var Request = require('superagent');

var Common = require('./common.jsx');
var Entry = require('./entry.jsx');

var Link = Router.Link;

var PageNav = React.createClass({
    render: function () {
        var next, prev, now = this.props.now || 0;
        var menu = this.props.menu;

        // go simple, it's better for string manipulation or inject string
        if (menu) {
            if (now > 0) {
                if (now == 1) {
                    //prev = <Link href={'/' + menu} className="paginate newer">Newer</Link>;
                    prev = <Link href={`/${menu}`} className="paginate newer">Newer</Link>;
                } else {
                    //prev = <Link href={'/' + menu + '/page/' + `${Number(now) - 1}`} className="paginate newer">Newer</Link>;
                    prev = <Link href={`/${menu}/page/${Number(now) - 1}`} className="paginate newer">Newer</Link>;
                }
            } else {
                prev = <span className="paginate previous">Newer</span>;
            }

            if (this.props.total > Number(now) + 1) {
                next = <Link href={`/${menu}/page/${Number(now) + 1}`} className="paginate older">Older</Link>;
            } else {
                next = <span className="paginate next">Older</span>;
            }
        } else {
            if (now > 0) {
                if (now == 1) {
                    prev = <Link href="/" className="paginate newer">Newer</Link>;
                } else {
                    prev = <Link href={`/page/${Number(now) - 1}`} className="paginate newer">Newer</Link>;
                }
            } else {
                prev = <span className="paginate previous">Newer</span>;
            }

            if (this.props.total > Number(now) + 1) {
                next = <Link href={`/page/${Number(now) + 1}`} className="paginate older">Older</Link>;
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
/*
    propTypes: {
        menu: React.PropTypes.string,
        page: React.PropTypes.string,
        id: React.PropTypes.string
        //_query: React.PropTypes.object
    },
*/
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
    loadFromServer: function (page, menu) {
        // filtering menu string
        if (Common.menu.menuList.indexOf(menu) == -1) menu = null;

        var param = 'list';

        if (menu == 'today' || menu == 'curate') {
            param = menu;
            menu = 'newest';
        }

        Request.get(Common.txtree.entryPoint + param)
            //.withCredentials()
            .query({ p: page, s: Common.list.pageSize, order: menu ? menu : 'newest' })
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
        //console.log('did mounted', this.props);
        this.loadFromServer(this.props.page, this.props.menu);
    },
    componentWillReceiveProps: function (nextProps) {
        //console.log('receive props', nextProps);
        this.loadFromServer(nextProps.page, nextProps.menu);
    },
    render: function() {
        return (
            <EntryList list={this.state.list} page={this.state.page} now={this.props.page} menu={this.props.menu} />
        );
    }
});

module.exports = ListBox;
