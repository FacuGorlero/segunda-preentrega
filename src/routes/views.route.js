const {Router} = require('express');
const {ProductMongo} = require('../Daos-Mongo/mongo/products.daomongo');
const router = Router();

const productos = new ProductMongo();

router.get('/', async (req, res) => {

    let product = await productos.getProducts();

    product.forEach(prd => {
        prd.price = new Intl.NumberFormat('es-ES', {style: 'decimal'}).format(prd.price);
    })

    res.render('home',{
        title: 'ComercioSport Club',
        product,
    })

})


router.get('/realtimeproducts', async (req, res) => {
    const product = await productos.getProducts();

    product.forEach(prd => {
        prd.price = new Intl.NumberFormat('es-ES', {style: 'decimal'}).format(prd.price)
      })

    res.render('realtimeproducts',{
        title: 'ComercioSport Club',
        product,
    });
})

router.get('/chat', async (req, res) => {
    res.render('chat', {

    })
})

exports.viewsrouter = router;