<template>
   <div class="PrescriptionNotes">
    <div class="top"><i class="el-icon-arrow-left" @click="back_to"></i><span>电子处方笺</span></div>
    <div class="perscript_one">
        <!-- 头部背景 -->
        <div>
            <div>
                <span>本次处方笺有效期</span>
                <p>起：{{lists.recipe.createDate == null ? "暂无":lists.recipe.createDate}}</p>
                <p>止：{{lists.endDate}}</p>
            </div>
        </div>
        <!-- 处方笺详情 -->
        <div>
            <div>
                <div>
                    <div>
                        <img src="../assets/perscript/PrescriptionNotes-code.png">
                        <span>{{lists.recipe.doctor.hospitalName}}处方笺</span>
                    </div>
                    <div>
                        <span>姓名：{{lists.yuyue.userName}}</span>
                        <span>性别：{{lists.yuyue.gender == 1?"男":"女"}}</span>
                        <span>年龄：{{lists.yuyue.age}}</span>
                    </div>
                    <div>
                        <span>就诊科室：</span>
                        <span>{{lists.recipe.doctor.unitsName}}</span>
                    </div>
                    <div>
                        <span>就诊日期：</span>
                        <span>{{lists.order.createDate}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <!-- 诊断 -->
                <div>
                    <div>
                        <div class="inner_title">
                        <span>诊断</span>
                        </div>
                        <div>
                            <p>{{lists.yuyue.cld}}</p>
                        </div>
                    </div>
                    
                </div>
                <!-- Rp -->
                <div>
                    <div>
                        <div class="inner_title">
                            <span>Rp</span>
                        </div>
                        <div >
                        <ul>
                            <li v-for="list in lists.medicines">
                            <span>
                                <span>{{list.medicine.medicinePublic.medicineName}}</span>
                                <span>&nbsp;{{list.medicine.medicinePublic.specification}}</span>
                                <span>&nbsp;*{{list.quantity}}</span>
                            </span >
                            <span>用法用量：</span>
                            <span>
                                <span v-if="list.docdefined == ''">{{list.usage}}/</span>
                                <span>
                                    <span v-if="list.docdefined == ''">一次
                                    <span>{{list.dosage}}</span>
                                    <span>{{list.unitDose}}/</span>
                                    </span>
                                    <span>{{list.docdefined != ''? list.docdefined :list.frequency}}</span>
                                    <span v-if="list.docdefined == ''">/服用{{list.days}}天</span>
                                </span>
                            </span>
                            </li>
                        </ul>
                        <div>合计：￥ {{lists.price}}</div>
                    </div>
                    </div>
                </div>
                <!-- 备注 -->
                <div>
                    <div>
                        <div class="inner_title">
                            <span>备注</span>
                        </div>
                        <div class="inner_content">
                            <p>{{lists.yuyue.pmr}}</p>
                        </div>
                    </div>
                </div>
                <!-- 图片 -->
                <div>
                    <div>
                        <div>
                            <div>医生：</div>
                            <div><img :src="dase + lists.recipe.imgData" alt="" v-if="lists.recipe.imgData !='' && lists.recipe.imgData !=undefined"></div>
                        </div>
                        <div>
                            <div>药师：</div> <!-- auditUserSignImage -->
                            <div><img :src="dase + lists.recipe.auditUserSignImage" alt="" v-if="lists.recipe.auditUserSignImage !='' && lists.recipe.auditUserSignImage !=undefined"> </div>
                        </div>
                    </div>
                </div>
                <!-- 医生签名 -->
                <div><div></div></div> 
                <!-- 支付 -->
                <div>
                    <div><span>微信支付</span></div>
                    <div>
                        <span @click="submit(lists.order.orderId,lists.endDate)" v-if="lists.pay === 'nopay' ">{{lists.pay == 'nopay' ?buttxt="到店支付":"药店详情"}}</span>
                        <span v-else-if=" lists.pay === 'outtime' ">该订单已过期</span>
                        <span @click="submit(lists.order.orderId,lists.endDate)" v-else>药店详情</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg" v-if="bg">
            <div :class="{marg :check==false}">
                <div>
                    <div class="success" v-if="success"><img src="../assets/perscript/success.png" alt=""></div>
                    <div class="tishi" v-else>提示</div>

                    <img src="../assets/perscript/close-icon.png" alt="" @click="close">
                </div>
                <div v-if="lists.pay === 'nopay' ">您的药品订单将推送到药房，请点击确认按钮后尽快到药房付款取药！</div>
                <div v-else>您的药品订单已推送到药房，请在尽快到药房付款取药！</div>
                <div>
                    <div class="content">
                        <img src="../assets/perscript/icon-1.png" alt="">
                        <span>
                            药店名称：{{medicalAd.name==''?'暂无':medicalAd.name}}
                        </span>
                    </div>
                     <div class="content">
                        <img src="../assets/perscript/icon-2.png" alt="">
                        <span>
                            药店电话：{{medicalAd.telephone==''?'暂无':medicalAd.telephone}}
                        </span>
                    </div>
                    <div class="content">
                        <img src="../assets/perscript/icon-03.png" alt="">
                        <span>
                           药店地址：{{medicalAd.address==''?"暂无":medicalAd.address}}
                        </span>
                    </div>
                </div>
                <div >
                    <div @click="Isclick" v-if="lists.pay ==='nopay'">如果您是住院病人请填写以下内容 ∨</div>
                    <div v-if="check">
                        <div class="inputcontent">
                            <span>收货姓名：</span>
                            <span>
                                <input type="text" v-model="userName">
                            </span>
                        </div>
                        <div class="inputcontent">
                            <span>配送电话：</span>
                            <span>
                                <input type="number" v-model="userPhone">
                            </span>
                        </div> 
                        <div class="inputcontent">
                            <span>配送地址：</span>
                            <span>
                                <input type="text" v-model="address1">
                            </span>
                        </div>
                    </div>
                </div>
                <div @click="getpay(lists.order.orderId,lists.yuyue.hospitalId,lists.endDate)" v-if="lists.pay === 'nopay'">确认</div>
            </div>
        </div>
    </div>
   </div>
</template>

<style scoped lang="less" scoped>
    .PrescriptionNotes{
        width: 100%;
        height: 100%;
    }
    .marg{
        margin-top: 20%!important;
    }
    .perscript_one{
        width: 100%;
        height: calc(~"100% - 4rem") ;
        box-sizing: border-box;
        font-size: 0;
        overflow-y: scroll;
        & >div:first-child{ //头部的医院背景图片
            width: 100%;
            height: 14rem;
            background: url("../assets/perscript/top-background.png") no-repeat;
            -webkit-background-size:  cover;
            box-sizing: border-box;
            & > div{
                width:50%;
                height: 11rem;
                box-sizing: border-box;
                margin-left: 18%;
                padding-top: 2.5rem;
                color: #ccc;
                overflow: hidden;
                span{
                    display: inline-block;
                    width: 100%;
                    height: 2rem;
                    font-size: 1.2rem;
                    line-height: 2rem;
                    padding-left: 1rem;
                }
                p{
                    font-size: 1.2rem;
                    line-height: 2rem;
                }
            }
        }
        /* 处方笺信息详情 */
        & > div:nth-child(2){
            width: 100%;
            height: 12rem;
            background-color: #446aaf;
            box-sizing: border-box;
            & > div{
                width: 90%;
                height: 10rem;
                margin: 0 auto;
                position: relative;
                & >div{
                    width: 100%;
                    height: 14rem;
                    position: absolute;
                    left: 0;
                    top: -2rem;
                    font-size: 1.2rem;
                    background-color: white;
                    border-top-left-radius: 1rem;
                    border-top-right-radius: 1rem;
                    color: #3a3a3a;
                    box-shadow: 0 8px 16px 0px #a8a8a8;
                    & > div:first-child{
                        width: 100%;
                        height: 3rem;
                        line-height: 3rem;
                        padding-left: 1rem;
                        margin-top: 0.4rem;
                        color: #3a3a3a;
                        font-size: 1.4rem;
                        & > img{
                            width: 2.5rem;
                            vertical-align: text-top;
                            margin-right: 1rem;
                        }
                    }
                    & > div:nth-child(2){
                        width: 75%;
                        height: 3rem;
                        line-height: 3rem;
                        margin-left: 5rem;
                        font-size: 1.2rem;
                        border-bottom: 1px solid #c9c9c9;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden; 
                        & > span:first-child{
                            display: inline-block;
                            width:35%;
                            height: 3rem;

                        }
                        & > span:nth-child(2){
                            display: inline-block;
                            width:30%;
                            height: 3rem;
                            
                        }
                        & > span:last-child{
                            display: inline-block;
                            width:35%;
                            height: 3rem;
                            
                        }
                    }
                    & > div:nth-child(3){
                        width: 75%;
                        height: 3rem;
                        line-height: 3rem;
                        margin-left: 5rem;
                        font-size: 1.2rem;
                        border-bottom: 1px solid #c9c9c9;
                    }
                    & > div:nth-child(4){
                        width: 75%;
                        height: 3rem;
                        line-height: 3rem;
                        margin-left: 5rem;
                        font-size: 1.2rem;
                        border-bottom: 1px solid #c9c9c9;
                    }
                }
            }
        }
        & > div:nth-child(3){
            width: 100%;
            background-color: #446aaf;
            padding-bottom: 2rem;
            & > div:nth-child(1){
                width: 90%;
                margin: 0 auto;
                background-color: white;
                /* 诊断 */
                & > div:nth-child(1){
                    width:100%;
                    min-height: 5rem;
                    padding-top: 2rem;
                    margin-bottom: 1rem;
                    border-bottom: 0.5rem solid #f7f7f8;
                    & > div{
                        width: 90%;
                        margin: 0 auto;
                        & > div:nth-child(2){
                            margin: 1rem 0;
                            overflow-wrap: break-word;
                            & >p{
                            min-height: 3rem;
                            width: 100%;
                            font-size: 1.2rem;
                            line-height: 2rem;
                            text-overflow: wrap;
                            }
                        }
                    }
                }
                /* Rp */
                & > div:nth-child(2){
                    width:100%;
                    border-bottom: 0.5rem solid #f7f7f8;
                    & > div{
                        width: 90%;
                        margin: 0 auto;
                        & >div:nth-child(2){
                            font-size: 1.2rem;
                            margin-top: 1rem;
                            ul{
                                list-style-type: none;
                                & > li{
                                    padding-bottom: 0.4rem;
                                    & > span:nth-child(1){
                                        display: inline-block;
                                        width: 100%;
                                        line-height: 2rem;
                                        border-bottom: 1px solid #ccc;
                                    }
                                    & > span:nth-child(2){
                                        display: inline-block;
                                        width: 100%;
                                        line-height: 2rem;
                                        color: #538dd3;
                                    }
                                    & > span:nth-child(3){
                                        display: inline-block;
                                        width: 100%;
                                        line-height: 2rem;
                                        border-bottom: 1px solid #ccc;
                                    }
                                }
                            }
                            & > div{
                                width: 100%;
                                height: 4rem;
                                line-height: 4rem;
                                text-align: right;
                            }
                        }
                    }
                }
                /* 备注 */
                & > div:nth-child(3){
                    width: 100%;
                    min-height: 4rem;
                    border-bottom: 0.5rem solid #f7f7f8;
                    margin-bottom: 1rem;
                    & > div{
                        width: 90%;
                        margin: 0 auto;
                        margin-top: 1rem;
                        font-size: 1.2rem;
                        .inner_content{
                            width: 100%;
                            min-height: 2rem!important;
                            padding: 1rem 0;
                            & > span{
                                padding-left: 4%;
                                color: #538dd3;
                            }
                            & > p{
                                min-height: 2rem;
                                line-height: 2rem;
                            }
                        }

                    }
                }
                & > div:nth-child(4){
                    width: 100%;
                    box-sizing: border-box;
                    margin-bottom: 2rem;
                    & > div{
                        box-sizing: border-box;
                        width: 90%;
                        margin: 0 auto;
                        & > div:nth-child(1){
                            font-size: 1.2rem;
                            display: inline-block;
                            width:50%;
                            & > div:nth-child(1){
                                width:30%;
                                float:left;
                                color:#444444;
                                height: 4rem;
                                line-height: 4rem;
                            }
                            & > div:nth-child(2){
                                width:70%;
                                height:4rem;
                                float:left;
                                & > img{
                                    width: 4rem;
                                    height: 4rem;
                                } 
                            }
                        }
                    & > div:nth-child(2){
                        display: inline-block;
                        width:50%;
                        font-size: 1.2rem;
                        & > div:nth-child(1){
                            width:30%;
                            float:left;
                            color:#444444;
                            height: 4rem;
                            line-height: 4rem;
                        }
                        & > div:nth-child(2){
                            width:70%;
                            height:4rem;
                            float:left;
                            & > img{
                                width: 4rem;
                                height: 4rem;
                            } 
                        }
                    }
                    }
                }
                & > div:nth-child(5){
                    width: 100%;
                    height: 2rem;
                    background-color: #446aaf;
                    box-sizing: border-box;
                    padding: 0 ;
                    margin: 0;
                    & > div{
                        width: 100%;
                        height: 2rem;
                        background: url("../assets/perscript/bottom-BGstyle.png") no-repeat;
                        background-size: cover;
                    }
                }
                & > div:nth-child(6){
                    width: 100%;
                    height: 5rem;
                    box-sizing: border-box;
                    margin-bottom: 2rem;
                    & > div:first-child{
                        display: inline-block;
                        width: 50%;
                        height: 4rem;
                        font-size: 1.4rem;
                        line-height: 4rem;
                        text-align: center;
                        & > span{
                            padding: 1rem 2rem;
                            background-color: #f1f1f4;
                            border-radius: 0.4rem;
                        }
                    }
                    & > div:nth-child(2){
                        display: inline-block;
                        width: 50%;
                        height: 4rem;
                        font-size: 1.4rem;
                        line-height: 4rem;
                        text-align: center;
                        & > span{
                            padding: 1rem 2rem;
                            background-color: #ffa94d;
                            border-radius: 0.4rem;
                            color: white;
                        }
                    }
                }
            }
        }
    }
    .inner_title{
        width:100%;
        height: 2rem;
        border-left: 1rem solid rgb(101, 149, 213);
        font-size: 1.2rem;
        line-height: 2rem;
        padding-left: 1rem;
        color: #3a3a3a;
        & >span{
            display: inline-block;
            padding: 0 0.8rem;
            background-color: rgb(101, 149, 213);
            color: white;
        }
    }
    .bg{
        width:100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        & > div{
            width: 90%;
            max-height: 80%;
            background-color: white;
            margin:  calc(~"(100% - 80%)/2") auto 0;
            border-radius: 1rem;
            padding-top: 1rem;
            overflow-y: scroll;
            font-size: 1.2rem;
            padding-bottom: 2rem;
            & > div:first-child{
                width: 90%;
                margin: 0 auto;
                font-size: 1.2rem;
                position: relative;
                .success{
                    text-align: center;
                    img{
                        width: 6rem;
                    }
                }
                .tishi{
                    text-align: right;
                    line-height: 3rem;
                    letter-spacing: 0.2rem;
                    width: 7rem;
                    height: 3rem;
                    display: inline-block;
                    background: url("../assets/perscript/tip-icon.png") no-repeat;
                    background-size: cover;
                }
                & > img{
                    width: 2rem;
                    position: absolute;
                    right: 0 ;
                    top: 0;
                }
            }
            & > div:nth-child(2){
                width: 90%;
                line-height: 1.5rem;
                margin: 2rem auto 0;
                font-size: 1.2rem;
                color: #9e9e9e;
            }
            & > div:nth-child(3){
                width: 90%;
                min-height: 8rem;
                margin: 2rem auto 1rem;
                background-color: #8baad9;
                color: white;
                font-size: 1.4rem;
                border-radius: 0.4rem;
                padding: 2rem 0 1rem 0;
                .content{
                    width: 90%;
                    line-height: 2rem;
                    margin: 0 auto 1rem;
                    img{
                        width: 1.5rem;
                        vertical-align: top;
                    }
                    & > span{
                        width: 80%;
                        display: inline-block;
                        border-bottom: 1px solid white;
                        margin-left: 1rem;
                    }
                }
            } 
            & > div:nth-child(4){
                width: 90%;
                height: 20%;
                font-size: 1.2rem;
                margin: 0 auto;
                & > div:first-child{
                    line-height: 2rem;
                    color: #8baad9;
                    text-align: center;
                    padding-bottom: 0.6rem;
                }
                & > div:nth-child(2){
                    font-size: 0;
                    box-sizing: border-box;
                    padding-top:1rem;
                    border-top: 1px dashed #ccc;
                    .inputcontent{
                            width: 100%;
                            line-height: 2rem;
                            margin: 0 auto 1rem;
                            
                        /* img{
                            width: 1.5rem;
                            vertical-align: top;
                        } */
                        & > span:first-child{
                            width: 25%;
                            display: inline-block;
                            box-sizing: border-box;
                            font-size: 1.2rem;
                        }
                        & > span:nth-child(2){
                            width: 75%;
                            display: inline-block;
                            box-sizing: border-box;
                            border-bottom: 1px solid #ccc;
                            font-size: 1.2rem;
                            & > input{
                                width: 100%;
                                color:#606266;
                                font-size: 1.2rem;
                            }
                        }
                    }
                }
            }
            & > div:nth-child(5){
                width:4rem;
                margin: 0 auto;
                font-size: 1.2rem;
                background-color: #3472d2;
                color: white;
                text-align: center;
                padding: 0.4rem 1rem 0.4rem;
                border-radius: 0.4rem;
                letter-spacing: 0.4rem;
            }
        }
    }

    .top{
            width: 100%;
            height: 4rem;
            line-height: 4rem;
            font-size: 17px;
            text-align: center;
            border-bottom: 0.1rem solid #e7e7e7;
            color: #444444;
            & > i{
                position: absolute;
                left: 1.2rem;
                top: 1.0rem;
                font-size: 24px;
            }
            & >img{
                position: absolute;
                right: 1.5rem;
                top: 1.4rem;
            }
    }

</style>
 <script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      dase:"data:image/png;base64,",
      url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
      hlwyyUrl: this.$store.state.hlwyyUrl,
      success: false,
      notice:"",
      bg: false,
      buttxt:"到店支付",
      userName:"",
      userPhone:"",
      address1:"",
      Ispay: true,
      check: false,
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
      lists: {
        yuyue: {
          createDate: ""
        },
        medicines: {},
        recipe: {
          doctor: {}
        },
        order:{
          status:"",
        }
      }
    };
  },
  created() {
    this.getToken();
    this.yyClick();
  },
  methods: {
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
    query() {
      let recipeId = ""
      // 在notice页面过来加 个参数，来判断是从哪个页面过来的
      if(this.$route.query.notice == undefined||this.$route.query.notice == null){
          this.notice = false
      }else{
          this.notice = true
      }
      //从消息界面过来，参数取值为relatedId, 从其他界面过来，参数取值为recipeId

      Indicator.open("加载中...");
        this.get( this.url_s+"/recipeController/findOneRecipe", {
                recipeId: this.$route.query.recipeId,
                openId:  localStorage.getItem('openId')
            })
            .then(res => {
                Indicator.close();
                this.lists = res.data;
                this.userName = res.data.yuyue.userName;
                this.userPhone = res.data.yuyue.userPhone;
                this.getMedical(res.data.recipe.hospitalId);
            })
            .catch(err => {
                Indicator.close();
            });
    },
    back_to() {
        this.$router.push("./perscript/prescription");
    },
    //获取药店地址
    getMedical(hospitalId) {
      this        //正式环境接口this.$store.state.schlwyyUrl   //测试地址 this.hlwyyUrl
        .get( this.hlwyyUrl + "/recipe-management/api/institutions", {
            "page-index": "1",
            "page-size": "5",
            "hospital-id": hospitalId,
            "openId":  localStorage.getItem('openId')
        })
        .then(res => {
          if (res.data.content != "") {
            this.medicalAd = res.data.content[0];
            (this.id = res.data.content[0].id),
              (this.name = res.data.content[0].name);
          }
        });
    },
    close(){
        this.bg = false;
        this.success = false;
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
    getpay(orderId,hospitalId,endDate){
        let _this = this;
        let today = _this.getNowFormatDate()
        if(today > endDate){
            return Toast("处方已过期...")
        }
        let medicineName = "";
        for(var key in _this.lists.medicines){
            medicineName +=_this.lists.medicines[key].medicine.medicinePublic.medicineName + ",";
        }
        /* _this.lists.medicines.map(_ => {
          medicineName += _.medicine.medicinePublic.medicineName + ",";
        }); */
        _this.get( _this.url_s + "/recipeController/saveAdd", {
              orderId: orderId,
              medicineName: medicineName,
              hospitalId:hospitalId,
              method: "RECEIVER_SELF_HELP",
              selfname: _this.userName,
              selfPhone: _this.userPhone,
              address: _this.address1,
              openId:  localStorage.getItem('openId')
          }).then(res => {
              //判断线下线上支付的
                  _this.get(_this.url_s + "/OrderController/updateOfflineOrder",{
                    orderId:orderId,
                    openId:  localStorage.getItem('openId')
                  }).then(res=>{
                      if(res.data == true){
                          _this.buttxt = "药店详情";
                          _this.bg = false;
                          _this.check = false;
                          _this.query()
                      }else{
                        Toast(res.data)
                      }
                  })

          });
    },
    getNowFormatDate() {
        var date = new Date();
        var sign1 = "-";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        // 给一位数数据前面加 “0”
        if (month >= 1 && month <= 9) {
        month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
        day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds 
        return currentdate;
    },
    submit(orderId){
        this.bg = true
    },
    Isclick(){
        if(this.check ==  true){
            this.check = false;
        }else{
            this.check = true
        }
    },
    pay(module,orderId,hospitalId,imgData) {
        if(imgData == '' || imgData == undefined || imgData == null){
            Toast("医生还没签章，不能支付")
        }else{
            localStorage.setItem("hospitalId",hospitalId)
            this.$router.push({name:"PrescriptionPay",query:{"recipeId":this.$route.query.recipeId}});
        }
    }
  }
};
</script>
