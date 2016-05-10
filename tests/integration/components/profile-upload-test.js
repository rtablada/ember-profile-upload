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

test('it clicks the file upload when clicked', function(assert) {
  assert.expect(1);

  this.render(hbs`{{profile-upload}}`);

  this.$(`input`).on(`click`, listenForClick);

  this.$(`div`).click();

  function listenForClick(ev) {
    ev.preventDefault();

    assert.ok(true);
  }
});
