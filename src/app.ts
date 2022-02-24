import feathers from '@feathersjs/feathers';
import express from "@feathersjs/express"
import socketio from '@feathersjs/socketio';
import '@feathersjs/transport-commons';
import { AccountsService } from './services';
import connectDB from './config/db';
import { Db } from 'mongodb';
import { AuthenticationService } from './services/authentication/authentication.service';


const main = async () => {
    // Creates an ExpressJS compatible Feathers application
    const app = express(feathers());

    // Express middleware to parse HTTP JSON bodies
    app.use(express.json());
    // Express middleware to parse URL-encoded params
    app.use(express.urlencoded({ extended: true }));
    // Express middleware to to host static files from the current folder
    app.use(express.static(__dirname));

    const db = await connectDB();
    // Add REST API support
    app.configure(express.rest());
    // Configure Socket.io real-time APIs
    app.configure(socketio());
    // Register our messages service
    app.use('/accounts', new AccountsService(db as Db));
    app.use('/authentication', new AuthenticationService(db as Db))
    // Express middleware with a nicer error handler
    app.use(express.errorHandler());

    // Add any new real-time connection to the `everybody` channel
    app.on('connection', connection =>
        app.channel('everybody').join(connection)
    );
    // Publish all events to the `everybody` channel
    app.publish(data => {
        console.log("data >>>", data);

        app.channel('everybody')
    });

    // Start the server
    app.listen(3030).on('listening', () =>
        console.log('Feathers server listening on localhost:3030')
    );

    // For good measure let's create a message
    // // So our API doesn't look so empty
    // app.service('accounts').create({
    //     email: "Nader@gmail.com",
    //     password: "1234"
    // });
}


main()