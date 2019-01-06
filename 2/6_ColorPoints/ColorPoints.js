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

    //获取a_Position变量的存储位置
    var a_Position=gl.getAttribLocation(gl.program,"a_Position");
    if (a_Position<0){
        console.log("Failed to get the storage location of a_Position")
        return;
    }

    //获取u_FragColor变量的存储位置
    var u_FragColor=gl.getUniformLocation(gl.program,"u_FragColor");

    //注册鼠标点击事件相应函数
    canvas.onmousedown=function(ev){click(ev,gl,canvas,a_Position,u_FragColor);};
    
     //设置<canvas>的背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points=[];        //鼠标点击位置数组
var g_colors=[];        //存储点颜色的数组
function click(ev,gl,canvas,a_Position,u_FragColor){
    var x=ev.clientX;   //鼠标点击处的x坐标
    var y=ev.clientY;   //鼠标点击出的y坐标
    var rect=ev.target.getBoundingClientRect();

    x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
    y=(canvas.height/2-(y-rect.top))/(canvas.height/2);

    //将坐标存储到g_points数组中
    g_points.push([x,y]);

    //将点的颜色存储到g_colors数组中
    if (x>=0.0 && y>=0.0)                   //第一象限
        g_colors.push([1.0,0.0,0.0,1.0]);   //红色
    else if (x<0.0 && y<0.0)                //第三象限
        g_colors.push([0.0,1.0,0.0,1.0]);   //绿色
    else                                    //其他
        g_colors.push([1.0,1.0,1.0,1.0]);   //白色

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len=g_points.length;
    for (var i=0;i<len;i++){
        var xy=g_points[i];
        var rgba=g_colors[i];
        //将点的位置传到变量中a_Position
        gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
        //将点的颜色传输到u_FragColor变量中
        gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
        //绘制点
        gl.drawArrays(gl.POINTS,0,1);
    }
}