console.log=function(string){
    var object=document.getElementById("text");
    if (!object) {
        var div=document.createElement("div");
        div.id="text";
        div.style.width="900px";
        div.style.minHeight="500px";
        div.style.border="1px solid black";
        div.style.color="white";
        div.style.textShadow="0 0 10px black,0 0 10px black,0 0 10px black,0 0 10px black,0 0 10px black,0 0 10px black,0 0 10px black";
        div.style.padding="1em";
        document.body.appendChild(div);
        object=div;
    }
    object.innerHTML+=string;
}

function retry(gl,type){
    if (type==gl.VERTEX_SHADER) return "Vertex Shader: ";
    if (type==gl.FRAGMENT_SHADER) return "Fragment Shader: ";
}
function getWebGLContext(canvas){
    return canvas.getContext("webgl");
}