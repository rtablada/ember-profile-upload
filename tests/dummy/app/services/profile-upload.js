import Ember from 'ember';

// BEGIN-SNIPPET filereader-service
export default Ember.Service.extend({
  upload(file) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = (function(e) {
        resolve(e.target.result);
      });

      reader.readAsDataURL(file);
    });
  },

  deserializeResponse(dataUrl) {
    return dataUrl;
  }
});
// END-SNIPPET
