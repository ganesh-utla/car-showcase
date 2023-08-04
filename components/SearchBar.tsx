"use client";

import React, { useState } from 'react';
import { SearchManufacturer } from '.';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses } : { otherClasses: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-5 ${otherClasses}`}>
      <Image 
        src="magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  )
}

const SearchBar = () => {

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer==="" || model==="") {
      return alert("Please fill in the Manufacturer and Model!!");
    }

    updateSearchParams(manufacturer.toLowerCase(), model.toLowerCase());
  }

  const updateSearchParams = (manufacturer: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if(model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    if(manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathName);
  }

  return (
    <form className='searchbar' onSubmit={handleSubmit}>
        <div className='searchbar__item'>
            <SearchManufacturer 
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
            <SearchButton otherClasses='sm:hidden' />
        </div>
        <div className='searchbar__item'>
            <Image
              src="/model-icon.png"
              alt="model icon"
              width={25} 
              height={25} 
              className='absolute w-[20px] h-[20px] ml-4'
            />
            <input 
              type="text"
              name="model"
              className='searchbar__input'
              placeholder='Tiguan'
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <SearchButton otherClasses='sm:hidden' />
        </div>
        
        <SearchButton otherClasses='max-sm:hidden' />

    </form>
  )
}

export default SearchBar;