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
users.hasMany(orders, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
orders.belongsTo(users);

templates.hasMany(orders, {
  foreignKey: {
    allowNull: false,
  },
});
audios.hasMany(orders, {
  foreignKey: {
    allowNull: false,
  },
});
orders.belongsTo(templates);
orders.belongsTo(audios);

orders.hasOne(brides, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
brides.belongsTo(orders);

orders.hasOne(bridePhotos, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
bridePhotos.belongsTo(orders);

orders.hasMany(galleryPhotos, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
galleryPhotos.belongsTo(orders);

orders.hasOne(cardInfo, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
cardInfo.belongsTo(orders);

orders.hasMany(alsoInvite, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
alsoInvite.belongsTo(orders);

orders.hasMany(bankAccount, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
bankAccount.belongsTo(orders);

// sync table to database
const syncDB = async () => {
  try {
    await audios.sync({ force: true });
    await templates.sync({ force: true });
    await users.sync({ force: true });
    await orders.sync({ force: true });
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
