const { Router } = require('express');
const {ProductMongo} = require('../Daos-Mongo/mongo/products.daomongo');

const router = Router();

const productos = new ProductMongo();

router.get('/', async (req, res) => {
    let {limit} = req.query;

    const getProducts = await productos.getProducts();

    if(!limit || limit > prodadevolver.length){
        res.status(200).json({
            status: 'ok',
            data: getProducts
        });
    }else{
        res.status(200).json({
            status: 'ok',
            data: getProducts
    });
}
});
router.get('/:id', async (req, res) => {
const id = req.params.id * 1;
const getProducts =  await productos.getProductsById(id);

if(typeof getProducts === 'string'){
    res.status(404).json({
        status: 'fail',
        data: getProducts,
      });
    } else {
      res.status(200).json({
        status: 'ok',
        data: getProducts,
      });
    }
  });

  router.post('/', async (req, res) => {

    const  newProduct = req.body;
    const resp = await productos.addProduct(newProduct)

    if(typeof (resp)=== 'string'){
        res.status(400).json({
            status: "fail",
            data: resp
        })} else {
          res.status(200).json({
            status: "ok",
            data: resp
        })}
      });

router.put('/:id', async (req, res) => {
    const id =req.params.id * 1;
    const changedProduct = req.body

    const resp = await productos.updateProduct(id, changedProduct)

    if (typeof (resp) === "string") {
        res.status(400).json({
          status: "fail",
          data: resp
      })} else {
        res.status(200).json({
          status: "ok",
          data: resp
      })}
    
    });


router.delete('/:id', async (req, res)=> {
    const id = req.params.id +1;
    const resp = await productos.deleteProduct(id);

    if (typeof (resp) === "string") {
        res.status(400).json({
          status: "fail",
          data: resp
      })} else {  
        res.status(200).json({
          status: "ok",
          data: resp
      })}



});





exports.productosrouter = router;