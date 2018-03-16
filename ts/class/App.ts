import { Service } from "./Service";
import { Evenement } from "./Evenement";
import $ from "jquery";

class App {


    private form_events: JQuery<HTMLFormElement> = $('#add-event') as JQuery<HTMLFormElement>;
    private nom_event: JQuery<HTMLInputElement> = $('#nom') as JQuery<HTMLInputElement>;
    private desc_event: JQuery<HTMLInputElement> = $('#description') as JQuery<HTMLInputElement>;
    private date_event: JQuery<HTMLTimeElement> = $('#date') as JQuery<HTMLTimeElement>;
    private lieu_event: JQuery<HTMLInputElement> = $('#lieu') as JQuery<HTMLInputElement>;
    private cat_event: JQuery<HTMLSelectElement> = $('#list') as JQuery<HTMLSelectElement>;
    private submit: JQuery<HTMLInputElement> = $('#submit') as JQuery<HTMLInputElement>;

    private events: JQuery<HTMLDivElement> = $('#events') as JQuery<HTMLDivElement>;

    private list: JQuery<HTMLSelectElement> = $('#list') as JQuery<HTMLSelectElement>;

    private service: Service;

    private evenements: Evenement[] = [];

    private categories: {
        id: number,
        categorie: string
    }[] = [];

    private editedEvent: Evenement;

    getFormEvent(): JQuery<HTMLFormElement> {
        return this.form_events;
    }

    getSubmit() : JQuery<HTMLInputElement> {
        return this.submit;
    }

    getEvents() : JQuery<HTMLDivElement> {

        return this.events;
    }

    getCatEvent(): JQuery<HTMLSelectElement> {
        return this.cat_event;
    }

    getNomEvent(): JQuery<HTMLInputElement> {
        return this.nom_event;
    }

    getDescEvent() : JQuery<HTMLInputElement> {
        return this.desc_event;
    }

    getDateEvent() : JQuery<HTMLTimeElement> {
        return this.date_event;
    }

    getLieuEvent() : JQuery<HTMLInputElement> {
        return this.lieu_event;
    }

    getEvenements() : any[] {
        return this.evenements;
    }

    constructor() {

        this.service = new Service();
        
    }

    resetForm() {

        this.nom_event.val("");
        this.desc_event.val("");
        this.lieu_event.val("");
        this.date_event.val("");
        this.submit.val("Ajouter");


    }

    addCategories(): void {

        this.service.getAllCategories( ( datas ) => {
            if  ( datas.success) {

                for ( let data of datas.categories ) {

                    this.categories.push(data);
                    let option = $('<option></option>');
                    option.html(data.categorie);
                    option.val(data.id);
                    option.appendTo(this.list);

                }

                this.getAllEvents();

            }

        });
    }

    getAllEvents() : void {

        this.service.showEvents( ( datas ) => {

            if ( datas.success ) {

                for (let data of datas.evenements ) {

                    this.generateEvent( data );
                }
            }
        });


    }

    generateEvent(data: 
        {
            id: number, nom: string, description: string, date: string,
            lieu: string, id_categorie: number

        }
    ){

        let category: string = "";
        for (let cat of this.categories ) {
            if (cat.id == data.id_categorie) {

                category = cat.categorie;
            }
        }

        const new_event = new Evenement(data.id, data.nom, data.description, data.date, data.lieu, data.id_categorie);

        new_event.render(this.events, category);
        this.evenements.push(new_event);


    }

    addEvent() {

        const categorie: number = $('#list :selected').val() as number;
        const nom: string = this.getNomEvent().val() as string;
        const description: string = this.getDescEvent().val() as string;
        const date: string = this.getDateEvent().val() as string;
        const lieu: string = this.getLieuEvent().val() as string;

        const create_event = {
            nom : nom,
            description : description,
            date: date,
            lieu : lieu,
            id_categorie: categorie
        }

        this.service.createEvent (

            create_event,
            (datas) => {

                if ( datas.success ) {
                    
                    this.service.getEventById (datas.id, (data) => {

                        this.generateEvent( data.evenement );

                    });
                }

                else {

                    console.log ("Raté !!!!!!");
                }


            }

        )
        

    }


    deleteEvent( position: number, $parent: JQuery<HTMLDivElement> ) {

        const evenement = this.getEvenements()[position];
        
        this.service.removeEvent (

            evenement.id,

            ( datas ) => {


                if (datas.success) {

                    $parent.remove();

                   this.getEvenements().splice(position, 1);
                }
            }


        )
    
    }



    editEvent( position: number) {

        this.editedEvent = this.evenements[position];
        this.submit.val("Editer");
        this.nom_event.val(this.editedEvent.getNom());
        this.desc_event.val(this.editedEvent.getDescription());
        this.date_event.val(this.editedEvent.getDate());
        this.lieu_event.val(this.editedEvent.getLieu());
        this.list.val(this.editedEvent.getId_categorie());
        
    }

    updateEvent() {

        

        const nom: string = this.nom_event.val() as string;
        const description: string = this.desc_event.val() as string;
        const date: string = this.date_event.val() as string;
        const lieu: string = this.lieu_event.val() as string;
        const id_categorie: number = this.list.val() as number;

        const update_data = {
            nom: nom,
            description: description,
            date: date,
            lieu: lieu, 
            id_categorie: id_categorie
        }

        this.service.editEvent(

            this.editedEvent.getId(),
            update_data,
            (datas) => {

                if (datas.success ) {

                    this.editedEvent.setNom(nom);
                    this.editedEvent.setDescription(description);
                    this.editedEvent.setDate(date);
                    this.editedEvent.setLieu(lieu);
                    this.editedEvent.setId_categorie(id_categorie);

                    let category: string = "";
                    for (let cat of this.categories) {

                        if (cat.id == this.editedEvent.getId_categorie()) {

                            category = cat.categorie;
                        }
                    }

                    this.editedEvent.update(category);
                    
                    this.resetForm();


                }

                else {

                    console.log ("UPDATE PERDU !!!");
                }
               
                
            }
        )

    }

}

const app: App = new App;
export { app };