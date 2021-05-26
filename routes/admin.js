let express = require('express');
let router = express.Router();
var db = require('../models/db');
 
// -------------The front page displays the database data----------------------
router.get('/',(req,res,next) => {
    // order by ID desc
    // let data="select * from admination where status=1 order by ID desc limit 3";
    //select * from table limit (1-1)*10,10;
    let data="select * from admination where status=1 order by ID desc limit 3"
    db.exe(data,[],function(err, results, fields){
        res.render('admin',{detail:results});
   });
});



// -------------delete-----------------------------
router.get('/de/:id',(req,res) => {
    let ID = req.params.id;
    let sql="update admination set status=0  where id=?";
    db.exe(sql,[ID],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.redirect('/admin');
        }
    })
});

// -------------add---------------------------------
    router.get('/add',(req,res) => {
        res.render('add',{obj:{},id:""});
    });
    router.post('/add',(req,res) => {
        let dog="insert into admination(name,BlogID,Blog,email,phnoe) value(?,?,?,?,?) ";
        let cat=[req.body.name,req.body.BlogID,req.body.Blog,req.body.email,req.body.phnoe];
        db.exe(dog,cat,(err,results,fields)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/admin");
            }
    })}); 

// -------------update---------------------------------
router.get('/update',(req,res)=>{ //由于这里的路径出现了问题，所以无法和新增网页的路径匹配上，没有办法跳转过去
    let ID=req.query.id;    
    let apple="select * from admination where id = ?";
    db.exe(apple,[ID],(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.render('update',{data:data[0]});}//这里打印出来的data是一个数组，所以应该拿到里面的第一个值，再进行传参
            //渲染文件时不需要用/，在重定向和get或post请求方式等才需要使用/
    } )
});
router.post('/update',(req,res) => {
    let dog="update admination set name=?,BlogID=?,Blog=?,email=?,phnoe=? where id="+req.body.ID;//通过传id的值，不去进行插入，而是直接update
    let cat=[req.body.name,req.body.BlogID,req.body.Blog,req.body.email,req.body.phnoe,req.body.ID];
    db.exe(dog,cat,(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/admin");
        }
})}); 
 
 
// -------------paging--------------------------------
router.get("/nextPage",(req,res)=>{
    let lion="select * from admination where status=1  order by ID desc limit 3,4 ";
    db.exe(lion,"",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('admin',{detail:result});
        }
    })
});

//  select * from table limit (start-1)*limit,limit;
// select * from admination where status=1  order by ID desc limit ?,?

router.get("/lastPage",(req,res)=>{
    let lion="select * from admination where status=1  order by ID desc limit 3 ";
    // let page=[a*5,5]
    db.exe(lion,"",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.render('admin',{detail:result});
        }
    })
});

module.exports = router;