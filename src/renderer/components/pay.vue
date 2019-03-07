<template>
	<div class="pay content bgcf0">
		<div class="box-shadow pay-container">
			<p class="font-16 col-666">{{$t('nav.name3')}}</p>
			<Input v-model="walletId" :placeholder="$t('home.txt0')" />
			<p class="font-16 col-666">{{$t('pay.txt0')}}</p>
			<Input v-model="num" placeholder="0.000000" />
			<button class="alt" @click="sub">{{$t('pay.txt1')}}</button>
		</div>
		<div class="mask" v-show="subBox">
		    <div class="dialog box-shadow" v-show="subBox">
				<div class="dialog-header text-center">
					{{$t('pay.txt2')}}
					<Icon size="24" class="close" type="md-close" @click="subBox=false"/>
				</div>
				<div class="dialog-content font-16">
					{{$t('pay.txt3')}}：
					<p class="p1">{{walletId}}</p>
					<Row>
						<Col span="12">
							{{$t('pay.txt4')}}：
							<p v-text='(Number(num)).toFixed(6)'></p>
						</Col>
						<Col span="12">
							{{$t('pay.txt5')}}：
							<p>+0.170894&nbsp;TA</p>
						</Col>
					</Row>
					总计：
					<p v-text="Number(num)+0.170894">45445444</p>
					<div class="pwd" v-show="hasSpendingPassword=='true'">
						{{$t('pay.txt6')}}：
						<Input type="password" v-model="password" :placeholder="$t('pay.txt7')"/>
					</div>
					<button class="alt" @click="send">{{$t('nav.name2')}}</button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { fees , transactions,searchAccountList } from '@/service/getData';
	import { encryptPWD } from '../../../static/js/encryptPWD.js';
	export default {
        data () {
            return {
            	hasSpendingPassword:localStorage.getItem("hasSpendingPassword"),
            	num:'',
            	walletId:'',
            	subBox:false,
            	password:null,
            	cryptogram:null,
            	AccountIndex:''
            }
        },
        computed: {
        },
        methods: {
        	sub(){
        		if(this.walletId==''||this.walletId.substring(0,1)<'A'||this.walletId.substring(0,1)>'Z'){
        			this.$Message.error(this.$t('TipsMsg.txt4'));
        		}else if(this.num==''||(Number(this.num)).toFixed(6)=='NaN'){
        			this.$Message.error(this.$t('TipsMsg.txt5'));
        		}else{
        			this.subBox=true;
        			this.fee();
        		}
        	},
        	send(){
        		var pwsReg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$");
        		var obj=this.date();
        		if(this.hasSpendingPassword=='true'){
        			if(this.password==''){
        				this.$Message.error(this.$t('creatW.txt4'));
        			}else if(pwsReg.test(this.password)==false){
        				this.$Message.error(this.$t('TipsMsg.txt6'));
        			}else{
        				this.subBox=false;
        				obj.spendingPassword=encryptPWD(obj.spendingPassword);
        				transactions(obj).then(res=>{
		        			this.$Message.success(res.status);
		        		}).catch(res=>{})
        			}
        		}else{
        			this.subBox=false;
	        		transactions(objs).then(res=>{
	        			this.$Message.success(res.status);
	        		}).catch(res=>{})
        		}
        		
        	},
        	getAccountIndex(){
        		searchAccountList({
        			"walletId":localStorage.getItem("walletId")
        		}).then(res=>{
        		    this.AccountIndex= res.data[0].index;
        		}).catch(res=>{})
        		
        	},
        	date(){
        		var obj={
        			"groupingPolicy": 'OptimizeForSecurity',
					"destinations": [
						{
						"amount":(parseFloat(this.num)+0.170894)*1000000,
						"address": this.walletId
						}
					],
					"source": {
						"accountIndex": this.AccountIndex,
						"walletId": localStorage.getItem("walletId")
					},
					"spendingPassword": this.password
        		}
        		return obj;
        	},
        	fee(){
        		var objs=this.date();
        		fees(objs).then(res=>{
        			console.log(res)
        		}).catch(res=>{
        		})
        	}
        },
        created (){
        	this.getAccountIndex();
        	this.cryptogram=localStorage.getItem('cryptogram');
        }
    }
</script>

<style scoped="scoped">
    .mask{display:flex;justify-content:center;align-items:center;}
	.dialog{z-index: 99;width: 70%;background: #fff;border-radius: 6px;}
	.dialog-header{background: #f0f5f9;font-size: 16px;color: #F89800;border-radius: 6px;padding: 20px 0;position: relative;}
	.dialog-content{padding: 20px;}
	.dialog-content p{color: #F89800;padding: 5px 0 15px;}
	.dialog-content p.p1{color: #666;font-size: 14px;}
	.pwd{margin-bottom: 15px;}
	.pay{padding: 30px;}
	.pay-container{padding: 50px 20px;background: #fff;border-radius: 6px;margin-bottom: 20px;}
	.content .ivu-input-wrapper{margin: 15px 0 30px;}
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
</style>