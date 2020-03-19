import axios from 'axios'


let sendurl = 'http://woman.ichangban.com/api/'

   const request=function (url,data,flag){
        let userAccess = localStorage.getItem('zjflid') || ''
        var promise = new Promise((resolve,reject)=>{
            axios.post(sendurl+url,data,{
                headers: {
                    'userAccess': userAccess,
                    'content-type': 'application/json'
                  },
            }).then(res=>{

            
                    if(res.data.status == 1){
                        resolve(res.data.data)
                      }else{
                        
                          this.$toast(res.data.msg)
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