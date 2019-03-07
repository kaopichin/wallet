<template>
	<div class="index">
		<div class="containers">
			<div class="leftNav">
				<div class="log"></div>
				<ul>
					<li>
						<a href="javascript:;" @click="showPW">
			        		<i class="iconfont icon-pdf1"></i>
				        	<p>{{$t('nav.name4')}}</p>
			        	</a>
					</li>
					<li>
						<a href="javascript:;" @click="set">
			        		<i class="iconfont icon-shezhi"></i>
				        	<p>{{$t('nav.name5')}}</p>
			        	</a>
					</li>
					<li>
						<a  href="javascript:;" @click="synchro">
			        		 <i class="iconfont icon-tongbu"></i>
			        		 <p>{{$t('nav.name6')}}</p>
			        	</a>
					</li>
					<!--<li>
						<a href="javascript:;" @click="showAbout">
			        		<i class="iconfont icon-wenhao"></i>
				        	<p>关于</p>
			        	</a>
					</li>-->
				</ul>
			</div>
			
            <div class="content btnBoxs" v-show="num==1">
				<!--<div class="walletList">
					<a class="menu" href="javascript:;" @click="showLeftNav">
				        <Icon type="md-menu"></Icon>
				    </a>
				</div>-->
				<div class="btnBox">
					<Row :gutter="24">
				        <i-col span="12">
				        	<div class="box box-shadow text-center" @click="cw">
				        		<p class="p1"><i class="iconfont icon-tianjia"></i></p>
				        		<p class="p2">{{$t('creat.txt0')}}</p>
				        		<p class="p3">{{$t('creat.txt1')}}</p>
				        	</div>
				        </i-col>
				        <i-col span="12">
				             <div class="box box-shadow text-center" @click="wr">
				        		<p class="p1"><i class="iconfont icon-huifu"></i></p>
				        		<p class="p2">{{$t('creat.txt2')}}</p>
				        		<p class="p3">{{$t('creat.txt3')}}</p>
				        	</div>
				        </i-col>
				    </Row>
				    <Row :gutter="24" style="margin-top: 24px;">
				        <i-col span="12">
				        	<div class="box box-shadow text-center definded">
				        		<p class="p1"><i class="iconfont icon-renqun"></i></p>
				        		<p class="p2">{{$t('creat.txt4')}}</p>
				        		<p class="p3">{{$t('creat.txt5')}}</p>
				        	</div>
				        </i-col>
				        <i-col span="12">
				        	<div class="box box-shadow text-center definded">
				        		<p class="p1"><i class="iconfont icon-closed"></i></p>
				        		<p class="p2">{{$t('creat.txt6')}}</p>
				        		<p class="p3">{{$t('creat.txt7')}}</p>
				        	</div>
				        </i-col>
				    </Row>
				</div>
			</div>
			
			<div class="content content2" v-show="num==2">
				<div class="walletList">
					<a class="menu" href="javascript:;" @click="showLeftNav">
				        <Icon type="md-menu"></Icon>
				    </a>
				</div>
				<div class="txt text-center">
					<p><Icon type="ios-alert-outline" size="40" style="color: #BCBCBC;"/></p>
					<p style="color: #999999;font-size: 14px;">{{$t('creat.txt7')}}</p>
					<button class="alt" @click="cw">{{$t('creat.txt8')}}</button>
				</div>
			</div>
			
			<div class="content" style="padding: 10px 50px 50px 50px;background: #F0F5F9;" v-show="num==3">
				<div class="walletList">
					<a class="menu" href="javascript:;" @click="showLeftNav">
				        <Icon type="md-menu"></Icon>
				    </a>
				</div>
				<div class="tab box-shadow">
					<div class="tab-header">
						<ul>
							<li class="li1" :class="{'active':count=='1'}" @click="tab(1)"><a href="javascript:;">正常</a></li>
							<li :class="{'active':count=='2'}" @click="tab(2)"><a href="javascript:;">强制出售</a></li>
							<li :class="{'active':count=='3'}" @click="tab(3)"><a href="javascript:;">纸质钱包出售</a></li>
							<li :class="{'active':count=='4'}" @click="tab(4)"><a href="javascript:;">恢复正常</a></li>
							<li class="li2" :class="{'active':count=='5'}" @click="tab(5)"><a href="javascript:;">恢复强制出售</a></li>
							<div class="clearfix"></div>
						</ul>
					</div>
					
					<div class="contents" v-show="count=='1'">
						<p>你的钱包地址共享这个钱包要兑现您的TA，上传您的证书或复制和粘贴您的兑换代码从证书。下面是兑换钥匙的一个例子。您的密钥将看起来类似：</p>
						<span class="span">1BQzj8NXHj3SBurVToF2SSRwpxERpGam1a</span>
						<p>如果您上传了带有证书的PDF文件，那么将自动提取赎回代码。如果上传了加密的证书，则需要提供9个单词助记密码来解密证书，并且将自动提取赎回代码。</p>
						<Row :gutter="16">
							<Col span="20">
								<p>赎回金钥：</p>
								<Input v-model="key" placeholder="输入您的兑换密钥或上载证书"/>
								<p>选择钱包：</p>
								<Select v-model="wallet" placeholder="选择钱包">
							        <Option v-for="item in walletList" :value="item.id" :key="item.name">{{ item.name }}</Option>
							    </Select>
							</Col>
							<Col span="4" class="upl">
								 <Upload
							        multiple
							        type="drag"
							        :show-upload-list="false"
							        action="//jsonplaceholder.typicode.com/posts/">
							        <div>
							                               点击上传
							        </div>
							    </Upload>
							</Col>
						</Row>
						<button class="alt" @click="sx">赎回你的TA</button>
					</div>
					
					<div class="contents" v-show="count=='2'">
						<p>你的钱包地址共享这个钱包要兑现您的TA，上传您的证书或复制和粘贴您的兑换代码从证书。下面是兑换钥匙的一个例子。您的密钥将看起来类似：</p>
						<span class="span">1BQzj8NXHj3SBurVToF2SSRwpxERpGam1a</span>
						<p>如果您上传了带有证书的PDF文件，那么将自动提取赎回代码。如果您上传了加密的证书，您将需要提供您的电子邮件地址、TA密码和TA金额来解密您的证 书，并且您的兑换代码将被自动提取。</p>
						<Row :gutter="16">
							<Col span="20">
								<p>赎回金钥：</p>
								<Input v-model="key" placeholder="输入您的兑换密钥或上载证书"/>
								<p>选择钱包：</p>
								<Select v-model="wallet" placeholder="选择钱包">
							        <Option v-for="item in walletList" :value="item.id" :key="item.name">{{ item.name }}</Option>
							    </Select>
							</Col>
							<Col span="4" class="upl">
								 <Upload
							        multiple
							        type="drag"
							        :show-upload-list="false"
							        action="//jsonplaceholder.typicode.com/posts/">
							        <div>
							                               点击上传
							        </div>
							    </Upload>
							</Col>
						</Row>
						<button class="alt" @click="sx">赎回你的TA</button>
					</div>
					
					<div class="contents" v-show="count=='3'">
						<p>要赎回TA，从证书中输入屏蔽的自动售货钥匙，选择一个钱包，其中TA应该被赎回，并输入9个单词助记密码</p>
						<p>屏蔽自动售货机钥匙：</p>
						<Input v-model="key" placeholder="输入您的屏蔽自动售货键"/>
						<p>选择钱包：</p>
						<Select v-model="wallet" placeholder="选择钱包">
					        <Option v-for="item in walletList" :value="item.id" :key="item.name">{{ item.name }}</Option>
					    </Select>
						<p>解密TA凭证证书的密码：</p>
						<Input v-model="key" placeholder="输入您的屏蔽自动售货键"/>
						<button style="margin-top: 30px;" class="alt" @click="sx">赎回你的TA</button>
					</div>
					
					<div class="contents" v-show="count=='4'">
						<p>若要使用恢复服务中定期出售的证书赎回TA，请上传加密的证书并输入一个9字助记密码。上传加密证书并输入9字助记密码后，您的兑换密钥将自动提取，您将能 够将TA兑换到所选钱包。</p>
						<Row :gutter="16">
							<Col span="20">
								<p>赎回金钥：</p>
								<Input v-model="key" placeholder="输入您的兑换密钥或上载证书"/>
								<p>选择钱包：</p>
								<Select v-model="wallet" placeholder="选择钱包">
							        <Option v-for="item in walletList" :value="item.id" :key="item.name">{{ item.name }}</Option>
							    </Select>
							</Col>
							<Col span="4" class="upl">
								 <Upload
							        multiple
							        type="drag"
							        :show-upload-list="false"
							        action="//jsonplaceholder.typicode.com/posts/">
							        <div>
							                               点击上传
							        </div>
							    </Upload>
							</Col>
						</Row>
						<button class="alt" @click="sx">赎回你的TA</button>
					</div>
					
					<div class="contents" v-show="count=='5'">
						<p>要使用恢复服务中的强制证书来赎回您的TA，请上载您的加密证书并输入解密密钥。你的解密密钥应该是这样的：</p>
						<span class="span">1BQzj8NXHj3SBurVToF2SSRwpxERpGam1a</span>
						<p>在上传加密证书并输入解压缩的解密之后，您将能够将TA赎回到所选的walk ey，您的赎回密钥将是自动的。</p>
						<Row :gutter="16">
							<Col span="20">
								<p>赎回金钥：</p>
								<Input v-model="key" placeholder="输入您的兑换密钥或上载证书"/>
								<p>选择钱包：</p>
								<Select v-model="wallet" placeholder="选择钱包">
							        <Option v-for="item in walletList" :value="item.id" :key="item.name">{{ item.name }}</Option>
							    </Select>
							</Col>
							<Col span="4" class="upl">
								 <Upload
							        multiple
							        type="drag"
							        :show-upload-list="false"
							        action="//jsonplaceholder.typicode.com/posts/">
							        <div>
							                               点击上传
							        </div>
							    </Upload>
							</Col>
						</Row>
						<button class="alt" @click="sx">赎回你的TA</button>
					</div>
					
				</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	import { walletList,redemptions,sync } from '@/service/getData';
	import { encryptPWD } from '../../../static/js/encryptPWD.js';
	export default {
		
        data () {
            return {
            	isrotate:true,
            	count:'1',
            	wallet:'',
            	walletList:[],
            	key:'',
            	num:'1'
            }
        },
        computed: {
        },
        mounted(){
           this.getList();	
        },
        methods: {
        	synchro(){
        		sync().then(res=>{
        			console.log(res)
        		}).catch(res=>{})
        	},
        	getList(){
        		walletList().then(res=>{
	        		this.walletList=res.data;
	        	}).catch(res=>{})
        	},
        	tab(p){
        		this.count=p;
        	},
        	showLeftNav(){
        		this.isrotate =! this.isrotate;
        		this.$emit('isrotate', this.isrotate)
        	},
        	sx(){
        		if(this.count!='3'){
	        		if(this.key==''){
	        			this.$Message.error('请输入金钥');
	        		}else if(this.wallet==''){
	        			this.$Message.error('请选择钱包');
	        		}else{
	        			var obj = {
							"crWalletId": this.wallet,
							"crSeed": this.key
	        			}
	      			redemptions(obj).then(res=>{
	      				console.log(res)
	      			}).catch(res=>{})
	        		}
        		}else{
        			console.log("正在实现")
        		}
        	},
        	cw(){
        		this.$emit('cwisShow',true)
        		this.$emit('Haswallet','1');
        	},
        	showPW(){
        		this.$emit('isshow',true)
        	},
        	wr(){
        		this.$emit('wrisShow',true);
        	},
        	set(){
        		this.$emit('setBoxisShow',true);
        	},
        	showAbout(){
        		this.$emit('AboutisShow',true);
        	},
        	showR(){
        		 if(localStorage.getItem('wallets') === '0'){
	              	   this.num='2';
	              }else{
	              	   this.num='3';
	              }
        	}
        },
        created (){
        	if(this.$route.query.p){
        		this.num=this.$route.query.p
        	}
        }
        
        
    }
