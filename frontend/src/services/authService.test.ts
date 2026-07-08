import { authService } from '@/services/authService';

describe('authService', () => {
  let fetchMock: jest.Mock;
  let localStorageMock: Storage;

  beforeEach(() => {
    // Mock localStorage
    const store: Record<string, string> = {};
    localStorageMock = {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
    } as unknown as Storage;
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

    // Mock import.meta.env
    Object.defineProperty(import.meta, 'env', {
      value: {
        VITE_API_BASE_URL: 'http://localhost:3000/api'
      },
      writable: true
    });

    // Mock fetch
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        token: 'fake-token',
        user: { id: '1', username: 'test', email: 'test@example.com' }
      };
      fetchMock.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      const user = await authService.login('test', 'password');

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ username: 'test', password: 'password' }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith('makqcrp_token', 'fake-token');
      expect(user).toEqual(mockResponse.user);
    });

    it('should throw error on login failure', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Invalid credentials' })
      });

      await expect(authService.login('test', 'wrong')).rejects.toThrow('Invalid credentials');
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      fetchMock.mockResolvedValue({ ok: true });

      await authService.logout();

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/logout',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('makqcrp_token');
    });

    it('should throw error on logout failure', async () => {
      fetchMock.mockResolvedValue({ ok: false, json: jest.fn().mockResolvedValue({ message: 'Logout failed' }) });

      await expect(authService.logout()).rejects.toThrow('Logout failed');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('makqcrp_token');
    });
  });

  describe('getCurrentUser', () => {
    it('should return user when successful', async () => {
      localStorageMock.getItem.mockReturnValue('fake-token');
      const mockUser = { id: '1', username: 'test', email: 'test@example.com' };
      fetchMock.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser)
      });

      const user = await authService.getCurrentUser();

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/me',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fake-token',
            'Content-Type': 'application/json'
          })
        })
      );
      expect(user).toEqual(mockUser);
    });

    it('should return null and remove token on error', async () => {
      localStorageMock.getItem.mockReturnValue('fake-token');
      fetchMock.mockRejectedValue(new Error('Network error'));

      const user = await authService.getCurrentUser();

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/me',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer fake-token',
            'Content-Type': 'application/json'
          })
        })
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('makqcrp_token');
      expect(user).toBeNull();
    });

    it('should return null when no token', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const user = await authService.getCurrentUser();

      expect(fetchMock).not.toHaveBeenCalled();
      expect(user).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorageMock.getItem.mockReturnValue('fake-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false when no token', () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});
```