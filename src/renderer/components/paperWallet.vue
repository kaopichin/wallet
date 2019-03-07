<template>
	<div class="paperWallet">
		<div class="mask">
			
		    <div class="dialog box-shadow" v-if="num==1">
				<div class="dialog-header text-center">
					创建纸钱包证书
					<Icon size="24" class="close" type="md-close" @click="colsePW"/>
				</div>
				<div class="dialog-content font-16 lineH-28">
					<p class="font-14 col-666">
						请注意，您的纸质钱包恢复短语不同于12个单词恢复短语用于恢复您的常规TA钱包。出于安全原因，您的纸张钱包恢复措 词的最后9个字将不会打印在纸质钱包证书本身。你需要马上在你的证书上写这些文件。使用你的证书上的地址将资金发 送到你的纸质钱包。你的纸质钱包将会离线，所以不会在TA中保存。要检查钱包的余额，请将证书上的地址输入Cardano Store您的证书中，证书中包含纸钱包回收短语
					</p>
					<Divider />
					<p class="font-14 col-666 lineH-28">
						当您单击“保存PDF文件”时，将提示您选择将保存PDF文件的计算机上的目录。之后打开保存的PDF文件并打印出来
					</p>
					<button class="alt" @click="savePDF">保存PDF</button>
				</div>
			</div>
			
			<div class="dialog box-shadow" v-else-if="num==2">
				<div class="dialog-header text-center">
					验证打印证书
					<Icon size="24" class="close" type="md-close" @click="breakBox=true"/>
				</div>
				<div class="dialog-content font-16 lineH-28">
					<p class="font-14 col-666">
						检查你的纸质钱包证书，确保所有的东西都是可读的和正确打印的。您可以通过在手机上使用QR扫描仪扫描QR码来测试。 您的证书尚未完成，并且不包含用于测试纸钱包所需的所有数据。在下一步中，您将需要在纸钱包恢复短语中写下附加的 9个单词。
					</p>
					<p>
						<Checkbox v-model="single1">
							是的，纸钱包证书打印成功。
						</Checkbox>
					</p>
					<p>
						<Checkbox v-model="single2">
							是的，前18个词的钱包回收短语是可读的。
						</Checkbox>
					</p>
					<p>
						<Checkbox v-model="single3">
							是的，QR码是可扫描的。
						</Checkbox>
					</p>
					<button class="alt" @click="next">下一步</button>
				</div>
			</div>
			
			<div class="dialog box-shadow" v-else-if="num==3">
				<div class="dialog-header text-center">
					填写证书
					<Icon size="24" class="close" type="md-close" @click="breakBox=true"/>
				</div>
				<div class="dialog-content font-16 lineH-28">
					<p class="font-16 col-666">
						要完成您的纸钱包证书，您将需要在证书上写下您的纸钱包回收短语的剩余9个单词
					</p>
					<div class="wordId">
						<span v-for="(item,index) in word" :key="index">{{item.name}}</span>
					</div>
					<p class="font-14 col-666">
						你可以在这里写剩下的单词：
					</p>
					<p>
						<Checkbox v-model="single4">
							是的，我在证书上写了剩下的9个字
						</Checkbox>
					</p>
					
					<button class="alt" @click="next1">下一步</button>
				</div>
			</div>
			
			<div class="dialog box-shadow" v-else-if="num==4">
				<div class="dialog-header text-center">
					验证证书
					<Icon size="24" class="close" type="md-close" @click="breakBox=true"/>
				</div>
				<div class="dialog-content font-16 lineH-28">
					<p class="font-14 col-666">
						输入您的纸钱包回收短语以验证您的纸钱包证书确保您输入了纸钱包回收短语的所有27个单词，首先打印在证书上的18个 单词，然后是您手写的9个单词
					</p>
					<p class="font-14 col-666 p1">
						纸质钱包恢复短语：
						<span>请输入全部27个词语</span>
					</p>
					<Input v-model="allWord" type="textarea" :autosize="{minRows: 2}" placeholder="请输入全部27个词语"></Input>
					<p>
						<Checkbox v-model="single5">
							我知道我创建的纸质钱包不会存储在代达罗斯中
						</Checkbox>
					</p>
					<p>
						<Checkbox v-model="single6">
							我知道我创建的纸质钱包不会存储在代达罗斯中
						</Checkbox>
					</p>
					<button class="alt" @click="next2">下一步</button>
					<button class="alt def" @click="empty">清空</button>
				</div>
			</div>
			
			<div class="dialog box-shadow" v-else="num==5">
				<div class="dialog-header text-center">
					纸质钱包证书
				</div>
				<div class="dialog-content font-16 lineH-28">
					<p class="font-14 col-666">
						您可能希望折叠您的纸质钱包证书并将EdStigo商店安全地粘在一起。当您希望将钱包进口回Daedalus庄稼时，请将您的证 书放在安全的地方。在任何时候检查纸袋上的余额，你可以使用下面的链接。复制或保存URL到你的BooSoBoo签中，这样 做很容易
					</p>
					<p class="font-16 col-666">
						资源管理器链接：
					</p>
					<Input v-model="address" type="textarea" :autosize="{minRows: 2}" placeholder="请输入"></Input>
					<p class="font-14 col-666">
						向您的纸质钱包收取资金，只需与他人分享您的钱包地址即可。
					</p>
					<p class="font-16 col-666">
						钱包地址：
					</p>
					<p class="font-18 col-666">
						Ddzffzcarhsnqbpxi5tmftnk8sybonctbmd4f1y7cq62882vhmhza0ng2iyawswXighwfy xp2niouxl 8dfgwsz6ckqt3mejizr1oudoq
					</p>
					<div class="imgBox text-center">
						<img src="../../../static/img/sy_pic_erweima.png"/>
					</div>
					<button class="alt" @click="finish">完成</button>
				</div>
			</div>
			
			<!--此部分将就是pdf显示的部分-->
			<div id="pdfDom" style="padding-top: 55px;background-color:#fff;position:absolute;left: -999999999999px;">
				<div class="log"></div>
				<p  v-for="(item , index) in walletList" :key="index">{{item.id}}</p>
			</div>
			
			<Modal
			 	class="xm"
		        v-model="breakBox"
		        title="废纸钱包认证？"
		        @on-ok="ok"
		        ok-text="中止"
		        cancel-text="返回"
		        @on-cancel="cancel">
		        <p>此时，您的纸钱包证书尚未完成，验证步骤尚未完成。如果此时决定中止，请销毁保存的 PDF文件和打印的证书，并且不向.eBackAbort上的钱包地址发送任何资金</p>
		    </Modal>
			
			
		</div>
	</div>
