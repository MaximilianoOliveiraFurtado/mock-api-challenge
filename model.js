'use strict'

const examModel = {
  1: { name: 'Ecocardiograma', type: 'imagem', status: 'ativo' },
  2: { name: 'Raio X', type: 'imagem', status: 'ativo' }
}

const laboratoryModel = {
  1: { name: 'lab1', adress: 'Rua 1 - Jardim - Santo André', status: 'ativo' },
  2: { name: 'lab2', adress: 'Rua 2 - Centro - São Paulo', status: 'ativo' }
}

module.exports = {
  exam: repository(examModel),
  laboratory: repository(laboratoryModel)
}


function repository (db) {

  return {
    create, read, update, del, uid, readAll
  }

  function uid () {
    return Object.keys(db)
      .sort((a, b) => a - b)
      .map(Number)
      .filter((n) => !isNaN(n))
      .pop() + 1 + ''
  }

  function create (id, data, cb) {
    if (db.hasOwnProperty(id)) {
      const err = Error('resource exists')
      setImmediate(() => cb(err))
      return
    }
    db[id] = data
    setImmediate(() => cb(null, id))
  }

  function read (id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    setImmediate(() => cb(null, db[id]))
  }

  function readAll (cb) {
    const result = []
    for (const [key, value] of Object.entries(db)) {
      result.push({id: key, ...value})
    }
    setImmediate(() => cb(null, result))
  }

  function update (id, data, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    db[id] = data
    setImmediate(() => cb())
  }

  function del (id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    delete db[id]
    setImmediate(() => cb())
  }
}