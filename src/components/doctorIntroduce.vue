<template>
  <div class="docInt">
      <div class="top"><i class="el-icon-arrow-left" @click="back_to"></i><span>医生详情</span></div>
      <div class="doc"  >
        <div>
          <div :style="{backgroundImage:`url(${info.imgUrl + listId.userInfo.avatarUrl })`}" v-if="listId.userInfo.avatarUrl != ''"></div>
          <div class="defauImg" v-else></div>
        </div>
        <div>
          <div><span >{{listId.doctorName}}</span><span >{{listId.office}}</span></div>
          <div><span >{{listId.hospitalName}}</span><span ></span></div>
          <div>
            <span v-if="attention" class="unattention" @click="cancel">已关注</span>
            <span @click="addattention" class="attention" v-else><i class="el-icon-plus"></i>{{list.attention}}关注</span>
          </div>
        </div>
        <div>
            <div><span>问诊：</span><span >{{listId.advisoryCount === null ? 0 : listId.advisoryCount}}</span></div>
            <div><span>关注：</span><span >{{listId.attentionCount === null ? 0 : listId.attentionCount}}</span></div>
            <div><span>评论：</span><span >{{list_length === null ? 0 : list_length}}</span></div>
        </div>
      </div>
      <div class="fuwu"  >问诊服务</div>
      <div class="docImg"  >
        <div>
          <div></div>
        </div>
        <div>
          <div><span>网络门诊</span><span v-for="i in listId.doctorZxSetting">{{Isyizhen ?'0':i.videoPrice}}元/次</span></div>
          <div>通过图文进行问诊</div>
        </div>
        <div>
          <div @click="router">立即咨询</div>
        </div>
      </div>
      <div class="docInts" >医生详情</div>
      <div class="sc"  >
        <span>擅长：</span><span v-text="listId.good"></span>
      </div>
    <div class="sc"  >
      <span>简介：</span><span v-text="listId.description"></span>
    </div>
    <div class="bg"  ></div>
    <div class="comment"  >
      <span>用户评价</span><span>({{list_length}})</span></div>
    <div class="com"  >
      <ul>
        <li v-for="(l,index) in list" v-if="info.fas">
          <div><span>用户:</span><span>匿名</span>
            <span><el-rate
              v-model="l.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </span>
          </div>
          <div>
            <div :class="{asKai: abc[index].key}"  v-text="l.content"></div>
            <div @click="zk(index)"><img :src="abc[index].url" alt=""><div v-text="abc[index].name"></div></div>
          </div>
          <div><span>问诊日:</span><span v-text="l.createDate"></span></div>
        </li>
      </ul>
    </div>

  </div>
</template>

