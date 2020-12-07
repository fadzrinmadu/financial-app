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

cashSchema.statics.getTotalCashIn = async function() {
  const dataCashIn = await this.find().where({ type: 'cash-in' });
  const totalCashIn = dataCashIn.reduce((total, item) => total + item.amount, 0);
  return totalCashIn;
};

cashSchema.statics.getTotalCashInByPeriod = async function(month, year) {
  const dataCashIn = await this.getCashInByPeriod(month, year);
  const totalCashIn = dataCashIn.reduce((total, item) => total + item.amount, 0);
  return totalCashIn;
};

cashSchema.statics.getTotalCashOut = async function() {
  const dataCashOut = await this.find().where({ type: 'cash-out' });
  const totalCashOut = dataCashOut.reduce((total, item) => total + item.amount, 0);
  return totalCashOut;
};

cashSchema.statics.getTotalCashOutByPeriod = async function(month, year) {
  const dataCashOut = await this.getCashOutByPeriod(month, year);
  const totalCashOut = dataCashOut.reduce((total, item) => total + item.amount, 0);
  return totalCashOut;
};

cashSchema.statics.getTotalCash = async function() {
  const totalCashIn = await this.getTotalCashIn();
  const totalCashOut = await this.getTotalCashOut();
  const totalCash = totalCashIn - totalCashOut;
  return totalCash;
};

cashSchema.statics.getCashByPeriod = async function(month, year) {
  const cashes = await this.aggregate([
    {
      $addFields: {
        'month': { $month: '$date' },
        'year': { $year: '$date' },
      },
    },
    {
      $match: {
        month: parseInt(month), 
        year: parseInt(year),
      },
    },
  ]).sort({ date: 'asc' });

  return cashes;
};

cashSchema.statics.getCashInByPeriod = async function(month, year) {
  const cashes = await this.aggregate([
    {
      $match: { type: 'cash-in' },
    },
    {
      $addFields: {
        'month': { $month: '$date' },
        'year': { $year: '$date' },
      },
    },
    {
      $match: {
        month: parseInt(month), 
        year: parseInt(year),
      },
    },
  ])
  .sort({ date: 'asc' });

  return cashes;
};

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

cashSchema.statics.getCashOutByPeriod = async function(month, year) {
  const cashes = await this.aggregate([
    {
      $match: { type: 'cash-out' },
    },
    {
      $addFields: {
        'month': { $month: '$date' },
        'year': { $year: '$date' },
      },
    },
    {
      $match: {
        month: parseInt(month), 
        year: parseInt(year),
      },
    },
  ])
  .sort({ date: 'asc' });

  return cashes;
};

cashSchema.statics.addCashOut = async function(data) {
  const { date, amount, description } = data;
  const totalCash = await this.getTotalCash();

  if (amount > totalCash) {
    throw Error('Jumlah kas anda tidak cukup!');
  }

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
  const totalCash = await this.getTotalCash();

  if (amount > totalCash) {
    throw Error('Jumlah kas anda tidak cukup!');
  }

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
