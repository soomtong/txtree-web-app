var React = require('react');

var ReactMarkdown = require('react-markdown');

var BookmarkletBox = React.createClass({
    getInitialState: function () {
        return {
            data: {
                text: `
# Bookmarklet for your browser

## Bookmarklet

Add this link button to your browser bookmark area
`
            }
        }
    },
    render: function() {
        return (
            <div className="viewing">
                <div className="view">
                    <ReactMarkdown className="custom-viewer markdown-body" source={this.state.data.text || ''}/>
                    <div className="panel panel-default">
                        <div className="panel-body bookmarklet">
                            <a href="javascript:(function(){ alert('hi') })();"><span className="glyphicon glyphicon-bookmark" /> Save to Txtree</a>
                        </div>
                        <div className="panel-footer">
                            Drag this link to your browser bookmark
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BookmarkletBox;
