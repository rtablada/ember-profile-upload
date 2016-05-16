import Ember from 'ember';
import config from 'ember-get-config';
import fetch from 'ember-network/fetch';

const { Promise } = Ember.RSVP;

const { uploadPreset, cloudName } = config.cloudinary;

export default Ember.Service.extend({
  upload(file) {
    return new Promise((resolve) => {
      var reader = new FileReader();

      reader.onload = (e) => {
        const body = JSON.stringify({
          upload_preset: uploadPreset,
          file: e.target.result,
        });

        const promise = fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          body,
          method: `POST`,
          headers: {
            Accept: `application/json`,
            'Content-Type': `application/json`,
          },
        }).then(res => res.json());

        resolve(promise);
      };

      reader.readAsDataURL(file);
    });
  },

  deserializeResponse(response) {
    return response.url;
  },
});
