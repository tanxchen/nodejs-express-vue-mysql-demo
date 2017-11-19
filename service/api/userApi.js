var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
var moment = require('moment');
 
// 连接数据库
var conn = mysql.createConnection(models.mysql);
 
conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
 
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.price], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
// 查询用户接口
router.post('/userList', (req, res) => {
    var sql = $sql.user.select;
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            result.map(function(i, k, o){
                o[k].creat_time = moment(i.creat_time).format("YYYY-MM-DD hh:mm:ss")
                return o
            })
            //result.creat_time = moment(result.creat_time).format("YYYY-MM-DD")
            console.log(result)
            jsonWrite(res, result);
        }
    })
});
// 删除用户接口
router.post('/delUserById', (req, res) => {
    var sql = $sql.user.delete;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
// 修改用户接口
router.post('/updateUserById', (req, res) => {
    var sql = $sql.user.update;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.price, params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
// 增加用户接口
router.get('/addUser', (req, res) => {
     res.send('retrunJson');
});
 
module.exports = router;