const express = require("express")
const path = require("path")


const app = express()

const buildDir = path.join(__dirname, "../build")

const subDir = "/"
const logRequest = false

app.use(subDir, express.static(buildDir))
app.get("*", (req, res)=>{
    if(logRequest){
        console.log(req.method + "  " + req.url)
    }
    res.sendFile(path.join(buildDir, "index.html"))
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("App is running on port " + port)
})