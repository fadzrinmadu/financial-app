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

cashSchema.statics.deleteCashIn = async function({ id }) {
  const cashIn = await this.findOne({ _id: id, type: 'cash-in' });
  await cashIn.remove();
};

cashSchema.statics.editCashIn = async function(data) {
  const { id, date, amount, description } = data;
  const cashIn = await this.findOne({ _id: id });

  cashIn.date = date;
  cashIn.amount = amount;
  cashIn.description = description;

  await cashIn.save();
}

const Cash = mongoose.model('Cash', cashSchema);

module.exports = Cash;
