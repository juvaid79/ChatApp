const mongoose = require('mongoose')
const mongouri = "mongodb://localhost:27017/ChatApp"
try {
    mongoose.connect(mongouri,{
        useNewUrlParser :true,
        useUnifiedTopology :true
    }).then(res=>{
        console.log("DataBase Connected Successfully ")
    })
    
} catch (error) {
    console.error(error)
    
}