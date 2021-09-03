const templates = require('./app/templates/model');

// write table relation below this line

// sync table to database
const syncDB = async () => {
  try {
    await templates.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
};

syncDB();
