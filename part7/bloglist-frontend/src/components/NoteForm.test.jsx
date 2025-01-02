import { render, screen } from '@testing-library/react';
import BlogForm from './note-form';
import userEvent from '@testing-library/user-event';

test('<BlogFrom /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const title = container.querySelector('.title');
  const author = container.querySelector('.author');
  const url = container.querySelector('.url');
  const likes = container.querySelector('.likes');
  const button = container.querySelector('.btn');

  await user.type(title, 'testing a form');
  await user.type(author, 'rorridev');
  await user.type(url, 'http://github.com/barbarred');
  await user.type(likes, '33');

  await user.click(button);

  screen.debug(author);
  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form');
  expect(createBlog.mock.calls[0][0].author).toBe('rorridev');
  expect(createBlog.mock.calls[0][0].url).toBe('http://github.com/barbarred');
  expect(createBlog.mock.calls[0][0].likes).toBe('33');
});
