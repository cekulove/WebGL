// utils.js
/**
 * Create a program objectand make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true,if the program object was created and successfully made current
 */

// replace functions

function initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE){
    var program=createProgram(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    gl.useProgram(program);
    gl.program=program
    return true;
}

function createProgram(gl,vshader,fshader) {
    var vertexShader=loadShader(gl,gl.VERTEX_SHADER,vshader);
    var fragmentshader=loadShader(gl,gl.FRAGMENT_SHADER,fshader);
    var program=gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentshader);
    gl.linkProgram(program);
    console.log("Program: "+gl.getProgramParameter(program,gl.LINK_STATUS)+"<br/>");
    if (!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.log(gl.getProgramInfoLog(program).replace(/\n/g,"<br/>"));
    }
    return program;
}

function loadShader(gl,type,source) {
    var shader=gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    console.log(retry(gl,type)+gl.getShaderParameter(shader,gl.COMPILE_STATUS)+"<br/>");
    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(shader).replace(/\n/g,"<br/>"));
    }
    return shader;
}