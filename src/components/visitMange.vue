<template>
  <div class="index">
      <div><i class="el-icon-arrow-left" @click="back_to"></i><span>就诊人</span></div>
      <div class="bg_div"></div>
      <div class="benren">
        <div class="inner_title">本人 <span @click="address">收货地址</span><img src="../assets/visitMange-adress.png"></div>
        <div>
            <div>
                <img  :src="manself.avatarUrl" alt="" v-if="manself.avatarUrl">
                <img  src="../assets/jz-Icon.png" alt="" v-else>
            </div>

            <div @click="fa_detail(manself.id)">
                <div>{{ manself.patientName == "" || manself.patientName == null ? "暂无": manself.patientName}}</div>
                <div>
                    <span>{{manself.patientGender == ""|| manself.patientGender== null ? "暂无": (manself.patientGender == 'male'?'男':'女')}}</span>
                    <span>{{manself.age}}岁</span><i class="el-icon-arrow-right"></i>
                </div>
                <div>手机号：{{manself.patientMobile== "" ? "暂无" : manself.patientMobile}}</div>
                <div>生日：{{manself.brithday == null ? "暂无" : manself.brithday}}</div>
            </div>
            <div></div>
        </div>
      </div>
      <div class="bg_div"></div>
      <div class="inner_title">其他就诊人<span @click="switchdel" :class="{blue :icondel}"><i class="el-icon-delete" ></i></span></div>
      <div class="other">
          <ul>
              <li v-for="info in lists" @click="personDetails(info.id)">
                  <span v-if="info.patientGender == 'male'"><img src="../assets/jz-male.png" alt=""></span>
                  <span v-else-if="info.patientGender == 'female'"><img src="../assets/jz-famale.png" alt=""></span>
                  <span v-else>暂无</span>
                  <span>{{info.patientName}}</span>
                  <span>{{info.age}}岁</span>
                  <span>{{info.relation}}<i class="el-icon-arrow-right" v-if="icondel"></i><i class="el-icon-circle-close" v-else @click="delOther(info.id)"></i></span>
              </li>
              <li class="nodata" v-if="nodata"><img src="../assets/noDate.png" alt=""></li>
          </ul>
      </div>
      <div class="add">
          <div @click="add_visit"><img src="../assets/jz-add.png" alt=""> 添加就诊人</div>
      </div>
  </div>
