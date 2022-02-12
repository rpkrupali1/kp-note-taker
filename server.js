const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes/index');
const htmlRoutes = require('./routes/htmlRoutes/index');

app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data
app.use(express.static('public')); //express middleware to have front end files available
app.use('/api',apiRoutes);
app.use('/',htmlRoutes);

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}!`);
});
