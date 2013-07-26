var aweremBridge = require("./aweremBridge").AweremBridge;
var gag = require("./9gag").Gag;
var firefox = require("./firefox").Firefox;

gag.init();
aweremBridge.register("9gag", gag.onMessage);
aweremBridge.register("firefox", firefox.onMessage);
aweremBridge.startPolling();
