System.register("class/Service", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var API_BASE_URL, Service;
    return {
        setters: [],
        execute: function () {
            API_BASE_URL = "http://localhost/APIS/WS_TP/";
            Service = class Service {
                getAllCategories(callback) {
                    $.ajax({
                        url: API_BASE_URL + "categories",
                        dataType: 'json',
                        method: "GET",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                showEvents(callback) {
                    $.ajax({
                        url: API_BASE_URL + "events",
                        dataType: 'json',
                        method: "GET",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                createEvent(datas, callback) {
                    $.ajax({
                        url: API_BASE_URL + "event",
                        dataType: "json",
                        method: "POST",
                        data: datas,
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                getEventById(id, callback) {
                    $.ajax({
                        url: API_BASE_URL + "event/" + id,
                        dataType: "json",
                        method: "GET",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                removeEvent(id, callback) {
                    $.ajax({
                        url: API_BASE_URL + "event/" + id,
                        dataType: "json",
                        method: "DELETE",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                editEvent(id, datas, callback) {
                    $.ajax({
                        url: API_BASE_URL + "event/" + id,
                        dataType: 'json',
                        method: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify(datas),
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            };
            exports_1("Service", Service);
        }
    };
});
System.register("class/Evenement", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Evenement;
    return {
        setters: [],
        execute: function () {
            Evenement = class Evenement {
                constructor(id, nom, description, date, lieu, id_categorie) {
                    this.$nom = $('.nom');
                    this.$description = $('.desc');
                    this.$date = $('.date');
                    this.$lieu = $('.lieu');
                    this.$cat = $('.cat');
                    this.id = id;
                    this.nom = nom;
                    this.description = description;
                    this.date = date;
                    this.lieu = lieu;
                    this.id_categorie = id_categorie;
                }
                getId() {
                    return this.id;
                }
                getDescription() {
                    return this.description;
                }
                getDate() {
                    return this.date;
                }
                getNom() {
                    return this.nom;
                }
                getLieu() {
                    return this.lieu;
                }
                getId_categorie() {
                    return this.id_categorie;
                }
                setNom(nom) {
                    this.nom = nom;
                }
                setDescription(description) {
                    this.description = description;
                }
                setDate(date) {
                    this.date = date;
                }
                setLieu(lieu) {
                    this.lieu = lieu;
                }
                setId_categorie(id_categorie) {
                    this.id_categorie = id_categorie;
                }
                update(category) {
                    this.$nom.html(this.nom);
                    this.$description.html(this.description);
                    this.$date.html(this.date);
                    this.$lieu.html(this.lieu);
                    this.$cat.html(category);
                }
                render(parent, category) {
                    let html = "<div class='event'>";
                    html += "<div class='edit'>📝</div>";
                    html += "<div class='remove'>X</div>";
                    html += "</div>";
                    this.$nom = $('<h3>' + this.nom + '</h3>');
                    this.$description = $('<p>' + this.description + '</p>');
                    this.$date = $('<p>' + this.date + '</p>');
                    this.$lieu = $('<p>' + this.lieu + '</p>');
                    this.$cat = $('<p>' + category + '</p>');
                    this.$dom = $(html);
                    this.$dom.append(this.$nom);
                    this.$dom.append(this.$description);
                    this.$dom.append(this.$date);
                    this.$dom.append(this.$lieu);
                    this.$dom.append(this.$cat);
                    parent.append(this.$dom);
                }
            };
            exports_2("Evenement", Evenement);
        }
    };
});
System.register("class/App", ["class/Service", "class/Evenement", "jquery"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Service_1, Evenement_1, jquery_1, App, app;
    return {
        setters: [
            function (Service_1_1) {
                Service_1 = Service_1_1;
            },
            function (Evenement_1_1) {
                Evenement_1 = Evenement_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.form_events = jquery_1.default('#add-event');
                    this.nom_event = jquery_1.default('#nom');
                    this.desc_event = jquery_1.default('#description');
                    this.date_event = jquery_1.default('#date');
                    this.lieu_event = jquery_1.default('#lieu');
                    this.cat_event = jquery_1.default('#list');
                    this.submit = jquery_1.default('#submit');
                    this.events = jquery_1.default('#events');
                    this.list = jquery_1.default('#list');
                    this.evenements = [];
                    this.categories = [];
                    this.service = new Service_1.Service();
                }
                getFormEvent() {
                    return this.form_events;
                }
                getSubmit() {
                    return this.submit;
                }
                getEvents() {
                    return this.events;
                }
                getCatEvent() {
                    return this.cat_event;
                }
                getNomEvent() {
                    return this.nom_event;
                }
                getDescEvent() {
                    return this.desc_event;
                }
                getDateEvent() {
                    return this.date_event;
                }
                getLieuEvent() {
                    return this.lieu_event;
                }
                getEvenements() {
                    return this.evenements;
                }
                resetForm() {
                    this.nom_event.val("");
                    this.desc_event.val("");
                    this.lieu_event.val("");
                    this.date_event.val("");
                    this.submit.val("Ajouter");
                }
                addCategories() {
                    this.service.getAllCategories((datas) => {
                        if (datas.success) {
                            for (let data of datas.categories) {
                                this.categories.push(data);
                                let option = jquery_1.default('<option></option>');
                                option.html(data.categorie);
                                option.val(data.id);
                                option.appendTo(this.list);
                            }
                            this.getAllEvents();
                        }
                    });
                }
                getAllEvents() {
                    this.service.showEvents((datas) => {
                        if (datas.success) {
                            for (let data of datas.evenements) {
                                this.generateEvent(data);
                            }
                        }
                    });
                }
                generateEvent(data) {
                    let category = "";
                    for (let cat of this.categories) {
                        if (cat.id == data.id_categorie) {
                            category = cat.categorie;
                        }
                    }
                    const new_event = new Evenement_1.Evenement(data.id, data.nom, data.description, data.date, data.lieu, data.id_categorie);
                    new_event.render(this.events, category);
                    this.evenements.push(new_event);
                }
                addEvent() {
                    const categorie = jquery_1.default('#list :selected').val();
                    const nom = this.getNomEvent().val();
                    const description = this.getDescEvent().val();
                    const date = this.getDateEvent().val();
                    const lieu = this.getLieuEvent().val();
                    const create_event = {
                        nom: nom,
                        description: description,
                        date: date,
                        lieu: lieu,
                        id_categorie: categorie
                    };
                    this.service.createEvent(create_event, (datas) => {
                        if (datas.success) {
                            this.service.getEventById(datas.id, (data) => {
                                this.generateEvent(data.evenement);
                            });
                        }
                        else {
                            console.log("Raté !!!!!!");
                        }
                    });
                }
                deleteEvent(position, $parent) {
                    const evenement = this.getEvenements()[position];
                    this.service.removeEvent(evenement.id, (datas) => {
                        if (datas.success) {
                            $parent.remove();
                            this.getEvenements().splice(position, 1);
                        }
                    });
                }
                editEvent(position) {
                    this.editedEvent = this.evenements[position];
                    this.submit.val("Editer");
                    this.nom_event.val(this.editedEvent.getNom());
                    this.desc_event.val(this.editedEvent.getDescription());
                    this.date_event.val(this.editedEvent.getDate());
                    this.lieu_event.val(this.editedEvent.getLieu());
                    this.list.val(this.editedEvent.getId_categorie());
                }
                updateEvent() {
                    const nom = this.nom_event.val();
                    const description = this.desc_event.val();
                    const date = this.date_event.val();
                    const lieu = this.lieu_event.val();
                    const id_categorie = this.list.val();
                    const update_data = {
                        nom: nom,
                        description: description,
                        date: date,
                        lieu: lieu,
                        id_categorie: id_categorie
                    };
                    this.service.editEvent(this.editedEvent.getId(), update_data, (datas) => {
                        if (datas.success) {
                            this.editedEvent.setNom(nom);
                            this.editedEvent.setDescription(description);
                            this.editedEvent.setDate(date);
                            this.editedEvent.setLieu(lieu);
                            this.editedEvent.setId_categorie(id_categorie);
                            let category = "";
                            for (let cat of this.categories) {
                                if (cat.id == this.editedEvent.getId_categorie()) {
                                    category = cat.categorie;
                                }
                            }
                            this.editedEvent.update(category);
                            this.resetForm();
                        }
                        else {
                            console.log("UPDATE PERDU !!!");
                        }
                    });
                }
            };
            app = new App;
            exports_3("app", app);
        }
    };
});
System.register("main", ["class/App", "jquery"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var App_1, jquery_2;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (jquery_2_1) {
                jquery_2 = jquery_2_1;
            }
        ],
        execute: function () {
            App_1.app.addCategories();
            App_1.app.getFormEvent().submit(function (event) {
                event.preventDefault();
                if (App_1.app.getSubmit().val() == "Editer") {
                    App_1.app.updateEvent();
                    App_1.app.resetForm();
                }
                else if (App_1.app.getSubmit().val() == "Ajouter") {
                    App_1.app.addEvent();
                    App_1.app.resetForm();
                }
            });
            App_1.app.getEvents().on("click", ".remove, .edit", function () {
                const $this = jquery_2.default(this);
                const $parent = $this.parent();
                const $events = App_1.app.getEvents().find(".event");
                const position = $events.index($parent);
                if ($this.hasClass("remove")) {
                    App_1.app.deleteEvent(position, $parent);
                }
                else if ($this.hasClass("edit")) {
                    App_1.app.editEvent(position);
                }
            });
        }
    };
});
//# sourceMappingURL=main.js.map