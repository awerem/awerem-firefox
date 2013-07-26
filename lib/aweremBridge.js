var Request = require("sdk/request").Request;
var timers = require("sdk/timers")

var AweremBridge = function() {
    "use strict";
    var _registrations = {};
    this._timer = null;
    this.triggerTimer = false;
    var that = this;

    this.register = function(name, callback)
    {
        _registrations[name] = callback;
    };

    this.unregister = function(name)
    {
        _registrations[name] = undefined;
    };

    this.startPolling = function()
    {
        this._timer = timers.setTimeout(this.poll, 0);
        this.triggerTimer = true;
    };

    this.stopPolling = function()
    {
        if(this._timer !== null)
        {
            timers.clearTimeout(this._timer);
            this.timer = null;
        }
        this.triggerTimer = false;
    };

    this.poll = function()
    {
        console.log("Request triggered");
        Request({
            url: "http://127.0.0.1:34340/core?get=infos&dest=firefox",
            onComplete: function (response) {
                that.triggerCallbacks(response.json);
                if(that.triggerTimer)
                {
                    that._timer = timers.setTimeout(that.poll, 0);
                }
            }
        }).get();
    };

    this.triggerCallbacks = function(calls)
    {
        if (calls === null)
        {
            return;
        }
        console.log(JSON.stringify(calls));
        for(var key in calls)
        {
            if(typeof _registrations[key] === "function")
            {
                for(var i = calls[key].length-1; i >= 0; i--)
                {
                    _registrations[key](calls[key][i]);
                }
            }
        }
    };
};


exports.AweremBridge = new AweremBridge();
