<template>
	<div class="about">
		<div class="mask">
			<div class="dialog box-shadow pwd">
				<div class="dialog-header text-center">
					关于TA
					<Icon size="24" class="close" type="md-close" @click="colseAbout"/>
				</div>
				<div class="dialog-content">
					<p>TA团队</p>
					<p class="font-18">Mrprefect；Miracle；Emerald；Aomr；Mrprefect；Miracle；Emerald；Aomr； Mrprefect；Miracle；Mrprefect；Miracle；Emerald；Aomr；Mrprefect；Miracle； Emerald；Aomr；Mrprefect；Miracle；Emerald；Aomr；Mrprefect；Miracle； Emerald；Aomr；Mrprefect；Miraclerprefect；Miracle；Emerald；Aomr； Mrprefect；Miracle；Emerald；AoMiracle；Mrprefect；Miracle；Emerald； Aomr；Mrprefect；Miracle；Emeraomr；Emerald；Aomr；Mrprefect；Miracle； Emerald；Aomr；Mrprefect；Miracle；Mrprefect；Miracle；Emerald；Aomr； Mrprefect；Miracle；Emerald；AomrMiracle；Mrprefect；Miracle；Emerald； Aomr；Mrprefect；Miracle；Emerald；Aomr；</p>
					<Divider />
					<p class="p2">http://taweb.ma.cn</p>
					<p>获MIT牌照许可</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        data () {
            return {
            }
        },
        computed: {
        },
        mounted(){
        	
        },
        methods: {
        	colseAbout(){
        		this.$emit('AboutisShow',false);
        	}
        },
        created (){
        	
        }
    }
</script>

<style scoped="scoped">
    .mask{display:flex;justify-content:center;align-items:center;}
	.dialog{z-index: 99;width: 70%;background: #fff;border-radius: 6px;}
	.dialog-header{background: #f0f5f9;font-size: 16px;color: #F89800;border-radius: 6px;padding: 20px 0;position: relative;}
	.dialog-content{padding: 20px;}
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
	
	.dialog-content p{font-size: 14px;color: #666;}
	.dialog-content p.p2{color: #F89800;}
</style>