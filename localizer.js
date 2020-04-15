if (navigator.languages[0] == "en-us")
{
    var elements = document.getElementsByClassName("colourStr");
    for (var i = 0; i < elements.length; i++)
    {
        var str = elements[i].innerHTML;
        var result = str.replace("Colour(s)", "Color(s)");
        elements[i].innerHTML = result;
    }
}