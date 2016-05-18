import Ember from 'ember';

export default function destroyImageApp(application) {
  Ember.run(application, 'destroyImage');
}
