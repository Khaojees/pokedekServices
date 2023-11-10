const pool = require('../db/pool')
const common = require('./common/common')

const exec = async(req,res)=>{
      let client = await pool.connect()
      let responseData = {}
      let tokenObject = {user_id :req._user.user_id}
      try {
            let sql = `SELECT * FROM public.vote`

            let response = await pool.query(sql)
            console.log("res ja >>>> ",response.rows)

            if(response.rows.length){
                  responseData.success = true
                  responseData.data = response.rows
            }else{
                  responseData.success = false
            }

            
      } catch (error) {
            console.log(error)
            responseData.success = false
      }finally{
            client.release()
      }

      responseData._token = await common.commonService.generateToken(tokenObject)
      res.status(200).send(responseData)
      return res.end()
}

module.exports = exec