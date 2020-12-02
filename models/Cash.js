const mongoose = require('mongoose');

const cashSchema = new mongoose.Schema({
  receiptNumber: {
    type: Number,
    required: true,
  },
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
  const { receiptNumber, date, amount, description } = data;
  const cashIn = await this.create({
    receiptNumber,
    date,
    amount,
    description,
    type: 'cash-in',
  });

  return cashIn;
};

const Cash = mongoose.model('Cash', cashSchema);

module.exports = Cash;
