import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('render title, author and not url, likes', () => {
  const blog = {
    title: 'Entrie for test',
    author: 'rorridev',
    url: 'http://github.com/barbarred',
    likes: 33
  }

  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.title')
  const details = container.querySelector('.post-details')

  expect(title).not.toHaveStyle('display: none')
  expect(details).toHaveStyle('display: none')
})

test('show url and likes after clicking the view button', async () => {
  const blog = {
    title: 'Entrie for test',
    author: 'rorridev',
    url: 'http://github.com/barbarred',
    likes: 33
  }

  const { container } = render(<Blog blog={blog} />)

  const details = container.querySelector('.post-details')
  const user = userEvent.setup()
  const button = container.querySelector('.viewBtn')
  await user.click(button)

  expect(details).not.toHaveStyle('display: none')
})

test('verified if the button like call the event controller', async () => {
  const blog = {
    title: 'Entrie for test',
    author: 'rorridev',
    url: 'http://github.com/barbarred',
    likes: 33,
    user: {
      id: '66d75345feff937028575585'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updatePost={mockHandler}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})