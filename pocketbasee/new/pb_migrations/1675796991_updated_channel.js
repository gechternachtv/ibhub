migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  collection.listRule = "@request.auth.id = user.id"
  collection.viewRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
