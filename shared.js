window.onresize = function () {
    ShowHideSeperator();
}
window.onload = function () {
    document.getElementById('loader').style.display = "none";
    document.getElementById('elements').style.display = "block";
    ShowHideSeperator();
    if (window.location.hash) {
        openPage(event, window.location.hash.substr(1));
    } else {
        document.getElementById("defaultOpen").click();
    }
}
function openPage(evt, pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    try {
        evt.currentTarget.className += " active";
    }
    catch
    {

    }
    window.location.hash = "#" + pageName;
}

function loadSearch() {
    var input, filter, ul, li, a, i;
    input = document.getElementsByClassName("searchbox")[0];
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("tab")[0];
    li = ul.children;
    for (i = 1; i < li.length; i++) {
        if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
        ShowHideSeperator();
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

function ShowHideSeperator() {
    if (window.innerWidth <= 700) {
        document.getElementById("Seperator").style.display = "block";
    }
    else {
        document.getElementById("Seperator").style.display = "none";
    }
}