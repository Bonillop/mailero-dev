# React-Node-App

# Heroku

## Deploy

First of all we have to set a dinamic port binding, by simply taking the `process.env.PORT` and using it in the `app.listen()` function. We then can default it to another port for the development evironment

To succesfully deploy to heroku we need to specify the `node` and `npm` version inside `engine` in `package.json`

It is also important to define the `start` script in `package.json`, for example `"node index.js"`

Heroku integrates very well with git so it is important to define a `.gitignore` file with at least the `/node_modules` folder