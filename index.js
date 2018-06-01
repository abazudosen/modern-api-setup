const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const server  = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect('mongodb://abazudosen:testing123@ds245240.mlab.com:45240/my-powerful-demo-api')
mongoose.connection.once('open', () => {
    console.log('connected to DB');
});

const init = async () => { 

    server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            return `<h1>my modern api</h1>`;
        }
    },
    {
        method: 'GET',
        path: '/api/v1/paintings',
        handler: (req, reply) => {
            return Painting.find();
        }
    },
    {
        method: 'POST',
        path: '/api/v1/paintings',
        handler: (req, reply) => {
            const {name, url, techniques} = req.payload;
            const painting = new Painting({
                name,
                url,
                techniques
            });
            
            return painting.save();
        }
    }
]);


    await server.start();
    console.log(`server running at:${server.info.uri}`);
}

init();