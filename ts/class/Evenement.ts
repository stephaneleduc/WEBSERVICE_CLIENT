export class Evenement {

    private id : number;
    private nom : string;
    private description : string;
    private date : string;
    private lieu : string;
    private id_categorie: number;

    private $nom: JQuery<HTMLParagraphElement> = $('.nom') as JQuery<HTMLParagraphElement>;
    private $description : JQuery<HTMLParagraphElement> = $('.desc') as JQuery<HTMLParagraphElement>;
    private $date: JQuery<HTMLParagraphElement> = $('.date') as JQuery<HTMLParagraphElement>;
    private $lieu: JQuery<HTMLParagraphElement> = $('.lieu') as JQuery<HTMLParagraphElement>;
    private $cat: JQuery<HTMLParagraphElement> = $('.cat') as JQuery<HTMLParagraphElement>;

    private $dom: JQuery<HTMLElement>;

    constructor(id: number, nom:string, description:string, date: string, lieu: string, id_categorie:number) {

        this.id = id;
        this.nom = nom;
        this.description = description;
        this.date = date;
        this.lieu = lieu;
        this.id_categorie = id_categorie;


    }

    getId() : number {
        return this.id;
    }

    getDescription() : string {

        return this.description;
    }

    getDate() : string {
        return this.date;
    }

    getNom() : string {
        return this.nom;
    }

    getLieu() : string {
        return this.lieu;
    }

    getId_categorie() : number {
        return this.id_categorie;
    }

    setNom (nom: string): void {
        this.nom = nom;
    }

    setDescription (description: string): void {
        this.description = description;
    }

    setDate (date: string) : void {
        this.date = date;
    }

    setLieu (lieu: string): void {
        this.lieu = lieu;
    }
    setId_categorie(id_categorie: number) : void {

        this.id_categorie = id_categorie;
    }


    update(category: string) {

        this.$nom.html(this.nom);
        this.$description.html(this.description);
        this.$date.html(this.date);
        this.$lieu.html(this.lieu);
        this.$cat.html(category);

    }

    render(parent: JQuery<HTMLDivElement>, category: string) {

        let html = "<div class='event'>";

            html += "<div class='edit'>📝</div>";

            html += "<div class='remove'>X</div>";

        html += "</div>";

        this.$nom = $('<h3>' + this.nom + '</h3>') as JQuery<HTMLParagraphElement>;
        this.$description = $('<p>' + this.description + '</p>') as JQuery<HTMLParagraphElement>;
        this.$date = $('<p>' + this.date + '</p>') as JQuery<HTMLParagraphElement>;
        this.$lieu = $('<p>' + this.lieu + '</p>') as JQuery<HTMLParagraphElement>;
        this.$cat = $('<p>' + category + '</p>') as JQuery<HTMLParagraphElement>;
 
        this.$dom = $(html);

        this.$dom.append(this.$nom);
        this.$dom.append(this.$description);
        this.$dom.append(this.$date);
        this.$dom.append(this.$lieu);
        this.$dom.append(this.$cat);

        parent.append(this.$dom);



    }

}
