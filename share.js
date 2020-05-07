function shareCurrentPage() {
    var location = window.location.toString();
    var pagename;
    if (window.location.hash == "#TipsForChoosingAPhone") {
        pagename = 'Tips for choosing a phone';
    }
    else {
        pagename = "Android vs iOS";
    }
    if (navigator.share) {
        navigator.share({ title: pagename, text: 'Phoner', url: window.location.href });
    }
    else {
        navigator.clipboard.writeText(window.location.href).then(function () {
            alert('Link copied to clipboard');
        }, function () {
            alert('We could not share this page.')
        });
    }
}