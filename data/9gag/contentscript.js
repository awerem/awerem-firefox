self.port.on("like", function (message) {
    inject("GAG.PostController.upvoteEntry(GAG.ListController.findCurrentlyInFocusEntry());");
});

self.port.on("dislike", function (message){
    inject("GAG.PostController.downvoteEntry(GAG.ListController.findCurrentlyInFocusEntry());");
});

self.port.on("jumpnext", function (message){
    inject("if (!GAG.Page.isPostPage()){ GAG.ListController.scrollToNextEntry();}");
});


function inject(script)
{
    tag = document.createElement("script");
    tag.innerHTML = script;
    document.body.appendChild(tag);
    document.body.removeChild(tag);
}
