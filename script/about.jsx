var React = require('react');

var ReactMarkdown = require('react-markdown');

var AboutBox = React.createClass({
    getInitialState: function () {
        return {
            data: {
                text: `
# Share document anonymously.

## About Txtree

Txtree is a anonymous repository. You can put your text documents on the HarooCloud server, and we'll keep them there for you.
So, it's like an anonymous paste bin?

It's like a paste bin but for markdown text document.

## Usage

create markdown document in '/create' menu

use toggle view/edit mode for your document review

- toggle button below in editor area
- keyboard short cut CTRL+ENTER (CMD+RETURN on Mac)
`
            }
        }
    },
    render: function() {
        return (
            <div className="viewing">
                <div className="view">
                    <ReactMarkdown className="custom-viewer markdown-body" source={this.state.data.text || ''}/>
                </div>
            </div>
        );
    }
});

module.exports = AboutBox;
