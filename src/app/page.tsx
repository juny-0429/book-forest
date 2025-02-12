import CapsuleButton from 'src/components/button/CapsuleButton';
import LucideIcons from 'src/theme/lucideIcon';

export default function Home() {
  return (
    <div>
      <CapsuleButton height={32} color='cta'>
        안녕하세요
      </CapsuleButton>

      <CapsuleButton height={32} color='cta' disabled>
        안녕하세요
      </CapsuleButton>

      <CapsuleButton height={56} color='cta'>
        <LucideIcons.Home size={24} />
        안녕하세요
      </CapsuleButton>
    </div>
  );
}
