var React = require('react');

var Router = require('react-router-component');

var Common = require('./common.jsx');

var Link = Router.Link;

var Title = React.createClass({
    render: function () {
        return (
            <h1 className="masthead-title">
                <Link href={`${Common.menu.menu1[0].link}`}>{Common.txtree.title}</Link>
            </h1>
        );
    }
});

var Lead = React.createClass({
    render: function () {
        return (
            <p className="masthead-lead">
                Some anonymous documents of <Link href={`${Common.menu.menu1[0].link}`}>{Common.txtree.title}</Link> hosted by <a href="http://haroocloud.com" target="_blank">Haroo Cloud</a>
            </p>
        );
    }
});

var Nav = React.createClass({
    render: function () {
        var now = this.props.menu ? this.props.menu + '/' : '';

        var linkNodes = this.props.data.map(function (menu) {
            var active = ('/' + now == (menu.link));

            return (
                <li className="nav-item" key={menu.title}>
                    <Link className={Common.menu.menuLink(active)} href={`${menu.link}`}>{menu.title}</Link>
                </li>
            );
        });
        return (
            <ul className="masthead-nav">
                {linkNodes}
            </ul>
        );
    }
});

var ListOrder = React.createClass({
    render: function () {
        var listNodes = this.props.data.map(function (menu) {
            if (menu.link) {
                return (
                    <li key={menu.title}>
                        <Link href={`${menu.link}`}>{menu.title}</Link>
                    </li>
                );
            } else {
                return (
                    <li role="separator" className="divider" key={menu.title}></li>
                );
            }
        });
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">List Order <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {listNodes}
                </ul>
            </div>
        );
    }
});

var AdBox = React.createClass({
    render: function () {
        return (
            <div id="related_display">
                <div className="txtree-ad">
                    Advertise Area
                </div>
            </div>
        );
    }
});

var MenuBox = React.createClass({
    render: function() {
        return (
            <div className="masthead">
                <Title />
                <Lead />
                <hr className="masthead-hr" />
                <Nav data={Common.menu.menu1} menu={this.props.menu} />
                <hr className="masthead-hr" />
                <Nav data={Common.menu.menu2} menu={this.props.menu} />
                <ListOrder data={Common.menu.menu4} menu={this.props.menu} />
                <hr className="masthead-hr" />
                <Nav data={Common.menu.menu3} menu={this.props.menu} />
                <hr className="masthead-hr" />
                <AdBox />
                <hr className="masthead-hr visible-xs" />
            </div>
        );
    }
});

module.exports = MenuBox;
