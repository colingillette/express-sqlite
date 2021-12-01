const express = require('express');
const app = express();
var db = require('./database.js');

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const apiRouter = express.Router();
app.use('/api', apiRouter);

app.get('/', (req, res, next) => {
    res.json({"message":"Ok"});
});

apiRouter.get('/users', (req, res, next) => {
    const sql = 'SELECT * FROM user';
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});