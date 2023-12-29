const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { Router } = require('express')


const { productosrouter} = require("./routes/products.route.js");
const { cartsRouter } = require ("./routes/cart.route.js");
const {viewsrouter} = require("./routes/views.route.js");


const {connectDb} = require("./config");
const {ProductMongo} = require('./Daos-Mongo/mongo/products.daomongo.js');
const {MessageMongo} = require('./Daos-Mongo/mongo/message.daomongo.js');

const router = Router();


const app = express();
const port = 8080;

connectDb();


// configuraciones de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// motor de plantilla
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views")

// definiendo vistas
app.use('/', viewsrouter)


app.use("/api/products", productosrouter)
app.use('/api/carts/', cartsRouter)
router.delete('./api/messages', async () =>{
  await messages.clearMessages();
  res.status(200).json({
    status: 'ok',
  });
})


app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('Error de server')
})

const serverHttp = app.listen(port, () => {
  console.log(`Server andando en port ${port}`);
});


// Servidor WebSocket
const ServerIO = new Server(serverHttp)

const products = new ProductMongo();
const messages = new MessageMongo();


ServerIO.on('connection', io => {
  
console.log('nuevo cliente conectado')


//REAL TIME PRODUCT
io.on('nuevoproducto', async newProduct => {
   await products.addProduct(newProduct)
   console.log(newProduct)
  const listproduct = await products.getProducts();

  io.emit('productos', listproduct)

})

io.on ('eliminarProducto', async code => {
  await products.deleteProductByCode(code);
  const listproduct = await products.getProducts()  

  io.emit ('productos', listproduct)

})

// chat

io.on('message', async (data) => {
  const newMessage = await messages.addMessage(data);
  io.emit('messageLogs', newMessage)
})

io.on('init', async () =>{
  io.emit('messageLogs', newMessage)
})



});

