<!--  -->
<template>
  <div>
    <div ref="line"></div>
  </div>
</template>

<script>
export default {
  name:"tToast",
  data () {
    return {
    };
  },
  props:{
    autoClose:{
      type:[Boolean,Number],
      default:2,
      validator(value){
        return value === false || typeof value === 'number'
      }
    },
    closeButton:{
      type:Object,
      default:() => {
        return {
          text:'关闭',
          callback:undefined
        }
      }
    },
    enableHtml:{   //是否传html
      type:Boolean,
      default:false
    },
    position:{
      type:String,
      default:'top',
      validator(value){
        return ["top","left","right","bottom"].indexOf(value) >= 0
      }
    }
  },
  components: {},

  computed: {},

  mounted() {
    this.updateStyles()
    this.execAutoClose()
  },

  methods: {
    updateStyles(){
      this.$nextTick(() => {
        this.$refs.line.style.height = `${this.$refs.wrapper.getBoundingClientRect().height}px`
      })
    },
    execAutoClose(){
      if(this.autoClose){
        setTimeout(() => {
          this.close()
        },this.autoClose*1000)
      }
    },
    close(){
      this.$el.remove()  //删除当前组件dom节点
      this.$emit("close")
      this.$destroy()
    }
  }
}

</script>
<style lang='scss' scoped>
</style>