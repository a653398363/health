<template>
  <div v-if="dialogOnedetail" class="content">
    <div>
      <i class="el-icon-arrow-left" @click="back_toIndex"></i><span>{{mititle}}</span>
      <span class="inner_right"><img src="../../assets/add-save.png" alt="" @click="savethis"></span>
    </div>  
    <div  class="bg_div" ></div>
    <div class="history">
      <div v-for="innertitle in infolevelTwo">
        <span>{{innertitle.data1.name}}</span>
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button v-for="city in innertitle.data2" :label="city.id" :key="city.id" :value="city.name" fill="red">{{city.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div >
        <span>补充说明</span>
        <textarea  v-model="textarea" placeholder="请输入补充内容"></textarea>
      </div>
    </div> 
    <div  class="bg_div" ></div>
    <div  class="submit" >
        <button @click="submit">{{submit_text}}</button>
    </div>
  </div>
</template>
<style lang="less" scoped>
    @fontSize_14: 14px;
    @fontSize_12: 12px;
    .content{
      width:100%;
      height: 100% !important;
      position: relative;
      font-size: 0;
      & > div:first-child{      /* 个人资料title */
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
    .history {
      width: 100%;
      height: calc(~"100% - 12rem");
      overflow-y: scroll;
      font-size: 0;
      & > div {
        margin-bottom: 2rem;
      }
      div span{
        height: 4rem;
        line-height: 4rem;
        width: 100%;
        border-left: 0.4rem solid rgb(62,140,225);
        margin-left: 1.5rem;
        padding-left: 1rem;
        font-size: @fontSize_14;
      }
      .el-checkbox-button{
        border: 1px solid #dcdfe6;
        margin: 1rem 0 0 2rem;
      }
    }
    .submit{
      //padding-left: -1.5rem !important;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 1rem 0;
      width: 100%;
      height: 6rem;
      box-sizing: border-box !important;
      & > button{
        width: 90%;
        margin: 0 auto;
        padding: 0.8rem 0;
        border: none;
        display: block;
        background-color: rgb(78,118,179);
        color: white;
        letter-spacing: 0.1rem;
        border-radius: 1rem;
      }
    }
    .inner_right{             /* 每行向右浮动 */
      float: right;
      padding-right: 2.4rem;
      position: relative;
      max-width:65%;
      color: rgb(162, 156, 156);
      & > img{
        width: 2rem;
        position: absolute;
        right: 2.6rem;
        top:1rem;
      }
      & > i{
        position: absolute;
        right: 0.4rem;
        top: 1.2rem;
        font-size: 22px;
        color: rgb(162, 156, 156);
      }
    }
    textarea{
      width: 85%;
      height: 8rem;
      border: 1px dashed #dcdfe6;
      margin-left: 1.5rem;
      padding: 0.4rem;
      border-radius: 0.6rem;
    }
    
    .bg_div{
      width: 100%;
      height: 1rem;
      background-color: rgb(241,241,241);
    }
</style>

<script>
import { Toast, Indicator, Swipe , SwipeItem} from "mint-ui";
import { setTimeout } from 'timers';
export default {
  props:{
    backdata: Array,          //返回下一页
    patientsInfo: Object      //选中默认值
  },
  data(){
    return{
      dialogOnedetail: false,       /* 初始时，这个页面不显示 */
      checkboxGroup1: [],       //已经选择的值
      cities: [],
      mititle:"",
      infolevelTwo:[], 
      userid : "",
      textarea:"",
      submit_text:"",       //提交按钮显示的值
      personalId:"",
      url_s:  this.$store.state.skyUrl,     /* 四凯测试 */
    }
  },
  created(){
    //this.defaultvalue();
  },
  methods:{
    DetailOne(id,name){       //获取上组件
      this.userid = id;                       /* this.userid 是这五个种类 */
      this.submit_text = "下一步("+this.userid+"/5)";
      if(this.userid == 5){
        this.submit_text ='保 存'
      }
      this.mititle = name;    //
      this.querylist(id);
      this.dialogOnedetail = true;
    },
    defaultvalue(){             //加载默认值
      if(this.userid == 1){     //既往史
        this.checkboxGroup1 = this.patientsInfo.pmhId.split(",");
        this.textarea = this.patientsInfo.pmhValue
      }else if(this.userid == 2){   //婚育史
        this.checkboxGroup1 = this.patientsInfo.phId.split(",");
        this.textarea = this.patientsInfo.phValue;
      }else if(this.userid == 3){     //过敏史
        this.checkboxGroup1 = this.patientsInfo.ahId.split(",");
        this.textarea = this.patientsInfo.ahValue;
      }else if(this.userid == 4){     //家族史
        this.checkboxGroup1 = this.patientsInfo.fhId.split(",");
        this.textarea = this.patientsInfo.fhValue;
      }else if(this.userid == 5){     //个人习惯
        this.checkboxGroup1 = this.patientsInfo.habitId.split(",");
        this.textarea = this.patientsInfo.habitValue;
      }
    },
    save(){           //保存=====
      let value="";
      Indicator.open('保存中...')
      this.checkboxGroup1.map(_=>{
        if(_!=""){
          value += _ +",";
        }
      })
      this.get( this.url_s+"/PersonalInfo/SavePersonal",{
          value: value,
          remark:this.textarea,
          userid:localStorage.getItem("userid"),
          patientId: this.patientsInfo.patientId,
          openId:  localStorage.getItem('openId'),
          menu: this.userid,        //一级目录id
          id:this.patientsInfo.personalInfoId               //就诊人病史主键
      }).then(res =>{
          //console.log('success',res)
          Indicator.close();
          if(res.data != ""){
            //Toast({ message: '保存成功！！',duration: 1000});
          }
          if(res.data.menu == 5){
            this.back_toIndex();
          }
      })
    },
    savethis(){
      this.save();
      setTimeout(()=>{
        this.back_toIndex()
      },100)
    },
    querylist(id){                /* 其他就诊人信息 */
        this.defaultvalue()
        let userid = id;
        Indicator.open('加载中...')
        this.get( this.url_s+"/PersonalInfo/PersonalCage",{
              id: userid,
              openId:  localStorage.getItem('openId')
          })
        .then(res =>{
            //this.lists = res.data;
            res = eval(res)
            this.infolevelTwo = res.data;
            Indicator.close()
            if(res.data != ""){
              this.mititle = res.data[0].data1.firstName
            };
        }) 
    },
    back_toIndex(){
      this.dialogOnedetail = false;
      this.$emit("receive",'true');
    },
    submit(){
    
        this.save();
        this.bottomtext()
    },
    bottomtext(){
      let id = this.userid;
      this.backdata.map(_=>{
        let length = this.backdata.length -1
        if( id == _.id && id < 5){
          this.userid = parseFloat(_.id) + 1;  
          this.submit_text = "下一步("+this.userid+"/5)";    
          this.querylist(this.userid);    //请求返回上一页的数据
        }else if(id == length){
            /* this.dialogOnedetail = false;
            this.$emit("receive"); */
            this.submit_text = "保 存";      //下面点击按钮提交保存显示;

        }
      })
    },
    tolist(){
      let userid = this.userid;
          //this.backdata.map
    }
  }
}
</script>
