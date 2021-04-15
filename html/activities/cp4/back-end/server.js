const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/bball', {
  useNewUrlParser: true
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    offrating: req.body.offrating,
    defrating: req.body.defrating,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const itemSchema = new mongoose.Schema({
  title: String,
  offrating: Number,
  defrating: Number,
});

const Item = mongoose.model('Item', itemSchema);

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.offrating = req.body.offrating;
    item.defrating = req.body.defrating;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


app.listen(3002, () => console.log('Server listening on port 3002!'));
