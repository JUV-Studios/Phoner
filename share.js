function shareCurrentPage() {
    var location = window.location.toString();
    var pagename = document.title;
    /*if (navigator.share) {
        navigator.share({ title: pagename, text: 'Phoner', url: window.location.href });
    }
    else {
        navigator.clipboard.writeText(window.location.href).then(function () {
            alert('Link copied to clipboard');
        }, function () {
            alert('We could not share this page.')
        });
    }*/
    navigator.share({
        title: pagename,
        text: 'Phoner',
        url: window.location.href,
      });
}