'use client';

import { useUser } from '@/app/utils/useUser';
import LoginModal from '../LoginModal';
import Recommend from '../recommend/Recommend';
import Reorder from '../Reorder';
import Welcome from '../Welcome';

function MainContainer() {
  const { user } = useUser();
  const isGuest = !user?.isSuccess;
  console.log(isGuest, 'is Guest 값');

  return (
    <div className="flex flex-col gap-y-20 items-center relative">
      <Welcome />
      <div className="flex-center relative ">
        {isGuest && (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center z-50">
            <LoginModal />
          </div>
        )}
        <div className={`${isGuest && 'blur-lg'}`}>
          <Reorder />
          <Recommend />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
