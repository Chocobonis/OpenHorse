window.onload = function() {
 let canvas = document.getElementById("ponyEdit");
 let ctx = canvas.getContext('2d');

 let centerx = ( canvas.width / 4 ) + 10;
 let centery = 10;

 let pony_body = document.getElementById("PonyBody");

  ctx.drawImage(pony_body, centerx, centery);
};
