import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// 보호할 경로 목록
const protectedRoutePatterns = [
  /^\/admin(\/.*)?$/,
  /^\/shop(\/.*)?$/,
  /^\/account\/auth(\/.*)?$/,
  '/board/write',
  '/payment',
];

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutePatterns.some((pattern) => (typeof pattern === 'string' ? pathname.startsWith(pattern) : pattern.test(pathname)));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인한 사용자가 로그인 페이지로 가려고 할 때 홈 페이지로 리디렉션
  if (user && pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 로그인하지 않은 사용자가 보호된 경로로 가려고 하면 로그인 페이지로 리디렉션
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
