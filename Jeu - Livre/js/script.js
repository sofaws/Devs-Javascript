window.addEventListener("load",function(){

if (window.location.hash === "") window.location.hash = "#1";
var map = new Map();

window.addEventListener("hashchange",function(){
    var id = window.location.hash.substring(1);
    var url = "json/chapitre" + id +".json" ;

console.log(map.get(id));
  if (map.has(id) !== false)  affichage(map.get(id));
  else chargement(url,id,true);

});

function chargement(url,id,afficher)
{
  var xmlhttp = new XMLHttpRequest();
  var textrecup = " test";
  xmlhttp.open("GET", url);

  xmlhttp.onerror = function() {
    alert("erreur");
  };

  xmlhttp.onload = function() {
    if (xmlhttp.status == 200){
       textrecup = JSON.parse(xmlhttp.responseText);
       map.set(id,textrecup);
       if (afficher)  affichage(textrecup);

    }
    else {
      textrecup = "";
      alert("pas 200");
    }
  };
  xmlhttp.send();
}

function affichage(texte)
{

  var d = document.getElementById("link");
  d.innerHTML = "";
  var p = document.getElementById("text");
  var txt = texte.txt;
  p.textContent = txt;

    for (var i = 0;texte.links.length>i;i++)
    {
      var a = document.createElement('a');
      var br =document.createElement('br');
      var link = texte.links[i].link;
      a.href = link;
      var  txtlink = texte.links[i].txt;
      a.textContent = txtlink;
      d.appendChild(a);
      a.appendChild(br);
      var id = link.substring(1);
      if (map.has(id) !== true)  chargement("json/chapitre" + id + ".json",id,false);
    }
}
});
