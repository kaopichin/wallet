<template>
	<div class="reseipts bgcf0">
		<div class="walletInfo box-shadow">
			<div class="imgBox pull-left" id="qrcode">
				<!--<img style="margin-top: 20px;" src="../../../static/img/sy_pic_erweima.png"/>-->
			</div>
			<div class="info pull-left content">
				<p class="font-14">{{$t('home.txt0')}}：</p>
				<p class="p1 font-18">
					<span class="pull-left ellipsis">{{address}}</span> 
					<Icon size="24" color="#999" style="margin: 13px 20px 0 0;" class="pull-right" type="md-copy" @click="copy(address)"/>
					<div class="claerfix"></div>
				</p>
				<p class="font-14">{{$t('reseipts.txt0')}}</p> 
				<Input v-show="hasSpendingPassword=='true'" type="password" style="margin-bottom: 5px;width: 50%;" v-model="pwd" :placeholder="$t('pay.txt7')"/>
				<button class="alt" @click="addAddress">{{$t('reseipts.txt1')}}</button>
				
			</div>
			<div class="clearfix"></div>
		</div>
		
		<div class="walletInfo box-shadow">
			<div class="info list">
				<div v-for="(item,index) in addresses" :key="index">
					<p class="font-14">{{$t('home.txt0')}}{{index}}</p>
					<p class="p1 font-18">
						<span class="pull-left ellipsis">{{item.id}}</span> 
						<Icon size="24" color="#999" style="margin: 13px 20px 0 0;" class="pull-right" type="md-copy" @click="copy(item.id)"/>
						<div class="claerfix"></div>
					</p>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { creatAddress ,searchAccountList} from '@/service/getData';
	import { encryptPWD } from '../../../static/js/encryptPWD.js';
	export default {
        data () {
            return {
            	hasSpendingPassword:localStorage.getItem("hasSpendingPassword"),
            	address:localStorage.getItem("walletId"),
            	addresses:[],
            	pwd:'',
            	AccountIndex:''
            }
        },
        computed: {
        	
        },
        mounted () {
      	 this.qrcode();
        },
        methods: {
        	qrcode(){
        		let qrcode = new QRCode('qrcode', {
			        width: 150,  
			        height: 150,
			        text: this.address, // 二维码地址
			        colorDark : "#000",
			        colorLight : "#fff",
			      })
        	},
        	getAccountIndex(){
        		searchAccountList({
        			"walletId":localStorage.getItem("walletId")
        		}).then(res=>{
        			this.addresses=res.data[0].addresses;
        		    this.AccountIndex= res.data[0].index;
        		}).catch(res=>{})
        		
        	},
        	copy(p){
        		this.$electron.clipboard.writeText(p);
        		this.$Message.success(this.$t('TipsMsg.txt3'));
        	},
        	addAddress(){
        		if(this.hasSpendingPassword=='true'){
        			var pwd=this.pwd;
	        		var pwsReg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$");
	        		if(pwd==''){
	        			this.$Message.error(this.$t('pay.txt7'));
	        		}else if(pwsReg.test(pwd)==false){
	        			this.$Message.error(this.$t('TipsMsg.txt6'));
	        		}else{
	        			var epwd=encryptPWD(pwd);
	        			creatAddress({
							'accountIndex':this.AccountIndex,
							"walletId":localStorage.getItem("walletId"),
							"spendingPassword":epwd
		                }).then(res=>{
		                		this.getAccountIndex();
		        		}).catch(error=>{
							console.log(error);
							if(error.success==false){
		                	    this.$Message.error(this.$t('TipsMsg.txt6'));
							}	
						})
	        		}
        		}else{
        			creatAddress({
							'accountIndex':this.AccountIndex,
							"walletId":localStorage.getItem("walletId"),
							"spendingPassword":this.pwd
		                }).then(res=>{
		        			this.getAccountIndex();
		        		}).catch(res=>{
		        			
		        		})
        		}
        		
        		
        	}
        },
        created (){
        	this.getAccountIndex();
        }
    }
</script>

<style scoped="scoped">
	.reseipts{padding: 30px;}
	.walletInfo{padding: 50px 20px;background: #fff;border-radius: 6px;margin-bottom: 20px;}
	.imgbox{width: 150px;}
	.info{padding-left: 30px;width: 80%;}
	.info .p1{border: 1px solid #CCCCCC;border-radius: 4px;height: 50px; line-height: 50px;text-indent: 20px;}
	.info p{margin: 10px 0 5px;}
	.info.list{width: 100%;}
	#qrcode{margin-top: 20px;}
</style>