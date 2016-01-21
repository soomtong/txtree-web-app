var q = "" + window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text;
var l = location.href;
if (!q || q.type != 'Range') {
    alert("You didn't select any text. Select phrase to Save for Txtree");
} else {
    var doc = ''.concat('\n[', l, '](', l, ')\n', '\n```\n', q, '\n```\n');
    var httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
            }
        }
    }
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
    } else {
        httpRequest.onReadyStateChange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    alert('Well done this request saved for Txtree');
                } else {
                    alert('There was a problem with the request.');
                }
            }
        };
        httpRequest.open('POST', 'http://haroocloud.com/api/tree/doc');
        httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        httpRequest.setRequestHeader("X-Access-Host", "txtree-bookmarklet");
        httpRequest.send(JSON.stringify({ theme: 'markdown/github', text: doc }));
    }
}
document.getElementById('txtree_embed').remove();