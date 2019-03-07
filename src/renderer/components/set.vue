<template>
	<div class="set bgcf0">
		<div class="box-shadow set-container content">
			<p class="font-16 col-666">{{$t('set.txt0')}}</p>
		    <Input v-model="name" placeholder="hhhhh" @on-blur="setWallet()"/>
			<p class="font-16 col-666">{{$t('set.txt1')}}</p>
			<Select v-model="rank" placeholder="安全" @on-change='setWallet()'>
		        <Option v-for="item in rankList" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>
		    <!--<p class="font-16 col-666">语言</p>
			<Select v-model="lang" placeholder="中文" @on-change="setLang">
		        <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
		    </Select>-->
			<p class="font-16 col-666">{{$t('set.txt2')}}</p>
			<div class="setPwd">
				<Input type="password" v-model="pwd"  />
				<span class="setBtn font-16" v-if="hasSpendingPassword=='false'" @click="setPwdBox=true">{{$t('set.txt3')}}</span>
				<span class="setBtn font-16" v-else @click="setPwdBox1=true">{{$t('set.txt4')}}</span>
			</div>
			<div class="text-center delWallet" @click="delWalletBox=true">
				{{$t('set.txt5')}}
			</div>
		</div>
		
		<div class="mask" v-show="setPwdBox">
		    <div class="dialog box-shadow">
				<div class="dialog-header text-center">
					{{$t('set.txt6')}}
					<Icon size="24" class="close" type="md-close" @click="setPwdBox=false"/>
				</div>
				<div class="dialog-content font-16">
					<p>{{$t('pay.txt6')}}：</p>
					<Input type="password" v-model="password3" :placeholder="$t('set.txt8')"/>
					<p>{{$t('set.txt7')}}：</p>
					<Input type="password" v-model="password4" :placeholder="$t('set.txt9')"/>
					<button class="alt" @click="save">{{$t('set.txt10')}}</button>
				</div>
			</div>
		</div>
		
		<div class="mask" v-show="setPwdBox1">
		    <div class="dialog box-shadow">
				<div class="dialog-header text-center">
					{{$t('set.txt11')}}
					<Icon size="24" class="close" type="md-close" @click="setPwdBox1=false"/>
				</div>
				<div class="dialog-content font-16">
					<p class="font-14 col-666 mb-10 pwd">
						{{$t('set.txt12')}}
						<i-switch v-model="isswitch"  @on-change="setPwd">
			                <span slot="open"></span>
			                <span slot="close"></span>
			            </i-switch>
					</p>
					<p>{{$t('set.txt13')}}：</p>
					<Input type="password" v-model="password0" :placeholder="$t('set.txt16')"/>
					<div v-show="showPwdBox">
						<p>{{$t('set.txt14')}}：</p>
						<Input type="password" v-model="password1" :placeholder="$t('set.txt8')"/>
						<p>{{$t('set.txt15')}}：</p>
						<Input type="password" v-model="password2" :placeholder="$t('set.txt9')"/>
						<p class="col-999">{{$t('creatW.txt6')}}</p>
					</div>
					<button class="alt" @click="save1">{{$t('set.txt10')}}</button>
				</div>
			</div>
		</div>
		
		 <Modal
		 	class="xm"
	        v-model="delWalletBox"
	        :title="$t('creatW.txt5')"
	        :ok-text="$t('set.txt18')"
	        :cancel-text="$t('set.txt19')"
	        @on-ok="ok">
	        <p>{{$t('set.txt17')}}</p>
	    </Modal>
		
	</div>
</template>

