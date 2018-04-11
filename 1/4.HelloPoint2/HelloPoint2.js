// HelloCanvas.js

var VSHADER_SOURCE=
    "attribute vec4 a_Position; \n"+
    "void main() { \n" +
    "  gl_Position = a_Position; \n" + // 设置坐标
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
    
    // 获取attribute变量存储位置
    var a_Position=gl.getAttribLocation(gl.program,"a_Position");
    if (a_Position<0) {
        console.log("Failed to get the storage location of a_Position");
        return;
    }
    
    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position,0.5,0.5,0.0);
    
    // 设置<canvas>背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // 绘制一个点
    gl.drawArrays(gl.POINTS,0,1);
}

/*
 
    * webgl 1.0 *
    gl.getAttribLocation(program,name)
    gl.vertexAttrib1f(location,v0)
    gl.vertexAttrib2f(location,v0,v1)
    gl.vertexAttrib3f(location,v0,v1,v2)
    gl.vertexAttrib4f(location,v0,v1,v2,v3)
    
    gl.getUniformLocation(program,name)
    gl.uniform1f(location,v0)
    gl.uniform2f(location,v0,v1)
    gl.uniform3f(location,v0,v1,v2)
    gl.uniform4f(location,v0,v1,v2,v3)
    gl.uniformMatrix4fv(location,transpose,array)

*/

