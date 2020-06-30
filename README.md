# Mailero
This is a practice app that lets a user register with OAuth, then it has the ability to process credit card payments in order to buy credits which then can be used to create email surveys and send them to collect feedback from other internet users

# Backend
The backend is made with Node using Express framework

# APIS

# OAuth
OAuth is handled with `Passportjs`. 

But we use at least 2 libraries `passport` is the core for handling auth in express apps

Then we use `passport strategy` for the specific provider, for example google. facebook or github.

# Stripe
Stripe is an API that handles payment with credit cards, you have to sign in on their website and then use the provided API keys along with the component to work with it

Note: on the frontend we only use the publishable key while in the backend we use the publishable and the secret key, both handled with their respective environment variables setup

# Mongo Atlas
Cloud Db service for mongodb to set up the database

# Sendgrid
Email delivery service for that part of our app


# Body parser
A middleware commonly used with express to parse the body of a post request into de req.body object

> app.use(bodyParser.json());

# Express file structure
One approach of folder structure is:

- config - protected API keys and settings
- routes - route handlers
- services/helpers - helper modules and business logic
- index.js - main file

# Concurrently
it also needs `http-proxy-middleware` dependency
Used to launch both client and express servers at the same time with one command, see `package.json` (`not /client/package.json`)
it requires a `setupProxy.js` in the `src` folder to do the mapping of urls to proxy in the client folder

this can also be done with `nginx` or via `docker-compose` with an `nginx` container

# Heroku
Heroku is a cloud application platform that can be used to deploy our applications using a git repository schema along with some other configurations

## Deploy

First of all we have to set a dinamic port binding, by simply taking the `process.env.PORT` and using it in the `app.listen()` function. We then can default it to another port for the development evironment

To succesfully deploy to heroku we need to specify the `node` and `npm` version inside `engine` in `package.json`

It is also important to define the `start` script in `package.json`, for example `"node index.js"`

Heroku integrates very well with git so it is important to define a `.gitignore` file with at least the `/node_modules` folder

## heroku-prebuild, heroku-postbuild
We can define a postinstall script in our package.json that heroku will run after it has build the project, in order to, for example in this case, build the client side of our application

    "scripts": {
      "heroku-prebuild": "echo This runs before Heroku installs dependencies.",
      "heroku-postbuild": "echo This runs after Heroku installs dependencies, but before Heroku prunes and caches     dependencies.",
      "heroku-cleanup": "echo This runs after Heroku prunes and caches dependencies."
    }

in our app
> "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

We first set the NPM_CONFIG_PRODUCTION environment variable to false, only for this command, that way npm understands that it also needs to install devDependencies in order to have them and properly build the application. Then we run the npm install inside the client directory (--prefix client sets the directory), and after that we run the build script, again in the client directory

## CLI
first download the CLI, once installed we must login using the command `heroku login`, then we create an app with te command `heroku create`, it is important to have initialized a git repository in order to later deploy to heroku. this command gives you an url to set as a remote heroku repository, so you then have to run this command ` git remote add heroku [the given url]` (In some cases may not be necesary)

after that to push any changes and deploy or redeploy we have to use the following command `git push heroku master`

to see the app `heroku open`
***
# Frontend

## Enviroment variables
Create-react-app exposes a `NODE_ENV` variable in `process.env.NODE_ENV` where we can check the current environment

We can also create .env files with the env variables, but react requires that we use REACT_APP_[name of the variable] in order to use them
# React-Redux
The library react-redux was made to integrate react and redux, since by default they do not work together

## Quick setup

- Define the store with the state to be managed by Redux
- Define the action types and make action creators accordingly
- Define and create one or many reducers, if more than one combine them with combineReducers function. See `reducers/index.js`
- Create the store with the reducer or combinedReducers and applyMiddleware with reduxThunk
- Wrap the App component (or the component to be state managed by redux) with the `<Provider>` component with the store as the store attribute
- Connect the component with the store using the connect function in the export of the component, define a `mapStateToProps` function if you need to read the store into the props, and also an array of actions that the component can do. Any can be null

## Folders

- **reducers**: contains every reducer plus an `index.js` in which we define the combineReducer function which allows to combine all the reducers into a single function that we pass to the createStore
- **actions**: contains a `type.js` file in which we define all the actions and an `index.js` file where we define the actual action creator functions

## Provider component
The provider component is a react component that receives the store and wraps the entire App, it knows how to read changes from the store

## createStore function
Lets us create the store, receives a function that has to be either a reducer or a combinedReducers function, also receives an store enhancer which is a function that, in this case applies middlewares, such as redux thunk

## connect function
The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

## applyMiddleware function
Can be passed as an store enhancer that lets you use middlewares for every store call such as reduxThunk


## Redux thunk middleware
With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extend the store's abilities, and let you write async logic that interacts with the store.

It is a middleware that looks at every action that passes through the system, and if it’s a function, it calls that function.

Redux thunk expects that your actions return a function, with a `dispatch` and `getState` arguments which are other function provided by the middleware, that contains your action logic and finally call the dispatch function with and object representing the action with a `type` and `payload` properties. ex

    function logOutUser() {
      return function(dispatch, getState) {
        return axios.post('/logout').then(function () {
        // pretend we declared an action creator \
        // called 'userLoggedOut', and now we can\ dispatch it
        dispatch(userLoggedOut());\
      });\
     };\
    }

## connect function
The connect function is what lets a component connect to and use the store, it can receive as a first argument a
mapStateToProps function, that takes a piece of the store and maps it as props of the component. And as a second
argument it can receive an array of functions that get translated to props, which usually will be the actions that component performs on the store

## combineReducers function
The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.

## Conventions
reducers folder should go inside src, and should have an `index.js` file, along with all the reducer files




## ReactStripeCheckout component
`npm install react-stripe-checkout`, you then have to import it and use it as any component, but it has some required properties

- amount, amount of money in cents
- token, the token that the api returns in order to verify the operation
- stripeKey, our REACT_APP_STRIPE_KEY


optional
- currency, defaults to USD
- name, represents the title
- description, can add a brief description

I we want to style the default button, we must add a child component with the style, for example our own styled button