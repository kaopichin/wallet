<template>
	<div  class="leftNav box-shadow">
		<!--<div class="sanjiao"></div>-->
		 <ul>
		 	<li v-for="(item , index) in walletList" :key="index" :class="{actives:x==index}" @click="walletInfo(item.id,index)">
		 		<p class="font-14">{{item.name}}</p>
		 		<p class="font-14"><span v-text='(Number(item.balance)/1000000).toFixed(6)'></span> TA</p>
		 		<!--<Divider />-->
		 	</li>
		 </ul>
	    <div class="addWallet font-16" @click="add">
            <Icon type="md-add" size="24"/>{{$t('nav.name7')}}                    
        </div>
	</div>
</template>

<script>
	import { walletList } from '@/service/getData';
	export default {
		props:["statu"],
        data () {
            return {
               walletList:[],
               x:0
            }
        },
        created (){
        	this.getList();
        },
        methods: {
        	getList(){
        		walletList().then(res=>{
	        		this.walletList=res.data;
	        	}).catch(res=>{})
        	},
         	add(){
         		this.$router.push({path:'/index'})
         	},
         	walletInfo(p,y){
         		this.x=y;
         		this.$router.push({path:'/home',query:{id:p}});
         	}
        },
        watch: {
          statu(Val,oldVal){
            this.getList()
　　　　　　　}
        }
    }
</script>

<style scoped="scoped">
	.leftNav{height: 100%;width:270px;padding: 0;z-index: 999;padding-top: 22px; }
	.addWallet{position: absolute;bottom: 0;left: 0;width:100%;height: 50px;line-height: 50px;color: #F89800;text-align: center;cursor: pointer;background:#28282d;}
	ul li{padding:0px 10px 10px 10px;cursor: pointer;}
	.sanjiao{width:0px;height:0px;border-top:20px solid rgba(0,0,0,0);border-right:20px solid  rgba(0,0,0,0);border-bottom:20px solid #fff;border-left:20px solid  rgba(0,0,0,0);position: absolute;left: 115px;top:-40px;}
	.leftNav.box-shadow{box-shadow:0 0 1px 1px #28282d;background:  #2f3035;}
	ul li{background: #2f3035;}
	ul li.actives{background:#28282d;}
	ul li.actives p{color: #F89800;}
	ul li .ivu-divider-horizontal{margin: 0px 0 0;}
	ul li p{color: #a3a3a3;}
	ul {overflow-y:auto ;overflow-x: hidden;}
	ul li{padding-top: 10px;}
</style>