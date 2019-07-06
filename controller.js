'use strict'

var conn = require('./conn');
var respo = require('./respo');
const modul = require('./modul');



exports.index = function(req, res)
{
    respo.ok('OK', res);
};


exports.test_concat = function(req, res)
{
    modul.getCount_note(function(callback)
    {
        let query;
        let count_query;
        let start_row;
        let end_row;
        let amount_page;
        let ceil_amount_page;
        let page = req.query.page || 0;
        let limit = req.query.limit || 16;
        let current_page = req.query.page || 1;
        var total_data = 0;

        if(req.query.search)
        {
            if (req.query.sort) 
            {
                if(req.query.category)
                {
                    query = `select * from note_full where title like '%${req.query.search}%' and category_name = '${req.query.category}' order by time ${req.query.sort}`;
                }
                else
                {
                    query = `select * from note_full where title like '%${req.query.search}%' order by time ${req.query.sort}`;
                }
            }
            else if(req.query.category)
            {
                query = `select * from note_full where title like '%${req.query.search}%' and category_name='${req.query.category}' order by time desc`;
            }
            else
            {
                query = `select * from note_full where title like '%${req.query.search}%' order by time desc`;
            }
        }
        else if(req.query.sort)
        {

            if(req.query.search)
            {
                query = `select * from note_full where title like '%${req.query.search}%' order by time ${req.query.sort.toLowerCase()}`;
            }
            else if(req.query.category)
            {
                query = `select * from note_full where category_name = '${req.query.category}' order by time ${req.query.sort.toLowerCase()}`;                
            }
            else
            {
                query = `select * from note_full order by time ${req.query.sort.toLowerCase()}`;
                
            }
        }
        
        else if(req.query.search && req.query.sort )
        {
            query = `select * from note_full where title like '%${req.query.search}%' order by title ${req.query.sort.toLowerCase()} `;
            console.log('SEARCH and SORT');
        }
        else if(req.query.id)
        {
            if(req.query.sort)
            {
                query = `select * from note_full where id = '${req.query.id}' order by time ${req.query.sort.toLowerCase()}`;
            }
            else
            {
                query = `select * from note_full where id = '${req.query.id}'`;
            }
        }
        else if(req.query.sort && req.query.page && req.query.limit && req.query.search && req.query.category)
        {
            query = `select * from note_full where title like '%${req.query.search}%' and category_name = '${req.query.category}' order by time ${req.query.sort.toLowerCase()}`;
        }
        else
        {
            query = `select * from note_full order by time desc`;
        }

        
        conn.query(query, function(error, rows)
        {
            // res.send(query);
            // total_data = rows.length || 0;
            if(error)
            {
                res.status(400);
                return res.send
                ({
                    status: 500,
                    message: error,
                    page: page,
                    data: rows
                });
            }
            else
            {
                console.log(query);
                    var opt;
                    var lena = rows.length;
                    if(req.query.limit)
                    {
                        if(req.query.search)
                        {
                            opt = lena;

                        }
                        else
                        {
                            opt = limit;
                        }

                    }
                    else
                    {
                        opt = lena;
                    }
                
                    amount_page = lena / limit;
                    end_row = page * req.query.limit;
                    start_row = page ? (page -1) * req.query.limit : 0;
                    ceil_amount_page = Math.ceil(amount_page);
                    // console.log(lena + limit + req.query.limit);
                    // console.log(query);
                    query = query.concat(` limit ${limit} offset ${start_row}`);
                    // console.log(query);
                    
                    conn.query(query, function(error1, rows1)
                    {
                        console.log(query);
                        if (error1) {
                            return res.send({
                                    status: 500,
                                    message: error,
                                    page: page,
                                    data: rows1
                                });
                            
                        }
                        else
                        {
                                res.send({
                                    status: 200,
                                    total: opt,
                                    current_page: current_page,
                                    total_page: ceil_amount_page,
                                    limit: limit,
                                    data: rows1
                                });


                        } 
                    });
                

            }

            

        });


        

    });
};


