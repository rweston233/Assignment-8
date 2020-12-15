let mysql = require('mysql2');
let dbInfo = require('./dbInfo.js');
let express = require('express');
let bodyParser = require("body-parser");

let app = express();

// Add static route for non-Node.js pages
app.use(express.static('public'));

// Configure body parser for handling post operations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get songs
app.get('/songs/:songID?', function (req, res) {
   console.log("Route /songs GET", req.params);
   let data = [];
   let sql = "SELECT * FROM songs";
   if (req.params.member_ID != undefined) {
      sql += " WHERE songID = ?";
      data = [req.params.songID];
      // Object technique:
      // sql += " WHERE ?";
      // data = req.params;
      console.log(data);
   } else {
      sql += " ORDER BY songID";
   }
   console.log("SQL", sql);
   connection.query(sql, data,
      function (errQuery, rows) {
         if (errQuery) {
            console.log(errQuery);
            res.json({rows: [], err: errQuery});
         } else if (rows) {
            console.log("Rows returned", rows.length);
            res.json({rows: rows, err: ""});
         } else {
            console.log("No songs rows...\n");
            res.json({rows: [], err: ""});
         }
      }
   );
});

// Get streams
app.get('/streams/:streamID?', function (req, res) {
   console.log("Route /streams GET", req.params);
   let data = [];
   let sql = "SELECT * FROM streams";
   if (req.params.member_ID != undefined) {
      sql += " WHERE streamID = ?";
      data = [req.params.streamID];
      // Object technique:
      // sql += " WHERE ?";
      // data = req.params;
      console.log(data);
   } else {
      sql += " ORDER BY streamID";
   }
   console.log("SQL", sql);
   connection.query(sql, data,
      function (errQuery, rows) {
         if (errQuery) {
            console.log(errQuery);
            res.json({rows: [], err: errQuery});
         } else if (rows) {
            console.log("Rows returned", rows.length);
            res.json({rows: rows, err: ""});
         } else {
            console.log("No streams rows...\n");
            res.json({rows: [], err: ""});
         }
      }
   );
});


// Add stream (POST)
app.post('/streams', function (req, res) {
   console.log("Route /streams POST");
   let data = {userID: req.body.user, songID: req.body.song, streamDate: req.body.dateTime};
   connection.query("INSERT INTO streams SET ?", 
      data, 
      function (errQuery, result) {
         if (errQuery) {
            console.log(errQuery);
            res.json({status: "Error", err: errQuery});
         } else {
            console.log("Insert ID: ", result.insertId);
            res.json({status: result.insertId, err: ""});
         }
      }
   );
});

// Delete stream
app.delete('/streams/:streamID?', function (req, res) {
   console.log("Route /streams DELETE");
   let sql = "DELETE FROM streams WHERE streamID = ?";
   // Object technique:
   // let sql = "DELETE FROM streams WHERE ?";
   if (req.params.streamID != undefined) {
      let data = [req.params.streamID];
      // Object technique:
      // let data = {member_ID: req.params.member_ID};
      connection.query(sql, 
         data, 
         function (errQuery, result) {
            if (errQuery) {
               console.log(errQuery);
               res.json({status: "Error", err: errQuery});
            } else {
               console.log("Deleted");
               res.json({status: "Deleted", err: ""});
            }
         }
      );
   } else {
      let s = "Invalid or missing streamID";
      console.log(s);
      res.json({status: "Error", err: s});
   }
});

// Update streams
app.put('/streams', function (req, res) {
    console.log("Route /streams PUT");
    let data = [{streamID: req.body.stID, userID: req.body.user, songID: req.body.song, streamDate: req.body.dateTime}, req.body.id];
    connection.query("UPDATE streams SET ? WHERE streamID= ?",  
       data, 
       function (errQuery, result) {
          if (errQuery) {
             console.log(errQuery);
             res.json({status: "Error", err: errQuery});
          } else {
             console.log("Updated ID: ", req.body.id, ", Affected Rows: ", result.affectedRows);
             res.json({status: req.body.id, err: "", message: "Row updated"});         }
       }
    );
 });

// // Use NodeJS as our web server, needed to prevent cross origin (CORS) error
// // typically seen on Chrome
// app.get('/color.css', function(req, res) {
//    res.sendFile(__dirname + '/color.css');
// });

// app.get('/color.html', function(req, res) {
//    res.sendFile(__dirname + '/color.html');
// });

// app.get('/color.js', function(req, res) {
//    res.sendFile(__dirname + '/color.js');
// });

// Handle missing pages requested using GET HTTP verb
app.get('*', function(req, res) {
   res.status(404).send('Sorry that page does not exist');
});

// Create database connection
console.log('Creating connection...\n');
let connection = mysql.createConnection({
   host: dbInfo.dbHost,
   port: dbInfo.dbPort,
   user: dbInfo.dbUser,
   password: dbInfo.dbPassword,
   database: dbInfo.dbDatabase
});
// Connect to database
connection.connect(function(err) {
   console.log('Connecting to database...\n');

   // Handle any errors
   if (err) {
      console.log(err);
      console.log('Exiting application...\n');
   } else {
      console.log('Connected to database...\n');
      // Listen for connections
      // Note: Will terminate with an error if database connection
      // is closed
      const ip = 'localhost';
      const port = 8080;
      app.listen(port, ip, function () {
         try {
            console.log('members server app listening on port ' + port);
         } catch (err) {
            console.log(err);
         }
      });
   }
});

