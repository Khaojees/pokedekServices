const pool = require('../db/pool')
const { v4: uuid_v4 } = require('uuid');
const common = require('./common/common')

const exec = async(req,res)=>{
      let client = await pool.connect()
      await client.query('BEGIN')
      let responseData = {}
      try{
            let data = req.body
            console.log("body = ",req.body)
            
            let sqlUser = `SELECT * FROM public.user WHERE user_name = $1`
            let paramsUser = [data.userName]
            let responseUser = await pool.query(sqlUser,paramsUser)
            console.log("responseUser = ",responseUser)

            if(responseUser.rowCount >0){
                  responseData.success = false
                  responseData.date = "user duplicate"
            }else{
                  let user_uuid = uuid_v4()
                  let encryptPwd = await common.commonService.encrypted(data.password)
                  let sql = `INSERT INTO public."user"
                  (user_uuid, first_name, last_name, user_name, "password", create_date, create_by)
                  VALUES($1, $2, $3, $4, $5, now(), $6);`

                  let param = [user_uuid, data.firstName, data.lastName, data.userName, encryptPwd, user_uuid]
                  let response = await pool.query(sql,param) 
                  console.log("Sucess >>> ",response)

                  responseData.success = true
                  client.query('COMMIT')
            }

      }catch(err){
            console.log("err = ",err)
            client.query('ROLLBACK')
            responseData.success = false
      }finally{
            client.release()
      }
      res.status(200).send(responseData)
      return res.end()
}

module.exports = exec