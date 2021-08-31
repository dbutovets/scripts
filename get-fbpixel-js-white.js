<div id="x"></div>
<script>
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

var pixel = findGetParameter('x');

var img = document.createElement("img");
img.src = "https://www.facebook.com/tr?id=" + pixel + "&ev=PageView&noscript=1";
src = document.getElementById("x");
src.appendChild(img);
</script>
