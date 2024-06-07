const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')

test('dummy return one', () => {
  const blog = []

  const result = listHelper.dummy(blog)
  assert.strictEqual(result, 1)
})