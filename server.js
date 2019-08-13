const express=require('express');
const app=express();
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;

app.set('view engine','hbs');

app.use((req,res,next) => {           //middleware
    var now= new Date().toString();
    var log=`${now} : ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFileSync('server.log',log+'\n',(err) => {
        console.log("Unable to write in file");
    });

    next();
});

app.use((req,res,next) => {
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname+"/public")); //middleware

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     firstName:'Manisha',
    //     age:'21',
    //     likes:[
    //         'Pizza',
    //         'Dev',
    //         'MSIT'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle : 'Home page',
        welcomeMsg: 'Welcome to my website',
    });
});

app.get('/about',(req,res)=> {
    res.render('about.hbs',{
        pageTitle : 'About page',
    });
});

app.get('/bad',(req,res)=> {
    res.send({
        errorMsg : 'Error Handling Request'
    });
})

app.listen(port,()=>{
    console.log(`Server is up at port ${port}`);
});
