module.exports = {
  apps : [{
    name:           "docstore",
    script:         "./main.js",
    watch:          true,
    ignore_watch:   ['pm2', 'node_module', 'public', 'logs'],
    
    exp_backoff_restart_delay: 100,
    
    pid_file:       "./pm2/app.pid",
    error_file:     "./pm2/app_error.log",
    out_file:       "./pm2/app_out.log",
    
    env: {
        NODE_ENV:     "development",
    },
    env_test: {
        NODE_ENV:     "test",
    },
    env_production: {
        NODE_ENV:     "production",
    }
  }]
}
