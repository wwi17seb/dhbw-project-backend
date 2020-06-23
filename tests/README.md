# createTestData

## general + usage

The script `createTestData.js` can be used to fill the database with initial test data.
You can enable it to run automatically at each app start by setting `app.forceSync = true` and `app.enableTestData = true` in `app.properties` (as explained in general README; `app.enableTestData` is true be default, you have to explicitely set it to `false` if you want the database to be cleared but no test data inserted).
You can also run it manually using `npm run testdata`.
Make sure you installed all npm packages (`npm install`).

Be aware that running this script can cause problems when the users that will be created by this script already exist.
You might need to change the password of a user in `testdata/user.js` to match the one saved in your database.

You can use options `v`/`verbose` to print everything to your console and `l`/`log` to log everything to a log file.
E.g. you can run `npm run testdata v l`.

Feel free to add further test data so that others can take advantage of it as well.
You can find some details on how to do this below.
Just open a pull request.

## add new data in existing entities/files

Each file contains an array where multiple entries are specified.
You can easily add a new one (e.g. copy-paste an existing one).
Each entry consists of an `id` (with which you can access the result later) and an `data` object which is sent as the request body.
You can optionally add the `token` used for submitting this request, e.g. when you want to do a certain action under a certain identity.
Otherwise a default user (as defined in `app.properties`) with it's token is used.

To access ids or properties of other objects you can use a placeholder syntax like `{{route.id.property}}`.
The response (payload) of each request is saved under the name of the route and it's id.
See an example below.

```js
module.exports = {
  route: 'fieldsOfStudy',
  data: [
    {
      id: 'wi',
      data: {
        name: 'Wirtschaftsinformatik',
      },
    },
  ]
},
```

To access this field of study you can use `{{fieldsOfStudy.wi}}` where `fieldOfStudy` is the name of the route and `wi` is the id as specified in the object above, e.g.:

```js
module.exports = {
  route: 'majorSubjects',
  data: [
    {
      id: 'wise11',
      data: {
        fieldOfStudy_id: '{{fieldsOfStudy.wi.fieldOfStudy_id}}',
        name: 'Software Engineering',
        catalog_effective_from: '2011',
      },
    },
  ]
};
```

You can also access properties located deeper in the object structure, e.g. `{{moduleGroups.wise11rechnungslegung.Modules[0].Lectures[0].lecture_id}}`.

## add new entity/file

To create data for entities where no file exists yet you can create one similar to the ones that are already defined.
You have to specify the name of the route as it is defined in the API (`POST`).

In the `main()`-function at the bottom of `createTestData.js` you need to invoke the `createTestData()`-function with the filename (without `.js` file type) as an argument.
You should await the function and make sure that all functions/routes you depend on are processed before.
