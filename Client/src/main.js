/*
 ====================================================
 =  IMPORT SHADERS AND OTHER RESOURCES FOR THE GAME =
 ====================================================
*/
import {vertexShaderSource, fragmentShaderSource} from './shader.js';                   // import shaders

/*
 ====================================================
 =  CREATE WEBGL CONTEXT AND LINK IT TO CANVAS      =
 ====================================================
*/
const canvas = document.getElementById('horses');                                       // get canvas
const rnames = document.getElementById('unames');                                       // get canvas
const interact = document.getElementById('interc');                                     // get canvas
document.body.appendChild(canvas);
// --------------------------------------------------
canvas.width = window.innerWidth;                                                       // get inner width
canvas.height = window.innerHeight;                                                     // get inner height
rnames.width = window.innerWidth;                                                       // get inner width
rnames.height = window.innerHeight;                                                     // get inner height
// --------------------------------------------------
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');       // generate the webgl
var ctx = rnames.getContext("2d");
/*
 ====================================================
 =     MAKE THE SHADER COMPILING FROM THE FILE      =
 ====================================================
*/
function loadShader(gl, type, source) {
  // ---------------------------------------------------------------------------
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);                                                       // create and compile the shader
  gl.compileShader(shader);
  // ---------------------------------------------------------------------------
  const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);                       // get status/errors
  if (!status) {                                                                         // if failed compiling the shader
    throw new TypeError(`couldn't compile shader:\n${gl.getShaderInfoLog(shader)}`);     // throw error
  }
  // ---------------------------------------------------------------------------
  return shader;                                                                         // return the shader 
}
/*
 =========================================================
 = BIND THE VERTEX AND FRAGMENT SHADERS WITH THE PROGRAM =
 =========================================================
*/
const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);               // load shader for all program
const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);         // load fragment shader for program
// -----------------------------------------------------------------------------
const shaderProgram = gl.createProgram();                                                // create a shader program
gl.attachShader(shaderProgram, vertexShader);                                            // bind both shaders
gl.attachShader(shaderProgram, fragmentShader);                                          // to the program
gl.linkProgram(shaderProgram);                                                           // to enable them and use them
gl.useProgram(shaderProgram);                                                            // into the program
// -----------------------------------------------------------------------------
const status = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);                    // get status of the link
if (!status) {                                                                           // if the status failed
  throw new TypeError(`couldn't link shader program (status=${status}): ${gl.getProgramInfoLog(shaderProgram)}`);
}                                                                                        // send error message
/*
 ==========================================================
 = GENERATE CANVAS FOR THE SHADER PROGRAM AND APPLY IT    =
 ==========================================================
*/
gl.useProgram(shaderProgram);
gl.uniform2f(gl.getUniformLocation(shaderProgram, 'screenSize'), canvas.width, canvas.height);
// ----------------------------------------------------------------------------
const glBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
// ----------------------------------------------------------------------------

