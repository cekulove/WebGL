function main(){
    //获取<canvas>元素
    var canvas=document.getElementById("webgl");
    if (!canvas){
        console.log("Failed to retrieve the <canvas> element")
        return;
    }

    //获取webgl绘图上下文
    var gl=canvas.getContext("webgl");
    if (!gl){
        console.log("Failed to get the rendering context for WebGL")
        return;
    }

    var VS_SOURCE=document.querySelector("#vertex-shader").innerHTML;
    var FS_SOURCE=document.querySelector("#fragment-shader").innerHTML;

    //初始化着色器
    if (!initShaders(gl,VS_SOURCE,FS_SOURCE)){
        console.log("Failed to initialize shaders");
        return;
    }

    //设置<canvas>的背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    gl.drawArrays(gl.POINTS,0,1);
}