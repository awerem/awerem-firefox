var tabs = require("sdk/tabs");

var Firefox = function()
{
    "use strict";
    var that = this;
    this.onMessage = function(message)
    {
        console.log(JSON.stringify(message));
        if (message.command === "change_hist")
        {
            that.change_hist(message.howmany);
        }
    };

    this.change_hist = function(howmany)
    {
        if (typeof(howmany) !== "number")
        {
            return;
        }
        tabs.activeTab.attach({
            contentScript: "history.go(" + howmany + ");"
        });
    };
};

exports.Firefox = new Firefox();
