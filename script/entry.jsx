var React = require('react');
var Moment = require('moment');

var Router = require('react-router-component');
var Link = Router.Link;

var Entry = React.createClass({
    render: function () {
        var data = this.props.data || {};
        var title, createdAt, time;

        if (data.title) {
            title = <h2 className="entry-title">
                <Link href={"/view/" + data._id}>
                    {data.title}
                </Link>
            </h2>;
        } else {
            title = <h2 className="entry-title" />
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
                <Link href={"/view/" + data._id} className="entry-thumb">
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

module.exports = Entry;