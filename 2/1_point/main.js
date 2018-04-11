let canvas=document.createElement("canvas");
canvas.width="1000";
canvas.height="1000";
canvas.style.width="1000px";
canvas.style.height="1000px";
canvas.style.border="1px solid #0f0";
document.body.appendChild(canvas);

let gl=canvas.getContext("webgl");

let VS_SOURCE=documnent.querySelector("#vertex-shader").innerHTML;
let FS_SOURCE=documnent.querySelector("#fragment-shader").innerHTML;
if (!initShader(gl,VS_SOURCE,FS_SOURCE)){
    console.log("Failed to get the rendering context for WebGL !");
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS,0,1);