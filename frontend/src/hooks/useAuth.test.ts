import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';

jest.mock('@/services/authService');

const TestComponent = () => {
  const { user, loading, login, logout } = useAuth();
  return (
    <div>
      {user && <div data-testid="user">{user.username}</div>}
      {loading && <div data-testid="loading">Loading</div>}
      <button data-testid="login-button" onClick={() => login('test', 'pass')}>
        Login
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(import.meta, 'env', {
      value: {
        VITE_API_BASE_URL: 'http://localhost:3000/api'
      },
      writable: true
    });
  });

  describe('initialization', () => {
    it('sets user and stops loading when getCurrentUser succeeds', async () => {
      const mockUser = { id: '1', username: 'test', email: 'test@example.com' };
      authService.getCurrentUser.mockResolvedValueOnce(mockUser);

      render(<TestComponent />);
      expect(screen.getByTestId('loading')).toBeInTheDocument();

      const userElement = await screen.findByTestId('user');
      expect(userElement).toHaveTextContent('test');
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    it('sets user to null and stops loading when getCurrentUser fails', async () => {
      authService.getCurrentUser.mockRejectedValueOnce(new Error('Network error'));

      render(<TestComponent />);
      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });
      expect(screen.queryByTestId('user')).not.toBeInTheDocument();
    });
  });

  describe('login', () => {
    it('logs in user and sets state', async () => {
      const mockUser = { id: '1', username: 'test', email: 'test@example.com' };
      authService.login.mockResolvedValueOnce({ token: 'fake-token', user: mockUser });
      authService.getCurrentUser.mockResolvedValueOnce(null);

      render(<TestComponent />);

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });

      const loginButton = screen.getByTestId('login-button');
      expect(loginButton).toBeInTheDocument();

      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('test');
      });

      expect(authService.login).toHaveBeenCalledWith('test', 'pass');
    });
  });

  describe('logout', () => {
    it('logs out user and clears state', async () => {
      const mockUser = { id: '1', username: 'test', email: 'test@example.com' };
      authService.getCurrentUser.mockResolvedValueOnce(mockUser);
      authService.logout.mockResolvedValueOnce();

      render(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('test');
      });
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();

      const logoutButton = screen.getByTestId('logout-button');
      expect(logoutButton).toBeInTheDocument();

      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(screen.queryByTestId('user')).not.toBeInTheDocument();
      });

      expect(authService.logout).toHaveBeenCalledTimes(1);
    });
  });
});
```