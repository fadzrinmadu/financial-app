const mongoose = require('mongoose');
const seeder = require('mongoose-seed');

seeder.connect('mongodb://localhost/db_cash', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, function() {
  seeder.loadModels([
    './models/User'
  ]);

  const data = [
    {
      "model": "User",
      "documents": [
        {
          "_id": mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
          "name": "John Doe",
          "username": "admin",
          "password": "admin123",
        },
      ],
    },
  ];

  seeder.clearModels(['User'], function() {
    seeder.populateModels(data, function(error, done) {
      if (error) {
        return console.log('seed error: ', error);
      }
      if (done) {
        return console.log('seed done: ', done);
      }
      seeder.disconnect();
    });
  });
});
