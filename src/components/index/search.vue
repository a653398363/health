<template>
  <div class="index">
      <div class="search" >
          <i class="el-icon-arrow-left" @click="back_index"></i>
          <div>
            <input type="text" placeholder="请输入医生名字" @change="docPai" id="input" v-model="searchText" @focus="focu">
            <div></div>
          </div>
      </div>
      <div class="list" v-loading="loading">
      <ul >         <!-- v-if="list.unitsName != '' && list.unitsName != null" -->
        <li @click="docInt(list.doctorId,list.doctorZxSetting[0].freeClinic,list.doctorZxSetting[0].remainTimes)" v-for="(list,index) in  lists" >
          <div>
              <div :style="{backgroundImage:`url(${info.url_s + list.userInfo.avatarUrl})`}" v-if="list.userInfo.avatarUrl !=''"></div>
              <div class="defauImg" v-else></div>
          </div>
          <div style="width:70%" :class="{'Isyizhen':list.doctorZxSetting[0].freeClinic == 1 && list.doctorZxSetting[0].remainTimes > 0}">
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
              <span></span><span>{{list.doctorZxSetting[0].freeClinic == 1 && list.doctorZxSetting[0].remainTimes > 0?"0":list.doctorZxSetting[0].videoPrice}}</span><span>元/次</span>
              <span>问诊量</span><span>{{list.advisoryCount === null ? 0 : list.advisoryCount}}</span>
            </div>
          </div>
          <div v-if="list.doctorZxSetting[0].freeClinic == 1 && list.doctorZxSetting[0].remainTimes > 0"> <!-- 义诊 -->
            <div><span>剩余</span><span v-for="j in list.doctorZxSetting">{{j.remainTimes}} 次</span></div>
          </div>
        </li>
        <li id="li" @click="checkDivScroolTop" v-if="flag">
          <span></span><span>加载更多</span>
        </li>
      </ul>
    </div>
    <div class="bgTm" v-if="info.bgsss" style="height: calc(100% - 5rem);top: 5rem;" @click="showS"></div>
  </div>
</template>

<style lang="less" scoped>
.index{
    width: 100%;
    height: 100%;
}
.Isyizhen{
  width: 65% !important;
}
.defauImg{
    width: 5rem;
    height: 5rem;
    background: url("../../assets/titile-head.png") 48% 26% no-repeat !important; 
    background-size: cover;
    border-radius: 50%;
    margin-left: calc(50% - 2.5rem);
}
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
    background: url("../../assets/xiala.png") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    margin-left: 40%;
  }
  & > span:nth-child(2) {
    color: #8f8f8f;
    letter-spacing: 0.1rem;
  }
}
@fontSize_14: 14px;
@fontSize_12: 12px;
.no-more{
    font-size: 16px !important;
    text-align: center;
    line-height: 6rem;
    border: 1px solid white !important;
}
.list{
    width: 100%;
    height: calc(~ "100% - 5rem");
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
            background: url("../../assets/ssb.jpg") no-repeat;
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
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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
            & > span:first-child {
              margin-right: 2rem;
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
                background: url("../../assets/xin.png")no-repeat;
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
              background: url("../../assets/qian.png") no-repeat;
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
            border-left: 0.2rem dashed greenyellow;
            padding-top: 1.6rem;
            & > span:nth-child(2){
              width: 100%;
              height: 100%;
              display: block;
              margin-top: 1.6rem;
              font-size: 16px !important;
              color: green;
            }
          }
        }
      }
    }
}
.search{          /* 搜索框 */
  width: 100% !important;
  height: 5rem;
  background-color: #ccc;
  -webkit-background-color: #ccc;
  background-size: cover;
  padding-top: 1rem;
  box-sizing: border-box;
  & > i{
        position: absolute;
        left: 1.2rem;
        top: 1.4rem;
        font-size: 24px;
      }
  & > div {
    width: 75% !important;
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
      background: url("../../assets/sousuo-.png") no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      position: absolute;
      top: 1rem;
      left: 7rem;
    }
  }
}
.bgTm {
  width: 100%;
  height: calc(~ "100% - 5rem");
  background: #000;
  opacity: 0.5;
  position: absolute;
  top: 5rem;
  left: 0;
}
</style>
 <script>
 import { Toast, Indicator, MessageBox  } from "mint-ui";
 export default {
   data(){
       return{
           info:{
               bgsss: false,
               url_s: this.$store.state.schlwyyUrl+"/doctor",
           },
           url_s:  this.$store.state.skyUrl,
           searchText:"",
           nums: 1,
           loading: false,
           flag: false,
           lists:{},
           Isyizhen: '',
       }
   },
   mounted(){
       this.jujiao()
   },
   methods:{
    back_index(){
      this.$router.push("./net_index");
    },
    showS() {
      this.info.ass = true;
      this.isActive = false;
      this.info.bgsss = false;
    },
    DetailOne(id){       //获取上组件
    },
    docPai() {
      if (this.info.doctorName !== "") {
        this.query(this.searchText)
        Indicator.open("加载中...")
        this.info.bgsss = false;
      } else {
        this.query(this.searchText)
      }
    },
    jujiao(){
        var oInput = document.getElementById("input");
            oInput.focus();
    },
    focu() {
      this.info.ass = false;
      this.isActive = true;
      this.info.bgsss = true;
    },
    checkDivScroolTop() {           /* 加载更多 */
      //获取节点
      this.nums++;
      Indicator.open("加载中...")
       this.get( this.url_s+"/hospitalSearch/find",{
            doctorName: this.searchText,
            page: this.nums,
            hospitalId:localStorage.getItem("hospitalId"),
            openId:  localStorage.getItem('openId')
        }).then(res=>{
            this.lists = this.lists.concat(res.data[0].content);
            Indicator.close();
            if(res.data[0].content != ''){
              this.flag = true;
            }else{
              Toast("暂无更多医生..")
            }
        }).catch(err=>{
            Indicator.close();
        })
    },
    query(){
        this.nums = 1;
        this.get( this.url_s+"/hospitalSearch/find",{
            doctorName: this.searchText,
            page: this.nums,
            hospitalId:localStorage.getItem("hospitalId"),
            openId:  localStorage.getItem('openId')
        }).then(res=>{
            Indicator.close();
            this.lists = res.data[0].content;
            if(res.data[0].content != ""){
              this.flag = true;
            }else{
              Toast("暂无搜索医生..")
            }
        }).catch(err=>{
            Indicator.close();
        })
      },
      docInt(doctorId,freeClinic,remainTimes){
        if(freeClinic == 1){
          if(remainTimes >0){
            localStorage.setItem("kindsmenzhen", "yizhen");
          }else{
            localStorage.setItem("kindsmenzhen", "menzhen");
          }
        }else if(freeClinic == 0){
          localStorage.setItem("kindsmenzhen", "menzhen");
        }
        localStorage.setItem("doctorId", doctorId);
        this.$router.push("/doctorIntroduce");
      }
   }
 }
 </script>
 