<template>
   <div class="Prescription">
   <div class="top"><i class="el-icon-arrow-left" @click="back_to"></i><span>我的处方</span></div>
   <div class="Prescription-background">
      <div class="nodata" v-if="nodata">
          <img src="../../assets/noDate.png" alt="">
      </div> 
      <ul >
         <li v-for="list in lists"  @click="detail(list.pay,list.recipe.recipeId,list.order.module)">
            <div>
              <div>{{list.recipe.createDate == null||list.recipe.createDate == ''?"暂无": list.recipe.createDate.substring(0,10)}}</div>
              <div>
                 <span id="NotPay" v-if="list.pay === 'nopay' ">待付款</span>
                 <span id="alreadyPay" v-else-if="list.pay === 'paied'">已付款</span>
                 <span id="alreadyPay" style="color:#c0c4cc" v-else-if="list.pay === 'outtime'">已过期</span>
              </div>
              <div>
                 <span>{{list.recipe.doctor.hospitalName}}</span>
                 <span>处方笺</span>
              </div>
              <div>
                 <span>就诊医生：</span>
                 <span>{{list.recipe.doctorName}}</span>
                 <span>就诊科室：</span>
                 <span>{{list.recipe.doctor.unitsName}}</span>
              </div>
              <div>
                 <span>就诊人：</span>
                 <span>{{list.yuyue.userName}}</span>
                 <span>年龄：</span>
                 <span>{{list.yuyue.age}}</span>
                 <span>性别：</span>
                 <span>{{list.yuyue.gender == 1?"男":"女"}}</span>
              </div>
              <div>
                 <span>初步诊断：</span>
                 <span>{{list.yuyue.cld}}</span>
              </div>
              <div id="line"></div>
              <div>
                <span>药品合计：{{list.order.amount}}元</span>
                <span>处方详情 >> </span>
                 <!-- <span id="Buy" v-if="list.recipe.takeStatus == 0">去购买</span>
                 <span id="alreadyBuy" v-else>已购买</span> -->
              </div>

            </div>
         </li>
          <li id="li" @click="checkDivScroolTop" v-if="updatamore">
            <span></span><span>加载更多</span>
          </li>
      </ul>
     </div>
   </div>
</template>

