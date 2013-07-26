var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

Gag = new function() {
    var worker = null;
    var validCommands = ["like", "dislike", "comment", "next", "prev"];
    this.init = function()
    {
        pageMod.PageMod({
            include: /.*9gag.com.*/,
            contentScriptFile: self.data.url("9gag/contentscript.js"),
            onAttach: function(w) {
                worker = w;
            }
        });
    };

    this.onMessage = function(message)
    {
        if(validCommands.indexOf(message) != -1)
        {
            worker.port.emit(message);
        }
    };
}();

exports.Gag = Gag
