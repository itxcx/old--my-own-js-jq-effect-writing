Page({
  data: {
      custemMess: [
          {id:1, name: '张三', telephone: '187****5451', sex: 0, carnumber: '苏EU5A03', grade: '3', timeget: '2017-12-12 10:10', shopname: '苏州市虎丘区门店', timeset: '2017-12-12' },
          {id: 2,name: '李四', telephone: '187****5451', sex: 1, carnumber: '苏EU5A03', grade: '5', timeget: '2017-12-12 10:10', shopname: '南京市栖霞区门店', timeset: '2017-12-12' },
          {id: 3,name: '王五', telephone: '187****5451', sex: 0, carnumber: '苏EU5A03', grade: '3', timeget: '2017-12-12 10:10', shopname: '苏州市虎丘区门店', timeset: '2017-12-12' },
          {id: 4,name: '赵六', telephone: '187****5451', sex: 1, carnumber: '苏EU5A03', grade:'5', timeget: '2017-12-12 10:10', shopname: '南京市栖霞区门店', timeset: '2017-12-12' }
          ]
  },
  onLoad: function (options) {
      let custemMess = this.data.custemMess
      for (let j = 0; j < custemMess.length; j++) {
          let num = parseInt(custemMess[j].grade);
          let gradeArr = []
          for (let i = 0; i < 5; i++) {
              if (i < num) {
                  gradeArr[i] = 1
              } else {
                  gradeArr[i] = 0
              }
          }
          custemMess[j].grade = gradeArr
      }
      
      this.setData({
          custemMess: custemMess
      })
  },
  onReady: function () {
   
  },
  onShow: function () {
  
  }
})