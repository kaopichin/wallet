<template>
	<div class="restore">
		<div class="mask">
			<div class="dialog box-shadow pwd">
				<div class="dialog-header text-center">
					{{$t('restore.txt0')}}
					<Icon size="24" class="close" type="md-close" @click="colseWR"/>
				</div>
				<div class="dialog-content">
					<div class="tab-header text-center">
						 <Row>
					        <Col span="12">
					        	<a :class="{active:num==1}" href="javascript:;" @click="tab(1)">
					        		{{$t('restore.txt1')}}
					        	</a>
					        </Col>
					        <Col span="12">
					        	<a class="a" :class="{active:num==2}" href="javascript:;" @click="tab(2)">
					        		{{$t('restore.txt2')}}
					        	</a>
					        </Col>
					    </Row>
					</div>
					
					<div class="tab-content" v-show="num==1">
						<p>{{$t('creatW.txt1')}}</p>
						<Input v-model="walletName" :placeholder="$t('restore.txt7')"/>
						<p>{{$t('restore.txt3')}}</p>
						<Input v-model="allWord" type="textarea" :autosize="{minRows: 2}" :placeholder="$t('restore.txt6')"></Input>
						<p class="font-14 col-666">
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
							<p class="col-999">{{$t('creatW.txt6')}}</p>
						</div>
					</div>
					
					<div class="tab-content" v-show="num==2">
						<p>{{$t('creatW.txt1')}}</p>
						<Input v-model="walletName" :placeholder="$t('restore.txt7')"/>
						<p>{{$t('restore.txt5')}}</p>
						<Input v-model="allWord" type="textarea" :autosize="{minRows: 2}" :placeholder="$t('restore.txt6')"></Input>
						<p class="font-14 col-666">
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
							<p class="col-999">{{$t('creatW.txt6')}}</p>
						</div>
					</div>
					
					<button class="alt" @click="sx">{{$t('restore.txt6')}}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { encryptPWD } from '../../../static/js/encryptPWD.js';
	import { creatWallet } from '@/service/getData';
	export default {
        data () {
            return {
            	num:1,
            	walletName:'',
            	allWord:'',
            	isswitch:true,
            	showPwdBox:true,
            	password1:'',
            	password2:''
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
        	tab(p){
        		this.num=p;
        	},
        	sx(){
        		var pwsReg = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$");
    			if(this.isswitch==true){
    				if(this.walletName==''){
        				this.$Message.error(this.$t('creatW.txt2'));
        			}else if(this.allWord==''){
        				this.$Message.error(this.$t('TipsMsg.txt7'));
        			}else if(this.password1==''){
        				this.$Message.error(this.$t('TipsMsg.txt8'));
        			}else if(pwsReg.test(this.password1)==false){
	        			this.$Message.error(this.$t('creatW.txt6'));
	        		}else if(this.password1!=this.password2){
	        			this.$Message.error(this.$t('TipsMsg.txt0'));
	        		}else{
	        			this.sub()
	        		}
    			}else{
    				if(this.walletName==''){
        				this.$Message.error(this.$t('creatW.txt2'));
        			}else if(this.allWord==''){
        				this.$Message.error(this.$t('TipsMsg.txt7'));
        			}else {
	        			this.sub()
	        		}
    			}
        		
        	},
        	sub(){
        		console.log(111111)
        		var wordArr = this.allWord.split(',');
        		var obj={
        				"operation": "restore",
						"backupPhrase": wordArr,
						"assuranceLevel": "strict",
						"name": this.walletName,
						"spendingPassword": this.password1
        			}
        		console.log(obj)
        		obj.spendingPassword=encryptPWD(obj.spendingPassword);
        		creatWallet(obj).then(res=>{
        			console.log(res)
        			if(res=='Network Error'){
        				this.$Message.error(this.$t('TipsMsg.txt9'));
        			}else{
        				this.$Message.success(res.status);
	        			this.$router.push({path:'/home',query:{'id':res.data.id}})
	        			this.colseWR();
	        			this.allWord='';
	        			this.walletName='';
	        			this.password1='';
	        			this.password2='';
        			}
        			
        			
				    	
	        			
				    }).catch(res=>{})
        	},
        	colseWR(){
        		this.$emit('wrisShow',false);
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
	
	.tab-header{width: 302px;border-radius: 6px;overflow: hidden;margin: 0 auto;}
	.tab-header a{display: block;width: 100%;height: 40px;line-height: 40px;border: 1px solid #ccc;border-right: none;color: #666;font-size: 14px;border-radius: 6px;border-top-right-radius:initial ;border-bottom-right-radius: initial;}
	.tab-header a.a{border-left: none;border-right: 1px solid #ccc;border-radius: 6px;border-top-left-radius:initial ;border-bottom-left-radius: initial;}
	.tab-header a.active{border-color: #F89800;color: #fff;background: #F89800;}
	.tab-content p{margin: 28px 0 13px;}
</style>