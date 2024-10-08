import ProfileCard from '@/components/ProfileCard';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className='w-full max-w-xl mx-auto py-8 flex flex-wrap gap-y-6'>
      <h1 className=' w-full flex items-center gap-x-4'>
        <Link href={'../'}>
          <span className='inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 font-bold hover:bg-gray-100 hover:text-gray-600 rounded-xl'>
            &lt;
          </span>
        </Link>
        <span className='text-3xl font-bold'>My Account</span>
      </h1>
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