<script>
	import { BASEURL } from '../service/http.js'
	import axios from 'axios'
	import { getWalletId,updateWalletId,delWallet,walletList,updateWalletPwd } from '@/service/getData';
	import { encryptPWD } from '../../../static/js/encryptPWD.js';
	export default {
        data () {
            return {
            	hasSpendingPassword:localStorage.getItem("hasSpendingPassword"),
            	name:'',
            	rank:'',
            	pwd:localStorage.getItem("epwd"),
            	rankList:[
            	   {label:this.$t('rank.txt0'),value:this.$t('rank.txt0')},
            	   {label:this.$t('rank.txt1'),value:this.$t('rank.txt1')}
            	],
            	setPwdBox:false,
            	setPwdBox1:false,
            	password0:'',
            	password1:'',
            	password2:'',
            	password3:'',
            	password4:'',
            	delWalletBox:false,
            	lang:'',
            	langList:[
            	   {label:this.$t('lang.txt0'),value:this.$t('lang.txt0')},
            	   {label:this.$t('lang.txt1'),value:this.$t('lang.txt1')}
            	],
            	isswitch:false,
            	showPwdBox:true
            }
        },
        computed: {
        },
        mounted(){
        },
        methods: {
        	setPwd(){
        		this.showPwdBox=!this.showPwdBox;
        	},
        	setLang(){
        		localStorage.setItem("lang",this.lang);
        		if(this.lang==this.$t('lang.txt0')){
        			this.$i18n.locale="ch"
        		}else{
        			this.$i18n.locale="en"
        		}
        	},
        	setWallet(){
        		let status;
	        	if(this.rank==this.$t('rank.txt1')){
	        		status='strict'
	        	}else{
	        		status='normal'
	        	}
        		updateWalletId({
        			'walletId':localStorage.getItem('walletId'),
        			"assuranceLevel": status,
                    "name": this.name
        		}).then(res=>{
        			this.WalletInfo()
        		}).catch(res=>{})
        	},
        	WalletInfo(){
        		getWalletId({
        			'walletId':localStorage.getItem('walletId')
        		}).then(res=>{
        			this.name=res.data.name;
        			if(res.data.assuranceLevel=='strict'){
        				this.rank=this.$t('rank.txt1');
        			}else{
        				this.rank=this.$t('rank.txt0');
        			}
        		}).catch(res=>{})
        	},
        	ok () {
        		var _this=this;
        		var request = require('request');
        		request.delete({url:BASEURL+'/api/v1/wallets/'+localStorage.getItem('walletId')}, function (error, res, body) {  
                    walletList().then(res=>{
                    	localStorage.clear();
                		if(res.data.length==0){
                			_this.$emit('isrotate', 'true')
                			_this.$router.push({path:"/index"})
						}else{
							_this.$router.push({path:'/home',query:{id:res.data[0].id}})
						}
                	}).catch(res=>{})			
    
            })
            },
        	save(){
        		var pwsReg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$");
        		if(this.password3==''){
    				this.$Message.error(this.$t('TipsMsg.txt10'));
    			}else if(pwsReg.test(this.password3)==false){
    				this.$Message.error(this.$t('TipsMsg.txt11'));
    			}else if(this.password3!=this.password4){
    				this.$Message.error(this.$t('TipsMsg.txt0'));
    			}else{
    				var obj={
  				    	'walletId':localStorage.getItem('walletId'),
  				    	'old':'',
  				    	'new':this.password3
  				    }
  				    obj.new=encryptPWD(obj.new);
  				    updateWalletPwd(obj).then(res=>{
    					if(res=='Network Error'){
	                	    this.$Message.error(this.$t('TipsMsg.txt12'));	
	                	}else{
	                		localStorage.setItem('epwd',obj.new);
	                		localStorage.setItem("hasSpendingPassword",true)
        					this.setPwdBox=false;
        					this.$Message.success(res.status);
        					this.password3='';
        					this.password4='';
	                	}
    				}).catch(res=>{})
    			}
        	},
        	save1(){
        		var pwsReg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$");
        		if(this.isswitch==false){
        			if(this.password0==''){
        				this.$Message.error(this.$t('TipsMsg.txt13'));
        			}else if(pwsReg.test(this.password0)==false){
        				this.$Message.error(this.$t('TipsMsg.txt14'));
        			}else if(this.password1==''){
        				this.$Message.error(this.$t('TipsMsg.txt15'));
        			}else if(pwsReg.test(this.password1)==false){
        				this.$Message.error(this.$t('creatW.txt6'));
        			}else if(this.password1!=this.password2){
        				this.$Message.error(this.$t('TipsMsg.txt0'));
        			}else{
      				    var obj={
      				    	'walletId':localStorage.getItem('walletId'),
      				    	'old':this.password0,
      				    	'new':this.password1
      				    }
      				    obj.old=encryptPWD(obj.old);
      				    obj.new=encryptPWD(obj.new);
        				updateWalletPwd(obj).then(res=>{
        					if(res=='Network Error'){
		                	    this.$Message.error(this.$t('TipsMsg.txt12'));	
		                	}else{
		                		localStorage.setItem('epwd',obj.new)
	        					this.setPwdBox1=false;
	        					this.$Message.success(res.status);
	        					this.password0='';
	        					this.password1='';
	        					this.password2='';
		                	}
        				}).catch(res=>{})
        			}
        		}else{
        			if(this.password0==''){
        				this.$Message.error(this.$t('TipsMsg.txt13'));
        			}else if(pwsReg.test(this.password0)==false){
        				this.$Message.error(this.$t('TipsMsg.txt14'));
        			}else{
        				var obj={
      				    	'walletId':localStorage.getItem('walletId'),
      				    	'old':this.password0,
      				    	'new':''
      				    }
        				obj.old=encryptPWD(obj.old);
        				updateWalletPwd(obj).then(res=>{
        					if(res=='Network Error'){
		                	    this.$Message.error(this.$t('TipsMsg.txt12'));	
		                	}else{
		                		localStorage.setItem('epwd',obj.new);
		                		localStorage.setItem("hasSpendingPassword",false)
	        					this.setPwdBox1=false;
	        					this.$Message.success(res.status);
	        					this.password0='';
	        					this.password1='';
	        					this.password2='';
		                	}
        				}).catch(res=>{})
        			}
        		}
        	}
        },
        created (){
        	this.WalletInfo();
        	if(localStorage.getItem("lang")){
        		this.lang=localStorage.getItem("lang");
        	}else{
        		this.lang=this.$t('lang.txt0');
        	}
        }
    }
</script>

<style scoped="scoped">
	.set{padding: 30px;}
	.set-container{padding: 50px 20px;background: #fff;border-radius: 6px;margin-bottom: 20px;}
	.content .ivu-select ,.content .ivu-input-wrapper{margin: 15px 0 30px;}
	.setPwd{position: relative;}
	.setBtn{position: absolute;color: #F89800;top:28px;right: 20px;cursor: pointer;z-index: 80;}
	.delWallet{font-size: 16px;color: #F2482D;cursor: pointer;}
	
	.mask{display:flex;justify-content:center;align-items:center;}
	.dialog{z-index: 99;width: 70%;background: #fff;border-radius: 6px;}
	.dialog-header{background: #f0f5f9;font-size: 16px;color: #F89800;border-radius: 6px;padding: 20px 0;position: relative;}
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
	.dialog-content{padding: 20px;}
	.dialog-content p{color: #666;font-size:16px;}
	.dialog-content .ivu-input-wrapper{margin: 15px 0 30px;}
</style>