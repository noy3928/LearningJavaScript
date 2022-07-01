import { PageComponent } from "./components/page/page.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { ImageComponent } from "./components/page/item/image.js";
import { VideoComponent } from "./components/page/item/video.js";
var App = (function () {
    function App(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        var image = new ImageComponent("Image Title", "https://picsum.photos/600/300");
        image.attachTo(appRoot, "beforeend");
        var video = new VideoComponent("Video Title", "https://youtu.be/K3-jG52XwuQ");
        video.attachTo(appRoot, "beforeend");
        var note = new NoteComponent("Note Title", "Note Body");
        note.attachTo(appRoot, "beforeend");
        var todo = new TodoComponent("Todo Title", "Todo Item");
        todo.attachTo(appRoot, "beforeend");
    }
    return App;
}());
export { App };
new App(document.querySelector(".document"));
