const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => res.render('home'));
router.get('/index', (req, res) => res.render('index'));


// verificamos si el usuario tiene una session activa, de ser así, lo redirigimos a la siguiente ruta, en este caso
// /secret
// en caso contrario, redirigimos al usuario a /login

router.use((req, res, next) => {
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route 
  } else {
    res.redirect("/login");
  }
});

// renderizamos la plantilla secret.hbs con el username
// deconstruimos en la variable username el username de req.session.currentUser

router.get('/main', (req, res) => res.render('main'));
router.get('/private', (req, res) => res.render('private'));

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // si no puede acceder a los datos de sesión, redirige a /login
    res.redirect("/login");
  });
});


module.exports = router;
