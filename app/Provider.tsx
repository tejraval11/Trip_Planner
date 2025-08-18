'use client'
import React, { use, useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import PopularCityCard from './_components/PopularCityCard';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from './context/UserDetailContext';
import { TripDetailContext } from './context/TripDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const createNewUser = useMutation(api.user.CreateNewUser);
    const {user} = useUser() 
    const [userDetail, setUserDetail] = useState<any>(null);
    const [TripDetailInfo, setTripDetailInfo] = useState<any>(null);
    useEffect(() => {
        user&&CreateNewUser()
    }, [user])
    
    const CreateNewUser = async()  => {
        if(user){
            const result = await createNewUser({
                name: user?.fullName ?? "",
                email: user?.primaryEmailAddress?.emailAddress ?? "",
                imageUrl: user?.imageUrl ?? "",
            })
            setUserDetail(result)
        }
    }

  return (
    <div>
      <Header/>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <TripDetailContext.Provider value={{TripDetailInfo, setTripDetailInfo}}>
      {children}
        </TripDetailContext.Provider>
      </UserDetailContext.Provider>
      
    </div>
  )
}

export default Provider;

export const useUserDetail = () => {
    return useContext(UserDetailContext);
};

export const useTripDetailInfo = () => {
  return useContext(TripDetailContext);
};