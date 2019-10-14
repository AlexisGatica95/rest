const express = require('express');
const router = express.Router();
const productosM = require('../../models/productosModel');

router.get('/', async (req,res,next)=> {
    res.json({ id: req.user_id})
}) //todo lo mandamos por authorization

router.put('/modificar/:id_p', async(req,res,next)=> {
    try {
        let obj = {
            nombre_p: req.body.nombre_p,
            descripcion_p: req.body.descripcion_p,
            precio_p: parseFloat(req.body.precio_p),
            stock_p: parseInt(req.body.stock_p),
            imagen_p: req.body.imagen_p
        };
        let id = parseInt(req.params.id_p);
        let modificado = await productosM.modificarProducto(id,obj);
        if (modificado) {
            res.json({status: 'ok', modificado: obj});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
    }
});

router.delete('/:id_p', async (req,res,next)=>{
    try {
        let id_p = req.params.id_p;
        let fueBorrado = await productosM.borrarProducto(id_p);
        if (fueBorrado) {
            res.json({status: 'ok', borrado: id_p});
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async(req,res,next)=> {
    try {
        let obj = {
            nombre_p: req.body.nombre_p,
            descripcion_p: req.body.descripcion_p,
            precio_p: parseFloat(req.body.precio_p),
            stock_p: parseInt(req.body.stock_p),
            imagen_p: req.body.imagen_p
        };

        let productos_insert = await productosM.insertProducto(obj);
        if (productos_insert != undefined) {
            res.json({status: 'ok', id: productos_insert});
        }
    } catch (error) {
        console.log('entro al catch del contrller');
        console.log(error);
        res.status(500).json({status: 'error'});
    }
});

module.exports = router;