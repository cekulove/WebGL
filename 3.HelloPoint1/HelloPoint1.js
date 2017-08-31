// HelloCanvas.js

var VSHADER_SOURCE=
    "void main() { \n" +
    "  gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 ); \n" + // 设置坐标
    "  gl_PointSize = 10.0; \n" + // 设置尺寸
    "} \n" ;
    
var FSHADER_SOURCE=
    "void main() { \n" +
    "  gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 ); \n" + //设置颜色
    "} \n" ;
    
function main() {
    // 获取<canvas>元素
    var canvas=document.getElementById("webgl");
    
    // 获取WebGL绘图上下文
    var gl=getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    
    if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }
    
    // 指定清空<canvas>的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.drawArrays(gl.POINTS,0,1);
}


