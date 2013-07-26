var aweremBridge = require("./aweremBridge").AweremBridge;
var gag = require("./9gag").Gag;

gag.init();
aweremBridge.register("9gag", gag.onMessage);
aweremBridge.startPolling();
