const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./DB.js'); // Import the database connection
const poolPromise = require('./DB-promise.js'); // Import the database connection with promise




const app = express();


//app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

//cors
app.use(cors());
const corsOptions = {
  origin: '*', // Replace with the specific origin you want to allow
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json()); // Enable Json






// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });




//getting the blogs
app.get('/:offset', async(req, res) => {

    const offset = req.params.offset;


    const sql1 = `SELECT COUNT(*) as totalRows FROM blogs`; //getting total row count
    const sql2 = 'SELECT * FROM blogs LIMIT 10 OFFSET '+offset; //gatting all blogs by 10 
    
   //execute teh query
   try{
    const [count, blogs] = await Promise.all([
        poolPromise.query(sql1),
        poolPromise.query(sql2),
      ]);
     
    //response maximum 10 blogs with count  
    res.json({count:count[0][0].totalRows,blogs:blogs[0]});
   }
   catch(err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: offset });
  }
});

app.get('/get-blog/:blogId', (req, res) => {
  const Id = req.params.blogId;

  pool.query('SELECT * FROM blogs where id = ?',[Id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results[0]);
    }
  });
});


  

//getting the comments
app.get('/get-comments/:blogId', (req, res) => {
    const Id = req.params.blogId;

    pool.query('SELECT * FROM comments where postId = ?',[Id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    });
  });  
 


//creating a post
app.post('/create-blog', (req, res) => {

    const { title, name, email, shortdesc, body } = req.body;
  
    // SQL query to insert a new blog entry
    const sql = 'INSERT INTO blogs (title, authorname, email, shortdesc, body) VALUES (?, ?, ?, ?, ?)';
  
    // Execute the query with the user-provided data
    if(title && name && email && body){
        pool.query(sql, [title, name, email, shortdesc, body], (err, result) => {
            if (err) {
              console.error('Error inserting blog entry:', err);
              res.status(500).json({ error: 'Database error' });
            } else {
              console.log('Blog entry inserted successfully.');
              res.status(200).json({ submit:true,message: 'Blog entry inserted successfully' });
            }
          });
    }else{
        res.status(200).json({submit:false,message:"Please insert required data"});
    }
    

});


//delete a blod

app.delete('/delete-blog/:blogId', (req, res) => {
    const Id = req.params.blogId;
  
    // SQL query to delete the post with the specified postId
    const sql = 'DELETE FROM blogs WHERE id = ?';
  
    // Execute the query with the postId
    pool.query(sql, [Id], (err, result) => {
      if (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        console.log('Post deleted successfully.');
        res.status(200).json({ delete:true,message: 'Blog deleted successfully' });
      }
    });
  });





  //update blog
  app.post('/update-blog', (req, res) => {

    const { id,title, authorname, email, shortdesc, body } = req.body;
  
    // SQL query to insert a new blog entry
    const sql = 'UPDATE blogs SET title = ?, authorname = ?, email = ?, shortdesc = ?, body = ? where id = ?';
  
        // Execute the query with the user-provided data
        pool.query(sql, [title, authorname, email, shortdesc, body,id], (err, result) => {
            if (err) {
              console.error('Error inserting blog entry:', err);
              res.status(500).json({ error: 'Database error' });
            } else {
              console.log('Blog entry inserted successfully.');
              res.status(200).json({update:true, message: 'Blog updated successfully' });
            }
          });
});





//creating a comments
app.post('/create-comment', (req, res) => {
    const { name, email, postId, body } = req.body;
  
    // SQL query to insert a new comment
    const sql = 'INSERT INTO comments (name, email, postId, body,date) VALUES (?, ?, ?, ?,now())';
  
    // Execute the query with the user-provided data
    if(name,email,postId,body){
      pool.query(sql, [name, email, postId, body], (err, result) => {
        if (err) {
          console.error('Error inserting comment:', err);
          res.status(500).json({ error: 'Database error' });
        } else {
          console.log('Comment inserted successfully.');
          res.status(200).json({ submit:true,message: 'Comment inserted successfully' });
        }
      });
    }else{
      res.status(200).json({ submit:false,message: 'Please required data' });

    }
    
  });



  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  
  
  
  
  