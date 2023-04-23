const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('server deployed!'));

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}!`)
});