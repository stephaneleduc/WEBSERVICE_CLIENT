const API_BASE_URL: string = "http://localhost/APIS/WS_TP/";

export class Service {


    getAllCategories( callback: JQuery.Ajax.SuccessCallback<
        {
            success: Boolean,
            categories : {id: number, categorie: string}[]
        } 
    >){

        $.ajax({

            url: API_BASE_URL + "categories",
            dataType: 'json',
            method: "GET", 
            success: callback,
            error: function( err ) {

                console.log( err );
            }


        });

    }

    showEvents( callback: JQuery.Ajax.SuccessCallback<
        {
            success: string,
            evenements: 
            {
                id: number, nom: string, description: string,
                date: string, lieu: string, id_categorie: number
            }[]
        }
        
        >) {

        $.ajax({

            url: API_BASE_URL + "events",
            dataType: 'json',
            method: "GET", 
            success: callback,
            error: function( err ) {

                console.log( err );
            }


        });

    }

    // showCategoryName(id: number, callback:JQuery.Ajax.SuccessCallback<
    //     {
    //         success: string,
    //         category: string
           
    //     }> )
    //      {

    //         $.ajax({

    //             url: API_BASE_URL + "category/" + id,
    //             dataType: "json",
    //             method: "GET",
    //             success: callback,
    //             error: function ( err ) {

    //                 console.log ( err );
    //             }

    //         });


    // }

    createEvent (
        datas : {
            nom: string,
            description : string,
            date : string,
            lieu: string,
            id_categorie: number
        },

        callback: JQuery.Ajax.SuccessCallback<
        {
            success: string,
            id: number,
            message: string
           
        }>
    ) {

        $.ajax({

            url: API_BASE_URL + "event",
            dataType: "json",
            method: "POST",
            data : datas,
            success: callback,
            error: function ( err ) {

                console.log ( err );
            }

        });
    }


    getEventById( id: number,
    
        callback: JQuery.Ajax.SuccessCallback<
        {
            success: string,
            evenement: {
                
                id : number, 
                nom : string,
                description : string,
                date: string,
                lieu : string,
                id_categorie: number,
                
            }
           
        }>
    ) {

        $.ajax({

            url: API_BASE_URL + "event/" + id,
            dataType: "json",
            method: "GET",
            success: callback,
            error: function ( err ) {

                console.log ( err );
            }

        });

    }

    removeEvent (
        
        id: number,
    
        callback: JQuery.Ajax.SuccessCallback<
        {
            success: string,
            message: string
           
        }>
    
    ) {
        $.ajax({

            url: API_BASE_URL + "event/" + id,
            dataType: "json",
            method: "DELETE",
            success: callback,
            error: function (err) {
                console.log (err);
            }

        })
    }

    editEvent(
        id: number,
        datas: {
            nom: string,
            description: string,
            date: string,
            lieu: string,
            id_categorie: number
        },
        callback: JQuery.Ajax.SuccessCallback<
        {
            success: string,
            id: number,
            message: string
           
        }> )

        {

            $.ajax({

                url:API_BASE_URL + "event/" + id,
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


}
