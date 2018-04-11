// HelloCanvas.js

var VSHADER_SOURCE=
    "attribute vec4 a_Position; \n"+
    "uniform mat4 u_xformMatrix; \n"+
    "void main() { \n" +
    "  gl_Position = u_xformMatrix * a_Position; \n" + // 设置坐标
    "} \n" ;
    
var FSHADER_SOURCE=
    "void main() { \n" +
    "  gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 ); \n" + //设置颜色
    "} \n" ;

var ANGLE=90; //旋转角度
 
function main() {
    // 获取<canvas>元素
    var canvas=document.getElementById("webgl");
    
    // 获取WebGL绘图上下文
    var gl=getWebGLContext(canvas);
    if (!gl) {
        console.log("<br/>Failed to get the rendering context for WebGL");
        return;
    }
    
    if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
        console.log("<br/>Failed to initialize shaders.");
        return;
    }
    
    // 设置顶点位置
    var n=initVertexBuffers(gl);
    if (n<0) {
        console.log("<br/>Failed to set the position of the vertices");
        return;
    }
    
    var radian=2*Math.PI*ANGLE/360; // 角度值转弧度
    var cosB=Math.cos(radian),sinB=Math.sin(radian);
    
    var xformMatrix=new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    
    var u_xformMatrix=gl.getUniformLocation(gl.program,"u_xformMatrix");
    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix);

    // 设置<canvas>背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // 绘制三个点
    gl.drawArrays(gl.TRIANGLES,0,n);
}

function initVertexBuffers(gl) {
    var vertices=new Float32Array([
        0.0,0.5, -0.5,-0.5, 0.5,-0.5
    ]);
    var n=3; //点的个数

    // 创建缓冲区对象
    var vertexBuffer=gl.createBuffer();
    if (!vertexBuffer) {
        console.log("<br/>Failed to create the buffer object");
        return -1;
    }
    
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    
    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    
    // 获取attribute变量存储位置
    var a_Position=gl.getAttribLocation(gl.program,"a_Position");
    if (a_Position<0) {
        console.log("<br/>Failed to get the storage location of a_Position");
        return -1;
    }
    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    
    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    
    return n;
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

