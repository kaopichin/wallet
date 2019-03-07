<template>
    <div class="layout bgcf0">
    	<div class="sysBtn">
    		<img @click="minSys" :src="img1" @mouseenter="img1E" @mouseleave="img1L"/>
    		<img @click="maxSys" :src="img2" @mouseenter="img2E" @mouseleave="img2L"/>
    		<img @click="colseSys" :src="img3" @mouseenter="img3E" @mouseleave="img3L"/>
    	</div>
	    <headers 
	        	v-on:isshow="getisShow" 
	        	v-show="$route.meta.headershow"
	        	class="head"
	        	v-on:setBoxisShow="getsetBoxisShow"
	        	>
	    </headers>
	    <Content class="contentL bgcf0" v-bind:style="{height: heightData}">
        	<router-view 
        		v-on:isshow="getisShow"
        		v-on:cwisShow="getCWisShow" 
        		v-on:wrisShow="getwrisShow"
        		v-on:setBoxisShow="getsetBoxisShow"
        		v-on:AboutisShow="getAboutisShow"
        		:sx='sxLeftNav'>
        	</router-view>
	    </Content>
	    <leftNav 
	    	class="leftnav"
	    	:statu='sxLeftNav'
	    	>
	    </leftNav>
	    <paperWallet 
	    	v-on:isshow="getisShow" 
	    	v-show="PWisShow">
	    </paperWallet>
	    <createWallet 
	    	v-on:cwisShow="getCWisShow"
	    	v-show="CWisShow">
	    </createWallet>
	    <restore 
	    	v-show="WRisShow"
	    	v-on:wrisShow="getwrisShow">
	    </restore>
	    <about
	    	v-show="aboutisShow"
	    	v-on:AboutisShow="getAboutisShow">
	    </about>
	    <setBox
	    	v-show="setisShow"
	    	v-on:setBoxisShow="getsetBoxisShow"
	    	:set="setisShow">
	    </setBox>
    </div>
</template>

<script>
	import router from './router'
	import headers from './components/header'
	import leftNav from './components/leftNav'
	import paperWallet from './components/paperWallet'
	import createWallet from './components/createWallet'
	import restore from './components/restore'
	import about from './components/about'
	import setBox from './components/setBox'
    export default {
    	components: { headers,leftNav,paperWallet,createWallet,restore,about,setBox},
        data () {
            return {
            	ishav:false,
            	PWisShow:false,
            	CWisShow:false,
            	WRisShow:false,
            	aboutisShow:false,
            	setisShow:false,
            	heightData:'',
            	img1:require('../../static/img/yincang_kong.png'),
            	img2:require('../../static/img/fangda_kong.png'),
            	img3:require('../../static/img/guanbi_kong.png'),
            	sxLeftNav:0
            	
            }
        },
        computed: {
        },
        created (){
        	this.init();
        	window.onresize = () => {              
        	 	return (() => {  
        	 		this.init();  
        	 		})()
        	}
        	if(localStorage.getItem("lang")){
				if(localStorage.getItem("lang")=='ch'){
					this.$i18n.locale="ch"
				}else{
					this.$i18n.locale="en"
				}
			}else{
				this.$i18n.locale="ch"
			}
		    router.beforeEach((to, from, next) => {
		    	this.sxLeftNav+=1;
		    	next()
		    })
		    
        },
        mounted(){
        	
        },
        methods: {
        	img1E(){
        		this.img1=require("../../static/img/yincang.png")
        	},
        	img1L(){
        		this.img1=require("../../static/img/yincang_kong.png")
        	},
        	img2E(){
        		this.img2=require("../../static/img/fangda.png")
        	},
        	img2L(){
        		this.img2=require("../../static/img/fangda_kong.png")
        	},
        	img3E(){
        		this.img3=require("../../static/img/guanbi.png")
        	},
        	img3L(){
        		this.img3=require("../../static/img/guanbi_kong.png")
        	},
        	init(){
        		var h=document.documentElement.clientHeight;
				var hB=h-112;
				this.heightData=hB+"px";
        	},
        	minSys(){
        		this.$electron.ipcRenderer.send('window-min');
        	},
        	maxSys(){
        		this.$electron.ipcRenderer.send('window-max');
        	},
        	colseSys(){
        		this.$electron.ipcRenderer.send('window-close');
        	},
        	getisrotate(isrotate){
        		this.ishav=true;
        	},
        	getisShow(isshow){
        		this.PWisShow=isshow;
        		this.ishav=false;
        		this.CWisShow=false;
        		this.WRisShow=false;
        		this.aboutisShow=false;
        		this.setisShow=false
        	},
        	getCWisShow(cwisShow){
        		this.CWisShow=cwisShow;
        		this.ishav=false;
        		this.PWisShow=false;
        		this.WRisShow=false;
        		this.aboutisShow=false;
        		this.setisShow=false
        	},
        	getwrisShow(wrisShow){
        		this.WRisShow=wrisShow;
        		this.ishav=false;
        		this.PWisShow=false;
        		this.CWisShow=false;
        		this.aboutisShow=false;
        		this.setisShow=false
        	},
        	getAboutisShow(AboutisShow){
        		this.aboutisShow=AboutisShow;
        		this.ishav=false;
        		this.PWisShow=false;
        		this.CWisShow=false;
        		this.WRisShow=false;
        		this.setisShow=false
        	},
        	getsetBoxisShow(setBoxisShow){
        		this.setisShow=setBoxisShow;
        		this.aboutisShow=false;
        		this.ishav=false;
        		this.PWisShow=false;
        		this.CWisShow=false;
        		this.WRisShow=false;
        		
        	}
        },
        watch: {
          
        }
    
    }
</script>

<style>
	 @import "../../static/css/common.css";
	 @import "../../static/css/header/iconfont.css";
	 @import "../../static/css/header/tb/iconfont.css";
	 .contentL{margin-top: 122px;width: 100%;overflow-y: auto;padding-left: 370px;}
	 .leftnav{position: absolute;left: 100px;top: 0px;}
	 .sysBtn{width: 100%;height: 22px;text-align: right;-webkit-app-region: drag;position: fixed;left: 0;top: 0;z-index: 999999999;background: #332f2f;}
	 .sysBtn img{margin-top: 3px;margin-right: 3px;-webkit-app-region: no-drag}
	 .head{position: fixed;top: 22px;left: 0;width: 100%;}
	 .mask{z-index: 9999;}
</style>
