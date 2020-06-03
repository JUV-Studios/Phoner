let originalTitle;
window.onresize = changeSeperatorState;

document.onmouseover = function () {
    window.innerDocClick = true;
}

document.onmouseleave = function () {
    window.innerDocClick = false;
}

window.onhashchange = function () {
    if (!window.innerDocClick) {
        var i, tablinks;
        tablinks = document.getElementsByClassName('tab')[0].getElementsByTagName('button');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        setCurrentPage(window.location.hash.substr(1));
    }
}

function initMasterDetail() {
    originalTitle = document.title;
    document.getElementById('loader').style.display = "none";
    document.getElementById('elements').style.display = "block";
    if (window.location.hash) {
        setCurrentPage(window.location.hash.substr(1));
    } else {
        document.getElementById("defaultOpen").click();
    }
    changeSeperatorState();
    window.scrollTo(0, 0);
}

function openPage(evt, pageName) {
    setCurrentPage(pageName);
    var i, tablinks;
    tablinks = document.getElementsByClassName('tab')[0].getElementsByTagName('button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    document.title = evt.currentTarget.getAttribute('aria-label') + " - " + originalTitle;
}

function loadSearch() {
    var input, filter, ul, li, i;
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
        changeSeperatorState();
    }
}

function launchUri(uri) {
    window.open(uri);
}

function changeSeperatorState() {
    if (window.innerWidth <= 800) {
        document.getElementById("Seperator").className = "horizontalSeperator";
    }
    else {
        document.getElementById("Seperator").className = "verticalSeperator";
    }
}

function setCurrentPage(pageName) {
    let i;
    let tabcontent = document.getElementsByTagName('article');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(pageName).style.display = "block";
    window.location.hash = "#" + pageName;
}