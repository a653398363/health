import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Confirmation from '@/components/confirmation'
import AddPeople from '@/components/addPeople'
import inquiry from '@/components/inquiry'
import inquiry1 from '@/components/inquiry1'
import inquiry2 from '@/components/inquiry2'
import inquiry3 from '@/components/inquiry3'
import inquiry4 from '@/components/inquiry4'
import inquiry5 from '@/components/inquiry5'
import Tiwen from '@/components/tiwen'
import Tiwen1 from '@/components/tiwen1'
import Tiwen2 from '@/components/tiwen2'
import Tiwen3 from '@/components/tiwen3'
import Tiwen4 from '@/components/tiwen4'
import Weizhuce from '@/components/weizhuce'
import Zhuce from '@/components/zhuce'
import Menzhen from '@/components/menzhen'
import docInt from '@/components/doctorIntroduce'
import jilu from '@/components/jilu'
import upLoad from '@/components/upLoad'
import Calendar from 'vue2-datepick'
import net_index from '@/components/index/net_index'
import search from '@/components/index/search'
import add_visit from '@/components/personDetail/add_visit'
import dialogOne from '@/components/personDetail/dialogOne'
import Visits_Card from '@/components/personDetail/Visits_Card'
import add_card from '@/components/personDetail/add_card'
import visitMange from '@/components/visitMange'
import Myconcern from '@/components/Myconcern'
import consultancy from '@/components/consultancy'
import detail from '@/components/consult/detail'
import notice from '@/components/notice'
import prescription from '@/components/perscript/prescription'
import PrescriptionNotes from '@/components/PrescriptionNotes'  
import Prescriptchoice from '@/components/Prescriptchoice'
import PrescriptionPay from '@/components/PrescriptionPay'
import register from '@/components/register' 
import advisory from '@/components/order/advisory'
import addressChoice from '@/components/address/addressChoice'
import addressManagement from '@/components/address/addressManagement'
import addressAddchange from '@/components/address/addressAddchange'
import unauthorize from '@/components/unauthorize'
import authorize from '@/components/authorize'

Vue.use(Router)
Vue.use(Calendar)

export default new Router({
  routes: [
    {
      path: '/',
       name: 'Hello',
       component: HelloWorld
    }, 
    {
      path: '/confirmation',
      name: "confirmation",
      component: Confirmation
    },
    {
      path: "/addPeople",
      name: "addPeople",
      component: AddPeople
    },
    {
      path: "/inquiry",
      name: "inquiry",
      component: inquiry
    },
    {
      path: "/inquiry1",
      name: "inquiry1",
      component: inquiry1
    },
    {
      path: "/inquiry2",
      component: inquiry2
    },
    {
      path: "/inquiry3",
      component: inquiry3
    },
    {
      path: "/inquiry5",
      component: inquiry5
    },
    {
      path: "/inquiry4",
      component: inquiry4
    },
    {
      path: "/tiwen",
      name:"tiwen",
      component: Tiwen
    },
    {
      path: "/tiwen1",
      name:"tiwen1",
      component: Tiwen1
    },
    {
      path: "/tiwen2",
      component: Tiwen2
    },
    {
      path: "/tiwen3",
      component: Tiwen3
    },
    {
      path: "/tiwen4",
      component: Tiwen4
    },
    {
      path: "/weizhuce",
      component: Weizhuce
    },
    {
      path: "/zhuce",
      component: Zhuce
    },
    {
      path: "/Menzhen",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: Menzhen
    },
    {
      path: "/doctorIntroduce",
      name: "doctorIntroduce",
      component: docInt
    },
    {
      path: "/jilu",
      component: jilu
    },
    {
      path: "/upLoad",
      component: upLoad
    },
    {
      path: "/net_index",
      name: "net_index",
      component: net_index
    },{
      path: "/search",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: search
    },{
      path: "/add_visit",
      component: add_visit
    },{
      path: "/Visits_Card",
      name: "Visits_Card",
      component: Visits_Card
    },{
      path:"/add_card",
      name:"add_card",
      component: add_card
    },{
      path: "./dialogOne",
      component: dialogOne
    },
    {
      path: "/visitMange",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: visitMange
    },{
      path: "/Myconcern",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: Myconcern
    },{
      path: "/consultancy",
      name:"consultancy",
      meta:{
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: consultancy
    },{
      path: "/consult/detail",
      component: detail
    },{
      path: "/notice",
      name: "notice",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: notice
    },{
      path: "/perscript/prescription",
      name:"prescription",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: prescription
    },{
      path: "/PrescriptionNotes",
      name:"PrescriptionNotes",
      component: PrescriptionNotes
    },{
      path:"/Prescriptchoice",
      name:"Prescriptchoice",
      component: Prescriptchoice
    },{
      path: "/PrescriptionPay",
      name: "PrescriptionPay",
      component: PrescriptionPay
    },{
      path: "/register",
      component: register
    },{
      path: "/order/advisory",
      name: "advisory",
      meta: {
        requireAuth: true   //配置此条，进入页面钱判断是否需要登陆
      },
      component: advisory
    },{
      path: "/address/addressChoice",
      name: "addressChoice",
      component: addressChoice
    },{
      path: "/address/addressManagement",
      name: "addressManagement",
      component: addressManagement
    },{
      path: "/address/addressAddchange",
      name: "addressAddchange",
      component: addressAddchange
    },{
      path: "/unauthorize",
      name: "unauthorize",
      component: unauthorize
    },{
      path: "/authorize",
      name: "authorize",
      component: authorize
    }
  ]
})
