function getBrowserLanguage()
{
    var language = window.navigator.userLanguage || window.navigator.language;
    return language;
}