


<template id="one">
  <div class="dingdan">
    <div class="top"><i class="el-icon-arrow-left" @click="back_to"></i><span>网络门诊</span></div>
    <main>
      <div @click="list">就诊人
        <span v-text="info.mod" class="mod_span"></span>
        <div class="icon"></div>
      </div>
      <div class="textarea">
      <textarea placeholder="请仔细描述您需要咨询的问题，以及您需要的帮助(最小输入10字)" maxlength="500"
                @input="descInput" v-model="info.desc" ></textarea>
      <div><span>{{info.remnant}}</span><span>/</span><span>500</span></div>
    </div>
      <div class="zhaopian" @click="textShow">
        <div @click="upPhoto"><img class="upimg" src="../assets/zhaopian1.png" alt=""></div>
        <div v-if="info.updown">
          <p >上传图片资料</p>
          <div>
            <p>检验检查报告，病症部位照片等图片信息(最多上传5张) </p>
          </div>
        </div>
        <div class="aImg">
        	<span v-for="(img,index) in info.imgs" class="imgSpan">
        		<img :src="img" alt="" class="imgSingle" >
        		<img @click="delImg(index)" class="delImg" src="../assets/imgDel.png"/>
        	</span>
        </div>
      </div>
      <ASB v-show="info.show"></ASB>
    </main>

    <footer @click="zhifu">立即支付 ￥ {{info.monStr}}元</footer>
    <div class="bgBlack" v-if="info.quxiaos"></div>
    <div class="shangchuan" v-if="info.quxiaos">
    </div>
    <div class="addPeople shangchuan" v-if="info.addPeople">
      <div>
        <p v-for="list in info.list" v-model="info.mod" @click="addClick(list.patientName,list.patientId,list.patientIdCard,list.patientBirthday)">{{list.patientName}}</p>
        <p @click="addPeople">添加就诊人</p>
      </div>
      <div>
        <p @click="quxiao">取消</p>
      </div>
    </div>
    <div style="width: 150px;height: 150px;background: #fff;position: fixed;top: 30%;left: calc(50% - 75px);text-align: center;line-height: 150px ;font-size: 1.4rem;border-radius: 2rem" v-if="info.x">图片上传中...</div>
  </div>

</template>


<style lang="less" scoped>
  @import "./../css/dingdan.less";
  .aImg {
    box-sizing: border-box;
    width: 80% !important;
    margin: 0;
    font-size: 0;
    overflow: hidden;
    & > img {
      width: 48px;
      height: 48px;
      margin-top: 10px;
      margin-right: 2px;
    }
  }
  .mod_span {
    width: 75%;
    height: 4rem;
    display: inline-block;
    text-align: right;
    position: absolute;
    letter-spacing: 0.1rem;
    color: #000000 !important;
    box-sizing: border-box;
    padding-right: 1rem;
  }
  .top {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 17px;
    text-align: center;
    border-bottom: 0.1rem solid #e7e7e7;
    color: #444444;
    & > i {
      position: absolute;
      left: 1.2rem;
      top: 1rem;
      font-size: 24px;
    }
    & > img {
      position: absolute;
      right: 1.5rem;
      top: 1.4rem;
    }
  }
  .imgSpan {
    position: relative;
    width: 4.2rem;
    height: 4.2rem;
    display: inline-block;
    background: #fff;
    margin-right: 0.6rem;
  }
  .delImg {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: -5px;
  }
  .phoneNum input {
    width: 100% !important;
  }
  textarea {
    resize: none;
  }
  .describe {
    padding: 0 1rem !important;
    box-sizing: border-box;
  }
  .describe textarea {
    height: 8rem !important;
    text-align: justify;
  }
  .shangchuan {
    position: fixed;
  }
  .font_hint {
    right: 1rem !important;
  }
  .list_div {
    box-sizing: border-box;
  }
  .imgSingle {
    width: 4rem;
    height: 4rem;
  }
  @media only screen and (max-width: 360px) {
    .imgSpan {
      margin-right: 0.5rem;
    }
    .imgSingle,
    .imgSpan,
    .upimg {
      width: 3.5rem !important;
      height: 3.5rem !important;
    }
  }
  .tjjzr {
    width: 90% !important;
    left: 5% !important;
    bottom: 6rem !important;
    border-radius: 1rem !important;
    overflow: hidden;
  }
  .tjjzr_qx {
    width: 90% !important;
    left: 5% !important;
    border-radius: 1rem !important;
    overflow: hidden;
  }
