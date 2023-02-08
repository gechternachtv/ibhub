migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  collection.updateRule = "(@request.auth.id = user.id && user.verified = true) || @request.auth.role = \"super\""
  collection.deleteRule = "(@request.auth.id = user.id && user.verified = true) || @request.auth.role = \"super\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90tx89jvk6klkpn")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
