var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var Request = require("sdk/request").Request;


var Gag = function()
{
    "use strict";
    var that = this;
    var worker = null;
    var validCommands = ["like", "dislike", "comment", "next", "prev"];
    this.init = function()
    {
        pageMod.PageMod({
            include: /^(https?:\/\/)?(www\.)?9gag\.com(\/.*)?$/,
            contentScriptFile: self.data.url("9gag/contentscript.js"),
            onAttach: function(w) {
                worker = w;
                worker.on("detach", function() {that.changeState(false);});
                that.changeState(true);
            }
        });
    };

    this.onMessage = function(message)
    {
        console.log(message);
        if(validCommands.indexOf(message) !== -1)
        {
            worker.port.emit(message);
        }
    };

    this.changeState = function(state)
    {
        console.log("CHANGE STATE REQUIRED");
        var str_state = "stopped";
        if (state === true)
        {
            str_state = "started";
        }
        Request({ url: "http://127.0.0.1:34340/core",
            content: {"set": "\"" + str_state + "\"", "dest": "9gag"}
        }).get();
    };
};

exports.Gag = new Gag();
