const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

let staticPath = path.join(__dirname, "public");

const app = express()

app.use(express.static(staticPath));

app.use(express.json());

let serviceAccount = require("./dream-flight-c6d25-firebase-adminsdk-lt8z9-e522e9e435");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

app.get('/registros', (req, res) => {
    res.sendFile(path.join(staticPath, "registros.html"));
})

const regex = {
    user: /^[a-zA-Z0-9]{6,30}$/,
	mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
};

app.post('/registros', (req, res) => {
    let { name, email, password, confirmPassword, tac, notification } = req.body;

    if (!name.length){
        return res.json({'alert': 'Campo obligatorio'});
    } else if (!regex.user.test(name)){
        return res.json({'alert': 'El nombre de usuario debe tener entre 4 y 30 caracteres alfanuméricos'});
    } else if (!email.length){
        return res.json({'alert': 'Campo obligatorio'});
    } else if (!regex.mail.test(email)){
        return res.json({'alert': 'Verifique que su correo electrónico tenga el formato: usuario@correo.com'});
    } else if (!password.length){
        return res.json({'alert': 'Campo obligatorio'});
    } else if (!regex.pass.test(password)){
        return res.json({'alert': 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y una longitud mínima de 8 caracteres'});
    } else if (!confirmPassword.length){
        return res.json({'alert': 'Campo obligatorio'});
    } else if (password != confirmPassword){
        return res.json({'alert': 'Las contraseñas no coinciden'});
    } else if (!tac){
        return res.json({'alert': 'Debe aceptar los términos y condiciones'});
    }
    
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert': 'La cuenta ya está registrada'});
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    bcrypt.hash(confirmPassword, salt, (err, hash) => {
                        req.body.confirmPassword = hash;        
                        db.collection('users').doc(email).set(req.body)
                        .then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                            })
                        
                        })     
                    })  
                })
            })
        }
    })
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            return res.json({'alert': 'El correo electrónico ingresado no existe'});
        } else{
            bcrypt.compare(password, user.data().password, (err, result) =>{
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                    })
                } else{
                    return res.json({'alert': 'Contraseña incorrecta'});
                }
            })
        }
    })      
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(staticPath, "about.html"));
})

app.get('/turismo', (req, res) => {
    res.sendFile(path.join(staticPath, "tourism.html"));
})

app.get('/naturaleza', (req, res) => {
    res.sendFile(path.join(staticPath, "t_eco.html"));
})

app.get('/gastronomia', (req, res) => {
    res.sendFile(path.join(staticPath, "t_gastro.html"));
})

app.get('/historia', (req, res) => {
    res.sendFile(path.join(staticPath, "t_histo.html"));
})

app.get('/aventura', (req, res) => {
    res.sendFile(path.join(staticPath, "t_aventura.html"));
})

app.get('/arte', (req, res) => {
    res.sendFile(path.join(staticPath, "t_art.html"));
})

app.get('/negocios', (req, res) => {
    res.sendFile(path.join(staticPath, "t_business.html"));
})

app.get('/servicios', (req, res) => {
    res.sendFile(path.join(staticPath, "services.html"));
})

app.get('/vuelos', (req, res) => {
    res.sendFile(path.join(staticPath, "flight.html"));
})

app.get('/hoteles', (req, res) => {
    res.sendFile(path.join(staticPath, "hotel.html"));
})

app.get('/autos', (req, res) => {
    res.sendFile(path.join(staticPath, "autos.html"));
})

app.get('/cruceros', (req, res) => {
    res.sendFile(path.join(staticPath, "cruceros.html"));
})

app.get('/motos', (req, res) => {
    res.sendFile(path.join(staticPath, "motos.html"));
})

app.get('/bicicletas', (req, res) => {
    res.sendFile(path.join(staticPath, "bicicletas.html"));
})

app.get('/trenes', (req, res) => {
    res.sendFile(path.join(staticPath, "trenes.html"));
})

app.get('/reservas', (req, res) => {
    res.sendFile(path.join(staticPath, "book.html"));
})

app.get('/guias', (req, res) => {
    res.sendFile(path.join(staticPath, "guides.html"));
})

app.get('/africa', (req, res) => {
    res.sendFile(path.join(staticPath, "africa.html"));
})

app.get('/america', (req, res) => {
    res.sendFile(path.join(staticPath, "america.html"));
})

app.get('/asia', (req, res) => {
    res.sendFile(path.join(staticPath, "asia.html"));
})

app.get('/europa', (req, res) => {
    res.sendFile(path.join(staticPath, "europa.html"));
})

app.get('/oceania', (req, res) => {
    res.sendFile(path.join(staticPath, "oceania.html"));
})

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(staticPath, "contact.html"));
})

app.post('/contacto', (req, res) => {
    let { name, email, message } = req.body;

    if (!name.length){
        return res.json({'alert': 'Campo obligatorio'});
    } else if (!email.length){
        return res.json({'alert': 'Campo obligatorio'});
    } else if (!message.length){
        return res.json({'alert': 'Campo obligatorio'});
    }
    
    db.collection('messages').doc(email).set(req.body)
    .then(data => {
        res.json({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message, 
        })
    })
})  

app.get('/politicas_datos', (req, res) => {
    res.sendFile(path.join(staticPath, "data.html"));
})

app.get('/terminos_condiciones', (req, res) => {
    res.sendFile(path.join(staticPath, "legal.html"));
})

app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})