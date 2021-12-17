<template>
  <div class="home">
    <!-- 简易画图工具 -->
    <div id="actions" class="actions">
      <i v-for="(item,index) in iconList" 
        class="iconfont cursorHandle"
        :class="[item,{'active':isActive == index}]"
        :key="index"
        @click="clickActions(index)"
      >
      </i>
     
    </div>
    <ul class="colors">
      <li v-for="(item,index) in colorList" :key="index"
        :class="item"
        @click="chooseColor(item)"
      >

      </li>
    </ul>
    <canvas id="canvas" 
      @mousedown="mousedown" 
      @mouseup="mouseup" 
      @mousemove="mousemove" 
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      width="500" height="500px"
      :class="[{'cursor1':isActive == 0 && strokeStyle == 'black'},
      {'cursor2':isActive == 0 && strokeStyle == 'red'},
      {'cursor3':isActive == 0 && strokeStyle == 'orange'},
      {'cursor4':isActive == 0 && strokeStyle == 'green'},
      {'cursor5':isActive == 0 && strokeStyle == 'blue'},
      {'xiangpica':isActive == 1}]"
    >
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    },
  data(){
    return {
      isActive:0,
      iconList:["icon-bi","icon-xiangpica","icon-xiazai","icon-shanchu"],
      colorList:["black","red","orange","green","blue"],
      Objs:{
        name:"张三",
        age:18
      },
      editor:null,
      canvas:null,
      painting:false,  //画笔
      EraserEnabled:false,  //橡皮擦
      ctx:null,
      startPoint:{
        x:null,
        y:null
      },
      strokeStyle:'black', //画笔颜色
    }
  },
  mounted(){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.wh()
    
  },
  created(){
  },
  methods:{
    chooseColor(item){
      this.strokeStyle = item;
      this.EraserEnabled = false;
      this.isActive = 0;
    },
    clickActions(index){
      // 画笔
      if(index == 0){
        this.isActive = index;
        this.EraserEnabled = false;
      }
      // 橡皮擦
      if(index == 1){
        this.isActive = index;
        this.EraserEnabled = true;

      }
      // 下载
      if(index == 2){
        let url = this.canvas.toDataURL("image/png");
        let a = document.createElement('a');
        document.body.appendChild(a)
        a.href = url
        a.download = "下载图片"
        a.target = "_blank"
        a.click()
        document.body.removeChild(a)
      }
      // 清屏
      if(index == 3){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        // 或者使用fillRect()
        // this.ctx.fillStyle = "#fff"
        // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      }
    },
    wh(){
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      console.log(pageHeight)
      this.canvas.width = pageWidth;
      this.canvas.height = pageHeight;

    },
    touchstart(e){
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      this.painting = true;
      this.startPoint = {x: x, y: y};
    },
    touchend(){
      this.painting = false;
    },
    touchmove(e){
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      let newPoint = {x: x, y: y};
      if (this.painting) {
          if (this.EraserEnabled) {
              this.ctx.clearRect(x - 15, y - 15, 30, 30)
          } else {
              this.drawLine(this.startPoint.x, this.startPoint.y, newPoint.x, newPoint.y);
          }
          this.startPoint = newPoint;
      }
    },
    mousedown(e){
      console.log(e)
      let x = e.offsetX;
      let y = e.offsetY;
      this.painting = true;
      this.startPoint = {
        x:x,
        y:y
      }
    },
    mouseup(){
      this.painting = false;
    },
    mousemove(e){
      let x = e.offsetX;
      let y = e.offsetY
      let newPoint = {
        x:x,
        y:y
      }
      if(this.painting){
        if(this.EraserEnabled){
          this.ctx.clearRect(x-15,y-15,30,30)
        }else{
          this.drawLine(this.startPoint.x,this.startPoint.y,newPoint.x,newPoint.y)
        }
        this.startPoint = newPoint;
      }
      
    },
    drawLine(xStart,yStart,xEnd,yEnd){
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.lineWidth = 2
      this.ctx.moveTo(xStart,yStart)
      this.ctx.lineTo(xEnd,yEnd)
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }
}
</script>
<style lang="scss" scoped>
.cursorHandle{
  cursor: pointer;
}
.actions{
    position: fixed;
    top: 0;
    left: 0.5rem;
    i{
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.5rem 1rem;
      transition: all 0.3s;
      color: #000;
    }
    .active{
        color: orangered;
        transform: scale(1.4);
    }
}
.cursor1{
  cursor: url('../assets/img/bi.png') 8 20,auto;
}
.cursor2{
  cursor: url('../assets/img/bi2.png') 8 20,auto;
}
.cursor3{
  cursor: url('../assets/img/bi3.png') 8 20,auto;
}
.cursor4{
  cursor: url('../assets/img/bi4.png') 8 20,auto;
}
.cursor5{
  cursor: url('../assets/img/bi5.png') 8 20,auto;
}
.xiangpica{
  cursor: url('../assets/img/eraser.png') 8 20,auto;
}
.colors{
  position: fixed;
  top: 4rem;
  left: 0.5rem;
  li{
    margin: 1rem 0;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 3px black;

}
  .black{background: black}
  .red{background: red}
  .orange{background: orange}
  .green{background: green}
  .blue{background: blueviolet}
  }
</style>
