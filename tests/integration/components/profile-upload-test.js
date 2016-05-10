import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('profile-upload', 'Integration | Component | profile upload', {
  integration: true
});

test('it renders existing image', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{profile-upload src="img.png"}}`);

  assert.equal(this.$(`img`).attr(`src`), 'img.png');
});