exports.test_concat_categories = function (req, res) {
    modul.getCount_note(function (callback) {
        let query;
        let count_query;
        let start_row;
        let end_row;
        let amount_page;
        let ceil_amount_page;
        let page = req.query.page || 0;
        let limit = req.query.limit || 10;
        let current_page = req.query.page || 1;
        var total_data = 0;

        if (req.query.search) {
            if (req.query.sort) {

                query = `select * from category where category_name like '%${req.query.search}%' order by category_name ${req.query.sort}`;
            }
            else {
                query = `select * from category where category_name like '%${req.query.search}%' order by category_name desc`;
            }
        }
        else if (req.query.sort) {

            if (req.query.search) {
                query = `select * from category where category_name like '%${req.query.search}%' order by category_name ${req.query.sort}`;
            }
            else {
                query = `select * from category order by category_name ${req.query.sort}`;
            }
        }

        else if (req.query.search && req.query.sort) {
            query = `select * from category where category_name like '%${req.query.search}%' order by category_name ${req.query.sort} `;
        }
        else if (req.query.id) {
            if (req.query.sort) {
                query = `select * from category where id_category = '${req.query.id}' order by category_name ${req.query.sort}`;
            }
            else {
                query = `select * from category where id_category = '${req.query.id}'`;
            }
        }
        else if (req.query.sort && req.query.page && req.query.limit && req.query.search) {
            query = `select * from category where category_name like '%${req.query.search}%' order by category_name ${req.query.sort}`;

        }
        else {
            query = `select * from category order by category_name desc`;
        }


        conn.query(query, function (error, rows) {
            // res.send(query);
            // total_data = rows.length || 0;
            if (error) {
                return res.send
                    ({
                        status: 500,
                        message: error,
                        page: page,
                        data: rows
                    });
            }
            else {
                var opt;
                var lena = rows.length;
                if (req.query.limit) {
                    if (req.query.search) {
                        opt = lena;

                    }
                    else {
                        opt = limit;
                    }

                }
                else {
                    opt = lena;
                }

                amount_page = lena / limit;
                end_row = page * req.query.limit;
                start_row = page ? (page - 1) * req.query.limit : 0;
                ceil_amount_page = Math.ceil(amount_page);
                // console.log(lena + limit + req.query.limit);
                // console.log(query);
                query = query.concat(` limit ${limit} offset ${start_row}`);
                // console.log(query);
                conn.query(query, function (error1, rows1) {
                    if (error1) {
                        return res.send({
                            status: 500,
                            message: 'data have an error',
                            page: page,
                            data: rows1
                        });
                    }
                    else {
                        res.send({
                            status: 200,
                            total: opt,
                            current_page: current_page,
                            total_page: ceil_amount_page,
                            limit: limit,
                            data: rows1
                        });
                    }
                });


            }



        });




    });
};






exports.insert_note_api = function(req, res)
{
    var id = req.body.id || `NULL`;
    var title = req.body.title;
    var note = req.body.note;
    var time = req.body.time || `CURRENT_TIMESTAMP`;
    var id_category = req.body.id_category;

    var sql = `insert into note set id=?, title=?, time=?, note=?, id_category=?`;
    var data = [id, title, time, note, id_category];
    // console.log(sql);
    conn.query(sql, data, function (error, rows, field) 
    {
        if(error)
        {
            // console.log("error at controller in data_insert reason: "+error);
            return res.send(
                {
                    error: true,
                    data: rows,
                    message: error,
                });
                
        }
        else
        {
            // respo.ok('success', res);
            return res.send(
            {
                error: false,
                data: req.body,
                message: 'data successfully added',
            });
        }

    });

};


exports.insert_note_category_api = function (req, res) 
{
    
    var category_name = req.body.category_name;
    var image = req.body.image;
    var id = req.body.id_category;

    conn.query(`insert into category set id_category=?, category_name=?, image=?`, [id, category_name, image], function (error, rows, field) {
        if (error) {
            // console.log("error at controller in data_insert reason: "+error);
            return res.send(
                {
                    error: true,
                    data: 'Data not added',
                    message: error
                });
        }
        else 
        {
            // respo.ok('success', res);
            return res.send(
                {
                    error: false,
                    data: req.body,
                    message: 'data successfully added'
                });
        }

    });

};


exports.update_note_api = function (req, res) 
{
    var title = req.body.title || `null`;
    var note = req.body.note;
    var id_category = req.body.id_category;
    var id = req.query.id;
    var time = req.body.time;
    

    conn.query(`update note set title=?, note=?, time=?, id_category=? where id=?`, [title, note, time, id_category, id], function (error, rows, field) {
        if (error) 
        {
            console.log(JSON.stringify(req.body));
            // console.log("error at controller in data_insert reason: "+error);
            return res.send(
                {
                    error: true,
                    data: rows,
                    message: 'data didnt updated'
                });

        }
        else 
        {
            // respo.ok('success', res);
            console.log(JSON.stringify(req.body));
            return res.send(
                {
                    
                    error: false,
                    data: req.body,
                    message: 'data successfully updated'
                });
                
        }

    });

};


exports.update_note_category_api = function (req, res) 
{
    
    var id = req.query.id;
    var category_name = req.body.category_name;

    conn.query(`update category set category_name=? where id_category=?`, [category_name, id], function (error, rows, field) 
    {
        if (error) 
        {
            // console.log("error at controller in data_insert reason: "+error);
            return res.send(
                {
                    error: true,
                    data: rows,
                    message: 'data didnt updated'
                });
        }
        else 
        {
            // respo.ok('success', res);
            return res.send(
                {
                    error: false,
                    data: rows,
                    message: 'data successfully updated'
                });
        }

    });

};

exports.delete_note_api = function (req, res) {
    var id = req.query.id;
    conn.query(`delete from note where id=?`, [id], function (error, rows) 
    {
        if (error) {
            return res.send({
                error: true,
                message: 'data didnt deleted'
            });
        }
        else 
        {
            return res.send({
                error: false,
                data: req.query.id,
                message: 'data deleted successfully'
            });
        }
    });
};

exports.delete_categories_api = function (req, res) 
{
    var id = req.query.id;
    conn.query(`delete from category where id_category=?`, [id], function (error, rows) {
        if (error) {
            return res.send({
                error: true,
                message: 'data didnt deleted'
            });
        }
        else {
            return res.send({
                error: false,
                data: rows,
                message: 'data deleted successfully'
            });
        }
    });
};

