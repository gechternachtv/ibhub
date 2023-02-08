migrate((db) => {
  const collection = new Collection({
    "id": "p9xi2cwkvrq8645",
    "created": "2023-02-07 18:55:17.281Z",
    "updated": "2023-02-07 18:55:17.281Z",
    "name": "news",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "is5e0xoe",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "jesk1z5b",
        "name": "channel",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "90tx89jvk6klkpn",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "1nnwgxoc",
        "name": "feeds",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "xrhax3n5yl6scis",
          "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("p9xi2cwkvrq8645");

  return dao.deleteCollection(collection);
})
