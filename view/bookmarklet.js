var txtreeEmbed = {
    element: 'txtree_embed',
    location: location.href,
    selection: "" + window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text,
    httpRequest: null,
    getHttpRequest: function () {
        if (window.XMLHttpRequest) this.httpRequest = new XMLHttpRequest();
        else if (window.ActiveXObject) { // IE
            try { this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP"); }
            catch (e) {
                try { this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); }
                catch (e) { }
            }
        }

        return this;
    },
    postHttpRequest: function () {
        var httpRequest = this.httpRequest;
        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return;
        }
        httpRequest.onReadyStateChange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    alert('Well done this request saved for Txtree');
                } else {
                    alert('There was a problem with the request.');
                }
            }
        };
        httpRequest.open('POST', '{{hostname}}/api/tree/doc');
        httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        httpRequest.setRequestHeader("X-Access-Host", "txtree-bookmarklet");
        httpRequest.send(JSON.stringify({ theme: 'markdown/github', text: doc }));

        return this;
    },
    closeEmbed: function () {
        document.getElementById(this.element).remove();
    }
}; if (txtreeEmbed.selection && txtreeEmbed.selection.type == 'Range') {
    var textArray = [
        '[' + txtreeEmbed.location + '](' + txtreeEmbed.location + ')',
        '```',
        txtreeEmbed.selection,
        '```'
    ];
    var doc = textArray.join('\n');
    txtreeEmbed.getHttpRequest().postHttpRequest().closeEmbed();
} else {
    alert("You didn't select any text. Select phrase to Save for Txtree");
    txtreeEmbed.closeEmbed();
}