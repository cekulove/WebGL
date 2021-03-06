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

    //初始化着色器
    var VS_SOURCE=document.querySelector("#vertex-shader").innerHTML;
    var FS_SOURCE=document.querySelector("#fragment-shader").innerHTML;
    if (!initShaders(gl,VS_SOURCE,FS_SOURCE)){
        console.log("Failed to initialize shaders");
        return;
    }

    //设置顶点的位置
    var n=initVertexBuffers(gl);
    if (n<0){
        console.log("Failed to set the positions of the vertices");
        return;
    }
     //设置<canvas>的背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制三个点
    gl.drawArrays(gl.POINTS,0,n);
}

function initVertexBuffers(gl){
    var vertices=new Float32Array([
        0.0,0.5,  -0.5,-0.5,  0.5,-0.5
    ])
    var n=3;        //点的个数

    //创建缓冲区对象
    var vertexBuffer=gl.createBuffer();
    if (!vertexBuffer){
        console.log("Failed to create the buffer object")
        return -1;
    }

    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    //获取a_Position变量的存储位置
    var a_Position=gl.getAttribLocation(gl.program,"a_Position");
    if (a_Position<0){
        console.log("Failed to get the storage location of a_Position")
        return;
    }

    //将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    //连接a_position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}