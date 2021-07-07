#/bin/env sh

npm install

if [ ! -L /app/bin/pm2 ]; then
    if [ ! -d /app/bin ]; then
        mkdir /app/bin
    fi
    ln -s /app/node_modules/pm2/bin/pm2 /app/bin/pm2
fi
