import { app } from "./class/App";
import $ from "jquery";

app.addCategories();


app.getFormEvent().submit (function ( event ) {

    event.preventDefault();

    if (app.getSubmit().val() == "Editer") {

        app.updateEvent();

        app.resetForm();

    }

    else if (app.getSubmit().val() == "Ajouter") {


        app.addEvent();

        app.resetForm();

    }
    

});


app.getEvents().on("click", ".remove, .edit", function() {

    const $this = $(this);
    const $parent : JQuery<HTMLDivElement> = $this.parent() as  JQuery<HTMLDivElement>;

    const $events: JQuery<HTMLDivElement> = app.getEvents().find(".event") as JQuery<HTMLDivElement>;

    const position :number = $events.index ($parent) as number;

    if ($this.hasClass("remove") ) {

        app.deleteEvent( position, $parent);
    }
    else if ($this.hasClass("edit") ) {

        app.editEvent (position);
    }

});



