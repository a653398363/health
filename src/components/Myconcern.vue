<template>
    <div class="guanzhu" >
      <div><i @click="back_to" class="el-icon-arrow-left"></i><span>我的关注</span></div>
      <div class="bg_div"></div>
      <div class="list">
        <ul >
          <li  v-for="(list,index) in  lists" @click="Go_docInt(list.doctorId)">
            <div >
                <div :style="{backgroundImage:`url(${info.imgUrl + list.avatarUrl})`}" v-if="list.avatarUrl!=''"></div>
                <div class="defauImg" v-else></div>
            </div>
            <div>
              <div>
                <span>{{list.doctorName}}</span><span>{{list.office}}</span><span @click.stop="docInt(list.doctorId,list.userInfo.id)">取消关注</span>
              </div>
              <div >
                <span>{{list.hospitalName}}</span>
                <span v-for="i in list.unitsName">{{i.departmentName}}</span>
              </div>
              <div style="display: none" >
                <div><span>问诊量</span><span>{{list.advisoryCount === null ? 0 : list.advisoryCount}}</span></div>
                <div v-if="false"><span></span><span>关注度</span><span>{{list.attentionCount === null ? 0 : list.attentionCount}}</span></div>
              </div>
              <div >
                <span>擅长:</span><span>{{list.good}}</span>
              </div>
              <div >
                <span></span><span v-text="list.doctorZxSetting[0].videoPrice = undefined ?'暂无': list.doctorZxSetting[0].videoPrice"></span><span>元/次</span>
                <span>问诊量</span><span>{{list.advisoryCount === null ? 0 : list.advisoryCount}}</span>
              </div>
            </div>
          </li>
          <li class="nodata" v-if="nodata">
            <img src="../assets/noDate.png" alt="">
          </li>
          <li id="li" @click="checkDivScroolTop" v-if="updatamore">
            <span></span><span>加载更多</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<style lang="less" scoped>
  @fontSize_14: 14px;
  @fontSize_12: 12px;
  .nodata{
    width: 100%;
    height: 4rem!important;
    line-height: 4rem!important;
    font-size: 1.4rem!important;
    text-align: center;
    border: 1px solid white !important;
    margin-top: 30%;
    & > img{
        width: 12rem;
    }
  }
  .defauImg{
        width: 5rem;
        height: 5rem;
        background: url("../assets/titile-head.png") 48% 26% no-repeat !important; 
        background-size: cover;
        border-radius: 50%;
        margin-left: calc(50% - 2.5rem);
}
  .bg_div{
      width: 100%;
      height: 1rem;
      background-color: rgb(241,241,241);
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
    .guanzhu{      /* 个人资料title */
        width: 100%;
        height: 100%;
        font-size: 18px;
        position: relative;
        border-bottom: 0.1rem solid #e7e7e7;
        color: rgb(162, 156, 156);
        i{
            position: absolute;
            left: 0.4rem;
            top: 1.2rem;
            font-size: 24px;
        }
        & > div:first-child{
            height: 4rem;
            text-align: center;
            line-height: 4rem;
        }
        & > div:nth-child(3){
            width: 100%;
            height: calc(~"100% - 5rem");
            overflow-y: scroll;
        }
    }
    .list{
        width: 100%;
        height: 100%;
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
            width: 80%;
            height: 15rem;
            font-size: @fontSize_14;
            & > div:nth-child(1) {
                width: 100%;
                height: 2.5rem;
                line-height: 2.5rem;
                & > span {
                font-size: @fontSize_14;
                }
                & > span:first-child {
                margin-right: 2rem;
                }
                & > span:nth-child(2){
                color: #999999;
                font-size: @fontSize_14;
                }
                & > span:last-child{
                    width: 5rem;
                    height: 2rem;
                    line-height: 2rem;
                    text-align: center;
                    font-size: @fontSize_12;
                    display: inline-block;
                    background-color: rgba(0, 119, 255, 0.781);
                    color: white;
                    border-radius: 0.4rem;
                    float:right;
                    margin-right:1rem
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
                width: 85%;
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
        }
        }
  }
</style>
<script>
import { Toast, Indicator, MessageBox  } from "mint-ui";
export default {
  data(){
      return{
          info:{
              url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
              nums: "",
              imgUrl: this.$store.state.schlwyyUrl+"/doctor",    /* 医生头像图片 */
          },
          updatamore:"",
         lists: [],
        nodata:"",
      }
  },
  created:function() {
    this.attention();
  },
  methods:{
      //取消关注
      docInt (doctorId) { 
        MessageBox.confirm("确定取消关注?").then(action => {
        this.get(this.info.url_s+"/UserInfo/deleteDoctor", {
              doctorid: doctorId,
              userid: localStorage.getItem("userid"),
              openId:  localStorage.getItem('openId')
          })
          .then(res => {
            if (res.data == true) {
              Toast("取消关注成功.");
              this.attention();
            } else {
              Toast("取消关注失败");
            }
          })
        });
      },
      attention() {             /* 获取关注的数据 */
          let _this = this; 
          Indicator.open('加载中...')
          _this.info.nums = 1 ;
          _this     //this.info.url_s + "/api/doctor/findList"
            .get( this.info.url_s+"/UserInfo/findDoctor", {
                userid:localStorage.getItem("userid"),
                page: _this.info.nums,
                hospitalId: localStorage.getItem("hospitalId"),
                openId:  localStorage.getItem('openId')
            })
            .then(function(res) {
                Indicator.close();
                if(res.data != 'no'){
                    _this.lists = res.data;
                    _this.updatamore = true;

                }else{
                    _this.nodata = true;
                    _this.lists = [];
                    _this.updatamore = false;
                }
            }).catch(err=>{
                Indicator.close();
            })
      },
      checkDivScroolTop(){
          //获取节点
        Indicator.open('加载中...')
        let _this = this;
        _this.info.nums++;
        _this       //this.info.url_s + "/api/doctor/findList"
            .get( this.info.url_s+"/UserInfo/findDoctor", {
                userid:localStorage.getItem("userid"),
                page: _this.info.nums++,
                hospitalId :localStorage.getItem("hospitalId"),
                openId:  localStorage.getItem('openId')
                //sort: _this.info.paixuStr
            })
            .then(function(res) {
                Indicator.close();
                if(res.data != 'no'){
                    _this.lists = _this.lists.concat(res.data);
                }else{
                    Toast("没有更多关注的医生..")
                }
            }).catch(err=>{
                Indicator.close();
            })
      },
      Go_docInt(id) {
        localStorage.setItem("doctorId", id);
        this.$router.push({name:"doctorIntroduce",query:{
            "concern":true
        }});
      },
      back_to(){
          let _this = this;
          _this.$router.push("./net_index")
      }
  }
}
</script>
