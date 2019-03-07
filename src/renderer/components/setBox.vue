<template>
	<div class="setBox">
		<div class="mask content">
			    <div class="dialog box-shadow">
					<div class="dialog-header text-center">
						{{$t('nav.name5')}}
						<Icon size="24" class="close" type="md-close" @click="closeSet"/>
					</div>
					<div class="dialog-content font-16">
						<p class="font-16 col-666">{{$t('lang.txt2')}}</p>
						<Select v-model="lang" :placeholder="$t('lang.txt0')" @on-change="setLang">
					        <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select>
					</div>
				</div>
			</div>
	</div>	
</template>

<script>
	export default {
		props:["set"],
        data () {
            return {
            	lang:'',
            	langList:[
            	   {label:this.$t('lang.txt0'),value:this.$t('lang.txt0')},
            	   {label:this.$t('lang.txt1'),value:this.$t('lang.txt1')}
            	],
            }
        },
        computed: {
        },
        mounted(){
        	
        },
        methods: {
        	init(){
        		if(localStorage.getItem("lang")){
	        		this.lang=localStorage.getItem("lang");
	        	}else{
	        		this.lang=this.$t('lang.txt0');
	        	}
        	},
        	setLang(){
        		localStorage.setItem("lang",this.lang);
        		if(this.lang==this.$t('lang.txt0')){
        			this.$i18n.locale="ch"
        		}else{
        			this.$i18n.locale="en"
        		}
        	},
        	closeSet(){
        		this.$emit('setBoxisShow',false);
        	}
        },
        created (){
        	this.init();
        },
        watch:{
        	set(val,oldVal){
        		this.init();
        	}
        }
    }
</script>

<style scoped="scoped">
	.setBox{position:absolute;width: 100%;height: 100%;background: #fff;top: 22px;left: 100px;z-index: 999;}
	.mask{display:flex;justify-content:center;align-items:center;}
	.dialog{z-index: 99;width: 70%;background: #fff;border-radius: 6px;}
	.dialog-header{background: #f0f5f9;font-size: 16px;color: #F89800;border-radius: 6px;padding: 20px 0;position: relative;}
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
	.dialog-content{padding: 20px;}
	.dialog-content p{color: #666;font-size:16px;}
	.content .ivu-select{margin: 15px 0 30px;}
</style>