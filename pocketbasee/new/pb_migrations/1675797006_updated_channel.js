migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  collection.createRule = "@request.auth.id = user.id"
  collection.updateRule = "@request.auth.id = user.id"
  collection.deleteRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