/*
 ==========================================================
 =         PONY STORAGE AND CONTROL GOES HERE             = 
 ==========================================================
*/
class Pony{ /* ***[ THIS IS THE PONY OBJECT ]*** */
 constructor(
             username,     // => NAME OF THE PONY
             user_rank,    // => ANY POSSIBLE ROLE
             x_position,   // => POSITION X
             y_position,   // => POSITION Y
             l_direction,  // => DIRECTION (LEFT OR RIGHT)
             red_body_col, // => RED BODY COLOR
             green_body_c, // => GREEN BODY COLOR
             blue_body_cl, // => BLUE BODY COLOR
    ) {
    // -------------- APPEREANCE -----------------
     this.username = username;                                                  // in here I start defining basic stuff
     this.user_rank = user_rank;                                                // for each player properties
     this.red_body_col = red_body_col;                                          // such as color, position, direction, etc
     this.green_body_c = green_body_c;                                          // even though stuff is rendered through a stack
     this.blue_body_cl = blue_body_cl;                                          // this makes easier player management
    // -------------- POSITIONS ------------------
     this.x_position  = x_position;                                             // and also makes easier to implement
     this.y_position  = y_position;                                             // new features to the players
     this.l_direction = l_direction;
    // -------------------------------------------
 }
}
// -----------------------------------------------------------------------------
class Players{ /* ***[ THIS IS THE CONTROLLER FOR PLAYERS ]*** */
 // - IT ALLOWS TO MANAGE PLAYERS USING ID AS AN ARRAY -
 constructor(limit){
  this.limit = limit;                                                           // limit of players that can join
  this.players = [];                                                            // where player data is stored
 }
 /*
  ==============================================
  =        PUSH A PLAYER INTO THE GAME         = 
  ==============================================
 */
 // Usage: insert_player("name", "rank", posx, posy, dird, R, G, B);
 insert_player(un, rk, _x, _y, _l, cr, cg, cb){
  console.log("player Joined");
  console.log(this.limit);
  console.log(this.players.length);
  console.log("there's space");
   let new_pony = new Pony(un, rk, _x, _y, _l, cr, cg, cb);
   this.players.push(new_pony);
   return new_pony;
 }
 // ----------------------------------------------------------------
 /*
  =================================================
  =   GET NUMBER OF REGISTERED PLAYERS INTO ARRAY =
  =================================================
 */
 get_player_count(){
  return this.players.length;
 }
 // ----------------------------------------------------------------
 /*
  ===================================================
  = FETCH PLAYER FROM ID NUMBER [RETURNS FROM ARRAY =
  ===================================================
 */
 get_player_fromId(id){
  if(id < this.players.length){
   return this.players[id];
  }else{
   return this.players[0];
  }
 }
 /*
  =================================================
  = DRAW ALL OF THE PLAYER LAYERS INSIDE THE GAME =
  =================================================
 */
 draw_all_players(){
   ctx.clearRect(0, 0, rnames.width, rnames.height);
   let posXY = new Float32Array(this.limit*2);
   let indx = 0;
   for(let i = 0; i < this.players.length; i++){
     console.log("drawn player:");
     posXY[indx] = this.players[i].x_position;
     posXY[indx+1] = this.players[i].y_position;
     //gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);  
     ctx.font = "15px Arial";
     ctx.fillStyle = '#FFFFFF';
     ctx.fillText(
                  this.players[i].username,
                  this.players[i].x_position-24, 
                  this.players[i].y_position+34
                 );
     indx+=2;
   }
   gl.bufferData(gl.ARRAY_BUFFER, posXY, gl.DYNAMIC_DRAW);  // upload data
   gl.drawArrays(gl.POINTS, 0, this.players.length);
   //delete posXY;
 }
 // ----------------------------------------------------------------
}
// - < GENERATE ARRAY > - 
let users_online = new Players(1000);

// ....... DEBUG STUFF .......
users_online.insert_player("dummy1", "npc", 500, 300, true, 1,1,1);
users_online.insert_player("dummy2", "npc", 600, 300, true, 1,1,1);
users_online.insert_player("dummy3", "npc", 700, 300, true, 1,1,1);

// -----------------------------------------------------------------------------
//const glBuffer = gl.createBuffer();
//gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
//gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);                                  // upload data
// -----------------------------------------------------------------------------
const loc = gl.getAttribLocation(shaderProgram, 'spritePosition');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc,
    2,                                                                                   // because it was a vec2
    gl.FLOAT,                                                                            // vec2 contains floats
    false,                                                                               // ignored
    0,                                                                                   // each value is next to each other
    0);                                                                                  // starts at start of array
// -----------------------------------------------------------------------------
/*
 ==================================================
 =   GENERATE THE TEXTURE and bind it for WebGL   =
 ==================================================
*/
const pony = document.getElementById('pony');                                            // fetch the image from resources 
const glTexture = gl.createTexture();                                                    // this is where variable will be stored
gl.bindTexture(gl.TEXTURE_2D, glTexture);                                                // define the texture to draw
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pony);               // generate the bitmap
gl.generateMipmap(gl.TEXTURE_2D);                                                        // for the texture defining aplha
// -----------------------------------------------------------------------------
/*
 ===================================================================
 =     ENABLE BLEND MODE FOR TRANSPARENCY TO PREVENT BLACK SQUARES =
 ===================================================================
*/
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
// -----------------------------------------------------------------------------
/*
 ================================================
 = RENDERING FOR THE GAME AND LOOP FOR UPDATING =
 ================================================
*/
function draw() {
  // ---------------------------------------------------------------------------
  gl.clear(gl.COLOR_BUFFER_BIT);                                                          // clear the color buffer
  //gl.drawArrays(gl.POINTS, 0, points);                                                    // draw the ponies
  users_online.draw_all_players(); 
  // ---------------------------------------------------------------------------
}
draw(); // call the function
/*
 =======================================================
 =   DEBUGGING FUNCTIONS GO HERE, FOR TESTING FEATURES =
 =======================================================
*/
function get_random_name(length) {
    var result           = 'guest_';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

let index = 2;
interact.addEventListener('click', (ev) => {
  users_online.insert_player(get_random_name(3), 
                             "npc", ev.offsetX, ev.offsetY, true, 1,1,1);
  /*array[index] = ev.offsetX;
  array[index+1] = ev.offsetY;

  gl.bufferData(gl.ARRAY_BUFFER, array, gl.DYNAMIC_DRAW);  // upload data
  
  index += 2;*/
  draw();
});
