const express=require('express');
const fs = require('fs');
const crypto=require('crypto');
const session=require('express-session');

app=express();
app.set("view engine","ejs");

console.log("Director curent:", __dirname);
app.use("/Resurse", express.static(__dirname+"/Resurse"));
app.use(express.urlencoded({extended:true})); // creeaza req.body


app.use(session({ secret: 'abcdefg', resave: true, saveUninitialized: false}));// s-a creat req.session

app.get(["/", "/indexjava"], function(req, res){
    res.render("pagini/index", {utilizator:req.session.utilizator})

});

app.get("/ceva", function(req, res){
    res.send("altceva");

});


caleJson=__dirname+"/Resurse/json/utilizatori.json";
app.post("/inregistrare", function(req,res){
    console.log(req.body);
    let useri;
    if(! fs.existsSync(caleJson)){
        useri={useri:[]}
    }
    else{
        useri=JSON.parse(fs.readFileSync(caleJson).toString("utf8"));

    }
    console.log("useri", useri);
    req.body.parola=crypto.scryptSync(req.body.parola, "parola criptare", 32).toString('hex');
    useri.useri.push(req.body);
    console.log("dupa inregistrare:", useri);
    fs.writeFileSync(caleJson,JSON.stringify(useri));
    res.render("Pagini/inregistrare",{raspuns:"ok",utilizator:req.session.utilizator});
})


app.post("/login", function(req,res){
    console.log(req.body);
    let useri;
    if(! fs.existsSync(caleJson)){
        useri={useri:[]}
    }
    else{
        useri=JSON.parse(fs.readFileSync(caleJson).toString("utf8"));

    }
    console.log("useri", useri);
    req.body.parola=crypto.scryptSync(req.body.parola, "parola criptare", 32).toString('hex');
    for (let user of useri.useri){
        if(user.username==req.body.username && user.parola==req.body.parola){
            req.session.utilizator=user;

            break;
        }
    }
    res.render("pagini/index", {utilizator:req.session.utilizator});
})


app.get("/logout", function(req, res){
    req.session.destroy();
    res.render("pagini/logout");

});

app.get("/*", function(req, res){
    res.render("Pagini"+req.url,{utilizator:req.session.utilizator}, function(err, rezRandare){
        if(err){
            res.render("Pagini/404", {utilizator:req.session.utilizator});
        }
        else{
            //console.log(rezRandare);
            res.send(rezRandare);
        }
    });

});


app.listen(8081);
console.log("Serverul a pornit!");