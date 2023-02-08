migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xrhax3n5yl6scis")

  collection.listRule = "@request.auth.id = user.id && user.verified = true"
  collection.viewRule = "@request.auth.id = user.id && user.verified = true"
  collection.createRule = "@request.auth.id = user.id && user.verified = true"
  collection.updateRule = "@request.auth.id = user.id && user.verified = true"
  collection.deleteRule = "@request.auth.id = user.id && user.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xrhax3n5yl6scis")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
