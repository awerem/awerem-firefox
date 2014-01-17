self.port.on("like", function () {
    "use strict";
    console.log("called");
    inject("GAG.PostController.upvoteEntry(GAG.ListController.findCurrentlyInFocusEntry());");
});

self.port.on("dislike", function (){
    "use strict";
    inject("GAG.PostController.downvoteEntry(GAG.ListController.findCurrentlyInFocusEntry());");
});

self.port.on("next", function (){
    "use strict";
    console.log("go next");
    inject("if (!GAG.Page.isPostPage()){ GAG.ListController.scrollToNextEntry();}");
});


function inject(script)
{
    "use strict";
    var tag = document.createElement("script");
    tag.innerHTML = script;
    document.body.appendChild(tag);
    document.body.removeChild(tag);
}
