window.onresize = showHideSeperator;
let originalTitle;
function initMasterDetail() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('elements').style.display = "block";
    if (window.location.hash) {
        openPage(event, window.location.hash.substr(1));
    } else {
        document.getElementById("defaultOpen").click();
    }
    showHideSeperator();
    originalTitle = document.title;
}

function openPage(evt, pageName, isbtn) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByTagName('article');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName('tab')[0].getElementsByTagName('button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    window.location.hash = "#" + pageName;
    if (isbtn) {
        evt.currentTarget.className += " active"; 1
        document.title = evt.currentTarget.getAttribute('aria-label') + " - " + originalTitle;
    }
}

function loadSearch() {
    var input, filter, ul, li, a, i;
    input = document.getElementsByClassName("searchbox")[0];
    filter = input.value.toUpperCase();
    ul = document.getElementById("tablinks");
    li = ul.children;
    for (i = 0; i < li.length; i++) {
        if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
        showHideSeperator();
    }
}
function launchUri(uri) {
    try {
        if (confirm('Do you want to navigate to this link? Do this only if you trust it.')) {
            window.open(uri);
        }
        else {
            return;
        }
    }
    catch (_a) {
        throw "The launcher service can't launch this URL. It might not exists";
    }
}

function showHideSeperator() {
    if (window.innerWidth <= 800) {
        document.getElementById("Seperator").style.display = "block";
    }
    else {
        document.getElementById("Seperator").style.display = "none";
    }
}