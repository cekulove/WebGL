let initShader=(gl,VS_SOURCE,FS_SOURCE)=>{
    let program=createProgram(gl,VS_SOURCE,FS_SOURCE);
    gl.useProgram(program);
    gl.program=program;
    return true;
}

let createProgram=(gl,VS_SOURCE,FS_SOURCE)=>{
    let program=gl.createProgram();
    let vShader=loadShader(gl,gl.VERTEX_SHADER,VS_SOURCE);
    let fShader=loadShader(gl,gl.FRAGMENT_SHADER,FS_SOURCE);
    gl.attachShader(program,vShader);
    gl.attachShader(program,fShader);
    gl.linkProgram(program);
    let linked={
        status: gl.getProgramParameter(program,gl.LINK_STATUS),
        log:    gl.getProgramInfoLog(program)
    }

    console.log("program: "+linked.status);
    if (!linked.status){
        console.log(linked.log);
    }
    return program;
}

let loadShader=(gl,type,source)=>{
    let shader=gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    let compiled={
        status: gl.getShaderParameter(shader,gl.COMPILE_STATUS),
        log:    gl.getShaderInfoLog(shader)
    }

    if (type==gl.VERTEX_SHADER)     console.log("vertex: "+compiled.status);
    if (type==gl.FRAGMENT_SHADER)   console.log("fragment: "+compiled.status);
    if (!compiled.status){
        console.log(compiled.log);
    }
    return shader;
}