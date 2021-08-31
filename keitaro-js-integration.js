(function() {
    var getQueryVariable = function(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }

    var getHash = function(s) {
        var h = 0, l = s.length, i = 0;

        if (l > 0) {
            while (i < l) {
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
            }
        }

        return 'k' + Math.abs(h).toString();
    }

    var id = getQueryVariable('k');
    var domain = getQueryVariable('d');

    if (!id) {
        return;
    }

    if (!domain) {
        domain = 'kt.ulysse.team';
    }

    var name = getHash(domain + id);

    if (!window[name]) {
        window[name] = {
            unique: false,
            ttl: 86400,
            R_PATH: 'https://' + domain + '/' + id,
        };
    }

    const config_json = localStorage.getItem('config');
    if (typeof config_json !== 'undefined' && config_json !== null) {
        var config = JSON.parse(config_json);
        var expire = Math.round(+new Date()/1000);

        if (config.created_at + window[name].ttl < expire) {
            localStorage.removeItem('subId');
            localStorage.removeItem('token');
            localStorage.removeItem('config');
        }
    }

    var sub_id = localStorage.getItem('subId');
    var token = localStorage.getItem('token');

    var args = '?return=js.client';
        args += '&' + decodeURIComponent(window.location.search.replace('?', ''));
        args += '&se_referrer=' + encodeURIComponent(document.referrer);
        args += '&default_keyword=' + encodeURIComponent(document.title);
        args += '&landing_url=' + encodeURIComponent(document.location.hostname + document.location.pathname);
        args += '&name=' + encodeURIComponent(name);
        args += '&host=' + encodeURIComponent(window[name].R_PATH);

    if (typeof sub_id !== 'undefined' && sub_id && window[name].unique) {
        args += '&sub_id=' + encodeURIComponent(sub_id);
    }

    if (typeof token !== 'undefined' && token && window[name].unique) {
        args += '&token=' + encodeURIComponent(token);
    }

    var a = document.createElement('script');
    a.type = 'application/javascript';
    a.src = window[name].R_PATH + args;

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(a, s);
})();
