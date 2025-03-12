import { supabaseBrowser } from 'src/lib/supabaseBrowser';
import { appRoutes } from 'src/routes/appRoutes';

export const useSignOut = () => {
  const signOut = async () => {
    const { error } = await supabaseBrowser.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      window.location.href = appRoutes.home;
    }
  };

  return { signOut };
};
