<template>
  <div class="Prescription">
    <div class="top"><i class="el-icon-arrow-left" @click="back_to"></i><span>我的检验检查</span></div>
    <div class="Prescription-background">
      <div class="nodata" v-if="nodata">
          <img src="../../assets/noDate.png" alt="">
      </div>
      <ul >
        <li v-for="list in lists">
          <div>
            <div></div>
            <div>
              <div>{{list.createDate == null||list.createDate == ""?"暂无": list.createDate}}</div>
              <div>
                <div>
                  <span>{{list.hospitalName}}</span>
                  <span>检验检查</span>
                </div>
                <div>
                  <span>就诊医生:</span>
                  <span>{{list.doctorName}}</span>
                  <span>就诊科室:</span>
                  <span>{{list.department}}</span>
                </div>
                <div>
                  <span>就诊人:</span>
                  <span>{{list.patientName}}</span>
                  <span>年龄:</span>
                  <span>{{list.age}}</span>
                  <span>性别：</span>
                  <span>{{list.gender == "2" ? "女" : "男"}}</span>
                </div>
                <div>
                  <div v-for="i in list.checkMenu">{{i}}</div>
                </div>
                <div id="line"></div>
                <div>
                  <span @click="Go(list.status,list.check,list.patientId,list.hospitalId,list.hospitalName,list.yyid)">{{list.status == 2 ?"已完成":(list.status == 1 ? "预约": "已失效")}}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </li>
        <li id="li" @click="checkDivScroolTop" v-if="updatamore">
            <span></span><span>加载更多</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less" scoped>