<style scoped lang="less" scoped>
      @fontSize_14: 14px;
    @fontSize_12: 12px;
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
      margin-top: 5%;
      margin-bottom: 5%;
      width: 100%;
      & > li {
        list-style-type: none;
        height: 17.5rem;
        width: 98%;
        margin: 0 auto;
        box-sizing: border-box;
        padding-left: 2%;
        & > div:nth-child(1) {
          background: url("../../assets/perscript/Prescription-BG.png") no-repeat;
          background-size: cover;
          width: 97%;
          height: 95%;
          & > div:nth-child(1) {
            width: 60%;
            display: inline-block;
            margin-left: 8%;
            height: 0.5rem;
            float: left;
            margin-top: -0.7rem;
            font-size: 1.2rem;
            color: #3a3a3a;
          }

          & > div:nth-child(2) {
            width: 84%;
            height: 2rem;
            margin-left: 10%;
            position: relative;
            & > span:nth-child(1) {
              text-shadow: 0px 0px 0px #0c0c0c;
              font-size: 1.3rem;
              color: #0c0c0c;
              width: 20%;
              height: 100%;
              float: right;
              text-align: right;
              margin-top: 1.5rem;
              line-height: 1.5rem;
            }
            & > span:nth-child(2) {
              vertical-align: top;
              width: 61%;
              height: 100%;
              font-size: 14px;
              color: #0c0c0c;
              display: inline-block;
              text-shadow: 0px 0px 0px #0c0c0c;
            }
            & > span:nth-child(3) {
              vertical-align: top;
              width: 13%;
              text-align: right;
              position: absolute;
              display: inline-block;
              height: 2rem;
              line-height: 2rem;
              margin-top: 1rem;
            }
          }

          & > div:nth-child(3) {
            width: 84%;
            height: 2rem;
            line-height: 2rem;
            margin-left: 10%;
            & > span:nth-child(1) {
              text-shadow: 0px 0px 0px #5c5c5c;
              font-size: 1.2rem;
              color: #5c5c5c;
            }
            & > span:nth-child(2) {
              text-shadow: 0px 0px 0px #5c5c5c;
              font-size: 1.2rem;
              color: #5c5c5c;
            }
          }

          & > div:nth-child(4) {
            width: 84%;
            height: 2rem;
            line-height: 2rem;
            margin-top: 1%;
            margin-left: 10%;
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

          & > div:nth-child(5) {
            width: 84%;
            height: 2rem;
            margin-top: 1%;
            line-height: 2rem;
            margin-left: 10%;
            & > span:nth-child(1) {
              font-size: 1rem;
              color: #7c7c7c;
            }
            & > span:nth-child(2) {
              font-size: 1rem;
              color: #7c7c7c;
            }

            & > span:nth-child(3) {
              margin-left: 6%;
              font-size: 1rem;
              color: #7c7c7c;
            }
            & > span:nth-child(4) {
              font-size: 1.2rem;
              color: #7c7c7c;
            }
            & > span:nth-child(5) {
              margin-left: 7%;
              font-size: 1rem;
              color: #7c7c7c;
            }
            & > span:nth-child(6) {
              font-size: 1rem;
              color: #7c7c7c;
            }
          }
          & > div:nth-child(6) {
            width: 84%;
            height: 2rem;
            margin-top: 1%;
            line-height: 2rem;
            margin-left: 10%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            & > span:nth-child(1) {
              width: 21%;
              font-size: 1rem;
              display: inline-block;
              color: #7c7c7c;
              vertical-align: top;
            }
            & > span:nth-child(2) {
              width: 70%;
              height: 100%;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 1rem;
              color: #7c7c7c;
            }
          }

          & > div:nth-child(7) {
            width: 84%;
            border-bottom: 1px dashed #7c7c7c;
            height: 0.5rem;
            margin-left: 10%;
          }

          & > div:nth-child(8) {
            width: 84%;
            height: 3rem;
            line-height: 3rem;
            box-sizing: border-box;
            font-size: 0;
            margin-left: 10%;
            & > span:nth-child(1) {
              font-size: 1rem;
              color: #7c7c7c;
              display: inline-block;
              box-sizing: border-box;
              width: 50%;
            }
            
            & > span:nth-child(2) {
              display: inline-block;
              box-sizing: border-box;
              width: 50%;
              height: 3rem;
              text-align: right;
              font-size: 1rem;
              color: #7c7c7c;
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
    float: right;
    margin-top: 3%;
    background-color: #e59042;
    box-shadow: 0 0 0px 1px #e59042;
  }
  #alreadyPay {
    color: #4d76b2;
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




</style>

<script>
import { Toast,Indicator } from 'mint-ui';
export default {
  data(){
      return{
          nums:1,
          lists:{},
          url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
          nodata: false,
          updatamore: false,
      }
  },
  created(){
      this.query()
  },
  methods:{
    query(){        //请求数据.
        Indicator.open('加载中...');
        let config = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        };
        // var params = new URLSearchParams();
        // params.append("page",this.nums)
        // params.append("openId",localStorage.getItem("openId"))
        // params.append("hospitalId",localStorage.getItem("hospitalId"))
        this.get( this.url_s+'/recipeController/findRecipe',{
            "page":this.nums,
            "openId":localStorage.getItem("openId"),
            "hospitalId":localStorage.getItem("hospitalId"),
        }).then(res=>{
            Indicator.close()
            //this.$layer.close();
            if(res.data == 'no'){
              this.nodata = true;
            }else{
              this.lists = res.data;
              this.updatamore = true;
            }
        }).catch(err=>{
            Indicator.close()
        })
    },
    checkDivScroolTop(){
          //获取节点
        Indicator.open('加载中...')
        let _this = this;
        _this.nums++;
        _this       //this.info.url_s + "/api/doctor/findList"
            .get( _this.url_s+'/recipeController/findRecipe', {
                page: _this.nums,
                openId: localStorage.getItem("openId"), //this.$route.query.openId
                hospitalId:localStorage.getItem("hospitalId"),
            })
            .then(function(res) {
                Indicator.close()
                if(res.data == 'no' ||res.data == ''){
                  Toast("暂无更多数据")
                }else{
                  _this.lists = _this.lists.concat(res.data);
                }
            }).catch(err=>{
                Indicator.close()
            })
      },
    detail(pay,recipeId,module){
        //localStorage.setItem("recipeId",recipeId)
        if(module == '354' || module == '355'){
           this.$router.push({name:"Prescriptchoice",query:{"recipeId":recipeId}})
        }else{
          this.$router.push({name:"PrescriptionNotes",query:{"recipeId":recipeId}})
        }
    },
    back_to(){
        this.$router.push("../net_index")
    }
  },
}
</script>

