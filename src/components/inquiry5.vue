<template>
  <div class="inquiry">
    <div>
      <div>
        <div><img :src="docUrl + info.dOc.doctorAvatarUrl"  alt=""></div>
        <div>
          <div><span>{{info.dOc.doctorName}}</span><span>{{info.dOc.departmentName}}</span></div>
          <div><span>{{info.dOc.hospitalName}}</span><span></span></div>
        </div>
      </div>
      <div>医生将在24小时内回复，请耐心等待</div>
    </div>
    <div class="pinjia" v-if="info.pingJia">
      <div>我的评价</div>
      <el-rate
        v-model="value2"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </div>
    <ul>
      <li v-for="(list,index) in lists" >
        <div class="first">第{{res_length - index}}次提问</div>
        <div class="tiwen">
          <div>
            <div><span></span><span>{{info.dOc.patientName}}</span></div>
            <div>{{list.questionContent}}</div>
            <div :class="{styleObj: flag[index]}">
              <img :src="img.slice(1,img.length-1)" alt="" v-for=" img in questionImages[index]" v-if="img" >
            </div>
            <div><span>提问时间:</span><span>{{list.createTime}}</span></div>
          </div>
          <div v-if="list.answerContent">
            <div><span></span><span>{{info.dOc.doctorName}}</span></div>
            <div>{{list.answerContent}}</div>
            <div style="width: 0;height: 0; display: none">
            </div>
            <div style="height: 3rem;"><span>回复时间:</span><span>{{list.answerTime}}</span></div>
          </div>
        </div>
      </li>
    </ul>

    <div class="zaici" @click="tiwen" v-if="lists[0].answerContent">{{info.cut}}</div>
    <div class="bg" v-if="info.bg"></div>
    <div class="pinglun" v-if="info.pins">
      <div class="p1">评价
        <div></div>
      </div>
      <div class="p2">
        <el-rate
          class="p2-el"
          v-model="value1"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </div>
      <div class="p3">
        <textarea maxlength="80" placeholder="请你对医生的服务做出客观的评价，您的评价会让
医生的服务，服务的更好。" @input="descInput" v-model="info.desc"></textarea>
        <div>{{info.remnant}}/80</div>
      </div>
      <div class="p4" @click="nexts">匿名提交</div>

    </div>
  </div>
</template>
<style lang="less" scoped>
  @fontSize_14: 14px;
  @fontSize_12: 12px;
  .pinjia {
    width: 100%;
    height: 6rem;
    & > div {
      height: 3rem;
      line-height: 3rem;
      font-size: @fontSize_14;
      color: #797979;
    }
    & > input {
      height: 3rem;
      line-height: 3rem;
    }
  }
  .pinglun {
    width: 100%;
    height: 25rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    & > div {
      box-sizing: border-box;
    }
    & > .p1 {
      text-align: center;
      color: #44b2fd;
      height: 4rem;
      line-height: 4rem;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      position: relative;
      & > div {
        width: 2rem;
        height: 2rem;
        background: url("../assets/cacaca.png" )no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 1rem;
      }
    }
    & > .p2 {
      width: 100%;
      height: 5rem;
      & > .p2-el {
        height: 5rem;
        line-height: 5rem;
      }
    }
    & > .p3 {
      width: 100%;
      height: 9rem;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      margin-bottom: 3rem ;
      & > textarea {
        border: none;
        outline: none;
        width: 100%;
        height: 9rem;
        letter-spacing: .1rem ;
        font-size: @fontSize_14;
      }
      & > div {
        position: absolute;
        font-size: @fontSize_14;
        color: #bdbdbd;
        bottom: 1rem;
        right: 1rem;
      }
    }
    & > .p4 {
      width: 100%;
      height: 5rem;
      line-height: 5rem;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #44b2fd;
      color: #ffffff;
      text-align: center;
      font-size: @fontSize_14;
    }
  }
  .styleObj {
    width: 0 !important;
    height: 0 !important;
    display: none;
  }
  .inquiry {
    width: 100%;
    height: 100%;
    & > .bg {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .5;
      position: absolute;
      top: 0;
      left: 0;
    };
    & > div {
      box-sizing: border-box;
      padding:0 1rem ;
    }
    & > div:nth-child(1) {
      width: 100%;
      height: 13rem;
      & > div:first-child {
        width: 100%;
        height: 9rem;
        font-size: 0;
        border-bottom: .1rem solid #eee;

        & > div {
          display: inline-block;
          vertical-align: top;
        }
        & > div:first-child {
          width: 25%;
          height: 9rem;
          & > img {
            width: 6rem;
            height: 6rem;
            margin-top: 1.5rem;
            border-radius: 50%;
          }
        }
        & > div:last-child {
          width: 75%;
          height: 9rem;
          padding:  1rem 0;
          box-sizing: border-box;
          font-size:  @fontSize_14;
          & > div:first-child {
            & > span:last-child {
              color: #999999;
            }
          }
          & > div {
            width: 100%;
            height: 3.5rem;
            line-height: 3.5rem;
            & > span:first-child {
              margin-right: 2rem;
            }
          }
        }
      }
      & > div:last-child {
        width: 100%;
        height: 4rem;
        text-align: center;
        line-height: 4rem;
        color: #37acfd;
        font-size:  @fontSize_14;
      }
    }
    & > ul {
      width: 100%;
      height: calc(~ "100% - 18rem");
      overflow-y: scroll;
      overflow-x: hidden;
      & > li {
        width: 100%;
        /*height: 43rem;*/
        padding: 0 1rem;
        & > .tiwen {
          width: 100%;
          & > div {
            width: 100%;
            /*height: 20rem;*/
            margin-bottom: 1rem;
            border-bottom: 1px solid #eee;
            & > div:nth-child(1) {
              font-size:  @fontSize_14;
              & > span {
                vertical-align: top;
              }
              & > span:nth-child(1) {
                display: inline-block;
                width: 3rem;
                height: 3rem;
                margin-top: 1rem;
                background: url("../assets/huiren.png" )no-repeat ;
                background-size: cover;
              }
              & > span:last-child {
                display: inline-block;
                width: calc(~ '100% - 3rem');
                height: 3rem;
                line-height: 3rem;
                margin-top: 1rem;
                padding-left: 1rem;
                box-sizing: border-box;
              }
            }
            & > div:nth-child(2) {
              width: 95%;
              font-size:  @fontSize_12;
              letter-spacing: .1rem;
              color: #797979;
              padding: 1rem 0;
              word-wrap: break-word;
            }
            & > div:nth-child(3) {
              width: 100%;
              height: 5rem;
              padding: 1rem 0;
              & > img {
                width: 5rem;
                height: 5rem;
                padding-right: .5rem;
              }
            }
            & > div:nth-child(4) {
              width: 100%;
              height: 4rem;
              font-size: 0;
              line-height: 4rem;
              & > span {
                display: inline-block;
                height: 4rem;
                font-size:  @fontSize_14;
                line-height: 4rem;
              }
              & > span:first-child {
                width: 20%;
              }
              & > span:nth-child(2) {
                width: 65%;
              }
              & > span:nth-child(3){
                width: 10%;
              }
            }
          }
        }
      }
    }

  }
  .zaici {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    color: #ffffff;
    background-color: #44b2fd;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size:  @fontSize_14;
  }
  .first {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size:  @fontSize_14;
    color: #83889a;
    background-color: #f8f8f8;
  }
