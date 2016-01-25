var React = require('react');

var ReactMarkdown = require('react-markdown');
var Common = require('./common.jsx');

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
        var host = Common.txtree.entryPoint.indexOf('localhost') > -1;
        var name = <span><span className="glyphicon glyphicon-bookmark" /><span>Save to Txtree</span></span>;
        var link = {
            dev: <a href="javascript:(function(){var el=document.createElement('script');el.setAttribute('src','http://localhost:3031/embed/bookmarklet'),el.setAttribute('id','txtree_embed');document.body.appendChild(el);})();">{name}</a>,
            live: <a href="javascript:(function(){var el=document.createElement('script');el.setAttribute('src','https://txtree.xyz/embed/bookmarklet');el.setAttribute('id','txtree_embed');document.body.appendChild(el);})();">{name}</a>
        };

        return (
            <div className="viewing">
                <div className="view">
                    <ReactMarkdown className="custom-viewer markdown-body" source={this.state.data.text || ''}/>
                    <div className="panel panel-default">
                        <div className="panel-body bookmarklet">
                            {host ? link.dev : link.live}
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
