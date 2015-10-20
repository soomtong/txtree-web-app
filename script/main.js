var TxtreeData = {
    title: 'Txtree',
    version: '1.0',
    menu1: [
        {
            title: 'Home',
            link: './',
            active: true
        },
        {
            title: 'Curate',
            link: './curate',
            active: false
        },
        {
            title: 'Favorite',
            link: './favorite',
            active: false
        }
    ],
    menu2: [
        {
            title: 'Create New Document',
            link: './create',
            active: false
        },
        {
            title: 'Search',
            link: './search',
            active: false
        }
    ],
    menu3: [
        {
            title: 'About',
            link: './about',
            active: false
        },
        {
            title: 'Bookmarklet',
            link: './bookmarklet',
            active: false
        }
    ],
    menuLink: function (active) {
        return active ? 'nav-link nav-link-active' : 'nav-link';
    }

};

var Title = React.createClass({
    render: function () {
        return (
            <h1 className="masthead-title">
                <a href="/">{TxtreeData.title}</a>
            </h1>
        );
    }
});

var Lead = React.createClass({
    render: function () {
        return (
            <p className="masthead-lead">
                Some anonymous documents of <a href="http://txtree.net">Txtree</a> hosted by <a href="http://haroocloud.com">Haroo Cloud</a>.
            </p>
        );
    }
});

var Nav = React.createClass({
    render: function () {
        var linkNodes = this.props.data.map(function (menu) {
            return (
                <li className="nav-item" key={ menu.link }>
                    <a className={ TxtreeData.menuLink(menu.active) } href={ menu.link }>{ menu.title }</a>
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
        return (
            <div className="btn-group">
                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">List Order <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    <li><a href="#">Newest</a></li>
                    <li><a href="#">Hottest</a></li>
                    <li><a href="#">Coldest</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Oldest</a></li>
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
                <Nav data={ TxtreeData.menu1 } />
                <hr className="masthead-hr" />
                <Nav data={ TxtreeData.menu2 } />
                <ListOrder />
                <hr className="masthead-hr" />
                <Nav data={ TxtreeData.menu3 } />
                <hr className="masthead-hr" />
                <AdBox />
                <hr className="masthead-hr visible-xs" />
            </div>
        );
    }
});

ReactDOM.render(<MenuBox />, document.getElementById('txtree_menu'));
