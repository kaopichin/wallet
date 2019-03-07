<template>
	<div class="start">
		 <Progress :percent="percent" :stroke-width="2" class="progress" hide-info></Progress>
	</div>
</template>

<script>
	export default {
        data () {
            return {
            	percent:25
            }
        },
        computed: {
        },
        mounted(){
        	var _this=this;
            var t=setInterval(function(){
        		if (_this.percent >= 100) {
        			window.clearTimeout(t);
        			_this.$router.push({path:'/index'})
                }
        		_this.percent += 25;
        		},1000);
        	
        },
        methods: {
        	
        },
        created (){
        	
        }
    }
</script>

<style scoped="scoped">
.start {width: 100%;height: 100%;z-index: 9999999999;background: url(../../../static/img/pic_chushihua_bg.png)center center no-repeat;position: absolute;top: 0;left: 0;background-attachment: fixed;background-size: cover;
}
.progress{position: absolute;left: 0;bottom: 9px;width: 100%;z-index: 9999999999;height: 2px;}
</style>