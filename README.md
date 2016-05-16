# Ember Profile Upload

[![Build Status](https://travis-ci.org/rtablada/ember-profile-upload.svg)](https://travis-ci.org/rtablada/ember-profile-upload)

[![npm version](https://badge.fury.io/js/ember-profile-upload.svg)](http://badge.fury.io/js/ember-profile-upload)
[![Ember Observer Score](http://emberobserver.com/badges/ember-profile-upload.svg)](http://emberobserver.com/addons/ember-profile-upload)
This README outlines the details of collaborating on this Ember addon.

This addon provides simple file uploads for photo for things like profile pics.

## Installation

```
ember install ember-profile-upload
```

## Setup

To Allow for flexibility for server uploads, you will need to add a `profile-upload` service to your application:

```
ember g service profile-upload
```

To support uploading files, you will need to implement two functions in this service:

* `upload` - Returns a promise to upload the file to your API
  - Receives a `file` argument which is the first file's `File` object from a `file` input
* `deserializeResponse` - Returns a string URL of the uploaded file from payload returned by `upload`

### Optional Setup

The `profile-upload` service can also contain two other methods for greater flexibility:

* `destroy` - Instructs the API to delete the old file
* `requestError` - Handle errors from the AJAX request

### Example service

The service below shows how to integrate with a Loopback API using `loopback-component-storage` as shown in the [`loopback-example-storage`](https://github.com/strongloop/loopback-example-storage/tree/master/example-2.0):

```js
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  upload(file) {
    const data = new FormData();
    data.append(`value`, file);

    return Ember.$.ajax({
      data,
      method: `POST`,
      cache: false,
      processData: false,
      contentType: false,
      url: `${config.apiHost}/api/containers/${config.containerName}/upload`,
    });
  },

  destroy(file) {
    const url = file.replace(`download`, `files`);

    return Ember.$.ajax({
      method: `DELETE`,
      url,
    });
  },

  deserializeResponse(response) {
    const data = response.result.files.value[0];

    return `${config.apiHost}/api/containers/${data.container}/download/${data.name}`;
  },

  requestError(err) {
    // Handle request errors here
    console.log(err);
  },
});
```

## Component Use

Now that things are setup, you are ready to use the `profile-upload` component.
The component takes three attributes:

* `fileUrl` - The current profile photo url
* `placeholderUrl` - The image url to show if no photo is currently shown
* `onchange` - A function to run when the file has successfully uploaded. This will be run with the result from your service's `deserializeResponse`

## License

This software is distributed under the MIT license.
