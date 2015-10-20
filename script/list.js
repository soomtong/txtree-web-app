var listData = {
    list: [
        {
            _id: "1",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium amet commodi,eius eligendi enim fugit harum neque officiis sit tempore tenetur veniam voluptas! Dolores earumexcepturi illo incidunt reiciendis.",
            title: "a new title",
            created_at: Date.now()
        },
        {
            _id: "2",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium amet commodi,eius eligendi enim fugit harum neque officiis sit tempore tenetur veniam voluptas! Dolores earumexcepturi illo incidunt reiciendis.",
            title: "a new title",
            created_at: Date.now()
        },
        {
            _id: "3",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium amet commodi,eius eligendi enim fugit harum neque officiis sit tempore tenetur veniam voluptas! Dolores earumexcepturi illo incidunt reiciendis.",
            created_at: Date.now()
        }
    ]
};

var Entry = React.createClass({
    render: function () {
        var title, text, createdAt;

        if (this.props.data.title) {
            title = <h2 className="entry-title"><a href="/">{this.props.data.title}</a></h2>;
        } else {
            title = <h2 className="entry-title"></h2>
        }

        // need to check doc type or theme cuz, markdown parsing
        // and trim string by 3 line
        text = <p>{this.props.data.text}</p>;

        // use moment by require with browserify
        createdAt = <p className="entry-date">{Date(this.props.data.created_at)}</p>;

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

var EntryList = React.createClass({
    render: function () {
        var entryNodes = this.props.data.map(function (item) {
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

var ListBox = React.createClass({
    render: function() {
        return (
            <EntryList data={listData.list}/>
        );
    }
});

ReactDOM.render(<ListBox />, document.getElementById('txtree_list'));
