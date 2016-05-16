/*jshint node:true*/
module.exports = {
  name: 'head',

  isDevelopingAddon: function() {
    return true;
  },

  contentFor(type, config) {
    if (type === 'head'){
      if (config.environment === 'production') {
        return '<base href="https://rtablada.github.io/ember-profile-upload/" target="_blank" />';
      }
    }
  },
};
