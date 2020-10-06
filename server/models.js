const { bookshelf } = require('./server');
const checkIt = require('checkit');

const validationRules = new checkIt({
    email: ['required', 'email'],
    name: ['required'],
    password: 'required'
});

// Defining models
User = bookshelf.model('User', {
    hasTimestamps: true,
    tableName: 'users',

    initialize() {
        this.constructor.__super__.initialize.apply(this, arguments);
        this.on('saving', this.validateSave);
    },
    validateSave() {
        return validationRules.run(this.attributes);
    }
})

exports.User = User;
