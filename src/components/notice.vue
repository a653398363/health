<template>
   <div class="Notice">
    <div class="top"><i class="el-icon-arrow-left" @click="back" ></i><span>系统消息</span><img @click="allread" src="../assets/Notice-read.png"></div>
    <div class="Notice-background">
        <div class="within">
          <div class="nodata" v-if="nodata">
              <img src="../assets/noDate.png" alt="">
          </div> 
            <ul>
                <li v-for="list in lists" @click="Go(list.type,list.relatedId)">
                    <div>
                      <span>{{list.type == 1 ?"医生回复":(list.type==2?"检查单通知":"处方笺通知")}}</span>
                      <span>
                        <img id="yshf" src="../assets/Notice-yshf.png" v-if="list.type ==1">
                        <img id="zffs" src="../assets/Notice-zffs.png" v-if="list.type ==2">
                        <img id="ghjz" src="../assets/Notice-ghjz.png" v-if="list.type ==3">
                      </span>
                      <span>{{list.time}}</span>
                      <span><img class="redPoint" src="../assets/Notice-red.png" v-if="list.status ==0"></span>
                    </div>
                    <div></div>
                    <p>{{list.content}}</p>
                    <img src="../assets/Notice-right.png">
                </li>
                <li id="li" @click="checkDivScroolTop" v-if="updatamore">
                  <span></span><span>加载更多</span>
                </li>
            </ul>
        </div>
    </div>  
   </div>
</template>

<style scoped lang="less" scoped>
  @fontSize_14: 14px;
  @fontSize_12: 12px;
  .mint-indicator .mint-indicator-wrapper{
    z-index: 1000!important;
  } 
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
  .Notice {
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
  .Notice-background {
    background: url("../assets/Notice-BG.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: calc(~"100% - 4rem");
    overflow-y: scroll;
  }

  .within {
    width: 100%;
    height: 100%;
    & > ul {
      list-style: none;
      margin-bottom: 10%;
    }
    ul li {
      width: 90%;
      margin: 0 auto;
      height: 8rem;
      font-size: 1.4rem;
      background-color: #fff;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      box-sizing: border-box;
      border-radius: 5px;
      margin-top: 2rem;
      box-shadow: 0px 15px 12px -8px rgba(158, 158, 158, 0.38);
      & > P {
        width: 90%;
        height: 4rem;
        float: left;
        font-size: 14px;
        margin-left: 5%;
        color: #8a8a8a;
        line-height: 4rem;
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
        -webkit-text-overflow: ellipsis;
      }
      & > div:first-child{
          width: 100%;
          height: 3rem;
          box-sizing: border-box;
          line-height: 3rem;
          font-size: 0;
          & > span:nth-child(1) {
            width: 25%;
            height: 100%;
            font-size: 14px;
            display: inline-block;
            text-align: right;
            padding-right: 0.6rem;
            box-sizing: border-box;
          }
          & > span:nth-child(2) {
            width: 10%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;
            img {
              position: absolute;
              top:1rem;
              left:1rem;
            }
          }
          & > span:nth-child(3) {
            width: 60%;
            height: 100%;
            color: #a6a6a6;
            font-size: 14px;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: top;
            text-align: right;
          }
          & > span:nth-child(4) {
            width: 5%;
            height: 100%;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: top;
            img {
              width: 0.75rem;
              display: line-block;
              vertical-align: top;
            }
          }
      }
      & > div:nth-child(2){
        width: 90%;
        border-bottom: 1px dashed #8e8e8e;
        margin: 0 auto;
        clear: both;
      }
      & > img {
        display: block;
        float: right;
        margin-top: 4%;
        margin-right: 1%;
      }
    }
  }
  #li {
      width: 90%;
      margin: 1rem auto 0;
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
</style>

<script>
import { Toast, Indicator,MessageBox} from "mint-ui";
export default {
  data(){
    return{
        pages: 1 ,
        url_s:  this.$store.state.skyUrl,
        lists:{},
        updatamore:"",
        nodata: false,
    }
  },
  created(){
     this.querylist();
  },
  watch:{
    'lists': function(val){

    }
  },
  methods:{
    querylist(){                /* 其他就诊人信息 */
        Indicator.open("加载中..")
        this.get( this.url_s+"/Notice/findNotice",{
                userId: localStorage.getItem("userid"),
                page: this.pages,
                hospitalId: localStorage.getItem("hospitalId"),
                openId:  localStorage.getItem('openId')             
            })
        .then(res =>{
            if(res.data != 'no'){
              this.lists = res.data;
              this.updatamore = true;
            }else{
              this.nodata = true
            }
            Indicator.close();
        }).catch(err=>{
            Indicator.close();
        }) 
    },
    //分页
    checkDivScroolTop(){
          //获取节点
      Indicator.open('加载中...')
      let _this = this;
      _this.pages++;
      _this       //this.info.url_s + "/api/doctor/findList"
          .get( _this.url_s+"/Notice/findNotice", {
                userId: localStorage.getItem("userid"),
                page: _this.pages,
                hospitalId: localStorage.getItem("hospitalId"),
                openId:  localStorage.getItem('openId') 
          })
          .then(function(res) {
              Indicator.close();
              if(res.data != 'no'){
                  _this.lists = _this.lists.concat(res.data);
              }else{
                  Toast("暂无更多消息..")
              }
          }).catch(err=>{
              Indicator.close();
          })
    },
    //tpye=1 医生回复   = 2 检查单     =3处方渐通知  
    Go(type,relatedId){
      localStorage.setItem("notice",true)
      if(type == 1){
        localStorage.setItem("relatedId",relatedId);
        //localStorage.setItem()
        this.$router.push({
          name:"inquiry",
          query:{
            "orderId":relatedId,
            "notice":true
          }})  
      }else if(type == 2){    //检验检查单
        this.$router.push({
          name:"advisory",
          query:{"userId":localStorage.getItem("userid"),"notice":true}})
      }else{      //电子处方
        localStorage.setItem("relatedId",relatedId);
        this.$router.push({name:"PrescriptionNotes",query:{"recipeId":relatedId,"notice":true}})
      } 
    },
    //点击所有设为已读
    allread(){
      if(this.nodata == true){
        return
      }
      MessageBox.confirm("是否将所有消息标记为已读?").then(action => {
        this.get(this.url_s+"/Notice/ChangeMessage", {
              userId:localStorage.getItem("userid"),
              openId:  localStorage.getItem('openId')
          })
          .then(res => {
              if (res.data == true) {
                Toast("成功.");
                this.querylist();
              } else {
                Toast("失败");
              }
          })
      });
    },
    back(){
      this.$router.push("./net_index")
    }
  }
}
</script>
<style lang="less">
.mint-indicator .mint-indicator-wrapper{
    z-index: 1000!important;
}  
</style>
