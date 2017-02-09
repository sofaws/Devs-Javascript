

window.addEventListener("load",
function() {
    
    var id =0; //Permettra de donnée un id différent a chaque réveils
    var reveilleEnCour =0; //Permet d'éviter que deux réveils sonnent en même temps
    var h,m;
    
    
    //Fonction d'affichage de l'heure + d'appel de la méthode réveil chaque minutes
    function date_heure()
    {
        var date = new Date();
        
        //Récupération des données de l'heure et formatage
        h = date.getHours();
        if(h<10)  h = "0"+h;
        m = date.getMinutes();
        if(m<10) m = "0"+m;
        var s = date.getSeconds();
        if(s<10) s = "0"+s;
        var resultat = h+':'+m+':'+s;
        
        // On ajoute l'heure dans le label pour l'affichage
        if  (document.getElementById('time') !== null)     document.getElementById('time').textContent = resultat;
        
        //Si on change de minutes alors on appele la fonction réveil()
        if (s == "00")	reveil();
        
        //On relance cette fonction dans 1s
        setTimeout(date_heure,'1000');
        
        return true;
    }
    
    
    //Fonction qui vérifie si un réveil doit sonnée
    function reveil()
    {
        
        //Pour chaque id de réveil crée
        for(var i = 1 ; i <= id ; i++) {
            //Si un réveil n'est pas déja en cour
            if (reveilleEnCour === 0)
            {
                
                var ligne = document.getElementById(i);
                //Si le résultat est nul c'est que l'alarme avec cet id est supprimé donc on ne la traite pas
                if(ligne !== null) {
                    
                    //On récupere les élements de la ligne
                    var check = document.getElementsByName("c"+i)[0];
                    var heure = document.getElementsByName("h"+i)[0];
                    var min = document.getElementsByName("m"+i)[0];
                    var nomReveil = document.getElementsByName("n"+i)[0];
                    
                    
                    //On regarde si l'alarme est activé
                    if (check.checked)
                    {
                        
                        //On va récuperer
                        var j;
                        var son = document.getElementsByName("l"+i)[0].value;
                        if (son === "Son 1") j = 1;
                        else if (son === "Son 2") j=2;
                    
                            
                        //Vérification de l'heure
                        if (m == min.value && h == heure.value)
                        {
                            //On dit qu'un réveil est en cour
                            reveilleEnCour = 1;
                            
                            //On lance le son
                            var sonChoisie = document.getElementsByTagName("audio")[0];
                            sonChoisie.src = "sounds/"+j+".mp3";
                            
                            //On inscrit quel réveil sonne
                            document.getElementsByTagName("span")[0].textContent = "Réveil en cours : " + nomReveil.value;
                            
                            //On ajoute un bouton pour stoper le réveil
                            var stop = document.createElement('button');
                            stop.innerHTML='STOP';
                            stop.id = "stop";
                            stop.className = "btn3";
                            document.getElementById('containsstop').appendChild(stop);
                            
                            //On fait bouger la div en modifiant sa classe (Just Fun)
                            var move = document.getElementById("move");
                            move.className = "shake-slow shake-constant shake-constant--hover";
                            
                        }
                    }
                }
            }
        }
        
		//Si le bouton stop à été crée (Et donc un réveil est en cour)
        if (document.getElementById("stop") !== null)
        {
            //Listener sur le bouton stop pour stoper l'alarme et l'enlever
            document.getElementById("stop").addEventListener("click", function(){
                //On enleve le son
                document.getElementsByTagName("audio")[0].src = "";
                
                //On enleve le bouton stop
                var obj = document.getElementById('containsstop');
                var old = document.getElementById('stop');
                obj.removeChild(old);
                
                //On remet le titre par défaut
                document.getElementsByTagName("span")[0].textContent = "Gestionnaire de réveils";
                
                //On arrete la vibration de la div
                move.className ="";
                
                //On annonce que aucun réveil n'est en cours
                reveilleEnCour = 0;
            });
        }
    }
    
    
    //Ajoute une ligne pour un réveil
    function addLigne()
    {
        id++;
        var ligne = document.createElement('div');
        ligne.className="ligne";
        ligne.id = id;
        
        /*
        Nous avons fais le choix d'utiliser un innerHTML dans ce cas car nous avons besoin d'inserer un name différents pour chaque élements de la ligne afin de pouvoir l'identifier dans nos autres fonctions,
        chose que nous n'avons pas eu le temps de réflechir pour l'utiliser avec la méthode de clone que vous proposé (On pense qu'il faudrait changer notre facon de penser l'algo de notre réveil).
        Nous sommes bien conscient des risques (Si id contient un "'" par exemple) mais id est un nomber que l'on incrémente dans notre code, l'utilisateur n'agit pas dessus. Le risque est donc très faible.
        Malgrès le fait que concernant la maintenabilité et la lisibilité nous somme d'accord que cela est moins performant.
        */
        
        ligne.innerHTML='<input type="checkbox" name=c'+id+'> <input  type="number" placeholder="Heure"  name=h'+id+' min="0" max="23">:<input type="number"  placeholder="Min" name=m'+id+' min="0" max="59"> </input><input type="text" value="Alarme"  name=n'+id+'> <select name="l'+id+'"><option selected>Son 1<option>Son 2</select> <button class="btn2" name=b'+id+'>X</button>';
        document.getElementById('contientLigne').appendChild(ligne);
        
        //Ajoute un listener au bouton supprimer pour lui dire de supprimer sa ligne a son appuie
        document.getElementsByName("b" + id)[0].addEventListener("click", function(){
            var obj = document.getElementById('contientLigne');
            var old = document.getElementById(ligne.id);
            obj.removeChild(old);
            
        });
        
        //Ajoute un listener a la checkbox pour vérifier si on peut activer le réveil ou non
        document.getElementsByName('c' +id)[0]
        .addEventListener('click', function(){
            
            var check =   document.getElementsByName('c' +id)[0];
            if(check.checked)
            {
                var heure = document.getElementsByName('h' +id)[0].value ;
                var min = document.getElementsByName('m' +id)[0].value ;
                if ( heure === "" || min === "")
                {
                    check.checked = false ;
                    alert("Vous devez rentrer une heure et des minutes pour activer le réveil");
                }
                else
                {
                    if ( heure >= 24 || min >= 60)
                    {
                        check.checked = false ;
                        alert("Vous devez rentrer une heure et des minutes dans un interval correct");
                    }
                    else
                    {
                        document.getElementsByName('h' +id)[0].disabled = true;
                        document.getElementsByName('m' +id)[0].disabled = true;
                    }
                }
            }
            else
            {
                document.getElementsByName('h' +id)[0].disabled = false;
                document.getElementsByName('m' +id)[0].disabled = false;
            }
        });
    }
    
    
    //Ajout d'un listener sur le bouton ajouter
    document.getElementById('add')
    .addEventListener('click', addLigne);
    //On lance l'horloge
    date_heure();
    
});

