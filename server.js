import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';


const app = express();
dotenv.config();

app.set('view engine', 'pug');

//app.set('views', 'template');
app.use(
  session({
    secret: 'dev restaurant',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());


// lecture de fichier static
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'template')));


app.use(bodyParser.urlencoded({ extended: false }));

// midleware;




app.use('/favicon.ico', express.static('public/images/favicon.ico'));

app.get('/restaurant', (req, res) => {
  const payload = {
    pageTitle: 'Accueil',
    userLoggedIn: req.session.user,
    userLoggedInjs: JSON.stringify(req.session.user),
    successMessage: req.session.successMessage,
    // delete: delete req.session.successMessage,
  };

  res.status(200).render('booking', payload);
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
  const payload = {
    pageTitle: 'Accueil',
    

  };
  res.status(200).sendFile(path.join(__dirname, 'template', 'index.html'));
});


app.get('/details', (req, res) => {
  const payload = {
    pageTitle: 'Details',
    

  };
  res.status(200).sendFile(path.join(__dirname, 'template/details.html'));
});



// Démarrage du serveur
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});