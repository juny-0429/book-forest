import Link from 'next/link';
import Image from 'next/image';
import { appRoutes } from 'src/routes/appRoutes';
import KoLogo from '@/assets/images/logos/ko-logo.png';
import SnsLoginButtons from './SnsLoginButtons';

export default function SignupHero() {
  return (
    <div className='mb-[46px]'>
      <Link href={appRoutes.home}>
        <Image src={KoLogo} width={150} alt='logo image' className='fixed top-10 left-10' />
      </Link>
      <div className='flex flex-col items-center gpa-[46px]'>
        <h1 className='text-title-24b text-ui-text-title'>회원가입</h1>
        <SnsLoginButtons />
      </div>
    </div>
  );
}
