import { Tabs, TabsList, TabsTrigger, TabsContent } from 'src/components/tabs/tabs';

export default function Home() {
  return (
    <div>
      <Tabs defaultValue='home' className='w-full'>
        <TabsList className='flex border-b'>
          <TabsTrigger value='home'>홈</TabsTrigger>
          <TabsTrigger value='profile'>프로필</TabsTrigger>
          <TabsTrigger value='settings'>설정</TabsTrigger>
          <TabsTrigger value='settings'>설정</TabsTrigger>
          <TabsTrigger value='settings'>설정</TabsTrigger>
          <TabsTrigger value='settings'>설정</TabsTrigger>
        </TabsList>

        <TabsContent value='home'>
          <p>홈 화면 내용</p>
        </TabsContent>
        <TabsContent value='profile'>
          <p>프로필 화면 내용</p>
        </TabsContent>
        <TabsContent value='settings'>
          <p>설정 화면 내용</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
