<template>
   <div class="PrescriptionPay">
      <div class="top"><i class="el-icon-arrow-left" @click="back_to"></i><span>处方支付</span></div>
      <div class="PrescriptionPay-background">
             <div  v-if="lists.module == '355'">                   <!-- 住院门诊 355  可以自选配送上门 -->
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">药品自取</mt-tab-item>
                    <mt-tab-item id="2">配送上门</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1" >
                        <div class="one">
                            <div>
                                <img src="../assets/perscript/PrescriptionPay-title1.png">
                                <span>自取</span>
                            </div>
                            <div>
                                <div>
                                <span>药店名称：</span>
                                <span>{{medicalAd.name==''?'暂无':medicalAd.name}}</span>
                                </div>
                                <div class="clear"></div>
                                <div>
                                  <span>取件人姓名：</span><input type="text" v-model="info.selfname" placeholder="请填写取件人姓名"><br>
                                  <span>取件人电话：</span><input type="text" v-model="info.selephone" placeholder="请填写取件人电话">
                                </div>
                                <div class="clear"></div>
                                <div>
                                <img src="../assets/perscript/PrescriptionPay-position.png">
                                <div>
                                    <span>药店地址：</span>
                                    <span>{{medicalAd.address==''?"暂无":medicalAd.address}}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="PrescriptionPay-one">
                            <div>
                                <img src="../assets/perscript/PrescriptionPay-sendIcon.png">
                                <span>配送上门</span>
                            </div>
                            <div>
                                <p>
                                 此配送服务不收取任何快递费，目前只支持四川省内的配送；当天16:00之前完成支付的药品，从支付日开始计48小时到货；
                    当天16:00后完成支付的药品，从次日16:00后开始计48小时到货； <br>
                    有问题请拨打客服电话：400-800-1335。
                                </p>
                            </div>
                            <div>
                                <div>
                                  <span>药店名称：</span>
                                  <span>{{medicalAd.name==''?'暂无':medicalAd.name}}</span>
                                </div>
                                <div>
                                  <span>药店地址：</span>
                                  <span>{{medicalAd.address==''?"暂无":medicalAd.address}}</span>
                                </div>
                                <div>
                                  <span>收货人：</span>
                                  <span>{{choice?info.userName:lists.user.userName}}</span>
                                </div>
                                <div class="clear"></div>
                                <div>
                                <span>联系电话：</span>
                                <span>{{choice?info.phone:lists.user.phone}}</span>
                                </div>
                                <div class="clear"></div>
                                <div>
                                <img src="../assets/perscript/PrescriptionPay-position.png">
                                <div @click="seleadress">
                                    <span>收货地址：</span>
                                    <span>{{choice?info.address:lists.user.address}}</span>
                                </div>
                                <img src="../assets/perscript/PrescriptionPay-leftIcon.png">
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>    <!-- 自取 354-->
            <div class="PrescriptionPay-one-1" v-else-if="lists.module == 353 || lists.module ==  354">
                <div>
                    <img src="../assets/PrescriptionPay-title1.png">
                    <span>自取</span>
                </div>
                <div>
                    <div>
                       <span>药店名称：</span>
                       <span>{{medicalAd.name==""?"暂无":medicalAd.name}}</span>
                    </div>
                    <div>
                      <span>取件人姓名：</span><input type="text" v-model="info.selfname" placeholder="请填写取件人姓名"><br>
                      <span>取件人电话：</span><input type="text" v-model="info.selephone" placeholder="请填写取件人电话">
                    </div>
                    <div>
                       <img src="../assets/PrescriptionPay-position.png">
                       <div>
                          <span>药店地址：</span>
                          <span>{{medicalAd.address==""?'暂无':medicalAd.address}}</span>
                       </div>

                    </div>
                </div>
            </div>
            <div class="PrescriptionPay-one" v-else>  <!-- 配送上门 -->
                <div>
                    <img src="../assets/perscript/PrescriptionPay-sendIcon.png">
                    <span>配送上门</span>
                </div>
                <div>
                    <p>
                    此配送服务不收取任何快递费，目前只支持四川省内的配送；当天16:00之前完成支付的药品，从支付日开始计48小时到货；
                    当天16:00后完成支付的药品，从次日16:00后开始计48小时到货； <br>
                    有问题请拨打客服电话：400-800-1335。
                    </p>
                </div>
                <div>
                    <!-- <div v-show="false">
                      <span>药店名称：</span>
                      <span>{{medicalAd.name==''?'暂无':medicalAd.name}}</span>
                    </div>
                    <div v-show="false">
                      <span>药店地址：</span>
                      <span>{{medicalAd.address==''?"暂无":medicalAd.address}}</span>
                    </div> -->
                    <div>
                      <span>收货人：</span>
                      <span>{{choice?info.userName:lists.user.userName}}</span>
                    </div>
                    <div class="clear"></div>
                    <div>
                      <span>联系电话：</span>
                      <span>{{choice?info.phone:lists.user.phone}}</span>
                    </div>
                    <div class="clear"></div>
                    <div>
                    <img src="../assets/perscript/PrescriptionPay-position.png">
                    <div @click="seleadress">
                        <span>收货地址：</span>
                        <span>{{choice?info.address:lists.user.address}}</span>
                    </div>
                    <img src="../assets/perscript/PrescriptionPay-leftIcon.png">
                    </div>
                </div>
            </div>

            <div class="dividing-line"></div>

            <div class="PrescriptionPay-two">
                <div>
                   <img src="../assets/perscript/PrescriptionPay-title2.png">
                   <span>药品明细</span>
                </div>
                <div>
                   <ul>
                      <li v-for="list in lists.medicine">
                        <span>
                            <span>{{list.medicine.medicinePublic.medicineName}}</span>
                            <span>*{{list.quantity}}</span>
                            <span>{{list.medicine.medicinePublic.specification}}</span>
                            <span>
                              <span>￥</span>
                              <span>{{list.medicine.price}}</span>
                            </span>
                        </span>
                            <!-- <span>用法用量：</span>
                            <span>{{list.usage}}</span>/
                        <span>
                            <span >一次
                            <span>{{list.dosage}}</span>
                            <span>{{list.unitDose}}/</span>
                            </span>
                            <span>{{list.frequency}}</span>/
                            <span>服用{{list.days}}天</span>
                        </span> -->
                      </li>

                   </ul>
                </div>
                <div>
                   <span>合计：</span>
                   <span>￥</span>
                   <span>{{lists.totalPrice}}</span>
                </div>
            </div>

             <div class="PrescriptionPay-three">
                <div>
                    <span>实付：</span>
                    <span>{{lists.realPrice}}</span>
                    <span>元</span>
                    <s>
                       <span>￥</span>
                       <span>{{lists.totalPrice}}</span>
                    </s>

                </div>
                <div @click="payNow(lists.order.orderNum,lists.order.orderId,lists.realPrice,lists.user.id,'online',lists.order.doctorId)">{{sub_text}}</div>
            </div>
      </div>
      <div class="bg" v-if="bg" @click="closebg"></div>
      <div class="choosepay" v-if="choosepay">
        <ul>
          <li @click="pay(lists.order.orderNum,lists.order.orderId,lists.realPrice,lists.user.id,'online',lists.order.doctorId)" v-if="onlines">线上支付</li>
          <li @click="pay(lists.order.orderNum,lists.order.orderId,lists.realPrice,lists.user.id,'offline',lists.order.doctorId)" v-if="underline">线下支付</li>
        </ul>
      </div>
  </div>