</script>

<style scoped="scoped">
	.index{width: 100%;height: 100%;}
	/*.containers{padding-left:10px ;}*/
	.leftNav{position: absolute;left: 0;top: 0;width: 100px;height: 100%;background: #38393e;z-index: 998;padding-top: 22px;}
	.log{width: 100px;height: 100px;background:#38393e url(../../../static/img/pic_ta_logo_.png)center center no-repeat;}
	ul li a{display: block;text-align: center;padding-top: 28px;color: #fff;}
	ul li a i{font-size: 24px;}
	.walletList{width:100px;height:100px;position: absolute;left: 100px;top: 22px;}
	a.menu{display: block;padding:0;line-height: 100px;text-align: center;color: #333F4B;font-size: 24px;}
	a.rotateIcon { transform: rotate(-90deg);}
	
	.btnBox{width: 100%;padding: 50px;}
	.box{padding: 40px 0;background: #fff;border-radius: 6px;cursor: pointer;}
	.box.box-shadow{box-shadow: 0px 0px 10px 1px #999;}
	.box .p1 i{font-size: 48px;color: #666;}
	.box .p2{font-size: 20px;color: #666;margin: 30px 0 20px;}
	.box .p3{font-size: 18px;color: #999;}
	
	.box.definded{background: rgba(255,255,255,.4);box-shadow: 0px 0px 10px 1px #ccc;cursor: initial;}
    .box.definded .p1 i{color: rgba(102,102,102,.4);}
	.box.definded .p2{color: rgba(102,102,102,.4);}
	.box.definded .p3{color: rgba(153,153,153,.4);}
	
	
	.mask{display:flex;justify-content:center;align-items:center;}
	.dialog{z-index: 99;width: 70%;background: #fff;border-radius: 6px;}
	.dialog-header{background: #f0f5f9;font-size: 16px;color: #F89800;border-radius: 6px;padding: 20px 0;position: relative;}
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
	.dialog-content{padding: 20px;}
	.dialog-content p{color: #666;font-size:16px;}
	.content .ivu-select{margin: 15px 0 30px;}
	
	.content2{position: absolute;width: 100%;height: 100%;padding-left: 370px;left: 0;top: 0;z-index: 5;background: #F0F5F9;display:flex;justify-content:center;align-items:center;}
	.content2 .txt p{margin-bottom: 20px;}
	
	.tab{background: #fff;padding: 30px 20px;border-radius: 6px;}
	.tab-header ul{width: 80%;margin: 0 auto;}
	.tab-header ul li{float: left;width: 20%;border: 1px solid #ccc;overflow: hidden;}
	.tab-header ul li+li{border-left: none;}
	.tab-header ul li a{display: block;width: 100%;height: 40px;text-align: center;line-height: 40px;font-size: 14px;color: #666;padding: 0;}
	.tab-header ul li.li1{border-bottom-left-radius: 6px;border-top-left-radius: 6px;}
	.tab-header ul li.li2{border-bottom-right-radius: 6px;border-top-right-radius: 6px;}
	.tab-header ul li.active{border-color: #F89800;}
	.tab-header ul li.active a{background: #F89800;color: #fff;}
	
	.contents p{margin: 28px 0 15px;font-size: 14px;color: #666;}
	.contents .span{color: #F89800;font-size: 18px;}
	.content .ivu-select{margin: 0;}
	
	button.alt{margin-top: 20px;}
	
	.containers{width: 100%;height: 100%;}
	.content.btnBoxs{display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;}
</style>