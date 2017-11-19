// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into goods(id, name, price) values (0, ?, ?)',
        select: 'select * from goods',
        delete: 'DELETE FROM goods WHERE id=?',
        update: 'UPDATE goods SET NAME=?,price=? WHERE id=?'
    }
}
module.exports = sqlMap;