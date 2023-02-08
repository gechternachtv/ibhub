migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9x2dmcek",
    "name": "contains",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9x2dmcek",
    "name": "contains",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
