<template>
  <div class="list">
    <div v-if="Isdialog" class="head_title">
      <i class="el-icon-arrow-left" @click="back_to"></i><span>个人资料</span>
    </div>  
    <div v-if="Isdialog" class="bg_div" ></div>
    <div v-if="Isdialog" class="ul_list">
      <ul :model="info">    
        <li class="inner_title back_1"><img src="../../assets/Xinx_person.png" alt=""> 基本信息</li>
        <li v-if="Isself">本人头像
          <span class="inner_right" @click="imgUp()">
            <img :src="imgs" alt="" v-if="Isupimg" class="headimg">
            <img v-bind:src="info.avatarUrl" alt="" v-else>
            <i class="el-icon-arrow-right"></i>
            </span>
        </li>
        <li v-if="Isself">用户昵称<span class="inner_right"><input type="text"  v-model="info.nickName"></span></li>
        <li class="import">真实姓名<img src="../../assets/Xinx_tip.png" alt="" >
          <span class="inner_right" v-if="info.check == 'true'" @click="Nochange">{{Isself?((info.patient.patientName!=undefined ||info.patient.patientName!= '')?info.patient.patientName:info.fullName):info.patientName}}</span>
          <span class="inner_right" v-else>
            <span style="text-align:right" v-if="Isself">{{(info.patient.patientName!=undefined || info.patient.patientName!= '') ?info.patient.patientName:info.fullName}}</span>
            <input type="text" v-model="info.patientName" style="text-align:right" v-else>
          </span>
        </li>
        <li class="import right">性别<img src="../../assets/Xinx_tip.png" alt="">
          <span class="inner_right"><i class="el-icon-arrow-right"></i></span>
          <div class="inner_right" id="sex" style="width:100%;height:100%;text-align:right">{{info.sex}}</div>
        </li>
        <li class="import">身份证号码<img src="../../assets/Xinx_tip.png" alt="">
          <span class="inner_right" v-if="info.check == 'true'" @click="Nochange">{{Isself?info.patient.patientIdNumber:info.patientIdNumber}}</span>
          <span class="inner_right" v-else>
            <input type="text" v-model="info.patient.patientIdNumber" style="text-align:right" v-if="Isself">
            <input type="text" v-model="info.patientIdNumber" style="text-align:right" v-else>
          </span>
        </li>
        <li class="import" v-if="Isself" @click = "setDate">生日<img src="../../assets/Xinx_tip.png" alt="">
          <span class="inner_right"><input type="text" placeholder="选择日期"  v-model="info.patient.birthday"  onfocus="this.blur()" style="font-size: 14px;"><i class="el-icon-arrow-right"></i></span>
        </li>
        
        <li class="import" v-else @click = "setDate1">生日<img src="../../assets/Xinx_tip.png" alt="">
          <span class="inner_right"><input type="text" v-model="info.birthday" placeholder="选择日期" onfocus="this.blur()" style="font-size: 14px;"><i class="el-icon-arrow-right"></i></span>
        </li>
        <li v-show="Isself == false">关系
          <span class="inner_right"><i class="el-icon-arrow-right"></i></span><div class="inner_right" id="picker">{{info.relation}}</div>
        </li>
        <div class="bg_div"></div>
        <li v-if="Isself">健康卡号<span class="inner_right"><input type="text"  v-model="info.patient.healthCard" placeholder="健康卡号(非必填项)" ></span></li>
        <li v-else>健康卡号<span class="inner_right"><input type="text"  v-model="info.healthCard" placeholder="健康卡号(非必填项)" ></span></li>
        <li v-if="Isself">手机号码
          <span class="inner_right" v-if="Isself == true">{{info.mobile}}</span>
          <span class="inner_right" v-else><input type="text"  v-model="info.mobile" ></span>
        </li>
        <li v-else>手机号码<span class="inner_right"><input type="text"  v-model="info.patientMobile" ></span></li>
        <li @click="jiuzhenka(info.checkMessage)">就诊卡<span class="inner_right">查看<i class="el-icon-arrow-right"></i></span></li>
        <div class="bg_div"></div>
        <li class="inner_title back_2"><img src="../../assets/Xinx_icon3.png" alt="">个人情况</li>
        <!-- <li @click="addDetailOne()">既往病历<span class="inner_right">{{info.pmhValue}}<i class="el-icon-arrow-right"></i></span></li> -->
        
        <li v-for="i in patientsInfoCage" @click="addDetailOne(i.id,i.name)">
          {{i.name}}
          <span class="inner_right">{{i.textName}}<i class="el-icon-arrow-right"></i></span>
        </li>
      </ul>
    </div>
    <div v-if="Isdialog" class="bg_div"></div>
    <div v-if="Isdialog" class="submit" >
        <button @click="submit">保存</button>
    </div>
      <div class="bgBlack shangchuan" v-if="quxiaos"></div>
      <div style="width: 150px;height: 150px;background: #fff;position: fixed;top: 30%;left: calc(50% - 75px);text-align: center;line-height: 150px ;font-size: 1.4rem;border-radius: 2rem;z-index: 2000;" v-if="x">图片上传中...</div>
    <dialog-one @receive="receivedata" :backdata="patientsInfoCage" :patientsInfo ="patientsInfo" ref="dialogOne"></dialog-one>
  </div>
