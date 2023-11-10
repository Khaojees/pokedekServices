const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const encrypted = async (data) => {
      try {
            let algo = 'aes256'
            let key = 'westride123'

            let cipher = crypto.Cipher(algo,key)
            let encrypted = cipher.update(data,'utf-8','hex')+ cipher.final('hex')
            return encrypted
      } catch (error) {
            console.log(error)
      }

}

const decrypted = async (data) => {
      try {
            let algo = 'aes256'
            let key = 'westride123'

            let decipher = crypto.Decipher(algo,key)
            let decrypted = decipher.update(data,'hex','utf-8')+ decipher.final('utf-8')
            return decrypted
      } catch (error) {
            console.log(error)
      }
}

const generateToken = async(data)=>{
      try {
            let key = 'westride123'
            let token = jwt.sign(data,key,{expiresIn: '30m'})
            return token
      } catch (error) {
            console.log(error)
      }
}

module.exports={
      commonService : {
            encrypted,
            decrypted,
            generateToken
      }
}