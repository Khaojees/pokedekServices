const pool = require('../db/pool')
const common = require('./common/common')

const exec = async(req,res)=>{
      let client = await pool.connect()
      await client.query('BEGIN')
      let responseData = {}
      let tokenObject = {user_id :req._user.user_id}
      try {
            let sql = `DELETE FROM public.vote 
            WHERE pokemon_id = $1 AND user_uuid = $2`
            let param = [req.params.id, req._user.user_id]
            console.log("req.param,tokenObject >>>> ",req.params.id, req._user.user_id)

            await pool.query(sql,param)

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
      return res.end()
}

module.exports = exec