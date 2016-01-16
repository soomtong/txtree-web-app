var React = require('react');

var ReactMarkdown = require('react-markdown');

var AboutBox = React.createClass({
    getInitialState: function () {
        return {
            data: {
                text: `
# Share Text Document Anonymously.

## About Txtree

Txtree is a anonymous repository. You can put your text documents on the HarooCloud server, and we'll keep them there for you.
So, it's like an anonymous paste bin?

It's like a paste bin but for markdown text document.

## Usage

create markdown document in '/create' menu

use toggle view/edit mode for your document review

- toggle button below in editor area
- keyboard short cut CTRL+ENTER (CMD+RETURN on Mac)

## Privacy Information

Txtree use local storage for your latest document saving. and only one cookie dropped in browser for your session.

This site does not use any tracking or logging features.

## FAQ

### Edit or Delete my document?

No, it can't. just shared document has no ownership. Txtree don't know who make this document.

But u can set erase time for your document, use 'Set due to' feature.

## Disclaimer

All source code and development logs exists in Github repository. Visit Here.

- [Txtree](https://github.com/soomtong/txtree-web-app)
- [Haroo Cloud Core](https://github.com/soomtong/haroo-cloud-core)


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
