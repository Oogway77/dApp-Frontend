## Environment Setup for Frontend Development

Install yarn
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

Install required packages
```bash
yarn install
```

Note that the default api server base request url is defined in:
`frontend/src/config/config.js`

## Run the Frontend Dev Web Server

Run the frontend development server with file watcher

```bash
yarn start
```

To specify backend server api url set:

```bash
REACT_APP_HTTP_API_URL=http://127.0.0.1:8080/api PORT=3000 yarn start
```

This can also be persisted in a file `.env`:

~~~
REACT_APP_HTTP_API_URL=http://127.0.0.1:8080/api
PORT=3000
~~~

__NOTE:__ Also allow cross-origin request in the browser. CORS Everywhere is a plugin which can be used for this.

## Start Local Production Build Web Server

~~~shell
docker-compose up --build
~~~


