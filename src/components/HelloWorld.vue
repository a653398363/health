<template>
  <div class="hello">
    <div class="body">
      <div id="log">
        <div>
          <img src="../assets/logo2.png" style="margin-left: 1rem;" >
        </div>
      </div>
      <div class="tishi">
        <p>亲爱的互联网医院用户</p>
        <p>为了给您更好的服务，请输入您的手机号</p>
      </div>
      <div>

      </div>
      <div id="phone" class="form-inputs">
        <div>
          <img src="../assets/mobile.png">
          <input  type="text" name="userName" id="userName" v-model="phone" placeholder="请输入您的手机号码">
        </div>

      </div>
      <div id="checkcode" >
        <div>
          <input type="text"  name="inputCode" v-model="inputNum" placeholder="请输入验证码">
					<div class="code" id="showcode" @click="createCode()" >{{codeNum}}</div>
        </div>
      </div>
      <div id="verification">
        <div>
          <img src="../assets/password.png" alt="">
          <input  type="text" name="code" id="code" v-model="phonecode" placeholder="请输入您验证码">
        </div>
        <div @click="verification" :class="{subColor :inputNum ==''}">{{content}}</div>
      </div>

      <div class="register" :class="{subColor :phonecode ==''}" @click="router_push">
        下一步
      </div>
    </div>

    <!--<div id="tan">-->

    <!--</div>-->
  </div>
</template>
<script>
import { Toast, Indicator, Field, MessageBox} from "mint-ui";
import $ from 'jquery'
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: 1,
      url: this.$store.state.skyUrl,
      phone:"",
      phonecode:"",
      inputNum:"",
      codeNum:"",
      wait:"60",
      content:"验证码",
      canClick: true,
      cansub:true,
    }
  },
  created(){
    this.createCode();
    //this.daojishi()
  },
  methods: {
    //下一步
    router_push() {
      let canSubmit = this.canClick;
      if(this.phonecode != ''){
        canSubmit = true
      }else{
        canSubmit = false
      }
      if(canSubmit == true){
        //验证验证码================
        this.axios.get(this.url+'/messageService/verificationCode',{
            params:{
              phone:this.phone,
              code:this.phonecode,
              openId:localStorage.getItem("openId")
            }
        }).then(res=>{
          if (res.data.status === '1') {
            this.axios.get(this.url+'/messageService/havePhone',{
              params:{
                phone:this.phone,
                openId:localStorage.getItem("openId")
              }
            }).then(res=>{
              if(res.data.status == "true") {
                localStorage.setItem("userid",res.data.id);
                localStorage.setItem("AccessToken",res.data.token)
                this.$router.push({name:'net_index',query:{"openId":localStorage.getItem("openId")}});
              }else{
                  return Toast(res.data);
              }
            })
          }else{
            Toast(res.data.msg);
          }
        })
      }
    },
    //验证码
    verification(){
      let num = ""
      if(this.inputNum !=""){
        if (this.inputNum.length <= 0) {
          Toast("请输入验证码！");
       }else {
          if(!this.cansub){return}
          let reg =/[a-z]/i;      //判断是否包含有字母
          if( !reg.test(this.inputNum) ){
            if(this.inputNum != this.codeNum){
              Toast("验证码输入有误！");
              this.createCode();
              return
            }else{
              num = this.inputNum;
            }
          }else{
            if (this.inputNum.toUpperCase() != this.codeNum.toUpperCase()) {
                Toast("验证码输入有误！");
                this.createCode();
                return
            }else{
              num = this.inputNum.toUpperCase()
            } 
          }
          this.axios.get(this.url+'/messageService/verify',{
            params:{
                phone:this.phone,
                openId:localStorage.getItem("openId"),
                code:num
            }
          }).then(res=> {
            if(res.data.msg == 'OK'){
              this.daojishi()
              this.cansub = false
            }else{
              Toast(res.data)
            }
          })
        }
      }else{
        Toast("请检查手机号或验证码是否正确")
      }
    },
    daojishi(){ 
      if(!this.canClick) return
      this.canClick = false
      this.content = this.wait + '秒' //这里解决60秒不见了的问题
      let clock = window.setInterval(() => {
        this.wait--
        this.content = this.wait + '秒'
        if (this.wait < 0) {     //当倒计时小于0时清除定时器
            window.clearInterval(clock)
            this.content = '验证码'
            this.wait = 60
            this.canClick = true;
            this.cansub = true
          }
      },1000)
    },
    createCode() {
      this.axios.get(this.url+"/messageService/randomCode",{
        params:{
          openId:localStorage.getItem("openId")
        }
      }).then(res=>{
        this.codeNum = res.data
      })
     /*  let code = '';
      var codeLength = 4; //验证码的长度
      var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c',
          'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
          'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
          'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
      for ( var i = 0; i < codeLength; i++) {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
      } */
        //this.codeNum = code
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>
@import "./../css/a.less";
#checkcode{
  border-bottom: 1px solid #C4C4BC;
  margin-bottom: 1rem;
  margin-top: 3rem;
  box-sizing: border-box;
  font-size: 0;
  div{
    width: 100%;
    & > input{
        width: 60%;
        height: 4rem;
        display: inline-block;
        line-height: 4rem;
        vertical-align: top;
        padding-left: 3.5rem;
      }
  }
  .code {
    width: 40%;
    height: 100%;
    display: inline-block;
    font-family: Arial;
    font-style: italic;
    color: rgb(241,140,0);
    font-size: 26px;
    letter-spacing: 0.4rem;
    font-weight: bolder;
    text-align: right;
    padding-right: 1%;
    letter-spacing: 0.4rem;
    line-height: 4rem;
  }
}
.subColor{
  background-color:#41a2f3c2;
}
</style>

