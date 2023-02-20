const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(authRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);


mongoose.set("strictQuery", true);

mongoose.connect('mongodb+srv://aloksingh29565:%40Aloksingh00@cluster0.rjjrffa.mongodb.net/Expense?retryWrites=true&w=majority').then(() => {
    app.listen(5000);
    console.log("DB Connected");
  });
  