</template>

<style scoped lang="less" scoped>
  .choosepay {
    position: absolute;
    left: 0;
    bottom: 4rem;
    width: 100%;
    font-size: 0;
    background-color: white;
    box-sizing: border-box;
    ul {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > li {
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.4rem;
        padding-left: 2rem;
        border-top: 1px solid #ccc;
      }
      & > li:hover{
        background-color: rgba(204, 204, 204, 0.61);
      }
    }
  }
  .bg {
    width: 100%;
    height: calc(~"100% - 8rem");
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
  .PrescriptionPay {
    width: 100%;
    height: 100%;
  }
  .PrescriptionPay-background {
    background-color: #fff;
    width: 100%;
    height: calc(~"100% - 4rem");
    overflow-y: scroll;
  }
  .clear {
    clear: both;
    margin: 0 !important;
    width: 0 !important;
    height: 0 !important;
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

  .PrescriptionPay-one {
    width: 100%;
    background-color: #fff;
    & > div:nth-child(1) {
      min-height: 4.5rem;
      width: 90%;
      margin-left: 5%;
      & > img {
        float: left;
        margin-top: 4%;
      }
      & > span {
        color: #2dd2ad;
        font-family: "幼圆";
        font-size: 1.6rem;
        display: block;
        float: left;
        line-height: 3rem;
        height: 3rem;
        margin-top: 3%;
        margin-left: 3%;
      }
    }
    & > div:nth-child(2) {
      min-height: 6.5rem;
      margin-left: 5%;
      text-align: left;
      color: #9e9e9e;
      line-height: 1.5rem;
      padding-bottom: 1rem;
      & > p {
        width: 90%;
      }
    }
    & > div:nth-child(3) {
      background-color: #f7f7f8;
      width: 90%;
      border-radius: 12px;
      margin: 0 auto 2rem;
      padding-bottom: 0.5rem;
      & > div:nth-child(1) {
        width: 90%;
        margin: 0 auto;
        padding-top: 1rem;
        border-bottom: 3px solid #fff;
        box-sizing: border-box;
        font-size: 0;
        & > span:nth-child(1) {
          display: inline-block;
          width:24%;
          line-height: 2rem;
          color: #7a7a7a;
          font-size: 1.2rem;
        }
        & > span:nth-child(2) {
          display: inline-block;
          width:76%;
          line-height: 2rem;
          color: #7a7a7a;
          font-size: 1.2rem;
        }
      }
      & > div:nth-child(3) {
        width: 90%;
        margin: 0 auto;
        padding-top: 1rem;
        border-bottom: 3px solid #fff;
        box-sizing: border-box;
        font-size: 0;
        & > span:nth-child(1) {
          display: inline-block;
          width:24%;
          line-height: 2rem;
          color: #7a7a7a;
          font-size: 1.2rem;
        }
        & > span:nth-child(2) {
          display: inline-block;
          width:76%;
          line-height: 2rem;
          color: #7a7a7a;
          font-size: 1.2rem;
        }
      }
      & > div:last-child {
        width: 82%;
        min-height: 4rem;
        margin-left: 13%;
        position: relative;
        padding-bottom: 1rem;
        & > img:nth-child(1) {
          display: block;
          position: absolute;
          left: -11%;
          margin-top: 1rem;
        }
        & > div {
          float: left;
          width: 90%;
          margin-top: 0.6rem;
          font-size: 1.2rem;
          color: #7a7a7a;
        }
        & > img {
          display: block;
          position: absolute;
          right: 2%;
          margin-top: 1.5rem;
        }
      }
    }
  }

  .PrescriptionPay-two {
    background-color: #fff;
    width: 100%;
    height: auto;
    & > div:nth-child(1) {
      height: 4.5rem;
      width: 90%;
      margin-left: 5%;
      & > img {
        float: left;
        margin-top: 3%;
      }
      & > span {
        color: #2dd2ad;
        font-family: "\5E7C\5706";
        font-size: 1.6rem;
        display: block;
        float: left;
        line-height: 3rem;
        height: 3rem;
        margin-top: 3%;
        margin-left: 3%;
      }
    }
    & > div:nth-child(2) {
      width: 90%;
      margin-left: 5%;
      height: 90%;
      & > ul {
        list-style: none;
        height: 80%;
        & > li {
          height: 3rem;
          border-bottom: 1px solid rgba(122, 122, 122, 0.6);
          color: #7a7a7a;
          margin-bottom: 1rem;
          margin-top: 0.5rem;
          & > span:nth-child(1) {
            color: #000000;
            width: 100%;
            display: block;
            height: 3rem;
            line-height: 3rem;
            & > span:nth-child(1) {
              font-size: 1.3rem;
            }
            & > span:nth-child(2) {
            }
            & > span:nth-child(3) {
              margin-left: 5%;
              color: #7a7a7a;
            }
            & > span:nth-child(4) {
              float: right;
              color: #7a7a7a;
              & > span:nth-child(1) {
                text-align: right;
              }
              & > span:nth-child(2) {
                text-align: right;
              }
            }
          }
        }
      }
    }
    & > div:nth-child(3) {
      height: 3rem;
      text-align: right;
      width: 90%;
      margin-left: 5%;
      line-height: 3rem;
      margin-bottom: 20%;
      & > span:nth-child(3) {
      }
    }
  }

  .dividing-line {
    background-color: #f7f7f8;
    width: 100%;
    height: 1%;
  }

  .PrescriptionPay-three {
    width: 100%;
    height: 4rem;
    position: fixed;
    bottom: 0;
    line-height: 4rem;
    & > div:nth-child(1) {
      position: relative;
      width: 50%;
      float: left;
      height: 4rem;
      text-align: center;
      background-color: #f7f7f8;
      & > span:nth-child(1) {
        font-size: 1.3rem;
      }
      & > span:nth-child(2) {
        color: #e72000;
        font-size: 1.2rem;
      }
      & > span:nth-child(3) {
        color: #e72000;
        font-size: 1.2rem;
      }
      & > span:nth-child(4) {
        margin-left: 5%;
        color: #7c7c7c;
      }
      & > span:nth-child(5) {
        color: #7c7c7c;
      }
      & > s {
        color: #7a7a7a;
        margin-left: 1%;
      }
    }
    & > div:nth-child(2) {
      width: 50%;
      float: left;
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      background-image: url(../assets/perscript/PrescriptionPay-bottomBG.png);
      background-size: 100% 100%;
      font-size: 1.4rem;
      color: #fff;
    }
  }
  .one {
    height: 20rem;
    width: 100%;
    padding-top:0.4rem;
    //background-color: #8e8e8e;
    & > div:nth-child(1) {
      height: 4.5rem;
      width: 90%;
      margin-left: 5%;
      & > img {
        float: left;
        margin-top: 3%;
      }
      & > span {
        color: #2dd2ad;
        font-family: "幼圆";
        font-size: 1.6rem;
        display: block;
        float: left;
        line-height: 3rem;
        height: 3rem;
        margin-top: 3%;
        margin-left: 3%;
      }
    }
    & > div:nth-child(2) {
      background-color: #f7f7f8;
      width: 90%;
      margin-left: 5%;
      border-radius: 12px;
      position: absolute;
      & > div:nth-child(1) {
        height: 3rem;
        line-height: 3rem;
        width: 90%;
        margin-left: 5%;
        position: relative;
        & > span:nth-child(1) {
          float: left;
          height: 3rem;
          line-height: 3rem;
          color: #7a7a7a;
          font-size: 1.2rem;
          box-sizing: border-box;
          width: 28%;
        }
        & > span:nth-child(2) {
          float: left;
          height: 3rem;
          line-height: 3rem;
          color: #7a7a7a;
          font-size: 1.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      & > div:nth-child(3) {
        height: 5rem;
        width: 90%;
        margin-left: 5%;
        line-height: 2.5rem;
        & > span {
          width: 28%;
          display: inline-block;
          height: 2.5rem;
          box-sizing: border-box;
          line-height: 2.5rem;
          color: #7a7a7a;
          font-size: 1.2rem;
        }
        & > input {
          background-color: transparent;
          width: 72%;
          border-bottom: 1px solid #ccc;
          font-size: 1.2rem;
        }
      }
      & > div:last-child {
        height: 5rem;
        line-height: 2rem;
        width: 82%;
        margin-left: 13%;
        font-size: 1.2rem;
        position: relative;
        & > img:nth-child(1) {
          display: block;
          position: absolute;
          left: -11%;
          margin-top: 0.6rem;
        }
        & > div {
          float: left;
          width: 90%;
          margin-top: 0.4rem;
          color: #7a7a7a;
        }
        & > img {
          display: block;
          position: absolute;
          right: 2%;
          margin-top: 1.5rem;
        }
      }
    }
  }

  .PrescriptionPay-one-1 {
    width: 100%;
    background-color: #fff;
    margin-bottom: 2rem;

    & > div:nth-child(1) {
      height: 4.5rem;
      width: 90%;
      margin-left: 5%;
      & > img {
        float: left;
        margin-top: 3%;
      }
      & > span {
        color: #2dd2ad;
        font-family: "幼圆";
        font-size: 1.6rem;
        display: block;
        float: left;
        line-height: 3rem;
        height: 3rem;
        margin-top: 3%;
        margin-left: 3%;
      }
    }
    & > div:nth-child(2) {
      background-color: #f7f7f8;
      width: 90%;
      margin-left: 5%;
      border-radius: 12px;
      padding-bottom: 1rem;
      & > div:nth-child(1) {
        height: 3rem;
        width: 90%;
        margin-left: 5%;
        padding-top: 0.6rem;
        & > span:nth-child(1) {
          float: left;
          height: 2rem;
          margin-top: 0.8rem;
          line-height: 2rem;
          color: #7a7a7a;
          font-size: 1.2rem;
          box-sizing: border-box;
          width: 28%;
          letter-spacing: 0.2rem;
        }
        & > span:nth-child(2) {
          float: left;
          height: 2rem;
          margin-top: 0.8rem;
          line-height: 2rem;
          color: #7a7a7a;
          box-sizing: border-box;
          font-size: 1.2rem;
          width: 72%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      & > div:nth-child(2) {
        height: 5rem;
        line-height: 2.5rem;
        width: 90%;
        margin: 0.4rem 0 0 5%;
        & > span {
          width: 28%;
          display: inline-block;
          height: 2.5rem;
          box-sizing: border-box;
          line-height: 2.5rem;
          color: #7a7a7a;
          font-size: 1.2rem;
        }
        & > input {
          background-color: transparent;
          width: 72%;
          font-size: 1.2rem;
          border-bottom: 1px solid #ccc;
        }
      }
      & > div:last-child {
        height: 4rem;
        width: 82%;
        line-height: 2rem;
        margin-left: 13%;
        position: relative;
        font-size: 1.2rem;
        & > img:nth-child(1) {
          display: block;
          position: absolute;
          left: -11%;
          margin-top: 0.4rem;
        }
        & > div {
          float: left;
          width: 100%;
          margin-top: 0.4rem;
          color: #7a7a7a;
          & >span:last-child{
            font-size: 1rem;
          }
        }
        & > img {
          display: block;
          position: absolute;
          right: 2%;
          margin-top: 1.5rem;
        }
      }
    }
  }
</style>

<script>
import { Toast, Indicator, Navbar, TabItem } from "mint-ui";
import Bus from "../eventBus.js";
import { setTimeout } from 'timers';
export default {
  components: {
    Navbar,
    TabItem
  },
  data() {
    return {
      url_s: this.$store.state.skyUrl /* 四凯测试 */,
      lists: {
        user: {
          userName: ""
        }
      },
      underline: false,
      onlines: false,
      sub_text:"立即支付",
      info: {
        /* 选择收货地址获取的对象 */
        userName: "",
        id: "", //收货地址id
        address: "",
        phone: "",
        selfname: "",
        selephone: ""
      },
      choosepay: false,
      bg: false,
      selected: "1",
      choose: "", //配送自取选择
      hlwyyUrl: this.$store.state.hlwyyUrl,
      choice: "", //收货地址
      medicalAd: {
        name: "",
        pharmacyId: "",
        address: "",
        teltphone: "",
        nuaId: "",
        medicineName: "",
        pharmacyCode: "",
        method: ""
      },
      monStr: "" //价格
    };
  },
  created() {
    this.query();
    // this.getMedical();
  },
  mounted() {
    

  },
  methods: {
    //获取数据
    query() {
      if (this.$route.query.id != undefined) {
        //选择收货地址后从新赋值
        this.choice = true;
        this.info.userName = this.$route.query.userName;
        this.info.id = this.$route.query.id;
        this.info.address = this.$route.query.address;
        this.info.phone = this.$route.query.phone;
        this.selected = "2";
      } else {
        this.choice = false;
      }
      Indicator.open("加载中...");
      this.get(this.url_s + "/recipeController/getMedicine", {
            recipeId: this.$route.query.recipeId,
            openId:  localStorage.getItem('openId')
        })
        .then(res => {
          this.lists = res.data;
          this.monStr = res.data.realPrice;
          Indicator.close();
          this.paytext();
        })
        .catch(err => {
          Indicator.close();
        });
    },
    yyClick() {
      let _this = this;
      var _url = location.href;
      if (location.hash.length) {
        _url = _url.substr(0, _url.indexOf(location.hash));
      }
      //_this.info.url = _url;
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
    },
    //选择收货地址
    seleadress() {
      this.$router.push({
        name: "addressChoice",
        query: { perscript: true, recipeId: this.$route.query.recipeId }
      });
    },
    //返回上一页
    back_to() {
      this.$router.push({
        name: "PrescriptionNotes",
        query: { recipeId: this.$route.query.recipeId }
      });
    },
    //获取药店地址
    getMedical() {
      this        //正式环境接口this.$store.state.schlwyyUrl   //测试地址 this.hlwyyUrl
        .get( this.hlwyyUrl + "/recipe-management/api/institutions", {
            "page-index": "1",
            "page-size": "5",
            "hospital-id": localStorage.getItem("hospitalId"),
            "openId":  localStorage.getItem('openId')
        })
        .then(res => {
          if (res.data.content != "") {
            this.medicalAd = res.data.content[0];
            this.teltphone = res.data.content[0].teltphone;
            (this.id = res.data.content[0].id),
              (this.name = res.data.content[0].name);
          }
        });
    },
    //支付按钮显示的内容
    paytext(){
        if(this.lists.module != "353"&&this.lists.module!="354"&&this.lists.module!="355"){
          this.sub_text = "微信支付"
        }else if(this.lists.module == "354" || this.lists.module == "355"){
            this.get( this.url_s+"/hospitalPayType/findByHospitalId",{
              hospitalId: localStorage.getItem("hospitalId"), //localStorage.getItem("hospitalId")
              openId:  localStorage.getItem('openId')
            }).then(res=>{  
              //当type为no时，默认为线上支付
              if(res.data.type == "no"){
                //this.pay(orderNum, orderId, realPrice, addressid,"online")
              }else if(res.data.type == "yes"){
                let payType = ""
                 res.data.hospitalPayType.map(_=>{
                   payType += _.payType +","
                 })
                //通过hospitalPayType中的值来判断
                if( payType.indexOf("UNDER_LINE") != "-1" && payType.indexOf("TO_PLATFORM")!= "-1"){
                  this.sub_text = "立即支付"
                }else if(payType.indexOf("UNDER_LINE") != "-1" && payType.indexOf("TO_PLATFORM")== "-1"){   //线下支付
                  this.sub_text = "线下支付"
                }else if(payType.indexOf("TO_PLATFORM") != "-1" && payType.indexOf("UNDER_LINE") == "-1"){    //到快医平台支付
                  this.sub_text = "微信支付"
                }
              } 
            })
        }else{
          this.sub_text = "微信支付"
        }
    },
    payNow(orderNum, orderId, realPrice, addressid,paykinds,doctorId){
        if(this.lists.module != "353"&&this.lists.module!="354"&&this.lists.module!="355"){
          this.pay(orderNum, orderId, realPrice, addressid,paykinds,doctorId)
        }else if(this.lists.module == "354" || this.lists.module == "355"){
            this.get( this.url_s+"/hospitalPayType/findByHospitalId",{
              hospitalId: localStorage.getItem("hospitalId"), //localStorage.getItem("hospitalId")
              openId:  localStorage.getItem('openId')
            }).then(res=>{  
              //当type为no时，默认为线上支付
              if(res.data.type == "no"){
                //this.pay(orderNum, orderId, realPrice, addressid,"online")
              }else if(res.data.type == "yes"){
                let payType = ""
                 res.data.hospitalPayType.map(_=>{
                   payType += _.payType +","
                 })
                //通过hospitalPayType中的值来判断
                if( payType.indexOf("UNDER_LINE") != "-1" && payType.indexOf("TO_PLATFORM")!= "-1"){
                  this.bg = true;
                  this.choosepay = true;
                  this.underline = true;
                  this.onlines = true;
                }else if(payType.indexOf("UNDER_LINE") != "-1" && payType.indexOf("TO_PLATFORM")== "-1"){   //线下支付
                  this.pay(orderNum, orderId, realPrice, addressid,'offline',doctorId)
                }else if(payType.indexOf("TO_PLATFORM") != "-1" && payType.indexOf("UNDER_LINE") == "-1"){    //到快医平台支付
                  this.pay(orderNum, orderId, realPrice, addressid,'online',doctorId)
                }
              } 
            })
        }else{
          this.pay(orderNum, orderId, realPrice, addressid,paykinds,doctorId)
        }
       
    },
    //支付
    pay(orderNum, orderId, realPrice, addressid,paykinds,doctorId) {
      //Indicator.open("z...");
        var _this = this;
        if (addressid == undefined || addressid == "" || addressid =="暂无") {
          if (_this.info.id == "") {
            return Toast("请选择收获地址");
          } else {
            addressid = _this.info.id;
          }
        } else {
          if (_this.info.id != "" && _this.info.id != undefined) {
            addressid = _this.info.id;
          }
        }
        let type = "";
        if (_this.lists.module == "353") {
          type = "RECEIVER_SELF_HELP";
          if (_this.info.selfname == "") {
            return Toast("请填写取件人姓名");
          }
          if (_this.info.selephone == "") {
            return Toast("请填写取件人电话");
          }
        } else if (_this.lists.module == "355") {
          if (_this.selected == "1") {
            type = "RECEIVER_SELF_HELP";
            if (_this.info.selfname == "") {
              return Toast("请填写取件人姓名");
            }
            if (_this.info.selephone == "") {
              return Toast("请填写取件人电话");
            }
          } else {
            type = "SENT_BY_PHARMACY";
          }
        } else if (_this.lists.module == "354") {
          type = "RECEIVER_SELF_HELP";
          if (_this.info.selfname == "") {
            return Toast("请填写取件人姓名");
          }
          if (_this.info.selephone == "") {
            return Toast("请填写取件人电话");
          }
        } else {
          type = "SENT_BY_PHARMACY";
        }
        
        //        _this.$router.push('/inquiry');
        let config = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        };
        let medicineName = "";
        _this.lists.medicine.map(_ => {
          medicineName += _.medicine.medicinePublic.medicineName + ",";
        });
        //
        _this.get( _this.url_s + "/recipeController/saveRecipeOrder", {
              doctorId: doctorId,
              money: realPrice,
              orderId: orderId,
              pharmacyName: _this.medicalAd.name,
              pharmacyId: _this.medicalAd.id,
              pharmacyAddress: _this.medicalAd.address,
              pharmacyPhone: _this.medicalAd.telephone,
              nuaId: addressid,
              medicineName: medicineName,
              pharmacyCode: _this.medicalAd.code,
              method: type,
              selfname: _this.info.selfname,
              selfPhone: _this.info.selephone,
              openId:  localStorage.getItem('openId')
          }).then(res => {
            let Num="";
              Num = res.data.orderNum;
              //判断线下线上支付的
              if(paykinds == "online"){
                  //创建支付
                  _this.get(_this.$store.state.weChatUrl + "/weixinFHW/consultation/wxPay", {
                        orderNo: Num,
                        money: realPrice, //realPrice
                        recipeId: _this.$route.query.recipeId,
                        //        money: 0.01,
                        typeStr: 1,
                        openId: localStorage.getItem("openId")
                    }).then(function(response) {
                      wx.chooseWXPay({
                        timestamp: response.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: response.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: response.data.paySign, // 支付签名
                        success: function(res) {
                          //         if(res.err_msg == "get_brand_wcpay_request:ok"){
                          //支付成功后的回调函数
                          ////console.log(res.data);
                          _this.$router.push("./perscript/prescription");
                          localStorage.removeItem("hospitalId");
                          this.bg = false;
                          this.choosepay = false;
                          // })
                          // }
                          // else{
                          //   alert("支付失败");
                          // }
                          // else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                          //   alert("取消支付");
                          // }
                          // else if(res.err_msg == "get_brand_wcpay_request:fail"){
                          //   alert("支付失败");
                          // }
                        }
                      });
                    }).catch(function(err) {
                      MessageBox("提示", err);
                    });
              }else{
                  _this.get(_this.url_s + "/OrderController/updateOfflineOrder",{
                      orderId:orderId,
                      openId:  localStorage.getItem('openId')
                  }).then(res=>{
                      if(res.data == true){
                        let instance = Toast("操作成功，即将跳转到处方列表...")
                        setTimeout(()=>{
                          instance.close();
                          _this.$router.push("./perscript/prescription");
                          localStorage.removeItem("hospitalId");
                          this.bg = false;
                          this.choosepay = false;
                        },3000)
                      }else{
                        Toast(res.data)
                      }
                  })
              }
          });
        //调用支付        ///weixinFuWuHao-prod/weixinFHW/consultation/wxPay
        
      },
      closebg() {
        this.bg = false;
        this.choosepay = false;
      }
    }
};
</script>
