
//Déclaration des variables globale de vérification
var agevalide = 0;
var idvalide = 0;
var mdpidentique = 0;
var checkvalide = 0;
var forcemdp = 0;

//Ajoute la fonction l'évenement load du navigateur
window.addEventListener("load", cree_abonnements);

//Création des listeners
function cree_abonnements() {
  
  document.getElementsByName('age')[0]
    .addEventListener('keyup', verifAge);
  
  document.getElementsByName('id')[0]
    .addEventListener('keyup', verifId);
  
   document.getElementsByName('check')[0]
    .addEventListener('click', verifCheck);
  
   document.getElementsByName('mdp')[0]
    .addEventListener('keyup', verifmdp);
  
  document.getElementsByName('mdp2')[0]
    .addEventListener('keyup', verifidentique);
	
  document.getElementById('icon')
    .addEventListener('click', changeColor);
}

//Change la couleur de la form lors du clique sur l'icone user: Juste unn fonction de test
function changeColor()
{

   var formtop = document.getElementsByClassName('form-top')[0];
   var formbot = document.getElementsByClassName('form-bottom')[0];

   formtop.style.background = "rgba(0, 0, 0, 0.90)";
   formbot.style.background = "rgba(0, 0, 0, 0.90)";
   
}

//Verifie si tout les criteres sont remplie pour activer le boutton
function veriftotal()
{
   var button = document.getElementsByName('button')[0];
  
  if (agevalide === 1 && idvalide ===1 && checkvalide ===1 && forcemdp >= 100 && mdpidentique === 1)
    {
      button.removeAttribute("disabled");
    }
  else
    {
      button.setAttribute("disabled","disabled");
    }
  
}


//Verifie si les mdp sont identique
function verifidentique()
{
     var mdp = document.getElementsByName('mdp')[0];
     var mdp2 = document.getElementsByName('mdp2')[0];
     var identiqueText = document.getElementsByName('imdp2')[0];
	 var identiqueIcon = document.getElementsByName('imdp22')[0];


  if (mdp.value === mdp2.value)
    {
      mdpidentique = 1;
	 identiqueIcon.className = "fa fa-check";
	 identiqueText.textContent = "";

    }
  else
    {
      mdpidentique = 0;
	 identiqueIcon.className = "fa fa-exclamation-triangle";
	 identiqueText.textContent = " Les mots de passe ne sont pas identiques";
    }
  veriftotal();
}

//Vérifie si le mdp est assez fort
function verifmdp()
{
    forcemdp = 0;
    var mdp = document.getElementsByName('mdp')[0];
    var mdpL = mdp.value.toLowerCase();
    var mdpU = mdp.value.toUpperCase();
    var idmdp = document.getElementsByName('imdp')[0];
	var idmdp3 = document.getElementsByName('imdp3')[0];

	var prog = document.getElementsByName('prog')[0];


  if (mdp.value !== "")
    {    
     var reg  =   /[0-9]/g;
     var reg2 = /[^A-Za-z0-9]/;
      
     if (reg.test (mdp.value))    forcemdp = forcemdp + 20;    //Chiffre dans la chaine ?     
     if (reg2.test (mdp.value)) forcemdp = forcemdp + 20;     //caractere spec dans la chaine ?     
     if(mdp.value.length >= 8) forcemdp = forcemdp + 20;//Chaine assez longue?
	 if(mdp.value !== mdpL)  forcemdp = forcemdp + 20;//Minuscule dans la chaine?
	 if(mdp.value !== mdpU)   forcemdp = forcemdp + 20;//Majuscule dans la chaine?    
    }
  
    if (forcemdp === 100)
      {
        idmdp3.className = "fa fa-check";
		idmdp.textContent = "";

      }
    else
      {
        idmdp3.className = "fa fa-exclamation-triangle";
		idmdp.textContent = "8 caractères minimum - Une majuscule,minuscule, un chiffre et un caractere spécial";
      }
    prog.style.width = forcemdp + "%";
	prog.textContent= "Force: " + forcemdp;
    verifidentique(); 
    veriftotal();

}

//Vérifie les cgu
function verifCheck()
{
   var icheck = document.getElementsByName('check')[0];
  if (icheck.checked === true)
    {
      checkvalide = 1;
    }
  else
    {
      checkvalide = 0;
    }
  console.log(checkvalide); 
  veriftotal();
}

//Verifie si l'age rentré est valide
function verifAge()
{
 var iage = document.getElementsByName('age')[0];
 var ageText = document.getElementsByName('iage')[0];
 var ageIcon = document.getElementsByName('iage2')[0];


  if (iage.value >= 18)
    {
      agevalide = 1;
      ageIcon.className = "fa fa-check";
	   ageText.textContent = " ";
    }
  else
    {
     agevalide = 0;
     ageIcon.className = "fa fa-exclamation-triangle";
     ageText.textContent = " Vous devez avoir 18ans au minimum";

    }
 veriftotal();
}


//Vérifie si l'identifiant est valide 
function verifId()
{
  var id = document.getElementsByName('id')[0];
  var idtext = document.getElementsByName('iid')[0];
   var idicon = document.getElementsByName('iid2')[0];

  var reg2  =   /[0-9]/g;
  var texta = id.value;
  if (reg2.test(id.value)===false && texta.length <= 12)
    {    
      idvalide = 1;
      idicon.className = "fa fa-check";
      idtext.textContent = "";
    }
  else
    {
		idvalide = 0;
        idicon.className = "fa fa-exclamation-triangle";
		  idtext.textContent = " L'identifiant doit faire moins de 12caracteres et ne peut contenir de chiffre";

    }
  
  veriftotal();
}

