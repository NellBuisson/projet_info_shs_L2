const button = document.querySelector("button");


//fonction pour ajouter du texte dans le code html
function IntégrerLigne(id, raccourci, vrainom) {
    let codeHTML;
    codeHTML = "<li id =\"" + id.toLowerCase + "\">";
    codeHTML += "La ligne nommée <strong>" + raccourci + "</strong> dont le vrai nom est <strong>" + vrainom + "</strong>.";
    codeHTML += "</li>"
    return (codeHTML);
}

// à faire 
function questionLigne(ev) {
    const xhr = new XMLHttpRequest();
    //on récupère la balise mère (le li) de ou est appliqué la fonction (balise strong)
    idLigne = ev.currentTarget.parentNode.id;
    //on choisit la méthode qu'on veut utiliser pour la requête AJAX et l'URL
    const HttpMethod = "get";

    //on donne le lien général et besoin d'ajouter l'id de la ligne. Il faut retrouver l'id en utilisant le raccourci de la ligne et en retrouvant le bon id en utilisant cette
    //correspondance.
    const url = "https://api.tisseo.fr/v2/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId=" + idLigne ;
    console.log(url)
    //on effectue la requête AJAX
    xhr.open(HttpMethod, url);

    xhr.onreadystatechange = function () {
        //on récupère la liste des arrets. Donc vérifier la forme de la réponse pour avoir la liste des arrêts. 
        //on utilise la boucle if pour vérifier que c'est une bonne réponse. 
        
        //on intégère alors avec cette fonction dans le code html APRES ce qui a dans le "li" à l'id du raccourci de la ligne concerné
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const reponse = JSON.parse(xhr.responseText);
                let liste = "Liste des arrêts : ";
                for (const {name: n} of reponse.physicalStops.physicalStop) {
                    //On ajoute chaque arrêt à la liste
                        liste += n + " ,"
                }
                
                console.log(liste);
               
            }
    };

};
};


function requeteTisseo() {
    const xhr = new XMLHttpRequest();
    //on choisit la méthode qu'on veut utiliser pour la requête AJAX et l'URL
    const HttpMethod = "get";
    const url = "https://api.tisseo.fr/v2/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb";
    //on effectue la requête AJAX
    xhr.open(HttpMethod, url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const reponse = JSON.parse(xhr.responseText);
            let codeHTML;
            codeHTML = "La liste des lignes est : <ul>"
            for (const {id: idLigne, shortName : raccourci, name : vrainom} of reponse.lines.line) {
                //on ajouter le code pour chaque ligne différente
                codeHTML += IntégrerLigne(idLigne, raccourci, vrainom);


            };
            //on ferme la balise ul
            codeHTML += "</ul>"
            //on intègre les lignes à la page
            document.querySelector("section").innerHTML = codeHTML;

            document.querySelector("strong").addEventListener("click", questionLigne);
        }
    }

    xhr.send();
    
};

button.addEventListener("click", requeteTisseo);
