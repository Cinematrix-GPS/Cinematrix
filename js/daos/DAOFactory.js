const {getPool} = require('../../database/configDB')

const FilmDAO = require('./filmDAO');
const FilmDAOStub = require('../../tests/stubs/filmDAOstub');

const UserDAO = require('./userDAO');
const UserDAOStub = require('../../tests/stubs/userDAOstub');

const RateDAO = require('./rateDAO');
const RateDAOStub = require('../../tests/stubs/rateDAOstub');

const CommentDAO = require('./commentDAO');
const CommentDAOStub = require('../../tests/stubs/commentDAOstub');

class DAOFactory{

	getFilmDAO(){
		if (process.env.NODE_ENV === 'testing')
			return new FilmDAOStub();
		else
			return new FilmDAO(getPool());
	}

	getUserDAO(){
		if (process.env.NODE_ENV === 'testing')
			return new UserDAOStub();
		else
			return new UserDAO(getPool());
	}

	getRateDAO(){
		if (process.env.NODE_ENV === 'testing')
			return new RateDAOStub();
		else
			return new RateDAO(getPool());
	}

	getCommentDAO(){
		if (process.env.NODE_ENV === 'testing')
			return new CommentDAOStub();
		else
			return new CommentDAO(getPool());
	}
}

module.exports = DAOFactory;