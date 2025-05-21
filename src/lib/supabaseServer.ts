import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '../types/database.types';

export async function createSupabaseServer() {
  const cookieStore = await cookies(); // ✅ `await` 추가

  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookies) => {
        cookies.forEach((cookie) => {
          cookieStore.set(cookie.name, cookie.value, cookie.options);
        });
      },
    },
  });
}
