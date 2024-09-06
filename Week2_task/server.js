var express = require('express')

var router = require('./routes/user')

const app = express();
app.use(express.json());

app.use('/users', router)


app.listen(6000, () => {
    console.log("server has started ")
})

