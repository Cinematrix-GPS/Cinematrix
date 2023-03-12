var should    = require("chai").should();
const {getPool} = require('../../../database/configDB');
const daoFilm = require('../filmDAO');
const fDAO = new daoFilm(getPool());
// https://www.paradigmadigital.com/dev/testeando-javascript-mocha-chai/


/* 
En Json sustituir
"test": "mocha --recursive --timeout 10000 ./js/daos/test",*/
describe('Probando test usando should', function(){
    describe('Probando test usando should', function(){
        it('Probando el retorno de la funcion ´postListByKeyWord´', function(){
            let result = fDAO.listFilms('Terminator');
            result.should.have.lengthOf(2);
        });
    
    });
});