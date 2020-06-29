const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const bodyparser = require('body-parser');
const pubway = path.join(__dirname,'./views/public')


const partialspath = path.join(__dirname,'/views/partials')
app.set('view engine','hbs')
hbs.registerPartials(partialspath)
app.use(express.static(pubway))
app.use(bodyparser.urlencoded({extended: false}));
const fs = require('fs');
const requ = require('request');

app.get('',(req,res) => {
    res.render('index',{title:'index'});
});


app.post('/cord', (req,res) => {

    global.loct=req.body.loco;
    if (loct) {
        const urlb = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loct}.json?access_token=pk.eyJ1IjoiYm94bGFwYW5pbSIsImEiOiJja2JvN2JtZTExenZzMnlsc2I3a2dhOWh3In0.ftTKwIi3Jm7ZEcDdUlZCKw`;
        global.arr = [];
        requ({url:urlb, json: true}, (err,res) => {

            const long = res.body.features[0].center[0];
            const lati = res.body.features[0].center[1];
            arr.push(long,lati)
            // console.log(long);
            //console.log(lati);
            
        });

        
        setTimeout(() => {
            
            const url = `http://api.weatherstack.com/current?access_key=8c8ab75ab900c8d910a85444a2d47174&query=${arr[1]},${arr[0]}&units=m`;
            // setTimeout(() => {
             requ({url: url, json:true }, (error, resp) => {
                 //data = JSON.parse(resp.body);
                 global.temp = resp.body.current.temperature;
                 global.loc = resp.body.location.name ;
                 global.al = resp.body;
                 console.log('the current temperature is ' + temp + ' in ' + loc );
                    
             });
            
           setTimeout(() => {
            res.redirect('/wtr');
            app.use('/wtr', (req,res) => {
                console.log(al);
                
                res.render('wether',{temp:temp,loc:loc,al:al});
            });     
           }, 2000);    
           
        }, 2000);
       
            
    }//if1
    
});//apuse


 app.use('/gettemp',(req,res) => {
     console.log(arr[0]);
         
     res.send('<a href="/wtr">click hear for wether data</a>')
 });


app.listen(3000,() => {
    console.log('Server is runing on Port 3000');
    
});