</style>

<script>
import { MessageBox, Toast } from 'mint-ui';
import ASB from "./jianyan.vue";
import Photo from "./photo.vue";
export default {
  data() {
    return {
      info: {
        remnant: 0,
        desc: null,
        show: true,
        quxiaos: false,
        addPeople: false,
        img: "",
        imgs: [],
        updown: true,
        chuanpian: false,
        iphone: "",
        list: null,
        mod: "",
        monStr: "",
        interrogationId: "",
        Ids: null,
        orderNo: 0,
        as: false
      },
      len: "",
      //        serviceId : [],
      url:  this.$store.state.hlwyyUrl,
      urls: this.$store.state.schlwyyUrl+"/hlwyy-new",      /* 正式环境的地址 */
      url_s:  this.$store.state.skyUrl,         /* 四凯测试环境地址 */
      imgUrl:this.$store.state.schlwyyUrl+"/doctor",    /* 医生头像图片 */
      answerQuestions: null,
      dialogImageUrl: "",
      dialogVisible: false,
      images: {
        localId: [],
        serverId: ""
      },
      positivePhoto: [],
      x: false,
      page: true
    };
  },
  components: { ASB, Photo },
  mounted() {
    this.monStr();
    this.yyClick();
  },

  methods: {
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addClick(name, interrogationId,patientIdCard,patientBirthday) {
      //console.log(name,interrogationId,patientIdCard,patientBirthday)
        this.info.quxiaos = false;
        this.info.addPeople = false;
      if(patientIdCard === undefined && patientBirthday === undefined){
        Toast("就诊人信息不完善，请先完善就诊人信息")
        return
      }else if(patientIdCard === "" && patientBirthday === ""){
        Toast("就诊人信息不完善，请先完善就诊人信息")
        return
      }else{
        this.info.mod = name;
        this.info.interrogationId = interrogationId;
      }
    },
    descInput() {
      this.info.remnant = this.info.desc.length;
    },
    textShow() {
      this.info.show = true;
      this.info.chuanpian = true;
      this.info.updown = false;
      this.$options.methods.upPhoto();
    },
    upPhoto() {
      var _this = this;
//    this.info.show = false;

      var imgCout = 5 - _this.info.imgs.length;
      if(imgCout<=0){
        MessageBox('提示', '最多只能传五张照片');
        return false;
      }
//      _this.images.serverId = '';
//      _this.info.imgs = [];
      //上传图片
      wx.chooseImage({
        count: imgCout, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
//            _this.images.localId = res.localIds;返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//          _this.info.imgs.push(res.localIds);
						_this.info.quxiaos = true;
            _this.info.x = true;
//          _this.info.imgs = _this.info.imgs.concat(res.localIds);
            _this.syncUpload(res.localIds);
           
        }
      });
    },
    syncUpload(localIds) {
      let _this = this;
        let localId = localIds.shift();
        wx.uploadImage({
          localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success: function (res) {
            //获取serverId
//            alert('拿到serverid'+res.serverId);
						_this.info.imgs.push(localId);
						if(_this.info.imgs.length>0){
		      		_this.info.updown = false;
		      	}
		      	else{
		      		_this.info.updown = true;
		      	}
		      	
            _this.images.serverId += ',' + res.serverId;
            
            setTimeout(function () {
              if(localIds.length > 0) {
                _this.syncUpload(localIds);
              }else {
                _this.isWx(_this.images.serverId);
              }
            },0);
          },
        });
    },
    isWx(x) {
      let _this = this;
      _this.get(_this.$store.state.weChatUrl + '/weixinFHW/consultation/imgInfo',{
          serviceId: x,
          openId:  localStorage.getItem('openId')
      }).then(function ( response) {
          let imgUrl = response.data.positivePhoto;
          _this.info.quxiaos = false;
          _this.info.x = false;
          _this.positivePhoto = imgUrl;
      })
    },
    delImg(index){
      let _this =this;
      _this.info.imgs.splice(index,1);
      if(_this.info.imgs.length>0){
        _this.info.updown = false;
      }
      else{
        _this.info.updown = true;
      }
      _this.images.serverId = _this.images.serverId.split(',');
      _this.images.serverId.splice(index+1,1);
      _this.images.serverId =  _this.images.serverId.join(',');
      _this.isWx(_this.images.serverId);
    },
    //验证手机号
    isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        this.info.iphone = "";
        alert("请输入正确的手机号");
        return false;
      } else {
        return true;
      }
    },
