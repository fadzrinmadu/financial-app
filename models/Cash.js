const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['cash-in', 'cash-out'],
    required: true,
  },
});

cashSchema.statics.addCashIn = async function(data) {
  const { date, amount, description } = data;

  const cashIn = await this.create({
    date,
    amount,
    description,
    type: 'cash-in',
  });

  return cashIn;
};

cashSchema.statics.editCashIn = async function(data) {
  const { id, date, amount, description } = data;
  const cashIn = await this.findOne({ _id: id });

  cashIn.date = date;
  cashIn.amount = amount;
  cashIn.description = description;

  await cashIn.save();
};

cashSchema.statics.deleteCashIn = async function({ id }) {
  const cashIn = await this.findOne({ _id: id, type: 'cash-in' });
  await cashIn.remove();
};

cashSchema.statics.addCashOut = async function(data) {
  const { date, amount, description } = data;

  const cashOut = await this.create({
    date,
    amount,
    description,
    type: 'cash-out',
  });

  return cashOut;
};

cashSchema.statics.editCashOut = async function(data) {
  const { id, date, amount, description } = data;
  const cashOut = await this.findOne({ _id: id });

  cashOut.date = date;
  cashOut.amount = amount;
  cashOut.description = description;

  await cashOut.save();
};

cashSchema.statics.deleteCashOut = async function({ id }) {
  const cashOut = await this.findOne({ _id: id, type: 'cash-out' });
  await cashOut.remove();
};

const Cash = mongoose.model('Cash', cashSchema);

module.exports = Cash;
