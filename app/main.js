/**
 * @file
 * Application entry point.
 */

'use strict';

const fs = require('fs')
const express = require('express')
const https = require('https')
const http = require('http');
const appHttp = express()
const app = express()
const port = 8080
const portSsl = 443

if (process.env.NODE_ENV === 'development') {
    let debugInfo = `
Process information:
    NODE_ENV:           ${process.env.NODE_ENV},
    
    ports:              [${port}, ${portSsl}],
    node_args:          ${process.env.node_args},
    
    username:           ${process.env.username},
    watch:              ${process.env.watch},
    ignore_watch:       '${process.env.ignore_watch}',
    
    pm_pid_path:        ${process.env.pm_pid_path},
    pm_err_log_path:    ${process.env.pm_err_log_path},
    pm_out_log_path:    ${process.env.pm_out_log_path},
`
    console.log(debugInfo)
}

let httpsOptions = {
  key: fs.readFileSync('./sslcert/calcalc.key'),
  cert: fs.readFileSync('./sslcert/calcalc.crt')
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.json({
        "name": "Example Solr Document Indexer App",
        "version": "0.1.0",
        "apiVersion": "0.1.0",
        "api": {
            "todo": "Implement a example API description",
        }
    })
})

http.createServer(app).listen(port, () => {
    console.log(`HTTP server listening on http://localhost:${port}`)
})

/*// Redirect all non-secure traffic to HTTPS.
appHttp.all('*', (req, res) => {
    res.redirect(300, `https://localhost:${portSsl}`)
})
http.createServer(appHttp).listen(port, () => {
    console.log(`HTTP server listening on http://localhost:${port}`)
})

// Actual app server is secure.
https.createServer(httpsOptions, app).listen(portSsl, () => {
    console.log(`HTTPS server listening on https://localhost:${portSsl}`)
})*/
