const { AbilityBuilder, Ability } = require('@casl/ability');

const policies = {
  // Concise Methods
  guest(user, can) {
    can('read', 'WeddingInvitation');
  },
  // Object arrow func
  user: (user, can) => {
    can('read', 'Order', { userId: user.id });
    can('make', 'Order', { userId: user.id });
    can('update', 'Order', { userId: user.id });
    can('destroy', 'Order', { userId: user.id });
    can('create', 'AlsoInvite', { userId: user.id });
    can('update', 'AlsoInvite', { userId: user.id });
    can('destroy', 'AlsoInvite', { userId: user.id });
    can('create', 'BankAccount', { userId: user.id });
    can('update', 'BankAccount', { userId: user.id });
    can('destroy', 'BankAccount', { userId: user.id });
    can('create', 'Bride', { userId: user.id });
    can('update', 'Bride', { userId: user.id });
    can('destroy', 'Bride', { userId: user.id });
    can('create', 'CardInfo', { userId: user.id });
    can('update', 'CardInfo', { userId: user.id });
    can('destroy', 'CardInfo', { userId: user.id });
    can('read', 'GalleryPhoto', { userId: user.id });
    can('create', 'GalleryPhoto', { userId: user.id });
    can('destroy', 'GalleryPhoto', { userId: user.id });
  },
  // Object func
  admin: function admin(user, can) {
    can('manage', 'all');
  },
};

function policyFor(user) {
  let { rules, can } = new AbilityBuilder();
  if (user && typeof policies[user.role] === 'function') {
    policies[user.role](user, can);
  } else {
    policies['guest'](user, can);
  }
  return new Ability(rules);
}

module.exports = {
  policyFor,
};
