"use client";

import { ShowMoreProps } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CustomButton } from '.';
import { updateParams } from '@/utils';

const ShowMore = ({ pageNumber, isNext } : ShowMoreProps) => {

  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber+1) * 10;
    const newPathName = updateParams('limit', newLimit.toString());

    router.push(newPathName);
  }

  return (
    <div className='w-full flex-center gap-5 mt-10'>
        {isNext && (
            <CustomButton
                title='Show More'
                btnType='button'
                containerStyles='bg-primary-blue text-white rounded-full'
                handleClick={handleNavigation}
            />
        )}

    </div>
  )
}

export default ShowMore;