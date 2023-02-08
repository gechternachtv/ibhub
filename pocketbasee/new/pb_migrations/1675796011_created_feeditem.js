migrate((db) => {
  const collection = new Collection({
    "id": "xrhax3n5yl6scis",
    "created": "2023-02-07 18:53:31.365Z",
    "updated": "2023-02-07 18:53:31.365Z",
    "name": "feeditem",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jgljozks",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "r35noh1a",
        "name": "content",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jsfz3b9x",
        "name": "channel",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "90tx89jvk6klkpn",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "vczvxyw2",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xrhax3n5yl6scis");

  return dao.deleteCollection(collection);
})
