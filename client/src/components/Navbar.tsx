import React from 'react';
import { useAppDispatch } from '@/hooks';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toggleShowNew } from '@/store/appSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <nav className='flex flex-col'>
      <IoMdAddCircleOutline 
        className='text-3xl transition hover:scale-125 cursor-pointer text-violet-300'
        onClick={() => dispatch(toggleShowNew())}
      />
    </nav>
  );
};

export default Navbar;