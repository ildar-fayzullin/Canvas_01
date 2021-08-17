console.log("Start");


console.log("start load canvase");

var canv = document.getElementById("canvas") ,
    ctx = canv.getContext('2d');
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    var isMouseDown = false,
    coords = [],
    radius = 2 ,
    timer_interval = 10;

    ctx.lineWidth = radius * 2;

    canv.addEventListener("mousedown",function(e) {
      isMouseDown  = true;
    });

    canv.addEventListener("mouseup",function(e) {
      isMouseDown  = false;
      ctx.beginPath();
      coords.push("mouseup");
    });

    canv.addEventListener("mousemove",function(e) {
        if(isMouseDown == true){
          coords.push([e.clientX,e.clientY])
          ctx.lineTo(e.clientX,e.clientY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(e.clientX,e.clientY,radius ,0,Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(e.clientX,e.clientY);
      }
    });
    function clear() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0,canv.width, canv.height);
      ctx.beginPath();
      ctx.fillStyle = 'black';

    }

    function save() {
        localStorage.setItem('coords', JSON.stringify(coords));
    }
    function replay() {

      var timer = setInterval(function () {
        if (!coords.length){
            clearInterval(timer);
            ctx.beginPath();
            return;
          }
      var crd = coords.shift(),
      e = {
          clientX:crd[0],
          clientY:crd[1]
      }
      ctx.lineTo(e.clientX,e.clientY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(e.clientX,e.clientY,radius ,0,Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(e.clientX,e.clientY);

      }, timer_interval );

    }

    document.addEventListener("keydown",function(e) {
      //console.log(e.keyCode);
      switch (e.keyCode) {
        case 83:
        //save
        save();
        console.log('Saved');
        break;
        case 82:
        //replay
        coords = JSON.parse(localStorage.getItem('coords'));
        clear();
        replay();
        console.log('Replaying ...');
        break;
        case 67:
        //clear
        console.log('Cleared');
        clear();
          break;
        default:
        break;
      }

    });
