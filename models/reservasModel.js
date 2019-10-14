function reservaFn(reserva) {
    let nombre = user.nombre;
    console.log('el modelo funciona');
    return {status: 'ok', nombre: nombre};
};

module.exports = {reservaFn};