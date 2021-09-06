const users = require('./app/users/model');
const orders = require('./app/orders/model');
const templates = require('./app/templates/model');
const audios = require('./app/audios/model');
const brides = require('./app/brides/model');
const bridePhotos = require('./app/bridePhotos/model');
const galleryPhotos = require('./app/galleryPhotos/model');
const cardInfo = require('./app/cardInfo/model');
const alsoInvite = require('./app/alsoInvite/model');
const bankAccount = require('./app/bankAccount/model');

// write table relation below this line
users.hasMany(orders);
orders.belongsTo(users);

orders.hasOne(templates);
orders.hasOne(audios);
templates.belongsToMany(orders, { through: 'orderTemplates' });
audios.belongsToMany(orders, { through: 'orderAudios' });

orders.hasOne(brides);
brides.belongsTo(orders);

orders.hasOne(bridePhotos);
bridePhotos.belongsTo(orders);

orders.hasMany(galleryPhotos);
galleryPhotos.belongsTo(orders);

orders.hasOne(cardInfo);
cardInfo.belongsTo(orders);

orders.hasMany(alsoInvite);
alsoInvite.belongsTo(orders);

orders.hasMany(bankAccount);
bankAccount.belongsTo(orders);

// sync table to database
const syncDB = async () => {
  try {
    await users.sync({ force: true });
    await orders.sync({ force: true });
    await audios.sync({ force: true });
    await templates.sync({ force: true });
    await brides.sync({ force: true });
    await bridePhotos.sync({ force: true });
    await galleryPhotos.sync({ force: true });
    await cardInfo.sync({ force: true });
    await alsoInvite.sync({ force: true });
    await bankAccount.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
};

syncDB();
