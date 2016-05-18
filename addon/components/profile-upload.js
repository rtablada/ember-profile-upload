import Ember from 'ember';
import layout from '../templates/components/profile-upload';

export default Ember.Component.extend({
  layout,

  classNameBindings: [`active`],

  active: Ember.computed(`fileUrl`, function() {
    return !!this.get(`fileUrl`);
  }),

  transfer: Ember.inject.service(`profile-upload`),

  click(ev) {
    ev.preventDefault();

    this.$(`input`).click();
  },

  getFileFromInput() {
    const file = this.$(`input`).get(0).files[0];
    const { upload, deserializeResponse, requestError, destroyImage} = this.get(`transfer`);
    const oldFile = this.get(`fileUrl`);

    if (file && file.type.indexOf(`image`) > -1) {
      if (destroyImage && oldFile) {
        destroyImage(this.get(`fileUrl`));
      }

      Ember.RSVP.resolve(upload(file)).then((response) => {
        const url = deserializeResponse(response);

        this.onchange(url);
      }, (err) => {
        if (requestError) {
          requestError(err);
        }
      });
    }
  },

  stopPropagation(ev) {
    ev.stopPropagation();
  }
});
