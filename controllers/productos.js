const express = require('express');
const router = express.Router();
const productosM = require('../models/productosModel');
  
router.get('/precio/', async (req,res,next)=> {
  //req.query ---> valores que se pasan x la url
  try {
    let min = req.query.min;
    let max = req.query.max;
    console.log(min + 'controller' + max);
    let productos_ok = await productosM.getProductosPrecio(min,max);
    res.json({status : 'ok', data : productos_ok});
  } catch (err) {
    console.log({status: 'ok', data: productos_ok});
  }
});

//req
  //body
  //params = {id: 1}
  router.get('/:id', async (req, res, next) => {
    try {
      var id_p = parseInt(req.params.id);
      if(Number.isInteger(id_p)) {
        var producto = await productosM.getProducto(id_p);
        if (producto.length > 0) {
          res.json({status: 'ok', data: producto, cantidad: producto.length});
        } else {
          res.json({status: 'ok', cantidad: 0});
        }
      } else {
        res.json({status: 'invalid', id: id_p, req: req});
      }
    } catch (error) {
      console.log(error);
      console.log(req);
      res.status(500).json({status: 'error', error: error});
    }
    
  });

  
/* GET home page. */
router.get('/', async (req, res, next) => {
  //req.body: info que viene por POST (por ej formulario)
  //reg.params: productos/1
  //req.query: prodcutos?name=hola&precio=5000// files, session
  //res: respuesta (res.json({}))
  //next: sale de la funcion/corta el flujo de datos
  try {
    console.log(req.headers.authorization);
    let productos = await productosM.getProductos();
    console.log(productos);
    res.json({productos});
  } catch (error) {
    res.json({status: 'error'});
  }
  
});




module.exports = router;
