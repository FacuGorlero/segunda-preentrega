const express = require('express');
const { createServer} = require('node:http');
const serverIo = require('./routes/serverIO.js');
const {connectDb} = require('./config/index.js');
//const session = require('express-session');
//const cookieParser = require('cookie-parser');

const handlebars = require('express-handlebars');
const { viewsrouter } = require('./routes/views.route.js');
const appRouter     = require('./routes');

const port = 8080;
const app = express();
const server = createServer(app)
serverIo(server)

connectDb()

// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
/*app.use(session({
  secret: 'palabraSecretaa',
  resave: true,
  saveUninitialized: true
}))
app.use(cookieParser('palabraSecretaa'));*/

// motor de plantilla
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// definiendo vistas
app.use('/', viewsrouter);
app.use(appRouter)

// Confirmacion de inicio
server.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});