.nodata{
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.4rem;
  text-align: center;
  margin-top: 30%;
  & > img{
    width: 12rem;
  }
}
  @fontSize_14: 14px;
  @fontSize_12: 12px;
  .Prescription {
    width: 100%;
    height: 100%;
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
  .Prescription-background {
    background-color: #f9f9f9;
    width: 100%;
    height: calc(~"100% - 4rem");
    overflow-y: scroll;
    & > ul {
      width: 100%;
      & > li {
        list-style-type: none;
        width: 90%;
        margin: 1rem auto;
        box-sizing: border-box;
        & > div:nth-child(1) {
          margin-left: 5%;
          border-left:1px dashed #95b3d7;
          & > div:nth-child(1) {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            background-color: #81a8dd;
            margin-left: -0.6rem;
            box-shadow: 1px 1px 1px #AAAAAA;
          }
          & > div:nth-child(2) {
            width: 96%;
            & > div:nth-child(1) {
              width: 50%;
              display: inline-block;
              margin-left: 8%;
              height: 0.5rem;
              margin-top: -1.8rem;
              font-size: 1.2rem;
              color: #3a3a3a;
            }
            & > div:nth-child(2) {
              background-color: #F7F7F7;
              width: 91%;
              margin-left: 8%;
              border-radius: 6px;
              box-shadow: 2px 3px 8px #CCCCCC;
              margin-top: 0.7rem;
              & > div:nth-child(1) {
                width: 91%;
                height: 2.6rem;
                line-height: 4.2rem;
                margin-left: 10%;
                position: relative;
                & > span:nth-child(1) {
                  text-shadow: 0px 0px 0px #0c0c0c;
                  font-size: 1.3rem;
                  color: #0c0c0c;
                  display: inline-block;
                  width: 60%;
                  height: 100%;
                  margin-left: -6%;
                  margin-top: 0rem;
                }
                & > span:nth-child(2) {
                  vertical-align: top;
                  width: 36%;
                  height: 100%;
                  font-size: 14px;
                  color: #0c0c0c;
                  display: inline-block;
                  text-shadow: 0px 0px 0px #0c0c0c;
                  margin-top: 0rem;
                }
              }

              & > div:nth-child(2) {
                width: 92%;
                height: 1.9rem;
                line-height: 2.8rem;
                margin-left: 5%;
                & > span:nth-child(1) {
                  font-size: 1rem;
                  color: #7c7c7c;
                }
                & > span:nth-child(2) {
                  font-size: 1rem;
                  color: #7c7c7c;
                }
                & > span:nth-child(3) {
                  font-size: 1rem;
                  color: #7c7c7c;
                  margin-left: 5%;
                }
                & > span:nth-child(4) {
                  font-size: 1rem;
                  color: #7c7c7c;
                }
              }

              & > div:nth-child(3) {
                width: 92%;
                height: 1.9rem;
                line-height: 2.8rem;
                margin-left: 5%;
                & > span:nth-child(1) {
                  font-size: 1rem;
                  color: #7c7c7c;
                }
                & > span:nth-child(2) {
                  font-size: 1rem;
                  color: #7c7c7c;
                }
                & > span:nth-child(3) {
                  font-size: 1rem;
                  color: #7c7c7c;
                  margin-left: 5%;
                }
                & > span:nth-child(4) {
                  font-size: 1rem;
                  color: #7c7c7c;
                }
              }

              & > div:nth-child(4) {
                width: 92%;
                line-height: 1.6rem;
                margin-left: 5%;
                font-size: 1.3rem;
                color: #000000;
                font-weight: bold;
                margin-top: 0.6rem;

              }
              & > div:nth-child(5) {
                width: 92%;
                border-bottom: 2px solid #EEEEEE;
                height: 0.5rem;
                margin-left: 5%;
                margin-top: 0rem;
              }
              & > div:nth-child(6) {
                width: 92%;
                height: 2.5rem;
                line-height: 2.5rem;
                margin-left: 5%;
                text-align: right;
                & > span:nth-child(1) {
                  font-size: 1.2rem;
                  color: #ff9900;
                }
              }
            }

          }
        }
      }
    }
  }
  #NotPay {
    color: #e59042;
  }
  #Buy {
    height: 1.6rem;
    width: 20%;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    line-height: 1.6rem;
    color: #fff;
    margin-top: 0.5rem;
    background-color: #e59042;
    box-shadow: 0 0 0px 1px #e59042;
  }

  #alreadyBuy {
    box-shadow: 0 0 0px 1px #4d76b2;
    height: 1.6rem;
    width: 20%;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    line-height: 1.6rem;
    color: #4d76b2;
    margin-top: 0.5rem;
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
  /* @media screen and (min-width: 400px) {
    .Prescription-background {
      background-color: #f9f9f9;
      width: 100%;
      height: calc(~"100% - 4rem");
      overflow-y: scroll;
      & > ul {
        width: 100%;
        & > li {
          list-style-type: none;
          width: 101%;
          margin-left: 2%;
          & > div:nth-child(1) {
            width: 96%;
            & > div:nth-child(2) {
              height: 2rem;
              line-height: 5rem;
            }
            & > div:nth-child(3) {
              height: 2rem;
              line-height: 5rem;
            }
            & > div:nth-child(4) {
              height: 2rem;
              line-height: 5rem;
            }
            & > div:nth-child(5) {
              height: 2rem;
              line-height: 5rem;
            }
            & > div:nth-child(6) {
              height: 2rem;
              line-height: 5rem;
            }
            & > div:nth-child(7) {
              width: 84%;
              border-bottom: 1px dashed #7c7c7c;
              height: 3rem;
              margin-left: 10%;
            }
            & > div:nth-child(8) {
              height: 3rem;
              line-height: 3rem;
            }
          }
        }
      }
    }
    #alreadyBuy {
      box-shadow: 0 0 0px 1px #4d76b2;
      height: 1.6rem;
      width: 20%;
      display: inline-block;
      text-align: center;
      border-radius: 5px;
      line-height: 1.6rem;
      color: #4d76b2;
      float: right;
      margin-top: 0.7rem;
    }
    #NotPay {
      color: #e59042;
    }
    #Buy {
      height: 1.6rem;
      width: 20%;
      display: inline-block;
      text-align: center;
      border-radius: 5px;
      line-height: 1.6rem;
      color: #fff;
      float: right;
      margin-top: 0.7rem;
      background-color: #e59042;
      box-shadow: 0 0 0px 1px #e59042;
    }
  } */

 /*  @media screen and (max-width: 380px) {
    .Prescription-background {
      background-color: #f9f9f9;
      width: 100%;
      height: calc(~"100% - 4rem");
      overflow-y: scroll;
      & > ul {
        width: 100%;
        & > li {
          list-style-type: none;
          width: 97%;
          margin-left: 2%;
          & > div:nth-child(1) {
            width: 96%;
          }
        }
      }
    }
  } */

 /*  @media screen and (max-width: 330px) {
    .Prescription-background {
      background-color: #f9f9f9;
      width: 100%;
      height: calc(~"100% - 4rem");
      overflow-y: scroll;
      & > ul {
        width: 100%;
        & > li {
          list-style-type: none;
          width: 97%;
          margin-left: 2%;
          & > div:nth-child(1) {
            width: 96%;

            & > div:nth-child(2) {
              height: 1.5rem;
              line-height: 4rem;
            }
            & > div:nth-child(3) {
              height: 1.5rem;
              line-height: 4rem;
            }
            & > div:nth-child(4) {
              height: 1.5rem;
              line-height: 4rem;
            }
            & > div:nth-child(5) {
              height: 1.5rem;
              line-height: 4rem;
            }
            & > div:nth-child(6) {
              height: 1.5rem;
              line-height: 4rem;
            }
            & > div:nth-child(7) {
              height: 1.5rem;
              line-height: 4rem;
            }
            & > div:nth-child(8) {
              height: 1.5rem;
              line-height: 4rem;
              & > span:nth-child(2) {
                margin-left: 8%;
                font-size: 1rem;
                color: #7c7c7c;
              }
            }
          }
        }
      }
    }
    #alreadyBuy {
      box-shadow: 0 0 0px 1px #4d76b2;
      height: 1.6rem;
      width: 20%;
      display: inline-block;
      text-align: center;
      border-radius: 5px;
      line-height: 1.6rem;
      color: #4d76b2;
      float: right;
      margin-top: 1rem;
    }

    #Buy {
      height: 1.6rem;
      width: 20%;
      display: inline-block;
      text-align: center;
      border-radius: 5px;
      line-height: 1.6rem;
      color: #fff;
      float: right;
      margin-top: 1rem;
      background-color: #e59042;
      box-shadow: 0 0 0px 1px #e59042;
    }
  } */
