'use strict'
const { promisify } = require('util')
const { laboratoryExam } = require('../../model')
const { uid } = laboratoryExam
const read = promisify(laboratoryExam.read)
const readAll = promisify(laboratoryExam.readAll)
const create = promisify(laboratoryExam.create)
const update = promisify(laboratoryExam.update)
const del = promisify(laboratoryExam.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.get('/', async (request, reply) => {
    try {
      return await readAll()
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

}