const User = require('./app/users/model');
const Order = require('./app/orders/model');
const Template = require('./app/templates/model');
const Audio = require('./app/audios/model');
const Bride = require('./app/brides/model');
// const BridePhoto = require('./app/bridePhotos/model');
const GalleryPhoto = require('./app/galleryPhotos/model');
const CardInfo = require('./app/cardInfo/model');
const AlsoInvite = require('./app/alsoInvite/model');
const BankAccount = require('./app/bankAccount/model');

// write table relation below this line
User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Order.belongsTo(User);

Template.hasMany(Order, {
  foreignKey: {
    allowNull: false,
  },
});
Audio.hasMany(Order, {
  foreignKey: {
    allowNull: false,
  },
});
Order.belongsTo(Template);
Order.belongsTo(Audio);

Order.hasOne(Bride, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Bride.belongsTo(Order);

// Order.hasOne(BridePhoto, {
//   foreignKey: {
//     allowNull: false,
//   },
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });
// BridePhoto.belongsTo(Order);

Order.hasMany(GalleryPhoto, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
GalleryPhoto.belongsTo(Order);

Order.hasOne(CardInfo, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
CardInfo.belongsTo(Order);

Order.hasMany(AlsoInvite, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
AlsoInvite.belongsTo(Order);

Order.hasMany(BankAccount, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
BankAccount.belongsTo(Order);

// sync table to database
const syncDB = async () => {
  try {
    await Audio.sync({ force: true });
    await Template.sync({ force: true });
    await User.sync({ force: true });
    await Order.sync({ force: true });
    await Bride.sync({ force: true });
    // await BridePhoto.sync({ force: true });
    await GalleryPhoto.sync({ force: true });
    await CardInfo.sync({ force: true });
    await AlsoInvite.sync({ force: true });
    await BankAccount.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
};

syncDB();
