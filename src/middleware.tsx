import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { Database } from './types/database.types';

const loggedInRoutes = [/^\/admin(\/.*)?$/, /^\/shop(\/.*)?$/, /^\/account\/auth(\/.*)?$/, '/board/write', '/payment'];
const loggedOutRoutes = ['/signup', '/login', '/account/forgot-id', '/account/forgot-id/result', '/account/reset-password', '/account/auth/reset-password/verify', '/account/find-id'];

export const middleware = async (request: NextRequest) => {
  const supabase = createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
    },
  });

  const path = request.nextUrl.pathname;

  if (path.startsWith('/account/reset-password')) return NextResponse.next();

  const isAdminRoute = path.startsWith('/admin');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 상태만 접근 가능
  if (loggedInRoutes.some((route) => (typeof route === 'string' ? path.startsWith(route) : route.test(path))) && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 로그인하면 접근하면 안 되는 페이지
  if (loggedOutRoutes.includes(path) && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 관리자만 접근 가능
  if (isAdminRoute && user) {
    const { data: authData } = await supabase.from('authority_log').select('authority:auth_id(auth_code)').eq('user_id', user.id).single();

    const userAuthority = authData?.authority.auth_code;

    if (userAuthority !== 'ADMIN' && userAuthority !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
