var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require('fs');

const jwt = require('jsonwebtoken');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
const productosRouter = require('./controllers/productos');
const usuariosRouter = require('./controllers/usuarios');
const reservasRouter = require('./controllers/reservas');

const prodAdminRouter = require('./controllers/admin/productosAdmin');


const auth = require('./controllers/auth');
//const dotenv = require('dotenv');
//dotenv.config();

// en clase 8/10
const registro = require('./controllers/registro');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





//Middelwere para comprobar un acceso 
//definimos una funcion
secured = async (req,res,next)=>{
  try {
    //headers: conten-type
  //authorizatin : token --dentro del header mandamos el token
  let token = req.headers.authorization;

  //reemplaza el 'jwt ' y solo deja el token para poder operar
  console.log('token que llega del cliente : ',token)
    token = token.replace('jwt ','');
    //clave privada para generar el token y la publica para validarlo
    const publicKey = fs.readFileSync('./keys/publica.pem');
  
    let decoded = jwt.verify(token, publicKey);//decod es el token decodificado
    console.log('jwt decoded : ', decoded);
    req.user_id = decoded.id;
    next();// una vez que se verifica sigue 
  } catch (error) {
    res.status(500).json({status : 'error'})
  }
  
}


securedAdmin = async (req,res,next)=>{
      try {
       //headers: conten-type
  //authorizatin : token --dentro del header mandamos el token
  let token = req.headers.authorization;

  //reemplaza el 'jwt ' y solo deja el token para poder operar
  console.log('token que llega del cliente : ',token)
    token = token.replace('jwt ','');
    //clave privada para generar el token y la publica para validarlo
    const publicKey = fs.readFileSync('./keys/publica.pem');
  
    let decoded = jwt.verify(token, publicKey);//decod es el token decodificado
    console.log(decoded);
    if (decoded == "") {
      console.log('hubo un error con el token');
      res.status(500).json({status : 'error'})
    }
    req.user_id = decoded.id;
      if (decoded.permisos == 1) {
        next();
      } else {
        console.log('error');
      }
        
    } catch (error) {
      res.status(500).json({status : 'error'})
    }
}

//rutas que no requieren estar logueado    
app.use('/auth',auth);
app.use('/registro' , registro);
app.use('/productos', productosRouter);
//rutas que requieren estar logueado como usuario
app.use('/usuarios', secured, usuariosRouter);
//rutas que requieren estar logueado como admin
app.use('/productosAdmin', securedAdmin, prodAdminRouter);
//no sabemo que onda
app.use('/reservas', reservasRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