<style lang="less" scoped>
  @fontSize_14: 14px;
  @fontSize_12: 12px;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: PingFang-SC-Medium;
  }
  .defauImg{
    width: 7rem;
    height: 7rem;
    background: url("../assets/titile-head.png") 44% 22% no-repeat !important; 
    -webkit-background-size: 10rem 10rem!important;
    border-radius: 50%;
    margin-top: 4rem;
    margin-left:calc(50% - 3.5rem);
  }
  .docInt {
    width: 100%;
    overflow-x: hidden;
    & > .doc {        /*  页面头部样式  */
      width: 100%;
      height: 15rem;
      background: url("../assets/docBg.png") no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      font-size: 0;
      & > div {
        font-size:  @fontSize_14;
        display: inline-block;
        vertical-align: top;
      }
      & > div:first-child {       /* 医生头像 */
        width: 30%;
        height: 15rem;
        & > div {
          width: 7rem;
          height: 7rem;
          background: url("../assets/ssb.jpg") no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
          border-radius: 50%;
          margin-top: 4rem;
          margin-left: calc(~ '50% - 3.5rem');
        }
      }
      & > div:nth-child(2) {    /* 医生的医院名字介绍 */
        width: 45%;
        height: 15rem;
        padding-top: 4rem;
        color: #ffffff;
        & > div {
          height: 3rem;
          line-height: 3rem;
          text-overflow : ellipsis; 
          white-space : nowrap; 
          overflow : hidden; 
        }
        & > div:nth-child(1) {
          & > span:nth-child(2) {
            margin-left: 1rem;
            font-size:  @fontSize_12;
          }
        }
        & > div:nth-child(2) {
          font-size:  @fontSize_12;
          & > span:last-child {
            margin-left: 1rem;
          }
        }
        & > div:last-child{     //关注
          font-size:  @fontSize_12;
          & > i{
            color:#608bda
          }
          .attention{
            width: 4.5rem;
            line-height: 1.5rem;
            text-align: center;
            height: 1.5rem;
            border-radius: 0.4rem;
            display: inline-block;
            background-color: white;
            color: #608bda;
          }
          .unattention{
            width: 4.5rem;
            line-height: 1.5rem;
            text-align: center;
            height: 1.5rem;
            border-radius: 0.4rem;
            display: inline-block;
            background-color: #608bda;
            color: white;
          }
        }
      }
      & > div:nth-child(3) {      /* 首部右边问诊关注评论  */
        width: 25%;
        color: #f4a711;
        & > div:nth-child(1){
          padding-top: 5rem;
          & > span:last-child {
            margin-left: .5rem;
          }
        }
        & > div:nth-child(2){
          padding-top: 1rem;
          & > span:last-child {
            margin-left: .5rem;
          }
        }
        & > div:nth-child(3){
          padding-top: 1rem;
          & > span:last-child {
            margin-left: .5rem;
          }
        }
      }
    }
    & > .fuwu {               /*   问诊服务部分 */
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      box-sizing: border-box;
      color: #83889a;
      font-size: 14px;
      padding-left: 1rem;
      border-bottom: .1rem solid #eee;
      letter-spacing: .2rem;
      margin-top: .4rem;
      border-top: .1rem solid #eee;
    }
    & > .docImg {             /*  图文问诊部分 */
      width: 100%;
      height: 9rem;
      font-size: 0;
      border-bottom: .1rem solid #eee;
      & > div {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
      }
      & > div:first-child {
        width: 20%;
        height: 9rem;
        & > div {
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 50%;
          background: url("../assets/lanImg.png") no-repeat;
          background-size: cover;
          margin-top: 1.5rem;
          margin-left: calc(~ '50% - 2.25rem ');
        }
      }
      & > div:nth-child(2) {
        width: 50%;
        height: 9rem;
        padding-top: 1rem;
        & > div {
          height: 3rem;
          line-height: 3rem;
        }
        & > div:nth-child(1) {
          & > span:last-child {
            margin-left: 1.5rem;
            color: #f67d30;
          }
        }
        & > div:nth-child(2) {
          color: #666666;
          font-size: 1.3rem;
        }
      }
      & > div:last-child {
        width: 30%;
        & > div {
          width: 80%;
          margin-left: 10%;
          padding: .5rem;
          background-color: #608bda;
          border-radius: 2rem;
          color: #ffffff;
          text-align: center;
          margin-top: 2.5rem;
        }
      }
    }
    & > .docInts {                /* 医生详情div */
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      box-sizing: border-box;
      color: #83889a;
      font-size: @fontSize_14;
      padding-left: 1rem;
      border-bottom: .1rem solid #eee;
      letter-spacing: .2rem;
    }
    & > .sc {                       /* 擅长部分 */
      width: 100%;
      padding: 1.5rem 1rem;
      font-size: 14px;
      letter-spacing: .1rem ;
      border-bottom: .1rem solid #eee;
      & > span:first-child {
      }
      & > span:last-child {
        color: #797979;
      }
    }
    & > .bg {
      width: 100%;
      height: 1.5rem;
      background-color: #f8f8f8;
    }
    & > .comment {
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      font-size:@fontSize_14;
      padding: 0 1rem ;
      border-bottom: .1rem solid #eee;
      & > span:first-child {
        margin-right: 1rem;
      }
      & > span:last-child {
        color: #fb3e3e;
      }
    }
    & > .com {
      width: 100%;
      padding: 1rem ;
      & > ul {
        width: 100%;
        & > li {
          list-style-type: none;
          width: 100%;
          border-bottom: .1rem solid #eee;
          & > div:first-child {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            color: #71c3fe;
            box-sizing: border-box;
            font-size: @fontSize_14;
            & > span:first-child {
              width: 12%;
              height: 100%;
              line-height: 3rem;
              display: inline-block;
              vertical-align: top;
            }
            & > span:nth-child(2){
              width: 35%;
              height: 100%;
              color: #999;
              display: inline-block;
              vertical-align: top;
            }
            & >span:nth-child(3){
              width: 50%;
              height:100%;
              display: inline-block;
              vertical-align: text-bottom;
              line-height: 3rem;
            }
          }
          & > div:nth-child(2) {
            width: 100%;
            font-size: 0;
            position: relative;
            & > div {
              display: inline-block;
              font-size: @fontSize_14;
            }
            & > div:first-child {
              width: 85%;
              line-height: 2rem;
              letter-spacing: .1rem ;
              /*overflow: hidden;*/
              /*text-overflow: ellipsis;*/
              /*display: -webkit-box;*/
              /*-webkit-line-clamp: 2;*/
              /*-webkit-box-orient: vertical;*/
            }
            & > div:nth-child(2) {
              width: 15%;
              padding-top: .5rem;
             position: absolute;
              top: 0;
              right: 0;
              text-align: center;
              color: #999999;
              & > img {
                width: 1.5rem;
                height: .9rem;
              }
            }
          }
          & >div:nth-child(3) {
            line-height: 3rem;
            color: #909090;
            font-size: @fontSize_14 ;
            & > span:last-child {
              margin-left: .5rem;
            }
          }
        }
      }
    }
  }
  .asKai {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
</style>
<script>
import { Toast, Indicator,MessageBox} from "mint-ui";
  export default {
    data () {
      return {
        loading: false,
        info: {
          text: '展开',
          count: true,
          page: true,
          src: require('../assets/zhankai.png'),
          fas: null,
          url_s:  this.$store.state.skyUrl,
          imgUrl:this.$store.state.schlwyyUrl+"/doctor",    /* 医生头像图片 */
          url: localStorage.getItem('url')
        },
        lists: [],
        attention:"",
        Id: localStorage.getItem('doctorId'),
//        the_list: JSON.parse(sessionStorage.getItem('the_list')) ,
        listId: {
          userInfo:{
            avatarUrl:"",
          },
          doctorZxSetting: {
            videoPrice:"",
          },
          videoPrice:"",
        },
        twPrice:"",
        list: {
          data: {}
        },
        list_length: 0,
        monStr: 1,
        abc: [],
        Isyizhen: '',
      }
    },
    watch: {
      'list': function (val) {
        for(let i = 0; i < val.length ;i++) {
          let stu = {name};
          stu.name = '展开';
          stu.key = true;
          stu.url = require('../assets/zhankai.png');
          this.abc.push(stu)
        }
      }
    },
    mounted() {
      //医生资料
      this.docInt();
      //用户评论
      //this.punLun(this.Id);
    },
    methods: {
      zk (index) {
        if(this.abc[index].name === '展开') {
          this.abc[index].name = '收起';
          this.abc[index].key = false;
          this.abc[index].url = require('../assets/shouqi.png');
        }else {
          this.abc[index].name = '展开';
          this.abc[index].key = true;
          this.abc[index].url = require('../assets/zhankai.png')
        }
      },
      router () {
        //判断是否还有义诊次数
        if(this.Isyizhen == true){
          if( this.$route.query.remaintimes == 0){
            Toast("该医生已经没有免费义诊次数了")
          }else{
            // this.$router.push('/confirmation');
             this.getOpen()
          }
        }else{
            // this.$router.push('/confirmation');
            this.getOpen()
        }

      },
    getOpen(){
      this       //this.info.url_s + "/api/doctor/findList"
          .get( this.info.url_s + "/wxOauth2Parameter/parameter", {
              hospitalCode: localStorage.getItem("hospitalCode"),
              userId: localStorage.getItem("userid"),
              openId:  localStorage.getItem('openId')
          })
          .then( res=>{
            if(res.data.status === 1){
              window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+res.data.appid+"&"+"redirect_uri="+res.data.notifyUrl+"&response_type=code&scope=snsapi_base&state=1&component_appid=wx04a10062db24c5ab#wechat_redirect"
            }else if(res.data.status === 0){
              this.$router.push('/confirmation');
            }
          })
    },
      //医生资料
      docInt () {
        let num = 1;
        Indicator.open()
        let kinds=  localStorage.getItem("kindsmenzhen")
        if(kinds == 'yizhen'){
           this.Isyizhen = true
        }else{
           this.Isyizhen = false
        }
        let _this = this; //http://www.schlwyy.com:8686/doctor/api/doctor/findById
        _this.get(_this.info.url_s+'/hospitalSearch/findDoctor',{
            doctorId: localStorage.getItem('doctorId'),
            openId : localStorage.getItem("openId"),        //用户的id，看是否关注医生
            page: num,
            openId:  localStorage.getItem('openId')
//          token: sessionStorage.getItem('token'),
        }).then(function (res) {
          _this.listId = res.data[0];
          Indicator.close();
        //通过localStorage判断是不是义诊，义诊传到支付页面的价钱为0；不是义诊则正常传值
        if(localStorage.getItem("kindsmenzhen") == 'yizhen'){
          localStorage.setItem('monStr',"0");
        }else{
          localStorage.setItem('monStr',_this.listId.doctorZxSetting[0].videoPrice);
        }
          _this.list = res.data[1].comment.content;       //获取关注和评论的数据;;;
          _this.attention = res.data[1].attention;
           if (_this.list) {
            _this.info.fas = true;
          }else  {
            _this.info.fas = false;
          }
          _this.list_length = res.data[1].comment.content.length;
        })
      },
      addattention(){         /* 添加关注 */
          this.get( this.info.url_s+"/UserInfo/addDoctor",{
             doctorId:localStorage.getItem('doctorId'),
              userid: localStorage.getItem("userid"),
              openId:  localStorage.getItem('openId') 
          }).then(res=>{
              if(res.data == true){
                this.attention = true;
                
              }
          })
      },
      //取消关注
      cancel(doctorId){
        this.get(this.info.url_s+"/UserInfo/deleteDoctor", { 
              doctorid:localStorage.getItem('doctorId'),
              userid: localStorage.getItem("userid"),
              openId:  localStorage.getItem('openId') 
          })
          .then(res => {
            if (res.data == true) {
              
              this.attention = false;
            } else {
              Toast("取消关注失败");
            }
          })
      },
      back_to(){
        if(this.$route.query.concern == true){
          this.$router.push("./Myconcern")
        }else{
          this.$router.push("./menzhen")
        }
      },
      //用户评论
      punLun (doctorId) {
        let _this = this;
        _this.get( _this.info.url_s+'/hospitalSearch/findComment',{
            //测试id
//            doctorId: '8df165c287024e71ae912cfe24717f86',
            doctorId: doctorId,
            token: localStorage.getItem('token'),
            //pageSize: 4,
            page: 1,
            openId:  localStorage.getItem('openId')
        }).then(function (res) {
          _this.list = res.data[0].content;
          if (_this.list) {
            _this.info.fas = true;
          }else  {
            _this.info.fas = false;
          }
          _this.list_length = res.data[0].content.length;
        })
      }
     }
  }

</script>
