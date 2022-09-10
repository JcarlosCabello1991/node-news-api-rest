import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(cors());

app.get("/getNews", (req, res, next) => {
 fs.readFile("/newsDB.json",'utf-8', (err, data)=>{
  //If we get an error reading file
  //we make an API call to get the news
  //If not we save data in a file to
  //prevent another API call innnecesary
    if(err){
      try{
        fetch(`https://newsdata.io/api/1/news?apikey=${process.env.API_KEY}&language=es`)
        .then(response => response.json())
        .then(data => {
          
          fs.writeFile("./newsDB.json",JSON.stringify(data.results),(err) => {
            if (err) {
              throw err
            }
          })
          console.log(data);
          res.send(data.results)
        })
      }catch(error){
        next(error)
      }  
    }else{
      res.send(JSON.parse(data));
      console.log(JSON.parse(data));
    }      
  });
})

app.listen(4000, () => {console.log("Server listen on port 4000");})