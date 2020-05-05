import axios from 'axios'


let sendurl = 'http://api.surenguangbo.com:8088/suren/' //测试地址

   const request=function (url,data,flag){
        let userAccess = this.$store.state.openid || ''
        var promise = new Promise((resolve,reject)=>{
            axios.post(sendurl+url,data,{
                headers: {
                    'userAccess': userAccess,
                    'content-type': 'application/json',
                    'referer':'http://surenguangbo.com'
                  },
            }).then(res=>{
                    if(res.data.code == 200){
                        resolve(res.data)
                      }else{
                        
                          this.$toast(res.data.errorMessage)
                          if(res.data.status == 40101){
                            // this.$router.push({path:'/login'})
                          }
      
                }
              
            }).catch(err=>{
                reject(err.data)
            })
        })
        return promise
    }


export default request