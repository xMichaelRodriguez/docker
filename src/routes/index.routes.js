const express = require('express')
const serveIndex = require('serve-index')
const path = require('path')
const sgMail = require('@sendgrid/mail');

const {
    Router
} = require('express');
const router = Router();

const key = "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";
sgMail.setApiKey("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");
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

    const {mail} = req.body;
console.log(mail)
    const msg = {
        to: mail,
        from: 'michael5031rodriguez@gmail.com', // Use the email address or domain you verified above
        subject: 'Enviando mensaje desde servidor de:',
        text: 'parcial numero 3 sorftware libre',
        html: `
            <strong>
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
        await sgMail.send(msg);
        res.redirect('/')
    } catch (error) {
        if (error.response) {
            console.error(error.response.body)
        }
        console.log(error)
    }

});

router.use('/ftp-route', express.static(path.join(process.cwd(), '/src/public')), serveIndex(path.join(process.cwd(), '/src/public'), { icons: true }));

module.exports = router;
console.log(path.join(process.cwd(), '/src/public'))