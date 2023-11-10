const pool = require('../db/pool')
const common = require('./common/common')

const exec = async(req,res)=>{
      let client = await pool.connect()
      await client.query('BEGIN')
      let responseData = {}
      let tokenObject = {user_id :req._user.user_id}
      try {
            let data = req.body
            let voteItem = data.item
            let user_uuid = req._user.user_id            

            for(const item of voteItem){
                  let sql = `INSERT INTO public.vote
                  (pokemon_id, user_uuid, create_date, create_by)
                  VALUES($1, $2, now(), $3);`
                  let param = [item.id,user_uuid,user_uuid]
                  let response = await pool.query(sql,param)
            }
            responseData.success = true
            client.query('COMMIT')
            
      } catch (error) {
            console.log(error)
            client.query('ROLLBACK')
            responseData.success = false
      }finally{
            client.release()
      }
      responseData._token = await common.commonService.generateToken(tokenObject)
      res.status(200).send(responseData)
}

module.exports = exec