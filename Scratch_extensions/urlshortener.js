(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
   var title = "";
   var shortUrl = "about:blank";
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    ext.shorten = function (url){
    fetch('https://is.gd/create.php?format=simple&url=' + url + (title.length > 0 ? "&shortUrl=" + title : "")).then(function(response) {
  return response.text();
}).then(function(text) {
  shortUrl = text
});};
ext.long = function (url,call){
    fetch('https://is.gd/forward.php?format=simple&shortUrl=' + url).then(function(response) {
  return response.text();
}).then(function(text) {
  call(text)
});};
ext.openlong = function (url){if(url.startsWith("https://is.gd/") || url.startsWith("http://is.gd/")){location.href = url}else{alert("Failed to open " + url + " because it is not a short URL.")}};
    ext.url = function (){return shortUrl}
    ext.title = function (t){title = t}
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
        [" ","shorten %s","shorten","https://google.com"],
        ["r","short url","url"],
        [" ","customise to id.gd/ %s","title","google"],
        ["-"],
        ["R","long url of %s","long","https://is.gd/google"],
        [" ","open url %s","openlong","https://is.gd/google"]
        ]
    };

    // Register the extension
    ScratchExtensions.register('URL Shortener', descriptor, ext);
})({});
