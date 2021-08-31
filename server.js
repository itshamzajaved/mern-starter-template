const express = require('express');
const app = express();
const port= process.env.PORT || 8000;
const logger = require('morgan');
const http = require('http');
const authRoutes = require('./routes/auth.js');
// 4mfHlrkDDipOwdYN
app.set("port", port);

require("./database/connection.js")

// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);





if (process.env.NODE_ENV !== "production") {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
  })
  app.listen(port);
}else {
    // /** catch 404 and forward to error handler */
    app.use(logger('dev'))
    app.use('*', (req, res) => {
        return res.status(404).json({
          success: false,
          message: 'API endpoint doesnt exist'
        })
      });

    /** Create HTTP server. */
    const server = http.createServer(app);
    /** Listen on provided port, on all network interfaces. */
    server.listen(port);
    /** Event listener for HTTP server "listening" event. */
    server.on("listening", () => {
      console.log(`Listening on http://localhost:${port}/`)
    });
}