</style>
<script>
  import { Toast,Indicator} from 'mint-ui';
import { setTimeout } from 'timers';
  export default {
    data(){
      return{
        nums:1,
        lists:{},
        checkMenus:{},
        url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
        nums:"",
        updatamore:"",
        notice:"",
        nodata: false,
      }
    },
    created(){
      this.getToken()
    },
    methods:{
      getToken(){
        //当从微信其他方式进来的时候
        if(localStorage.getItem('openId') === undefined || localStorage.getItem("openId") === null){
            localStorage.setItem("openId", this.$route.query.openId)
        }
        //当从医院过来时，判断hospitialid
        if(this.$route.query.hospitalId !==undefined ){
            localStorage.setItem("hospitalId", this.$route.query.hospitalId)
            localStorage.setItem("hospitalCode", this.$route.query.hospitalId)
        }
        this.get(this.url_s+ "/messageService/getToken",{
            openId:  localStorage.getItem('openId')
        }).then(res=>{
            if(res.data.status === "1"){
                localStorage.setItem("AccessToken",res.data.token)
                this.query();
            }else if(res.data.status === "0"){
                //Toast("")失败
            }
        })
      },
      query(){        //请求数据..
        if(this.$route.query.notice === undefined||this.$route.query.notice === null){
          this.notice = false
        }else{
          this.notice = true
        }
        let userId = ""
        if(this.$route.query.userId === undefined ||this.$route.query.userId === null){
          userId = localStorage.getItem("userid")
        }else{
          userId = this.$route.query.userId
        }
        this.nums = 1;
        Indicator.open('加载中...');
        this.get( this.url_s+'/appointmentSearch/findAppointment',{
            page: this.nums,
            userId: userId,
            hospitalId: localStorage.getItem("hospitalId"),
            openId:  localStorage.getItem('openId') 
        }).then(res=>{
          //Indicator.close()
          //this.$layer.close();
          if(res.data == 'no'){
            this.nodata = true
          }else{
            this.lists = res.data;
            this.updatamore = true;
          }
          Indicator.close()
        }).catch(err=>{
          Indicator.close()
        })
      },
      //跳转
      Go(status,check,patientId,hospitalId,hospitalName,yyid){
        if(status != 1){
          return
        }
          localStorage.setItem("Isclick","true")
          localStorage.setItem("yyid",yyid)
        let userId = ""
        if(this.$route.query.userId == undefined ||this.$route.query.userId ==null){
          userId = localStorage.getItem("userid")
        }else{
          userId = this.$route.query.userId
        }
          if(check == 'true'){
            this.$router.push({
              name:"Visits_Card",
              query:{
                "patientId":patientId,
                "hospitalId":hospitalId,
                "hospitalName":hospitalName,
                "userId": userId,
                "Isclick":true,
                "yyid":yyid
              }})  //就诊卡选择列表
          }else{
            //Toast({message:'暂无当前医院的就诊卡,前往添加就诊卡..',duration:500})
            setTimeout(()=>{
              localStorage.setItem("patientId",patientId)
              localStorage.setItem("hospitalName",hospitalName)
              this.$router.push({
                name:"add_card",
                query:{
                  "patientId":patientId,
                  "hospitalName":hospitalName,
                  "hospitalId":hospitalId,
                  "Isclick":true,
                  "userId": this.$route.query.userId,
                  "fromlist": true
                  }
                })  
            },1000)
          }
      },
      checkDivScroolTop(){
          //获取节点
        Indicator.open('加载中...')
        let _this = this;
        _this.nums++;
        let userId=""
        if(_this.$route.query.userId == undefined ||_this.$route.query.userId ==null){
          userId = localStorage.getItem("userid")
        }else{
          userId = _this.$route.query.userId
        }
        _this       //this.info.url_s + "/api/doctor/findList"
            .get( _this.url_s+'/appointmentSearch/findAppointment', {
                userId: userId,
                page: _this.nums,
                hospitalId: localStorage.getItem("hospitalId"),
                openId:  localStorage.getItem('openId') 
                //sort: _this.info.paixuStr
            })
            .then(function(res) {
                Indicator.close();
                if(res.data != 'no'){
                    _this.lists = _this.lists.concat(res.data);
                }else{
                    Toast("没有更多检验检查单..")
                }
            }).catch(err=>{
                Indicator.close();
            })
      },
      back_to(){
        if(this.notice == true){
          this.$router.push("../notice")
        }else{
          this.$router.push("../net_index")
        }
      }
    },
  }
</script>