</template>
<style lang="less" scoped>

    @fontSize_14: 14px;
    @fontSize_12: 12px;
    .nodata{
        width:100%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        margin-top: 20% !important;
        border: 1px solid white !important;
        & > img{
            width: 12rem;
        }
    }
    .index {                /* 头部导航栏设置 */
       width: 100%;
       height: 100%;
       box-sizing: border-box;
       & >div:first-child{
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
    .blue{
       & > i{
        color: #3e8ce1 !important;
       }
    }
    .inner_title{
        width: 90%;
        height: 2.5rem !important;
        line-height: 2.5rem !important;
        margin: 1rem auto;
        font-size: 1.6rem;
        box-sizing: border-box;
        padding-left:1.6rem;
        letter-spacing: 0.1rem;
        border-left: 0.4rem solid rgb(62,140,225);
        color: #34353c;
        & > span{
            display: inline-block;
            float: right;
            color: #3e8ce1;
            font-size: 1.3rem;      
            & > i{
            font-size: 1.6rem;
            color: #34353c;
            } 
        }    
        & > img{
            width: 1.5rem;
            float: right;
            margin-right: 1%;
            margin-top: 1%;
        }    
    }
    .benren{
        width: 100%;
        height:19rem;
        font-size:0;
        box-sizing: border-box;
        & > div:nth-child(2){           /* 背景图片展示内容 */
            box-sizing: border-box;
            width: 90%;
            height: 13rem;
            margin: 1rem auto;
            background: url("../assets/JZ-Card.png") no-repeat;
            background-size: 100% 100%;
            & > div:first-child{        /* 左边图片 */
                width: 30%;
                height: 100%;
                vertical-align: top;
                display: inline-block;
                position: relative;
                & > img{
                    width: 5.5rem;
                    height: 5.5rem;
                    border-radius: 50%;
                    position: absolute;
                    left: calc(~"50% - 2rem");
                    top:2rem;
                }
            }
            & > div:nth-child(2){           /* 中间文字 */
                width: 70%;
                height: 100%;
                vertical-align: top;
                display: inline-block;
                font-size: @fontSize_14;
                box-sizing: border-box;
                padding: 2rem 0 0 2rem;
                & > div:first-child{
                    height: 2rem;
                    line-height: 2rem;
                    color: #4f4747;
                }
                & > div:nth-child(2){
                    height:2rem;
                    line-height: 2rem;
                    color: #4f4747;
                    & > span:nth-child(1){
                        display: inline-block;
                        width: 20%;
                    }
                    & > span:nth-child(2){
                        width: 30%;
                        display: inline-block;
                    }
                    & > i{
                        display: inline-block;
                        box-sizing: border-box;
                        width: 100%;;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: right;
                        padding-right: 1rem;
                        vertical-align: top;
                    }
                }
                & > div:nth-child(3){
                    height: 2rem;
                    line-height: 2rem;
                    color: #848180;
                }
                & > div:nth-child(4){
                    height: 2rem;
                    line-height: 2rem;
                    color: #848180;
                }
            }
        }
    }
    .other{
        width: 100%;
        height: calc(~"100% - 35rem");
        overflow-y: scroll;
        & > ul{
            font-size: 0;
            list-style-type: none;
          & > li{
            width: 90%;
            height: 4rem;
            line-height: 4rem;
            font-size: @fontSize_14;
            box-sizing: border-box;
            color: #a29c9c;
            margin: 0 auto;
            border-bottom: 0.1rem solid #e7e7e7;
            & > span:first-child{           /* 男女图片 */
                width: 15%;
                display: inline-block;
                vertical-align: top;
                position: relative; 
                & > img{
                    width: 2.5rem;
                    position: absolute;
                    left: 1rem;
                    top: 0.6rem;
                }
            }
            & > span:nth-child(2){
                width: 45%;
                display: inline-block;
            }
            & > span:nth-child(3){
                width: 17%;
                display: inline-block;
                text-align: center;
            }
            & > span:nth-child(4){
                width: 15%;
                display: inline-block;
                position: relative;
                vertical-align: top;
                float: right;
                & > i{
                    position: absolute;
                    right: 0;
                    top: 1.3rem;
                    font-size: 18px;
                    
                    
                }
            }
          }
        }
    }
    .add{
        width: 100%;
        height: 5rem;
        box-sizing: border-box;
        padding-top: 1.5rem;
        position: absolute;
        left:0;
        bottom:0;
        background-color: white;
        & > div{
            width: 70%;
            height: 3rem;
            line-height: 3rem;
            margin: 0 auto;
            background-color: #92b4d6;
            color: #3a3a3a;
            text-align: center;
            font-size: 1.3rem;
            border-radius: 6px;
            & > img{
                width: 2rem;
                vertical-align: middle;
            }
        }
    }
    .bg_div{
      width: 100%;
      height: 1rem;
      background-color: rgb(241,241,241);
    }
   
</style>
<script>
 import { Toast,Indicator,Spinner,MessageBox } from 'mint-ui';
    export default {
        component:{
            Spinner
        },
        data(){
            return{
                //info:[],
                lists:{},
                manself:{}, //就诊人本人
                urlimg: this.$store.state.schlwyyUrl+"/doctor",   /* 图片地址 */
                url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
                icondel: true,
                nodata: false
            }
        },
        created(){
            this.querylist()
        },
        methods:{
            back_to(){          /* 返回首页 */
                let _this = this;
                _this.$router.push("/net_index")
            },
            querylist(){                /* 其他就诊人信息 */
                let userid = localStorage.getItem("userid");
                this.lists ={};
                var instance = Toast('加载中...');
                this.get( this.url_s+"/Patients/findPatients",{
                        userid: userid,
                        openId:  localStorage.getItem('openId')
                    })
                .then(res =>{
                    this.manself = res.data[0];
                    if(res.data[1] == 'no'){
                        this.nodata = true
                    }else{
                        this.lists = res.data[1];
                    }
                    instance.close();
                }).catch(err=>{
                    instance.close();
                }) 
            },
            fa_detail(id){
                localStorage.setItem("visitfid",id);
                localStorage.setItem("Isself",true);        //是否是本人
                this.$router.push("/add_visit")
            },
            personDetails(id){
                if(this.icondel == true){
                    localStorage.setItem("visitfid",id)
                    localStorage.setItem("Isself",false);        //是否是本人
                    let _this = this;
                    _this.$router.push("/add_visit")
                }
            },
            //收货人地址
            address(){
                this.$router.push("./address/addressManagement")
            },
            //控制是否显示删除按钮
            switchdel(){
                if(this.icondel == true){
                    this.icondel = false
                }else{
                    this.icondel = true
                }
            },
            //点击删除其他就诊人
            delOther(patientId){
                MessageBox.confirm("确定删除?").then(action => {
                this.get(this.url_s+"/Patients/deletePatients", {
                        patientId:patientId,
                        openId:  localStorage.getItem('openId')
                    })
                    .then(res => {
                        if (res.data == true) {
                            Toast("删除成功.");
                            this.querylist();
                        } else {
                            Toast("删除失败");
                        }
                    }).catch(err => {
                        Toast("删除失败");
                    });
                });
            },
            add_visit(){
                if(this.lists.length >= 10){
                    Toast("就诊人绑定最多10个")
                }else{
                    this.$router.push("/addpeople")
                }
            }
        }
    }
</script>