</template>

<script>
	import { walletList } from '@/service/getData';
	import { getPdf  } from '../../../static/js/htmlToPdf'
	export default {
        data () {
            return {
            	breakBox:false,
            	num:'1',
            	single1:'',
            	single2:'',
            	single3:'',
            	single4:'',
            	single5:'',
            	single6:'',
            	word:[
            	  {name:'kdls1'},
            	  {name:'kdls2'},
            	  {name:'kdls3'},
            	  {name:'kdls4'},
            	  {name:'kdls5'},
            	  {name:'kdls6'},
            	  {name:'kdls7'},
            	  {name:'kdls8'},
            	  {name:'kdls9'}
            	],
            	allWord:'',
            	address:'',
            	walletList:[]
            }
        },
        computed: {
        },
        mounted(){
        	this.getList()
        },
        methods: {
        	getList(){
        		walletList().then(res=>{
	        		this.walletList=res.data;
	        	}).catch(res=>{})
        	},
        	empty(){
        		this.allWord=''
        	},
        	ok () {
        		this.breakBox=false;
                this.$emit('isshow',false);
                this.num=1;
            },
            cancel () {
                this.breakBox=false;
            },
        	sx(){
        		this.$electron.remote.getCurrentWindow().reload();
        	},
        	colsePW(){
        		this.$emit('isshow',false)
        	},
        	savePDF(){
        		getPdf()
        		this.num=2
        	},
        	next(){
        		this.num=3
        	},
        	next1(){
        		this.num=4
        	},
        	next2(){
        		this.num=5
        	},
        	finish(){
        		this.$emit('isshow',false);
        		this.num=1;
        	}
        },
        created (){
        }
    }
</script>                               

<style scoped="scoped">
	.paperWallet{position:absolute;width: 100%;height: 100%;background: #fff;top: 22px;left: 100px;z-index: 999;}
	.mask{display:flex;justify-content:center;align-items:center;}
	.dialog{z-index: 99;width: 70%;background: #fff;border-radius: 6px;}
	.dialog-header{background: #f0f5f9;font-size: 16px;color: #F89800;border-radius: 6px;padding: 20px 0;position: relative;}
	.close{position: absolute;top: 20px;right: 20px;cursor: pointer;}
	.dialog-content{padding: 20px;}
	.wordId{padding: 20px;border: 1px solid #F89800;border-radius: 6px;color: #F89800;font-size: 22px;margin:20px auto ;}
	.wordId span{display:inline-block;*display:inline;*zoom:1;margin-right: 20px;}
	p.p1{position: relative;}
	p.p1 span{color: #F2482D;position: absolute;right: 0;}
	#pdfDom .log{width: 80px;height: 80px;background:#F89800 url(../../../static/img/pic_ta_logo_.png)center center no-repeat;margin: 0px auto;border-radius: 4px;}
	#pdfDom p{font-size: 14px;padding: 0 20px;margin-top: 10px;}
</style>