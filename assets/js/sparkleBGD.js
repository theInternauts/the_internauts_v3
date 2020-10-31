      var canvas = document.querySelector('#sparkleBGD'),
             ctx = canvas.getContext('2d'),
       particles = [],
    patriclesNum = 500,
               w = window.outerWidth,
               h = window.outerHeight,
          colors = ['#c3aeb4','#85818b','#aecdda','#85818b','#85818b'],
 maxParticleDist = 30;

          // colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'],
    function Factory(){
      this.x =  Math.round( Math.random() * w);
      this.y =  Math.round( Math.random() * h);
      this.rad = Math.random();
      this.rgba = colors[ Math.round( Math.random() * 3) ];
      this.vx = Math.random() - Math.random();
      this.vy = Math.random() - Math.random();

    }

    function draw(){
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'overlay';
      for(var i = 0;i < patriclesNum; i++){
        var temp = particles[i];
        var factor = 0.01;

        for(var j = 0; j<patriclesNum; j++){

           var temp2 = particles[j];
           ctx.linewidth = 1;

           if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<maxParticleDist){
              ctx.strokeStyle = temp.rgba;
              ctx.beginPath();
              ctx.moveTo(temp.x, temp.y);
              ctx.lineTo(temp2.x, temp2.y);
              ctx.stroke();
              factor+= 0.2;
           }
        }


        ctx.fillStyle = temp.rgba;
        ctx.strokeStyle = temp.rgba;

        ctx.beginPath();
        ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
        ctx.stroke();
        ctx.closePath();


        temp.x += temp.vx;
        temp.y += temp.vy;

        if(temp.x > w)temp.x = 0;
        if(temp.x < 0)temp.x = w;
        if(temp.y > h)temp.y = 0;
        if(temp.y < 0)temp.y = h;
      }
    }

    function findDistance(p1,p2){
      return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
    }

    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    (function init(){
      for(var i = 0; i < patriclesNum; i++){
        particles.push(new Factory);
      }
    })();

    (function loop(){
      draw();
      requestAnimFrame(loop);
    })();