/*     jilu() {
      this.$router.push("/jilu");
      document.title = "问诊记录";
    }, */
    quxiao() {
      //this.info.show = false;
      this.info.quxiaos = false;
      this.info.addPeople = false;
    },
    addPeople() {
      this.$router.push({
          name:"addPeople",
          query:{
            "confirmation":true
          }
        });
      document.title = "添加就诊人";
      localStorage.setItem("confirmation",true)
    },
    //
    //上传照片到微信服务器
    
    zhifu() {
      var _this = this;
      var token = localStorage.getItem('token');
          
      //创建支付
      //        _this.$router.push('/inquiry');
      let isClinic = ""
      if(localStorage.getItem("kindsmenzhen") == "yizhen"){
          isClinic = 1;
      }else{
          isClinic = 0;
      }
      let config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      };
      //创建图文问诊
      if (_this.info.mod === null || _this.info.mod == "") {
        Toast("请选择就诊人");
      } else if (_this.info.desc && _this.info.desc.length < 10) {
        Toast("输入问诊内容最少输入10字");
      }/* else if (_this.info.iphone === "") {
        alert("请输入手机号");
      } */else if (_this.info.desc === null) {
        Toast("请输入问诊内容");
      } else {
        if (_this.page) {
          _this.page = false;
          _this
            .get(      //(_this.$store.state.schlwyyUrl + '/hlwyy-new/api/graphic_inquiry'
              _this.url_s+"/OrderController/save",{
                  doctorId: localStorage.getItem("doctorId"),
                  //token: token,
                  money: _this.info.monStr,
                  images: _this.positivePhoto,
                  patientId: _this.info.interrogationId,
                  question: _this.info.desc,
                  isClinic: isClinic,
                  hospitalId:localStorage.getItem("hospitalCode"),
                  openId:  localStorage.getItem('openId')
              },config).then(function(res) {
              if( res.data.clinic === "no"){
                  return Toast("当前医生已无义诊次数")
              }
              _this.page = true;
              //获取id
              var id = res.data.graphicInquiry.id;
              //订单号
              var orderNum = res.data.graphicInquiry.orderNum;
              var orderId = res.data.graphicInquiry.orderId;
              localStorage.setItem("id", id);
              localStorage.setItem("orderId", orderId);
              //储存id
              localStorage.setItem("questionId", _this.info.interrogationId);
              if( isClinic == 0){

                //调用支付
                 _this.get(       //_this.$store.state.weChatUrl     ///weixinFuWuHao-prod/weixinFHW/consultation/wxPay
                    _this.$store.state.weChatUrl + "/weixinFHW/consultation/wxPay",
                    {
                        orderNo: orderNum,
                        money: _this.info.monStr,
                        //                money: 0.01,
                        userName: _this.info.mod,
                        //userPhone: _this.info.iphone,
                        typeStr: 1,
                        openId: localStorage.getItem("openId")
                    }
                  )
                  .then( response=> {
                    wx.chooseWXPay({
                      timestamp: response.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                      nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
                      package: response.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                      signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      paySign: response.data.paySign, // 支付签名
                      success: function(res) {
                      //if(res.err_msg.indexOf('ok') != -1){
                        // 支付成功后的回调函数     _this.urls +"/api/graphic_inquiry/" + id +  "/action/pay_callback"
                            _this.page = true;
                            _this.$router.push({path:'/inquiry'});
                            document.title = "图文问诊";
                          }
  //                   	else{
  //                   		alert("支付失败");
  //                   	}
  //                   	else if(res.err_msg == "get_brand_wcpay_request:cancel"){
  //                   		alert("取消支付");
  //                   	}
  //                   	else if(res.err_msg == "get_brand_wcpay_request:fail"){
  //                   		alert("支付失败");
  //                   	}
                      //},
                    });
                  })
                  .catch(function(err) {
                    //MessageBox('提示', _this.page);
                    _this.page = true;
                  });
                
              }else{
                _this.$router.push({path:'/inquiry'});
              }
            });
        }
      }
      //        _this.$router.push('/inquiry');
    },
    //查询图文咨询问题
    answerQuestion(token, x, _this) {
      _this.get(_this.urls + "/api/graphic_inquiry/", {
            token: token,
            page_index: x,
            page_size: 4,
            openId:  localStorage.getItem('openId')
        })
        .then(function(response) {
          _this.answerQuestions = response.data;
          localStorage.setItem("answerQuestion", JSON.stringify(response.data));
        });
    },

    //查询图文咨询问题1
    answerQuestion1(id, token, x, _this) {
      _this.get( _this.urls + "/api/graphic_inquiry/" + id + "/question", {
            id: id,
            token: token,
            page_index: x,
            page_size: 4,
            openId:  localStorage.getItem('openId')
        })
        .then(function(response) {
          _this.answerQuestions = response.data;
          // sessionStorage.setItem("answerQuestion1",JSON.stringify(response.data[0])  );
        });
    },

    //查询就诊人
    list() {
      let userid = localStorage.getItem("userid")
      let _this = this;
      _this  //_this.$store.state.schlwyyUrl + '/doctor/api/patients/list'
        .get( _this.url_s+"/Patients/findPatientsName", {
            userid: userid,
            openId:  localStorage.getItem('openId')
        })
        .then(function(res) {
          //console.log('res',res)
          _this.info.quxiaos = true;
          _this.info.addPeople = true;
          _this.info.list = res.data;
          _this.info.interrogationId = res.data.id;
          _this.info.Ids = res.data.interrogationId;
        });
    },
    monStr() {
      this.info.monStr = localStorage.getItem("monStr");
      this.info.mod = localStorage.getItem("moPatientName")
        ? localStorage.getItem("moPatientName")
        : "";
      this.info.interrogationId = localStorage.getItem("patientId")
        ? localStorage.getItem("patientId")
        : "";
        if(this.$route.query.patientName != undefined){
          this.info.mod = this.$route.query.patientName;
          this.info.interrogationId = this.$route.query.id;
        }
    },
    back_to(){
      this.$router.push("./doctorIntroduce")
    },
    yyClick() {
      let _this = this;
      var _url = location.href;
      if (location.hash.length) {
        _url = _url.substr(0, _url.indexOf(location.hash));
      }
      _this.info.url = _url;
      this.get(
          this.$store.state.weChatUrl + "/weixinFHW/consultation/openWxJs",
          {
            url: _url,
            openId:  localStorage.getItem('openId')
          }
        )
        .then(function(response) {
          wx.config({
            debug: false, //调试阶段建议开启
            appId: response.data.appid, //APPID
            timestamp: response.data.timestamp, //上面main方法中拿到的时间戳timestamp
            nonceStr: response.data.noncestr, //上面main方法中拿到的随机数nonceStr
            signature: response.data.signature, //上面main方法中拿到的签名signature
            jsApiList: [
              //所有要调用的 API 都要加到这个列表中
              "chooseImage", //从本地的相册、图库选择图片
              "uploadImage",
              "chooseWXPay"
            ]
          });
        });
    }
  }
};
</script>