</template>
 <style lang="less" scoped>
    @fontSize_14: 14px;
    @fontSize_12: 12px;
    .shangchuan {
      position: fixed;
    }
    .bgBlack {
      background: #000;
      opacity: .5;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 200;
    }
    #picker{
      width: 100%;
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      text-align: right;
    }
    .list{
      width:100%;
      height: 100%; 
      .head_title{      /* 个人资料title */
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 18px;
        text-align: center;
        position: relative;
        border-bottom: 0.1rem solid #e7e7e7;
        color: rgb(162, 156, 156);
        & > i{
          position: absolute;
          left: 1.2rem;
          top: 1.2rem;
          font-size: 24px;
        }
      }
    }
    .back_1{
      background: url("../../assets/Xinx_BackG1.png") no-repeat;
      background-size: cover;
    }
    .back_2{
      background: url("../../assets/Xinx_BackG2.png") no-repeat;
      background-size: cover;
    }
    .import{
      & > img{
        width: 1.2rem;
        padding-left: 1rem;
        vertical-align: middle;
      }
      input {
        width: 16rem !important
      }
    }
    .bg_div{
      width: 100%;
      height: 1rem;
      background-color: rgb(241,241,241);
    }
    .inner_title{         /* 头部名字 */
      position: relative;
      padding-left: 4.5rem !important;
      font-size: 15px !important;
      & > img{
        width:2rem;
        position: absolute;
        left:1.5rem;
        top: 1rem;
      }
    }
    .inner_right{             /* 每行向右浮动 */
      float: right;
      padding-right: 2.4rem;
      position: relative;
      max-width:65%;
      color: rgb(162, 156, 156) !important;
      & > img{
        width: 2.8rem;
        height: 2.8rem;
        position: absolute;
        right: 2.6rem;
        top:0.6rem;
        border: 0px solid white;
      }
      & > i{
        position: absolute;
        right: 0.4rem;
        top: 1.2rem;
        font-size: 22px;
        color: rgb(162, 156, 156);
      }
    }
    input{
      font-size: 14px;
      color: #a29c9c !important;
    }
    .list{
      width: 100%;
      height: 100%;
      background: white;
        .ul_list{
          width: 100%;
          height: calc(~"100% - 12rem");
          overflow-y: scroll;
          & > ul{
            width: 100%;
            & > li {
              padding-left: 1.5rem;
              box-sizing: border-box;
              list-style-type: none;
              overflow: hidden;
              width: 100%;
              height: 4rem;
              line-height: 4rem;
              font-size: @fontSize_14;
              border-bottom: 0.1rem solid #e7e7e7;
              input{
                text-align: right!important;
                border:none;
              }
            }
          }
        }
    }
    .el-input{

       & > .el-input__inner{
          text-align: right !important;
        }
    }
    
    .submit{
      //padding-left: -1.5rem !important;
      padding: 1rem 0;
      width: 100%;
      height: 6rem;
      box-sizing: border-box !important;
      & > button{
        width: 90%;
        margin: 0 auto;
        padding: 0.8rem 0;
        border: none;
        display: block;
        background-color: rgb(78,118,179);
        color: white;
        letter-spacing: 1rem;
        border-radius: 1rem;
      }
    }
    .sex {
      & > div {
        vertical-align: top;
      }
      & > div:nth-child(2) {
        display: inline-block;
        width: 60%;
        height: 5rem;
        text-align: left;
        padding-right: 3rem;
        font-size: @fontSize_14;
      }
      & > div:nth-child(3) {
        display: inline-block;
        width: 1.2rem;
        height: 2rem;
        background: url("../../static/bg_right.png") no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        position: absolute;
        top: 1.5rem;
        right: 1rem;
      }
  }
 </style>
 <script>
 import dialogOne from "./dialogOne.vue"
 import MobileSelect from 'mobile-select'
 import { Toast  } from "mint-ui";
 export default {
   components:{
     dialogOne
   },
   data(){
       return{
         patientsInfo:{},
         patientsInfoCage:[],
         Isself:"",       //判断是查询本人详情还是查询其他就诊人详情
         checkSex:{},
         Isupimg:"",
         relationArr:[],
         imgs:[],
         positivePhoto:"",
          images: {
            localId: "",
            serverId: ""
          },
            x: false,
            quxiaos: false,
        info:{
            avatarUrl:"", //本人头像
            nickName:"",  //昵称
            fullName: "", //真实姓名
            gender:"",   
            sex:"", 
            relation:"",
            birthday:"",
            patientId:"",
            userid:"",
            hideMobile:"",
            patient:{
                patientBirthday: "Fri Mar 23 2018 00:00:00 GMT+0800 (中国标准时间)",
                birthday: "",
            },
            patientIdNumber:"",
            healthCard:"",    //健康卡号
            mobile: "",
            pmhValue: "",   //既往史
            phValue: "",    //婚育史
            ahValue: "",    //过敏史
            fhValue: "",    //家族史  
           },
           Isdialog: true,       /* 是否显示主页，打开弹框 */
           msg: "",
           urlimg: this.$store.state.schlwyyUrl+"/doctor",   /* 图片地址 */
           url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
       }
   },
   created() {
     this.querylist();    //
   },
   mounted(){
      var mobileSelect5 = new MobileSelect({
          trigger: "#picker",
          title: "关系",
          wheels: [
              {data: ["丈夫","妻子","母子","母女","父子","父女","亲属","朋友","其他"]}
          ],
          callback:function(indexArr, data){
          }
      });
      this.relationArr = mobileSelect5
      var sex = new MobileSelect({
          trigger: "#sex",
          title: "性别",
          wheels: [
              {data: ["男","女"]}
          ],
          callback:function(indexArr, data){
          }
      });
      this.checkSex = sex;
   },
   methods:{
    submit() {
      let sex = ""    
      this.checkSex.curValue.map(_=>{
         sex = _
      })
      if(sex == ""){
        sex = this.info.sex
      }
      if(sex == ''|| sex == undefined){
        return Toast('性别不能为空')
      }
      let Isself = localStorage.getItem("Isself");
      if(Isself == "true"){         /* 提交的时候，是本人详情和其他就诊人详情是不同的接口 */
        if(this.info.patient.birthday ==''){
          return Toast("生日不能为空")
        }
        this.get( this.url_s+"/UserInfo/updateUser",{
            fullName: this.info.fullName,
            nickName: this.info.nickName,
            mobile: this.info.mobile,
            idCard: this.info.patient.patientIdNumber,
            healthCard: this.info.patient.healthCard,
            patientBirthday:this.info.patient.birthday,
            patientId:this.info.patientId,
            genner: sex,
            id:this.info.userid,
            avatarUrl: this.positivePhoto,
            openId:  localStorage.getItem('openId')
        }).then(res=>{
          if(res.data == true){
            this.$router.push("/visitMange");
            localStorage.removeItem("visitfid");
            localStorage.removeItem("Isself");
          }else{
            Toast(res.data)
          }
        })
      }else if(Isself == 'false'){      /* 是其他就诊人详情的时候提交 */
        if(this.info.birthday == ""){
          return Toast("生日不能为空")
        }
        let relation = "";
        this.relationArr.curValue.map(_=>{
            relation = _
        })
        if(relation == ''){
          relation = this.info.relation
        }
        this.get( this.url_s+'/Patients/savePatients',{
            patientName:this.info.patientName,
            patientGender: sex,
            patientMobile:this.info.patientMobile,
            patientBirthday:this.info.birthday,
            patientIdNumber:this.info.patientIdNumber,
            relation: relation,
            healthCard: this.info.healthCard,
            userid:this.info.interrogationId,
            id: this.info.id,
            hideMobile: this.info.hideMobile,
            openId:  localStorage.getItem('openId')
        }).then(res=>{
          if(res.data.id != undefined){
            this.$router.push("/visitMange");
            localStorage.removeItem("visitfid");
            localStorage.removeItem("Isself");
          }else{
            Toast(res.data)
          }
        })
      }

    },
    imgUp() {
     
      var _this = this;
//    this.info.show = false;
      
      var imgCout = 1;
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
            _this.quxiaos = true;
            _this.x = true;
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
						_this.imgs = localId;
		      	
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
          _this.Isupimg = true;
          _this.quxiaos = false;
          _this.x = false;
          let imgUrl = response.data.positivePhoto;
          _this.positivePhoto = imgUrl;
      })
    },

    back_to(){        /* 返回就诊人管理 */
      let _this = this;
      _this.$router.push("./visitMange")
    },
    receivedata(msg){       ///从子页面返回数据
      this.Isdialog = true;
      this.msg = msg;
      if(msg == 'true'){
        this.querylist();       //====
      }
    },
    jiuzhenka(checkMessage){      /* 就诊卡 */
      if(checkMessage == 'true'){
        this.$router.push({name:'Visits_Card',query:{
            "patientId":this.info.patientId
        }})
      }else{
        return Toast(checkMessage)
      }
    },
    //本人和其他就诊人查询是两个不同的接口，提交保存也是不同的接口，两个接口的数据字段都是不一样的
    querylist(){
      let userid = localStorage.getItem("visitfid");
      let Isself  = localStorage.getItem("Isself");
      this.Isself = localStorage.getItem("Isself");
      if(Isself == "true"){       //查询本人详情
        this.Isself = true
          this.get( this.url_s+"/UserInfo/findUserInfo",{
                userid: userid,
                openId:  localStorage.getItem('openId')
            })
          .then(res =>{
              this.info = res.data;       /* info赋值 */
              this.patientsInfo = res.data.patientsInfo;
              this.info.patientId = res.data.patient.id;      //其他就诊人ID
              this.info.userid = res.data.id;                 //  用户的userID
              this.patientsInfoCage = res.data.patientsInfoCage;   //给子页面传值
          }) 
      }else if( Isself == "false"){         //查询其他就诊人详情
          this.Isself = false;
           this.get( this.url_s+"/Patients/findPatientInfo",{
                id: userid,
                openId:  localStorage.getItem('openId')
            })
          .then(res =>{
              this.info = res.data.patient;       /* info赋值 */
              this.info.hideMobile = res.data.patient.hideMobile;      /* hideMobile */
              this.info.patientId = res.data.patient.id;
              this.patientsInfo = res.data.patientsInfo;
              this.patientsInfoCage = res.data.patientsInfoCage;       //给子页面传值
          }) 
      }

    },
     //选择
    addDetailOne: function(id,name) {
      this.Isdialog = false;    
      this.$nextTick(() => {
        this.$refs.dialogOne.DetailOne(id,name);
      })
    },
    setDate(){
      this.$calendar.show({
        year:[1900,2018],  //年份的范围,如果初始化的年份不在这个范围，会自动选最小的年份
        date:'1988-2-20',  //初始化的日期
        onOk: (date) =>{
          this.info.patient.birthday = date
        },
        onCancel:()=>{
          ////console.log('关闭')
        }
      });
    },
    setDate1(){
      this.$calendar.show({
        year:[1900,2018],  //年份的范围,如果初始化的年份不在这个范围，会自动选最小的年份
        date:'1988-2-20',  //初始化的日期
        onOk: (date) =>{
          this.info.birthday = date
        },
        onCancel:()=>{
          ////console.log('关闭')
        }
      });
    },
    Nochange(){
      Toast('已有就诊卡，不能修改..')
    }
   }
 }
 </script>
 