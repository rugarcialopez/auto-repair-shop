import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import AuthContext from '../../store/auth-context';
import Comments from './Comments';

describe('Comments', () => {
  let fakeFetch: jest.Mock;
  const authContextObj = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    role: 'manager',
    userId: '1',
    isLoggedIn: true,
    login: (token: string, role: string, expirationTime: string, userId: string) => {},
    logout: () => {},
  }
  
  beforeEach(() => {
    fakeFetch = jest.fn();
    window.fetch = fakeFetch;
  });

  afterEach(() => {
    fakeFetch.mockClear();
  });

  test('renders "No comments were added yet" if there are no comments', async() => {
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ comments: [] }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs/1"]}>
          <Comments />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const noCommentsText = await screen.findByText('No comments were added yet');
    expect(noCommentsText).toBeInTheDocument();
  });

  test('renders <CommentsList/> component if there are comments', async() => {
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ comments: ['Comment 1', 'Comment 2'] }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs/1"]}>
          <Comments />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const commentOne = await screen.findByText('Comment 1');
    expect(commentOne).toBeInTheDocument();
    const commentTwo = await screen.findByText('Comment 2');
    expect(commentTwo).toBeInTheDocument();
  });

  test('renders "Add a comment" button', async()=> {
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ comments: [] }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs/1"]}>
          <Comments />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const addCommentButton = await screen.findByText('Add a Comment');
    expect(addCommentButton).toBeInTheDocument();
  });

  test('renders <NewCommentForm/> when user clicks on "Add a comment" button', async()=> {
    fakeFetch
    .mockResolvedValueOnce({
      json: async () => ({ comments: [] }),
      ok: true
    });
    render(
      <AuthContext.Provider value={authContextObj}>
        <MemoryRouter initialEntries={["/repairs/1"]}>
          <Comments />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const addCommentButton = await screen.findByText('Add a Comment');
    expect(addCommentButton).toBeInTheDocument();
    userEvent.click(addCommentButton);
    const yourCommentLabel = screen.getByText('Your Comment');
    expect(yourCommentLabel).toBeInTheDocument();
  });
});