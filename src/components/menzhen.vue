<template>
  <div class="menzhen" >
    <div>
      <div><i class="el-icon-arrow-left" @click="back_index"></i><span>{{this.Isyizhen?"免费义诊":"网络门诊"}}</span></div>
      <div class="search" :class="{search_yizhen}">
          <div>
            <input type="text" placeholder="请输入医生名查询" @change="docPai"  v-model="info.doctorName" @focus="focu">
            <div></div>
          </div>
      </div>
      <ul>
        <li @click="address">
          <div @click="unAddress">区域</div>
          <div><div :class="{up :info.up,ImgCharge :Isyizhen == false}"></div></div>
        </li>
        <li @click="hospital">
          <div>医院</div>
          <div><div :class="{up :info.up_h,ImgCharge :Isyizhen == false}" ></div></div>
        </li>
        <li @click="departments">
          <div >科室</div>
          <div><div :class="{up :info.up_k,ImgCharge :Isyizhen == false}"></div></div></li>
        
        <li @touchstart="paixus" >
          <div>排序</div>
          <div><div :class="{up :info.ups,ImgCharge :Isyizhen == false}"></div></div></li>
      </ul>
    </div>

    <div class="list">
      <ul >
        <li @click="docInt(list.doctorId,list.avatarUrl,list.doctorZxSetting[0].remainTimes)" v-for="(list,index) in  lists" >      <!-- v-if="list.unitsName != '' && list.unitsName != null"-->
           <div><div :style="{backgroundImage:`url(${info.imgUrl +list.userInfo.avatarUrl})`}" v-if="list.userInfo.avatarUrl != ''"></div> 
                <div class="defauImg" v-else></div>
          </div>
          <div style="width:70%" :class="{Isyizhen}">
            <div>
              <span>{{list.doctorName}}</span><span>{{list.office}}</span>
            </div>
            <div>
              <span>{{list.hospitalName}}</span>
              <span>{{list.unitsName}}</span>
            </div>
            <div style="display: none">
              <div><span>问诊量</span><span>{{list.advisoryCount === null ? 0 : list.advisoryCount}}</span></div>
              <div v-if="false"><span></span><span>关注度</span><span>{{list.attentionCount === null ? 0 : list.attentionCount}}</span></div>
            </div>
            <div>
              <span>擅长:</span><span>{{list.good}}</span>
            </div>
            <div>
              <span></span><span v-text="Isyizhen== true?'0':list.doctorZxSetting[0].videoPrice"></span><span>元/次</span>
              <span>问诊量</span><span>{{list.advisoryCount === null ? 0 : list.advisoryCount}}</span>
            </div>
          </div>
          <div v-if="Isyizhen"> <!-- 义诊 -->
            <div><span>剩余</span><span>{{list.doctorZxSetting[0].remainTimes}} 次</span></div>
          </div>
        </li>
        <li id="li" @click="checkDivScroolTop" v-if="flag">
          <span></span><span>加载更多</span>
        </li>
        <li class="nodata" v-if="nodata">
          <img src="../assets/noDate.png" alt=""> 
        </li>
      </ul>
    </div>
    <!-- <div class="kefu">
      <img src="../assets/kefu.png" alt="">
      <a href="tel:4008001335"></a>
    </div> -->
    <div class="bgTm" v-if="info.bgTm"></div>
    <div class="bgTm" v-if="info.bgsss" style="height: calc(100% - 10rem);top: 10rem;" @click="showS"></div>
    <div class="address" v-if="info.address" @click="unAddress">      <!-- 区域名字 -->
      <ul>
        <li @click="clearAdd">不限</li>
        <li v-for=" i in addressName" @click="addressSo(i.id)">{{i.regionName}}</li>
      </ul>
    </div>
    <div class="address" v-if="info.units" @click="ununits">    <!-- 科室 -->
      <ul>
        <li @click="clrUnit">不限</li>
        <li v-for="i in unitsList" @click="unitsSo(i.unitsName)">{{i.unitsName}}</li>
      </ul>
    </div>
    <div class="address" v-if="paixu" @click="addPaixun">       <!-- 排序 -->
        <ul>
          <li @click="clrpaixu">不限</li>
          <li @click="problem1">评论量最多</li>
          <li @click="problem1">评分最高</li>
          <li @click="problem1">咨询最多</li>
        </ul>
    </div>
    <div class="address" v-if="info.hospital">
      <ul>
        <li @click="clrHospital">不限</li>
        <li v-for=" i in hospitallist" @click="hospitalSo(i.hospitalId)" >{{i.hospitalName}}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .nodata{
    width: 100%;
    height: 6rem!important;
    line-height: 6rem!important;
    font-size: 1.4rem!important;
    text-align: center;
    border: 1px solid white!important;
    color: #8f8f8f;
    letter-spacing: 0.1rem;
    margin-top: 20% !important;
    & > img{
        width: 12rem;
    }
  }
  .ImgCharge{
    background: url("../assets/da_down.png") no-repeat !important;
    background-size: 1.2rem 0.7rem !important;
  }
  .defauImg{
    width: 5rem;
    height: 5rem;
    background: url("../assets/titile-head.png") 48% 26% no-repeat !important; 
    background-size: cover;
    border-radius: 50%;
    margin-left: calc(50% - 2.5rem);
  }
  .search_yizhen{
    background: url("../assets/top-backG.png") no-repeat !important;    // 收缩
  }
  .search{          /* 搜索框 */
    width: 100% !important;
    height: 4rem;
    background: url("../assets/wl-top.png") no-repeat;
    background-size: cover;
    padding-top: 0.45rem;
    & > div {
      width: 90% !important;
      height: 3rem !important;
      position: relative;
      margin: 0 auto;
      background-image: linear-gradient(#ffffff, #ffffff),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      border-radius: 2rem;
      & > input {
        width: calc(~ "100% - 2rem");
        height: 3rem;
        border-radius: 2rem;
        text-align: center;
        position: absolute;
        top: 0;
        left: 2rem;
      }
      & > div {
        width: 1.3rem;
        height: 1.3rem;
        background: url("../assets/sousuo-.png") no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        position: absolute;
        top: 1rem;
        left: 7rem;
      }
    }
  }
  .active {
    width: 100% !important;
    height: 6rem !important;
    & > div {
      width: 90% !important;
      height: 3rem !important;
      position: relative;
      margin-top: 1.5rem;
      background-image: linear-gradient(#ffffff, #ffffff),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      border-radius: 2rem;
      & > input {
        width: calc(~ "100% - 2rem");
        height: 3rem;
        border-radius: 2rem;
        text-align: center;
        position: absolute;
        top: 0;
        left: 2rem;
      }
      & > div {
        width: 1.3rem;
        height: 1.3rem;
        background: url("../assets/sousuo-.png") no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        position: absolute;
        top: 1rem;
        left: 7rem;
      }
    }
  }
  .divStyle {
    & > div {
      font-size: 0;
      display: inline-block;
      height: 6rem;
    }
    & > div {
      width: 25%;
      & > div {
        display: inline-block;
        font-size: 0;
      }
      & > div:first-child {
        width: 50%;
        height: 6rem;
        text-align: center;
        line-height: 6rem;
        font-size: @fontSize_14;
      }
      & > p {
        display: inline-block;
        width: 1.2rem;
        height: 0.7rem;
        background: url("../assets/menzhen-down.png")no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        margin-top: 2.5rem;
      }
    }
  }
  @fontSize_14: 14px;
  @fontSize_12: 12px;
  #li {
    width: 100%;
    height: 6rem;
    & > span {
      display: inline-block;
      height: 6rem;
      width: 20%;
      line-height: 6rem;
      text-align: center;
      vertical-align: top;
      font-size: @fontSize_14;
    }
    & > span:nth-child(1) {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 2.25rem;
      background: url("../assets/xiala.png") no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      margin-left: 40%;
    }
    & > span:nth-child(2) {
      color: #8f8f8f;
      letter-spacing: 0.1rem;
    }
  }
  .menzhen {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    & > div:first-child {
      width: 100%;
      height: 10rem;
      background: #eee;
      font-size: 0;
      text-align: center;
      border-bottom: 0.1rem solid #e7e7e7;
      & > div:first-child{        /* 头部导航栏 */
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 16px;
        text-align: center;
        position: relative;
        background-color: white;
        color: rgb(162, 156, 156);
        & > i{
          position: absolute;
          left: 1.2rem;
          top: 0.6rem;
          font-size: 24px;
        }
      }
      & > ul {
        width: 100%;
        height: 3rem;
        & > li {
          display: inline-block;
          width: 25%;
          height: 3rem;
          padding: 0;
          margin: 0;
          font-size: 0;
          & > div {
            display: inline-block;
            vertical-align: top;
          }
          & > div:first-child {
            width: 50%;
            height: 3rem;
            font-size: @fontSize_14;
            line-height: 3rem;
            text-align: right;
          }
          & > div:last-child {
            width: 50%;
            height: 3rem;
            & > div {
              width: 1.2rem;
              height: 0.7rem;
              background: url("./../assets/menzhen-down.png") no-repeat;
              background-size: cover;
              margin-left: 1rem;
              margin-top: 1.3rem;
            }
          }
        }
      }
    }
    & > div:nth-child(2) {
      width: 100%;
      height: calc(~ "100% - 10rem");
      & > ul {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        & > li {
          width: 100%;
          height: 12rem;
          border-bottom: 0.1rem solid #e7e7e7;
          font-size: 0;
          & > div {
            vertical-align: top;
            display: inline-block;
            padding: 1rem 0;
            box-sizing: border-box;
          }
          & > div:first-child {
            width: 20%;
            height: 15rem;
            & > div {
              width: 5rem;
              height: 5rem;
              background: url("../assets/ssb.jpg") no-repeat;
              background-size: cover;
              border-radius: 50%;
              margin-left: calc(~ "50% - 2.5rem");
            }
          }
          & > div:nth-child(2) {
            height: 15rem;
            width: 80%;
            font-size: @fontSize_14;
            & > div:nth-child(1) {
              width: 100%;
              height: 2.5rem;
              line-height: 2.5rem;
              text-overflow : ellipsis; 
              white-space : nowrap; 
              overflow : hidden; 
              & > span {
                font-size: @fontSize_14;
              }
              & > span:first-child {
                margin-right: 2rem;
              }
              & > span:last-child {
                color: #999999;
                font-size: @fontSize_14;
              }
            }
            & > div:nth-child(2) {
              width: 100%;
              height: 2.5rem;
              line-height: 2.5rem;
              font-size:0;
              & > span:first-child {
                width: 50%;
                display: inline-block;
                font-size: @fontSize_14;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              & > span:last-child{
                width: 50%;
                display: inline-block;
                font-size: @fontSize_14;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            & > div:nth-child(3) {
              width: 100%;
              height: 2.5rem;
              line-height: 2.5rem;
              font-size: 0;
              & > div {
                font-size: @fontSize_14;
                display: inline-block;
                vertical-align: top;
              }
              & > div:nth-child(1) {
                width: 30%;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-right: 1.5rem;
                & > span {
                  font-size: @fontSize_12;
                  color: #999999;
                }
                & > span:first-child {
                  margin-right: 0.5rem;
                }
              }
              & > div:nth-child(2) {
                width: 60%;
                height: 2.5rem;
                line-height: 2.5rem;
                position: relative;
                & > span {
                  font-size: @fontSize_12;
                  color: #febe5a;
                  display: inline-block;
                }
                & > span:first-child {
                  width: 1.8rem;
                  height: 1.4rem;
                  background: url("../assets/xin.png")no-repeat;
                  background-size: cover;
                  margin-right: 0.8rem;
                  padding-top: 0.2rem;
                  position: relative;
                  top: 0.2rem;
                }
                & > span:nth-child(2) {
                  margin-right: 0.5rem;
                }
              }
            }
            & > div:nth-child(4) {
              //width: 85%;
              height: 2.5rem;
              line-height: 2.5rem;
              color: #999999;
              font-size: @fontSize_12;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              & > span:first-child {
                margin-right: 0.3rem;
              }
            }
            & > div:last-child {
              width: 100%;
              height: 2.5rem;
              & > span {
                display: inline-block;
                height: 2.5rem;
                color: #999999;
                vertical-align: middle;
                line-height: 2.5rem;
              }
              & > span:nth-child(4) {
                margin-left: 3rem;
              }
              & > span:nth-child(5) {
                margin-left: 1rem;
              }
              & > span:first-child {
                width: 1.8rem;
                height: 1.8rem;
                background: url("../assets/qian.png") no-repeat;
                -webkit-background-size: cover;
                background-size: cover;
                margin-right: 0.5rem;
              }
            }
          }
          & > div:nth-child(3) {
            width: 15%;
            height: 15rem;
            position: relative;
            & > div{
              width: 100%;
              height: 55%;
              position: absolute;
              left: 0;
              top: 2rem;
              text-align: center;
              font-size: @fontSize_14;
              border-left: 0.2rem dashed #c8c8c8;
              padding-top: 1.6rem;
              & > span:nth-child(1){
                  color: #a29c9c;
              }
              & > span:nth-child(2){
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 1.6rem;
                font-size: 17px !important;
                color: #58bf5f;
              }
            }
          }
        }
      }
    }
  }
  .Ismen{
    width:80%;
  }
  .Isyizhen{
    width: 65% !important;
  }
  .bgTm {
    width: 100%;
    height: calc(~ "100% - 9rem");
    background: #000;
    opacity: 0.5;
    position: absolute;
    top: 10rem;
    left: 0;
  }
  .address {
    width: 100%;
    background: #fff;
    max-height: 36rem;
    overflow: scroll;
    position: absolute;                                
    top: 10rem;
    left: 0;
    & > ul {
      width: 100%;
      overflow: hidden;
      & > li {
        padding-left: 1.5rem;
        box-sizing: border-box;
        list-style-type: none;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: @fontSize_14;
        border-bottom: 0.1rem solid #e7e7e7;
      }
    }
  }
  .up {
    width: 1.5rem !important;
    background: url("../assets/yelloUp.png") no-repeat !important;
    background-size: cover;
  }
  .upblue{
    width: 1.5rem !important;
    background: url("../assets/da_down.png") no-repeat !important;
    background-size: cover;
  }
  .kefu {
    width: 100%;
    height: 8rem;
    position: absolute;
    left: 0;
    bottom: 0;
    & > img {
      width: 100%;
      height: 8rem;
    }
    a:hover {
      background: none;
    }
    a {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 8rem;
      background: none;
    }
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
  }
</style>
<script>
import { Toast, Indicator} from "mint-ui";
export default {
  data() {
    return {
      info: {
        address: false,
        address_: false,
        bgTm: false,
        up: false,
        ups: false,   //  排序向上箭头控制
        up_h: false,  //医院点击右边黄色出现
        up_k: false,  //科室向上箭头控制
        url_s:  this.$store.state.skyUrl,
        imgUrl: this.$store.state.schlwyyUrl+"/doctor",    /* 医生头像图片 */
        url_pin: this.$store.state.hlwyyUrl + "/",
        count: 0,
        cut: 0,
        nums: 1,            // 分页
        paixuStr: "",       //排序
        tiaojian: "",
        doctorName: "",     //医生名字
        addressId: "",      //地区id
        hospitalId: "",     //医院
        unitsName:"",       //科室名字
        hospital: false,
        so: true,
        ass: true,
        bgsss: false,
        units: false,
        remainTimes:"",
      },
      nodata: false,
      search_yizhen: false,   //义诊
      Isyizhen: false,
      lists: [],
      a: [],
      flag: "",         //加载更多点击按钮
      paixu: false,
      addressName: {},    //地区名字
      hospitallist:[],
      unitsList:{},
      isActive: false,
      departmentName: []
    };
  },
  created(){
    /* Hub.$on('change',(res) =>{
    }); */
    this.checkkindsmenzhen();    
  },
  mounted() {
    this.yyClick(); //微信config开启
    //      this.isAdd(8);
    this.isAdd(1);
    //this.isToken();
  },
  methods: {
    showS() {
      this.info.ass = true;
      this.isActive = false;
      this.info.bgsss = false;
    },
    address() {       /* 点击区域按钮 */
      this.addressquery();        /*地区数据查询 */
      if (this.info.count === 0) {
        this.info.address = true;     /* 当点击地区时，其他选线关闭 */
        this.info.bgTm = true;
        this.info.up = true;
        this.info.count = 1;
        this.info.ups = false;
        this.paixu = false;
        this.info.hospital =false;
        this.info.up_h =false;
        this.info.units = false;
        this.info.up_k = false;
      } else {
        this.info.address = false;
        this.info.bgTm = false;
        this.info.up = false;
        this.info.count = 0;
      } 
    },
    addressquery(){      /* 地区查询 */
        let _this = this;
        Indicator.open('加载中')
        _this.get( _this.info.url_s +  "/hospitalSearch/findRegion",{
          hospitalId:localStorage.getItem("hospitalId"),
          openId:  localStorage.getItem('openId')
        })      
            .then(function(res){
            _this.addressName = res.data;
            Indicator.close();
        })
    },
    addressSo(addressId){
      this.info.addressId = addressId;
      this.isAdd(1,this.info.paixuStr,this.info.doctorName,this.info.hospitalId,addressId,this.info.unitsName)
      //this.isAdd(1, "", this.info.doctorName, "",this.addressId,this.info.unitsName)
    },
    //点击清空address
    clearAdd(){
      this.info.addressId = '';
      this.isAdd(1,this.info.paixuStr,this.info.doctorName,"",this.info.addressId,"")
    },
    unAddress() {
      this.info.address = false;
      this.info.bgTm = false;
      this.info.up = false;
    },
    ununits() {
      this.info.address = false;
      this.info.bgTm = false; 
      this.info.up_k = false;
    },
    hospital() {          /* 点击医院按钮 */
      Indicator.open('加载中')
      this.get( this.info.url_s + "/hospitalSearch/findHospitalByRegion",{
            regionId: this.info.addressId,
            hospitalId:localStorage.getItem("hospitalId"),
            openId:  localStorage.getItem('openId')
        }).then( res =>{
          Indicator.close();
          this.hospitallist = res.data;
      }).catch(err=>{
          Indicator.close();
      })
      if (this.info.so) {         /* true和false来设置当点击一个选项时，其他关闭 */
        this.info.hospital = true;
        this.info.bgTm = true;
        this.info.so = false;
        this.info.up_h = true;
        this.info.up = false;
        this.info.up_k = false;
        this.info.ups = false;
        this.info.address = false;
        this.info.units = false;
        this.paixu = false;
      } else {
        this.info.hospital = false;
        this.info.bgTm = false;
        this.info.so = true;
        this.info.up_h = false;
      }
    },
    hospitalSo(id) {      /* 选择医院点击 */
      this.info.hospitalId = id;
      this.isAdd(1,this.info.paixuStr,this.info.doctorName,id,this.info.addressId,this.info.unitsName)
      this.info.hospital = false;
      this.info.bgTm = false;
      this.info.so = true;
      this.info.up_h = false;
      this.unitsquery(id)
    },
    //清空医院不限
    clrHospital(){
      let id = "";
      this.info.hospitalId = id;
      this.isAdd(1,this.info.paixuStr,this.info.doctorName,id,this.info.addressId,this.info.unitsName)
      this.info.hospital = false;
      this.info.bgTm = false;
      this.info.so = true;
      this.info.up_h = false;
      this.unitsquery(id)
    },
    departments() {     //科室点击控制向上箭头 info.units
     this.unitsquery()    /* 科室数据查询 */
      if(this.info.units == false){
        this.info.up_k = true;
        this.info.bgTm =true;
        this.info.units = true;     /* 下面一个都是设置其他关闭 */
        this.info.address = false;
        this.info.up = false;
        this.info.up_h = false;
        this.info.hospital = false;
        this.info.ups = false;
        this.paixu = false;
      }else{
        this.info.address = false;
        this.info.up_k = false;
        this.info.bgTm =false;
        this.info.units = false
      }
    },
    unitsquery(){       /* 科室数据查询 */
      let _this = this;
      let hospitalId = ""
      if(this.info.hospitalId ==""){
        hospitalId = localStorage.getItem("hospitalId")
      }else{
        hospitalId = this.info.hospitalId
      }
      Indicator.open('加载中')
      _this.get( _this.info.url_s +  "/hospitalSearch/findUnits",
        {
          hospitalId: hospitalId,
          openId:  localStorage.getItem('openId')
        })
        .then(function(res) {
          _this.unitsList = res.data
          Indicator.close()
        });
    },
    checkkindsmenzhen(){      //判断是门诊还是义诊
        let kinds = localStorage.getItem("kindsmenzhen");
        if(kinds == "yizhen"){
          this.Isyizhen = true;
          this.search_yizhen = true;
        }
    },
    
    
    unitsSo(unitsName){     /* 科室 */
      this.info.unitsName = unitsName;
      this.isAdd(1,this.info.paixuStr,this.info.doctorName,this.info.hospitalId,this.info.addressId,unitsName);
      this.info.address = false;
      this.info.bgTm = false;
      this.info.units = false;
    },
    //清空科室不限
    clrUnit(){
      let unitsName = "";
      this.isAdd(1,this.info.paixuStr,this.info.doctorName,this.info.hospitalId,this.info.addressId,unitsName);
      this.info.address = false;
      this.info.bgTm = false;
      this.info.units = false;
    },
    docPai() {
      if (this.info.doctorName !== "") {
        this.isAdd(1,this.info.paixuStr,this.info.doctorName,this.info.hospitalId,this.info.addressId,this.info.unitsName)
        this.info.bgsss = false;
      } else {
        this.isAdd(1,"",this.info.doctorName,"",this.info.addressId,this.info.unitsName)
      }
    },
    focu() {
      this.info.ass = false;
      this.isActive = true;
      this.info.bgsss = true;
    },
    //点击选择排序
    problem1: function(e) {
      let _this = this;
      if (e.target.innerText === "评论量最多") {
        _this.info.paixuStr = "commentCount";
      } else if (e.target.innerText === "评分最高") {
        _this.info.paixuStr = "avgScore";
      } else if (e.target.innerText === "咨询最多") {
        _this.info.paixuStr = "advisoryCount";
      } else if (e.target.innerText === "义诊优先") {
        _this.info.paixuStr = "isfree";
      }
      _this.paixu = false;
      _this.info.bgTm = false;
      _this.info.ups = false;
      _this.info.nums = 1;
      _this.isAdd(_this.info.nums, _this.info.paixuStr,_this.infodoctorName, _this.infohospitalId,_this.infoaddressId,_this.infounitsName);
    },
    clrpaixu(){
      let  _this = this
      _this.info.paixuStr =  "";
      _this.paixu = false;
      _this.info.bgTm = false;
      _this.info.ups = false;
      _this.info.nums = 1;
      _this.isAdd(_this.info.nums, _this.info.paixuStr,_this.infodoctorName, _this.infohospitalId,_this.infoaddressId,_this.infounitsName);
    
    },
    checkDivScroolTop() {           /* 加载更多 */
      //获取节点
      Indicator.open('加载中...')
      let _this = this;
      let kinds = localStorage.getItem("kindsmenzhen");
      if( kinds == "yizhen"){              //判断是门诊还是义诊进行不同的请求
        var isCharge = false;
      }else{
        var isCharge = true;
      }
      let hospitalId = ""
      if(this.info.hospitalId =="" || this.info.hospitalId == undefined || this.info.hospitalId == null){
        hospitalId = localStorage.getItem("hospitalId")
      }else{
        hospitalId = _this.info.hospitalId
      }
      _this.info.nums++
      _this       //this.info.url_s + "/api/doctor/findList"
        .get( _this.info.url_s + "/hospitalSearch/findChargeDoctor", {
            page: _this.info.nums,
            doctorName: _this.info.doctorName, 
            regionId: _this.info.addressId,      /* 地区id */
            hospitalId: hospitalId,   /* 医院ID */
            unitsName : _this.info.unitsName,    /* 科室名字 */
            condition: _this.info.paixuStr,
            isCharge: isCharge,
            openId:  localStorage.getItem('openId')
        })
        .then(function(res) {
          Indicator.close();
          if(res.data[0].content != ''){
              _this.lists = _this.lists.concat(res.data[0].content);
          }else{
              Toast("没有更多医生..")
          }
        }).catch(err=>{
            Indicator.close();
        })
    },
    isToken() {
      let _this = this;
      let config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      };
      _this.axios
        .post(
          _this.$store.state.hlwyyUrl + "/hlwyy-new-dev/api/account/action/wechat_authorize",
          {
            accessToken: "6D6gCzisY8vDHq1Z",
            openid: "oyXtV0_U6FTnncoM0EOsPOUbx51E"
          },
          config
        )
        .then(function(res) {
          //        localStorage.setItem("token",res.data.token);
        });
    },    //isAdd(1,this.info.paixuStr,this.info.doctorName,this.info.hospitalId,this.info.addressId,this.info.unitsName)
    isAdd(nums, paixuStr, doctorName, hospitalId,addressId,unitsName) {
      //医院查询
      paixuStr = paixuStr === undefined ? null : paixuStr;
      doctorName = doctorName === undefined ? null : doctorName;
      addressId = addressId === undefined ? null : addressId;
      hospitalId = hospitalId === undefined ? null : hospitalId;
      if(hospitalId == null || hospitalId == undefined || hospitalId  == ""){
        hospitalId = localStorage.getItem("hospitalId")
      }
      unitsName = unitsName === undefined ? null : unitsName;
      let kinds = localStorage.getItem("kindsmenzhen");
      if( kinds == "yizhen"){              //判断是门诊还是义诊进行不同的请求
        var isCharge = false;
      }else{
        var isCharge = true;
      }
      let _this = this; 
      Indicator.open('加载中...')      //http://192.168.1.112:8080/hospitalSearch/findChargeDoctor?page=1&isCharge=true
      _this     //this.info.url_s + "/api/doctor/findList" // "http://192.168.1.112:8080/hospitalSearch/find"
        .get( _this.info.url_s +"/hospitalSearch/findChargeDoctor", {
            page: nums,
            doctorName: doctorName, 
            regionId: addressId,      /* 地区id */
            hospitalId: hospitalId,   /* 医院ID */
            unitsName : unitsName,    /* 科室名字 */
            condition: paixuStr,      /* 排序 */
            isCharge: isCharge,
            openId:  localStorage.getItem('openId')
        })
        .then(function(res) {
          Indicator.close()
          if(res.data[0].content!=''){
             _this.lists = res.data[0].content;
             _this.flag = true;
          }else{
            _this.lists = [];
            _this.flag = false;
            _this.nodata = true;
          }
         
        })
    },

    paixus() {
      if (this.info.cut === 0) {
        this.paixu = true;
        this.info.bgTm = true;
        this.info.ups = true;
        this.info.cut = 1;
        this.info.hospital =false;
        this.info.up_k = false;
        this.info.address = false;
        this.info.up=false;
        this.info.units = false;
        this.info.up_k = false;
      } else {
        this.paixu = false;
        this.info.bgTm = false;
        this.info.ups = false;
        this.info.cut = 0;
      }
    },
    addPaixun() {
    },
    
    docInt(id, url,remaintimes) {
      localStorage.setItem("doctorId", id);
      localStorage.setItem("url", url);
      this.$router.push({name:"doctorIntroduce",query:{
        "remaintimes":remaintimes
      }}); 
    },
    back_index(){
      localStorage.removeItem("kindsmenzhen")
      this.$router.push("/net_index");
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
