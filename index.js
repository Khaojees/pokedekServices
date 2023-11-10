const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const morgan = require('morgan')
// const bodyParser = require('body-parser')
const register = require('./src/register')
const login = require('./src/common/login')
const votePokemon = require('./src/votePokemon')
const auth = require('./middleware/auth')
const getScorePokemon = require('./src/getScorePokemon')
const getVoteAll = require('./src/getVoteAll')
const deleteVote = require('./src/deleteVote')


app.use(express.json())
app.use(cors())
// app.use(bodyParser.json())
// app.use((req,res,next)=>{
//       res.setHeader("Access-Control-Allow-Origin","*")
//       res.header("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE")
//       res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,x-access-token,x-refresh-token,_id")
//       res.header("Access-Control-Expose-Headers","x-access-token,x-refresh-token")
//       next()
// })
app.use(morgan("dev"))


app.get('/',async(req,res)=>{
      res.json("Okkkkkk")
})

app.post('/register',async(req,res)=>{
      register(req,res)
})

app.post('/login',async(req,res)=>{
      login(req,res)
})

app.post('/pokemon/vote',auth,async(req,res)=>{
      votePokemon(req,res)
})

app.get('/pokemon/score/all',auth,async(req,res)=>{
      getScorePokemon(req,res)
})

app.get('/pokemon/getVoteAll',auth,async(req,res)=>{
      getVoteAll(req,res)
})

app.delete('/pokemon/deleteVote/:id',auth,async(req,res)=>{
      deleteVote(req,res)
})

app.listen(PORT,()=>
console.log(`server is running on ${PORT}`))