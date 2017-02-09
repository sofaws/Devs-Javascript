window.addEventListener("load",function(){

//Permet de gerer le canvas de dessin
    var canvas = document.getElementById('canvas');
    var taille = document.getElementById('taille');
    var ctx = canvas.getContext('2d');
  //Permet de mettre le canvas a la taille de la div
    var zone = document.getElementById('zone');
    var zone_style = getComputedStyle(zone);
    canvas.width = parseInt(zone_style.getPropertyValue('width'));
    canvas.height = parseInt(zone_style.getPropertyValue('height'));
    //Couleur et taille du trait de base
      ctx.strokeStyle = '#00CC99';
      ctx.lineWidth = 7;
      
  //Initialise les coordonnés à 0
    var mouse = {x: 0, y: 0};

  //Permet de mettre a jour les coordonné de la souris lors de son déplacement sur le canvas
    canvas.addEventListener('mousemove', function(e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    });

    taille.addEventListener('change', function(e) {
      //Taille du trait
        ctx.lineWidth  = taille.value;
    });

  //Lors de l'appuie sur le canvas
    canvas.addEventListener('mousedown', function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint);
    });

  //Lors du relachement de la souris
  //Sur document et pas canvas car si l'utilisateur sort du canvas, lache le clique puis reviens sur le canvas il peut dessiner sans l'appuie sur la souris
    document.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint);
    }, false);

    var onPaint = function() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };




//Les fonctions pour le choix de couleurs :

      function getMousePos(canvasColor, evt) {
          var rect = canvasColor.getBoundingClientRect();
          return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          };
        }

        function drawColorSquare(canvasColor, color, imageObj) {
          ctx.strokeStyle = color; //Permet de definir la couleur du premier canvas
          var colorSquareSize = 100;
          var padding = 10;
          var context = canvasColor.getContext('2d');
          var squareX = (canvasColor.width - colorSquareSize + imageObj.width) / 2;
          var squareY = (canvasColor.height - colorSquareSize) / 2;

          context.beginPath();
          context.fillStyle = color;
          context.fillRect(squareX, squareY, colorSquareSize, colorSquareSize);
          context.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize);
        }

        function init(imageObj) {

          var padding = 10;
          var canvascolor = document.getElementById("canvasColor")
          var context = canvascolor.getContext('2d');
          var mouseDown = false;

          context.strokeStyle = '#444';
          context.lineWidth = 2;

          canvascolor.addEventListener('mousedown', function() {
            mouseDown = true;
          }, false);

          canvascolor.addEventListener('mouseup', function() {
            mouseDown = false;
          }, false);

          canvascolor.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(canvascolor, evt);
            var color = undefined;

            if(mouseDown && mousePos !== null && mousePos.x > padding && mousePos.x < padding + imageObj.width && mousePos.y > padding && mousePos.y < padding + imageObj.height) {

              var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
              var data = imageData.data;
              var x = mousePos.x - padding;
              var y = mousePos.y - padding;
              var red = data[((imageObj.width * y) + x) * 4];
              var green = data[((imageObj.width * y) + x) * 4 + 1];
              var blue = data[((imageObj.width * y) + x) * 4 + 2];
              var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
              drawColorSquare(canvascolor, color, imageObj);
            }
          }, false);

          context.drawImage(imageObj, padding, padding);
          drawColorSquare(canvascolor, 'black', imageObj);
        }
        var imageObj = new Image();
        imageObj.onload = function() {
          init(this);
        };
        imageObj.src = 'color-picker.png';


});
