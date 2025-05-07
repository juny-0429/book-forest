import Image from 'next/image';
import Link from 'next/link';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import { appRoutes } from 'src/routes/appRoutes';

export default function LoginHero() {
  return (
    <Link href={appRoutes.home}>
      <Image src={KoLogo} width={160} alt='logo image' priority />
    </Link>
  );
}
