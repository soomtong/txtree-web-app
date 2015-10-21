var React = require('react');
var ReactDOM = require('react-dom');

var Common = require('./common.jsx');

var Title = React.createClass({
    render: function () {
        return (
            <h1 className="masthead-title">
                <a href="/">{Common.txtree.title}</a>
            </h1>
        );
    }
});

var Lead = React.createClass({
    render: function () {
        return (
            <p className="masthead-lead">
                Some anonymous documents of <a href="http://txtree.net">{Common.txtree.title}</a> hosted by <a href="http://haroocloud.com">Haroo Cloud</a>
            </p>
        );
    }
});

var Nav = React.createClass({
    render: function () {
        var linkNodes = this.props.data.map(function (menu) {
            return (
                <li className="nav-item" key={menu.title}>
                    <a className={Common.menu.menuLink(menu.active)} href={menu.link}>{menu.title}</a>
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
                        <a href={menu.link}>{menu.title}</a>
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
                <Nav data={Common.menu.menu1} />
                <hr className="masthead-hr" />
                <Nav data={Common.menu.menu2} />
                <ListOrder data={Common.menu.menu4}/>
                <hr className="masthead-hr" />
                <Nav data={Common.menu.menu3} />
                <hr className="masthead-hr" />
                <AdBox />
                <hr className="masthead-hr visible-xs" />
            </div>
        );
    }
});

ReactDOM.render(<MenuBox />, document.getElementById('txtree_menu'));
