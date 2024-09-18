import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ถ้าเป็น static file (CSS, JS, images) หรือเส้นทาง _next ให้ปล่อยผ่าน
  if (
    pathname.startsWith('/_next') || // Next.js files
    pathname.startsWith('/static') || // Your static files
    pathname.endsWith('.css') || // CSS files
    pathname.endsWith('.js') || // JS files
    pathname.endsWith('.png') || // Images
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg')
  ) {
    return NextResponse.next();
  }

  // ถ้าเป็นเส้นทาง /login ให้ข้ามการตรวจสอบ
  if (pathname === '/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('token'); // อ่านค่า cookie

  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url)); // redirect ไปยังหน้า login
  }

  console.log('Token found, proceeding to requested page');
  return NextResponse.next();
}
