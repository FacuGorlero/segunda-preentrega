const { Router } =  require('express');
const { CartMongo} = require('../Daos-Mongo/mongo/cart.daomongo');

const router = Router()
const carrito = new CartMongo;

router.get('/', async (req, res) => {
  let {populate} = req.query;
  populate = populate || true;
  const resp = await carrito.getCarts(populate,null);

  if (typeof resp === 'string') {
    res.status(400).json({
      status: 'fail',
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }

})


router.get('/:cid', async (req,res)=>{
    const id = req.params.cid

    let {populate} = req.params.cid;
    populate = populate || true;

    const resp = await carrito.getCarts(id, populate);


    if (typeof (resp) === "string") {
        res.status(400).json({
          status: "fail",
          data: resp
      })}
       else {
        res.status(200).json({
          status: "ok",
          data: resp
      })}
    })

    router.post('/' , async (req, res) => {

        const id = await carrito.create()
      
        res.status(200).json({
          status: "ok",
          data: id
      })
      })

      router.post('/:cid/product/:pid', async (req,res) => {
        const resp = await carrito.create();

        if (typeof resp === 'string') {
          res.status(400).json({
            status: 'fail',
            payload: resp,
          });
        } else {
          res.status(200).json({
            status: 'ok',
            payload: resp,
          });
        }
      })

      router.put('/cid' , async (req, res) => {
        const cid = await req.params.cid;
        const newProducts = req.body

        const resp = await carrito.updateCartProducts(cid, newProducts)

        if (typeof resp === 'string') {
          res.status(400).json({
            status: 'fail',
            data: resp,
          });
        } else {
          res.status(200).json({
            status: 'ok',
            data: resp,
          });
        }

      });

      router.delete('/cid', async (req,res) => {
        const cid = res.params.cid

        const resp = await carrito.removeCartProducts(cid)

        if (typeof resp === 'string') {
          res.status(400).json({
            status: 'fail',
            data: resp,
          });
        } else {
          res.status(200).json({
            status: 'ok',
            data: resp,
          });
        }
      })
      
      router.post('/:cid/product/:pid' , async (req, res) => {
        const {cid, pid} = req.params
      
        const resp = await carrito.addProduct(cid,pid)
      
        if (typeof (resp) === "string") {
          res.status(400).json({
            status: "fail",
            data: resp
        })} else {
          res.status(200).json({
            status: "ok",
            data: resp
        })}
      })
      
      router.put('/:cid/product/:pid', async (req, res) => {
        const {cid, pid} = req.params;
        const {quantity} = req.body
        let resp
      
        if (isNaN(quantity) ) {
          resp = "Se ha introducido mal la cantidad"
        } else {
          resp = await carrito.updateCartQuantity(cid, pid, quantity);
        }
      
        if (typeof resp === 'string') {
          res.status(400).json({
            status: 'fail',
            data: resp,
          });
        } else {
          res.status(200).json({
            status: 'ok',
            data: resp,
          });
        }
      });
      
      router.delete('/:cid/product/:pid', async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
      
        const resp = await carrito.removeProduct(cid, pid);
      
        if (typeof resp === 'string') {
          res.status(400).json({
            status: 'fail',
            data: resp,
          });
        } else {
          res.status(200).json({
            status: 'ok',
            data: resp,
          });
        }
      });

exports.cartsRouter = router;