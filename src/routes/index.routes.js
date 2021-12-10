const express = require('express')
const serveIndex = require('serve-index')
const path = require('path')
require('dotenv').config()
const nodeMailer = require('nodemailer')

const {
    Router
} = require('express');
const router = Router();

const transporter = nodeMailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.HOST,
        pass: process.env.PASS,
    },

});



const User = require('../models/user');

router.get('/', (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.statusCode(400).json({
                err
            });
        }

        if (users.length != 0) {
            res.render('index.ejs', {
                path: "Users",
                users
            });
        } else {
            const usuarios = [{
                nombre: "Michael Scott Lovo Rodriguez",
                codigo: "USIS013818"
            }, {
                nombre: "Melissa Estefania Diaz Orellana",
                codigo: "USIS038918"
            }, {
                nombre: "Laura Maria Rivas Guerrero",
                codigo: "USIS053818"
            }, {
                nombre: "Jimmy Edgardo Martinez",
                codigo: "USIS000718"
            }, {
                nombre: "Roberto Carlos Arguera Campos",
                codigo: "USIS008718"
            }];

            usuarios.forEach(element => {
                const local = new User(element);
                local.save((err) => {
                    if (err) {
                        console.log("Error al Guardar el usuario");
                    }
                });
            });

            User.find((err, users) => {
                if (err) {
                    return res.statusCode(400).json({
                        err
                    });
                }

                res.render('index.ejs', {
                    path: "Users",
                    users
                });
            });

        }
    });
});

router.post('/', async (req, res) => {
    const { mail } = req.body;
    const msg = {
        to: mail,
        from: `${process.env.HOST} < ${process.env.HOST}>`, // Use the email address or domain you verified above
        subject: 'Enviando mensaje desde servidor de:',
        text: 'parcial numero 3 sorftware libre',
        html: `
            <strong>
            <h3>Integrantes del grupo</h3>
            <hr/>
                <ul>
                    <li>Michael Scott Lovo Rodriguez USIS013818</li>
                    <li>Melissa Estefania Diaz Orellana USIS038918</li>
                    <li>Laura Maria Rivas Guerrero USIS053818</li>
                    <li>Jimmy Edgardo Martinez USIS000718</li>
                    <li>Roberto Carlos Arguera Campos USIS008718</li>
                    </ul>
            </strong>`,
    };

    try {
        // await sgMail.send(msg);
        await transporter.sendMail(msg)
        res.redirect('/')
    } catch (error) {
        if (error.response) {
            console.error(error.response.body)
        }
        console.log(error)
    }

});

router.use('/ftp-route',
    express.static(path.join(process.cwd(),
        '/src/public')
    ),
    serveIndex(path.join(process.cwd(),
        '/src/public'), { icons: true }
    )
);

module.exports = router;