import Ember from 'ember';
import layout from '../templates/components/profile-upload';

export default Ember.Component.extend({
  layout,

  click(ev) {
    ev.preventDefault();

    this.$(`input`).click();
  },

  getFileFromInput() {
    const file = this.$(`input`).get(0).files[0];

    if (file && file.type.indexOf(`image`) > -1) {

    }
  },

  stopPropagation(ev) {
    ev.stopPropagation();
  }
});
