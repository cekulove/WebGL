let canvas=document.createElement("canvas");
canvas.width="1000";
canvas.height="1000";
canvas.style.width="900px";
canvas.style.height="900px";
canvas.style.border="1px solid #0F0";
document.body.style.backgroundColor="black";
document.body.appendChild(canvas);

let gl=canvas.getContext("webgl");

let VS_SOURCE=document.querySelector("#vertex-shader").innerHTML;
let FS_SOURCE=document.querySelector("#fragment-shader").innerHTML;
if (!initShader(gl,VS_SOURCE,FS_SOURCE)){
    console.log("Failed to get the rendering context for WebGL !");
}

let n=initVertexBuffer(gl);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,n);

function initVertexBuffer(gl)
{
    let vertices=new Float32Array([
        0.3, 0.0,
        -0.5,0.3,
        -0.5,0.0
    ]);
    let n=3;

    let vbo=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    let a_Position=gl.getAttribLocation(gl.program,"a_Position");
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}