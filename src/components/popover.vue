<template>
    <div ref="popover" class="popover">
        <div v-if="visible" ref="contentWrapper" class="content-wrapper" 
        :class="{[`position-${position}`]:true}">
            <slot name="content" :close="close"></slot>
        </div>
        <span ref="triggerWrapper" style="display:inline-block;">
            <slot></slot>
        </span>
    </div>
</template>
<script>
export default{
    name:"tPopover",
    data(){
        return{
            visible:false
        }
    },
    mounted(){
       const popover = this.$refs.popover
       if(this.trigger == "click"){
           popover.addEventListener("click",(e) => {
               this.onClick(e)
           })
       }else if(this.trigger == "hover"){
           popover.addEventListener("mouseenter",() => {
               this.open()
           })
           popover.addEventListener("mouseleave",() => {
               this.close()
           })
       }else{
           popover.addEventListener('mousedown',() => {
               this.open()
           })
           popover.addEventListener('mouseup',() => {
               this.close()
           })
       }
    },
    destroyed(){
        const popover = this.$refs.popover
       if(this.trigger == "click"){
           popover.removeEventListener("click",this.onClick)
       }else if(this.trigger == "hover"){
           popover.removeEventListener("mouseenter",this.open())
           popover.removeEventListener("mouseleave",this.close())
       }else{
           popover.removeEventListener('mousedown',this.open())
           popover.removeEventListener('mouseup',this.close())
       }
    },
    props:{
        position:{
            type:String,
            default:'top',
            validator(value){
                return ['top','bottom','left','right'].indexOf(value) >= 0
            }
        },
        trigger:{
            type:String,
            default:'click',
            validator(value){
                return ['click','hover','focus'].indexOf(value) >= 0
            }
        }
    },
    methods:{
        close(){
            this.visible = false;
            document.removeEventListener('click',(e) => {this.onClickDocument(e)})
        },
        onClick(event){
            console.log(event)
            if(this.$refs.triggerWrapper.contains(event.target)){
                if(this.visible){
                    this.close()
                }else{
                    this.open()
                }
            }
        },
        positionContent(){
            document.body.appendChild(this.$refs.contentWrapper);
            const {contentWrapper,triggerWrapper} = this.$refs;
            const {left,width,top,height} = triggerWrapper.getBoundingClientRect();
            const {left2,width2,top2,height2} = contentWrapper.getBoundingClientRect();
            let positions = {
                top:{
                    top:top + window.scrollY-width2,
                    left:left + window.scrollX
                },
                bottom:{
                    top:top+height+window.scrollY,
                    left:left+window.scrollX
                },
                left:{
                    top:top+window.scrollY,
                    left:left+window.scrollX
                },
                right:{
                    top:top+window.scrollY,
                    left:left+width+window.scrollX
                }
            }
            console.log(positions)
            contentWrapper.style.left = positions[this.position].left + 'px'
            contentWrapper.style.top = positions[this.position].top + 'px'
        },
        open(){
            this.visible = true;
            setTimeout(() => {
                this.positionContent()
                document.addEventListener('click',(e) => {this.onClickDocument(e)});
            })
        },
        onClickDocument(e){
            if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)){return}
            this.close()
        }
    }
}
</script>
<style lang="scss" scoped>
.popover{
    width: 300px;
}
.content-wrapper{
    position: absolute;
}
</style>