</style>
<script>
  export  default  {
    data () {
      return {
        info: {
          answerQuestion1: null,
          questionName : null,
          doctorName: '',
          dOc: {},
          len: null,
          str: false,
          cut: '',
          bg: false,
          pins: false,
          pingJia: false,
          desc: '',
          remnant: 0
        },
        urls:  'http://www.schlwyy.com:8686/hlwyy-new',
        lists: [{}],
        value1: '',
        value2: '',
        imgUrl: [],
        button: false,
        res_length : 0,
        questionImages: [],
        flag: [],
        show: true,
        docUrl: 'http://www.schlwyy.com:8686/doctor',
      }
    },
    watch: {
      'lists': function (val) {
        val.forEach((list,index) => {
          this.questionImages.push(list.questionImages.slice(1,list.questionImages.length-1).split(','));
          if(list.questionImages === '[]') {
            this.flag.push(true)
          }else {
            this.flag.push(false)
          }
        })
      }
    },
    mounted() {
//      this.question1();//查询问题1
//      this.answerQuestion(1);
      this.queryInterrogation();
    },
    methods: {
      descInput() {
        this.info.remnant = this.info.desc.length;
      },
      nexts () {
        this.value2 = this.value1;
        this.info.pingJia = true;
        this.info.bg = false;
        this.info.pins = false;
        this.info.cut = '向医生再次提问'
      },
      //查询问诊记录
      queryInterrogation () {
        let token = localStorage.getItem('token');
        let orderId =  localStorage.getItem('orderId1');
        //获取就诊人ID
        let _this = this;
        var _id ;
        _this.axios.get(_this.urls + 'api/graphic_inquiry/',{
          params: {
            orderId: orderId,
            token: token,
            page_index: 1,
            page_size: 2000
          }
        }).then(function (response) {
          //console.log(response.data);
          var dOc =  response.data[0];
//          _this.info.dOc = response.data[0];
          _id = response.data[0].id;
          localStorage.setItem("_id",response.data[0].id  )
          //...
          _this.axios.get(_this.urls + '/api/graphic_inquiry/'+ _id + '/question',{
            params: {
              id: _id,
              token: token,
              page_index: 1,
              page_size: 2000
            }
          }).then(function (response) {
            _this.lists = response.data.reverse();
            _this.res_length = _this.lists.length;
            let res_length = response.data.length;
            if( response.data[res_length - 1].answerContent ) {
              _this.button = false;
            }else {
              _this.button = true;
            }
            _this.info.dOc = dOc;
            if (dOc.answerContent !== null) {
              _this.info.str = true
            }
            _this.info.len = 5 - response.data.length;
            //console.log(response.data);
            if (_this.info.len >= 1) {
              _this.info.cut = '再次提问 ( 本次咨询剩余'+ _this.info.len +'次 )'
            }else {
              _this.info.cut = '向医生再次提问';
            }
          })
        });

      },
      tiwen () {
        if(this.info.cut === '评论') {
          this.info.bg = true;
          this.info.pins = true;
        }else {
          this.$router.push('/tiwen');
        };
        if(this.info.cut === '向医生再次提问') {
          this.$router.push('/doctorIntroduce');
        }
      },
    }
  }
</script>
