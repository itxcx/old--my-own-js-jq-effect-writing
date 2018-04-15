import Vue from 'vue'
import Router from 'vue-router'
import custRepaymentIndex from '@/components/custRepayment/index'
import repayMethod from '@/components/custRepayment/repayMethod'
import describe from '@/components/custRepayment/describe'
import login from '@/components/custRepayment/login'
import addBankCard from '@/components/custRepayment/addBankCard'
import repaySuc from '@/components/custRepayment/repaySuc'
import alipaying from '@/components/custRepayment/alipaying'

Vue.use(Router)

export default new Router({
  //history模式需要服务端配合
  // mode:'history',
  // base:'/',
  routes: [
    {
      path: '/',
      component: login
    },    
    {
      path: '/index',
      component: custRepaymentIndex
    },
    {
      path: '/repayMethod',
      component: repayMethod
    },
    {
      path: '/describe',
      component: describe
    },
    {
      path: '/addBankCard',
      component: addBankCard
    },
    {
      path: '/repaySuc',
      component: repaySuc
    },
    {
      path: '/alipaying',
      component: alipaying
    },
  ]
})

