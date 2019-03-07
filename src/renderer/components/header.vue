<template>
	<div class="header">
		<div class="leftNavs">
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
					<a href="javascript:;">
		        		<i class="iconfont icon-wenhao"></i>
			        	<p>关于</p>
		        	</a>
				</li>-->
			</ul>
		</div>

		<div class="nav text-center">
			<Row>
		        <Col span="6">
		        	<router-link to="/home">
						<i class="iconfont icon-qianbao"></i>
		        	    <p>{{$t('nav.name1')}}</p>
		        	</router-link>
		        </Col>
		        <Col span="6">
		        	<router-link to="/pay">
			        	<i class="iconfont iconfont1 icon-qudaojieshou"></i>
			        	<p>{{$t('nav.name2')}}</p>
		        	</router-link>
		        </Col>
		        <Col span="6">
		        	<router-link to="/receipts">
		        		<i class="iconfont icon-qudaojieshou"></i>
			        	<p>{{$t('nav.name3')}}</p>
		        	</router-link>
		        </Col>
		        <!--<Col span="4">
		        	<a href="javascript:;" @click="showPW">
		        		<i class="iconfont icon-pdf1"></i>
			        	<p>{{$t('nav.name4')}}</p>
		        	</a>
		        </Col>-->
		        <!--<Col span="24">
		        	<router-link to="/set">
		        		<i class="iconfont icon-shezhi"></i>
			        	<p>{{$t('nav.name5')}}</p>
		        	</router-link>
		        </Col>-->
		        <Col span="6">
		        	<router-link to="/set">
		        		<i class="iconfont icon-shezhi"></i>
			        	<p>{{$t('nav.name5')}}</p>
		        	</router-link>
		        </Col>
		    </Row>
		</div>
		
		<Modal
		 	class="xm"
	        v-model="closeBox"
	        title="退出系统"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <p>你确定要退出系统吗？</p>
		</Modal>
		
	</div>
</template>

<script>
	import { sync} from '@/service/getData';
	export default {
        data () {
            return {
            	closeBox:false,
            }
        },
        computed: {
        	
        },
        methods: {
        	set(){
        		this.$emit('setBoxisShow',true);
        	},
        	synchro(){
        		sync().then(res=>{
        			console.log(res)
        		}).catch(res=>{})
        	},
        	ok () {
        		this.$electron.ipcRenderer.send('window-close');
            },
            cancel () {
                this.closeBox=false;
            },
        	showLeftNav(){
        		this.isrotates=!this.isrotates;
        		this.$emit('isrotate', this.isrotates)
        	},
        	showPW(){
        		this.$emit('isshow',true)
        	},
        	showR(){
        		this.$router.push({path:'/index',query:{p:'3'}});
        	}
        }
    }
</script>

<style scoped="scoped">
	.header{width: 100%;padding-left: 370px;background: #38393e;color: #fff;z-index: 97;}
	.header .log{width: 100px;height: 100px;background:#38393e url(../../../static/img/pic_ta_logo_.png)center center no-repeat;position: absolute;top: 0px;left: 0;margin-top: 22px;}
	.nav{padding: 0 5%;}
	.nav a{display: block;height: 100px;color: #fff;padding-top: 24px;width: 100px;margin: 0 auto;}
	.nav a i{font-size: 24px;}
	.nav a i.iconfont1{display:block;transform:rotate(180deg);}
	.nav a.router-link-active{color: #F89800;border-bottom: 2px solid #F89800;}
	.nav a.router-link-active i{color: #F89800;}
	.nav a:hover{color: #F89800;}
	/*.walletList{width: 100px;height: 100px;position: absolute;top: 0px;left: 100px;}
	a.menu{display: block;padding:0;line-height: 100px;text-align: center;}
	a.rotateIcon { transform: rotate(-90deg);}*/
	
	
	.header .leftNavs{position: fixed;left: 0;top: 0;width: 100px;height: 100%;background: #38393e;z-index: 999;padding-top: 122px;}
	.leftNavs ul li a{display: block;text-align: center;padding-top: 28px;color: #fff;}
	.leftNavs ul li a i{font-size: 24px;}
	
	
</style>