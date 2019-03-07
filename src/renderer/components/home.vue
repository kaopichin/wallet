<template>
	<div class="index bgcf0">
		<div class="home">
			<div class="walletInfo box-shadow">
				<div class="imgBox homeImgBox pull-left"  id="qrcode">
				</div>
				<div class="info pull-left">
					<p class="font-16">{{item.name}}</p>
					<p>
						<span class="font-18 col-F89">
							<span v-text='(Number(item.balance)/1000000).toFixed(6)'></span> TA</span>
						<!--<span class="font-18"> ≈ </span>
						<span class="font-16">686248.00 USD</span>-->
					</p>
					<p class="font-14 p">
						<span class="col-666">{{$t('home.txt0')}}：</span>
					</p>
					<p class="p1 font-18">
						<span class="pull-left ellipsis">{{walletId}}</span> 
						<Icon size="24" color="#999" style="margin: 13px 20px 0 0;" class="pull-right" type="md-copy" @click="copy"/>
						<div class="claerfix"></div>
					</p>
					<!--<div class="add" v-show="addForm">
						<p class="font-14 col-666">请输入备注信息</p>
						<Input v-model="transactionInfo" placeholder="请输入备注信息"/>
						<p class="font-14 col-666">输入交易密码</p>
						<Input v-model="transactionPwd" placeholder="输入交易密码"/>
					</div>-->
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="transaction box-shadow">
				<div class="header font-16 col-333">
					{{$t('home.txt1')}}
				</div>
				<div class="List none" v-if="tradeList.length===0">{{$t('home.txt2')}}</div>
				<div class="List" v-else>
					<Collapse accordion simple style="border: none;">
				        <Panel v-for="(item,index) in tradeList" :name="item.id" :key="index">
					        <div>
						        <div class="pull-left w20 font-14 log">
						        	<img src="../../../static/img/pic_jiaoyijilu_bizhong_.png"/>
						        	TokenAlliance
						        </div>
						        <div class="pull-left w20 font-14" >
						        	<span v-if="item.direction=='outgoing'">{{$t('nav.name2')}}</span>
						        	<span v-else>{{$t('nav.name3')}}</span>
						        </div>
						        <div class="pull-left w20 font-14" v-html="item.creationTime.substring(0,10)"></div>
						        <div class="pull-left w20 font-14"><span v-show="item.direction=='outgoing'">-</span>{{item.amount}} TA</div>
						        <div class="pull-left w20 font-14">Hight</div>
						        <div class="clearfix"></div>
						    </div>            
					        <div slot="content">
					        	<div class="box font-14">
					        		<h3>From addresses</h3>
					        		<p class="ellipsis" v-for="(item1,index1) in item.inputs" :key="item1.address">{{item1.address}}</p>
					        		<h3> To addresses</h3>
					                <p class="ellipsis" v-for="(item2,index2) in item.outputs" :key="item2.address">{{item2.address}}</p> 
					        		<h3> Transaction</h3>                                                                                               <P>{{item.id}}</P>
					        	</div>
					        </div>
				        </Panel>
				        
					</Collapse>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import QRCode from 'qrcodejs2'
	import { getWalletId ,transactionList} from '@/service/getData';
	export default {
        data () {
            return {
            	walletId:this.$route.query.id,
            	item:{},
            	tradeList:[],
            	imgSrc:''
            }
        },
        created (){
        	this.walletInfos();
        	this.getTransactionList();
        },
        mounted () {
        },
        methods: {
        	qrcode(){
        		let qrcode = new QRCode('qrcode', {
			        width: 150,  
			        height: 150,
			        text: this.walletId, // 二维码地址
			        colorDark : "#000",
			        colorLight : "#fff",
			      })
        	},
        	getTransactionList(){
        		if(this.$route.query.id){
        			localStorage.setItem("walletId",this.$route.query.id)
        		}
        		transactionList({
        			'wallet_id':localStorage.getItem('walletId')
        		}).then(res=>{
        			this.tradeList=res.data;
        		}).catch(res=>{})
        	},
        	walletInfos(){
        		
        		if(this.$route.query.id){
        			localStorage.setItem("walletId",this.$route.query.id)
        		}
        		
        		getWalletId({
	        		'walletId':localStorage.getItem('walletId')
	        	}).then(res=>{
	        		localStorage.setItem('hasSpendingPassword',res.data.hasSpendingPassword)
	        		this.walletId=res.data.id;
	        		this.item=res.data;
	        		this.qrcode();
	        	}).catch(res=>{})
	        	
        	},
        	copy(){
        		this.$electron.clipboard.writeText(this.walletId);
        		this.$Message.success(this.$t('TipsMsg.txt3'));
        	},
        },
        watch: {
          // 如果路由有变化，会再次执行该方法
          "$route": function(){
          	this.walletInfos();
          	this.getTransactionList();
          }
          
        }
    }
</script>

<style scoped="scoped">
	.home{padding: 30px;}
	
	.walletInfo{padding: 50px 20px;background: #fff;border-radius: 6px;margin-bottom: 20px;position: relative;}
	#qrcode{width: 150px;position: relative;}
	.info{padding-left: 180px;width: 79%;}
	.info .p1{border: 1px solid #CCCCCC;border-radius: 4px;height: 50px; line-height: 50px;text-indent: 20px;}
	.info .p{margin: 25px 0 5px;}
	
	.transaction{background: #fff;border-radius: 6px;padding-bottom: 40px;}
	.transaction .header{padding: 30px 0 30px 20px;}
	.List{min-height: 130px;}
	.List .log img{position: relative;top: 5px;}
	.List .box{margin: 0 auto;width: 60%;}
	.List .box p{margin-bottom: 20px;}
	.List.none{text-align: center;line-height: 70px;font-size: 14px;color: #ccc;}
	.add p{margin: 20px 0 5px;}
	
	
	.pwd p{margin-bottom: 10px;}
	.walletInfo .syn{position: absolute;top: 50px;right: 50px;cursor: pointer;padding: 5px 20px;border-radius: 4px;background: #F89800;color: #fff;} 
</style>
