process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const UserController = require('../../controller/userController');

const DAOFactory = require('../../js/daos/DAOFactory');

const bcrypt = require('bcrypt');
const session = require('express-session');

const usuarios = [
    {
        mail: 'carlos@gps.es',
        password: '',
        username: 'carlos',
        nombreCompleto: 'Carlos Manuel Gomes Bianco'
    },
];

describe('Tests de cerrar sesión', () => {
    new DAOFactory().getUserDAO().setDAOData(usuarios);

    const userController = new UserController();

    test('Cierrar sesión', async () => {
        usuarios[0].password = await bcrypt.hash('hola', 10);
        
        const req = new Request();
        const res = new Response();

        req.body.mail = 'carlos@gps.es';
        req.body.password = 'hola';

        // Configurar una sesión de prueba
        const sessionData = {
            cookie: { maxAge: 60000 },
            secret: 'mySecretKey',
            resave: false,
            saveUninitialized: true
        };
        const sessionMiddleware = session(sessionData);
        sessionMiddleware(req, res, () => {});

        await userController.postLogin(req, res);
        expect(req.session).toBeDefined();

        // Destruir la sesión de prueba
        delete req.session;
        expect(req.session).toBeUndefined();
    });
});
