/*
 =======================================================================
 =    VERTEX SHADER, USED FOR THE DRAWING MODE OF WEBGL (RUNS ONCE)    =
 =======================================================================
*/
export const vertexShaderSource = `
uniform vec2 screenSize;                                                        // width/height of screen
attribute vec2 spritePosition;                                                  // position of sprite

void main() {
  vec4 screenTransform = 
      vec4(2.0 / screenSize.x, -2.0 / screenSize.y, -1.0, 1.0);
  gl_Position =
      vec4(spritePosition * screenTransform.xy + screenTransform.zw, 0.0, 1.0);
  gl_PointSize = 48.0;
}
`;
/*
 ========================================================================
 = FRAGMENT SHADER WHICH IS CALLED EVERY TIME THE LOOP DRAWS THE BUFFER =
 ========================================================================
*/
export const fragmentShaderSource = `
precision mediump float;
uniform sampler2D spriteTexture;                                                // texture we are drawing
uniform vec4 vColor;

void main() {
  gl_FragColor = texture2D(spriteTexture, gl_PointCoord) + vColor;
}
`;
