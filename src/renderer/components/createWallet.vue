<template>
	<div class="createWallet">
		<div class="mask">
			<div class="dialog box-shadow pwd" v-if="creatwalletId==1">
				<div class="dialog-header text-center">
					{{$t('creatW.txt0')}}
					<Icon size="24" class="close" type="md-close" @click="colseCW"/>
				</div>
				<div class="dialog-content">
					<p class="font-14 col-666 mb-10">{{$t('creatW.txt1')}}</p>
					<Input v-model="walletName" :placeholder="$t('creatW.txt2')"/>
					<p class="font-14 col-666 mb-10">
						{{$t('creatW.txt3')}}
						<i-switch v-model="isswitch"  @on-change="setPwd">
			                <span slot="open"></span>
			                <span slot="close"></span>
			            </i-switch>
					</p>
					<div  v-show='showPwdBox'>
						<Row :gutter="16">
						    <Col span="12">
						        <Input type="password" v-model="password1" :placeholder="$t('creatW.txt4')"/>
						    </Col>
						    <Col span="12">
						        <Input type="password" v-model="password2" :placeholder="$t('creatW.txt5')"/>
						    </Col>
						</Row>
						<p class="col-999 mb-10">{{$t('creatW.txt6')}}</p>
					</div>
					<button class="alt" @click="next">{{$t('creatW.txt7')}}</button>
				</div>
			</div>
			
			<div class="dialog box-shadow" v-else-if="creatwalletId==2">
				<div class="dialog-header text-center">
					{{$t('creatW.txt0')}}
					<Icon size="24" class="close" type="md-close" @click="colseCW"/>
				</div>
				<div class="dialog-content">
					<div class="msg">
						{{$t('creatW.txt8')}}
					</div>
					<div class="wordId">
						<span v-for="(item,index) in word" :key="index">{{item.name}}</span>
					</div>
					<button class="alt" @click="next1">{{$t('creatW.txt7')}}</button>
					<p>
						<Checkbox v-model="single">
							{{$t('creatW.txt9')}}<span>{{$t('creatW.txt10')}}</span>
						</Checkbox>
					</p>
				</div>
			</div>
			
			<div class="dialog box-shadow" v-else="creatwalletId==3">
				<div class="dialog-header text-center">
					{{$t('creatW.txt0')}}
					<Icon size="24" class="close" type="md-close" @click="colseCW"/>
				</div>
				<div class="dialog-content">
					<div class="msg">
						{{$t('creatW.txt11')}}
					</div>
					<div class="wordId wordBtn">
						<span v-for="(item,index) in newWord" :key="index" :class="{selects:item.selected}" @click="selectId(item)">{{item.name}}</span>
					</div>
					<button class="alt" @click="next2">{{$t('creatW.txt7')}}</button>
					<button class="alt" @click="clear">{{$t('creatW.txt12')}}</button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
    import qs from 'qs'
	import { encryptPWD } from '../../../static/js/encryptPWD.js';
	import { generateMnemonic } from '../../../static/js/crypto.js';
	import { creatWallet } from '@/service/getData';
	export default {
        data () {
            return {
            	creatwalletId:'1',
            	walletId:'1BQzj8NXHj3SBurVToF2SSRwpxERpGam1a',
            	single:false,
            	word:[],
            	wordStr:'',
            	pwd:'',
            	newWord:[],
            	transactionInfo:'',
            	transactionPwd:'',
            	walletName:'',
            	password1:null,
            	password2:null,
            	isswitch:true,
            	showPwdBox:true,
            	wordArr:[]
            }
        },
        computed: {
        },
        mounted(){
        	this.buildWord();
        },
        methods: {
        	buildWord(){
        		this.wordArr=generateMnemonic().split(" ");
	        	for(var i=0;i<this.wordArr.length;i++){
	        		this.word.push({
	        			 "name":this.wordArr[i]
	        		})
	        	}
	        	for(var i=0;i<this.word.length;i++){
	        		this.wordStr+=this.word[i].name;
	        	}
        	},
        	setPwd(){
        		this.showPwdBox=!this.showPwdBox;
        	},
//      	getRandomArrayElements(arr, count) {
//			    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
//			    while (i-- > min) {
//			        index = Math.floor((i + 1) * Math.random());
//			        temp = shuffled[index];
//			        shuffled[index] = shuffled[i];
//			        shuffled[i] = temp;
//			    }
//			    return shuffled.slice(min);
//			},
        	sx(){
        		this.$electron.remote.getCurrentWindow().reload()
        	},
        	rand(arr) {
			    var len = arr.length
			    //首先从最大的数开始遍历，之后递减
			    for(var i = arr.length - 1; i >= 0; i--) {
			    //随机索引值randomIndex是从0-arr.length中随机抽取的
			        var randomIndex = Math.floor(Math.random() * (i + 1));
			    //下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
			        var itemIndex = arr[randomIndex];
			        arr[randomIndex] = arr[i];
			        arr[i] = itemIndex;
			    }
			    //每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
			    return arr;
			},
        	selectId(item){
        		if(item.selected){
        			Vue.set(item,'selected',true);
        		}else{
        			this.pwd+=item.name;
        			Vue.set(item,'selected',true);
        		}
        	},
        	next(){
        		var pwsReg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$");
        		if(this.isswitch){
        			if(this.walletName==''){
        				this.$Message.error(this.$t('creatW.txt2'));
        			}else if(this.password1==null){
        				this.$Message.error(this.$t('creatW.txt4'));
        			}else if(pwsReg.test(this.password1)==false){
        				this.$Message.error(this.$t('creatW.txt6'));
        			}else if(this.password1!=this.password2){
        				this.$Message.error(this.$t('TipsMsg.txt0'));
        			}else{
        				this.creatwalletId=2; 
        			}
        		}else{
        			this.password1='';
        			if(this.walletName==''){
        				this.$Message.error(this.$t('creatW.txt2'));
        			}else{
        				this.creatwalletId=2;
        			}
        		}
        	},
        	next1(){
        		if(this.single){
        			this.creatwalletId=3;
        			this.newWord=this.rand(this.word);
        		}else{
        			this.$Message.error(this.$t('TipsMsg.txt1'));
        		}
        	},
        	next2(){
        		var obj={
        			"operation": "create",
					"backupPhrase": this.wordArr,
					"assuranceLevel": "strict",
					"name": this.walletName,
					"spendingPassword": this.password1
        		}
				// 密码加密处理
				obj.spendingPassword=encryptPWD(obj.spendingPassword);
				localStorage.setItem("epwd",obj.spendingPassword)
				
          		if(this.wordStr==this.pwd){
				    creatWallet(obj).then(res=>{
				    	this.$Message.success(res.status);
	        			this.$router.push({path:'/home',query:{'id':res.data.id}})
	        			this.creatwalletId=1;
	        			this.colseCW();
	        			
				    }).catch(res=>{})
	        	}else{
        			this.$Notice.open({
	                    title: '',
	                    desc:this.$t('TipsMsg.txt2')
	                });
        		}
        	},
        	colseCW(){
        		this.$emit('cwisShow',false);
        		this.creatwalletId=1;
        		this.clear();
        		this.wordArr=[];
        		this.walletName='';
        		this.password1='';
        		this.password2='';
        		this.word=[];
        		this.wordStr='';
        		this.single=false;
        		this.buildWord()
        	},
        	clear(){
        		this.pwd='';
        		for(var i=0;i<this.newWord.length;i++){
        			Vue.set(this.newWord[i],'selected',false);
        		}
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
	.msg{font-size: 16px;color: #666;}
	.wordId{padding: 20px;border: 1px solid #F89800;border-radius: 6px;color: #F89800;font-size: 22px;margin:20px auto ;}
	.wordId span{display:inline-block;*display:inline;*zoom:1;margin-right: 20px;}
	.dialog-content p{margin-top: 10px;}
	.dialog-content p span{color: #F89800;}
	
	.wordBtn{padding: 0;border: none;}
	.wordBtn span{padding: 5px 30px;color: #666;border: 1px solid #ccc;border-radius: 4px;margin-bottom: 20px;cursor: pointer;position: relative;}
	.wordBtn span.selects{border-color: #F89800;color: #F89800;background: url(../../../static/img/icon_jiciben_xuanzhong.png)no-repeat;background-position:100% 0; }
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
</style>