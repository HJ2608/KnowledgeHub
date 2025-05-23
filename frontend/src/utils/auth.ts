import { jwtDecode } from 'jwt-decode';

export function getUserRole(): 'admin' | 'user' | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
}
