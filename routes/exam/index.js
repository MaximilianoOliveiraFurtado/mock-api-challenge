'use strict'
const { promisify } = require('util')
const { exam } = require('../../model')
const { uid } = exam
const read = promisify(exam.read)
const readAll = promisify(exam.readAll)
const create = promisify(exam.create)
const update = promisify(exam.update)
const del = promisify(exam.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  fastify.post('/', async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.post('/:id/update', async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/', async (request, reply) => {
    try {
      return await readAll()
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return {}
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

}