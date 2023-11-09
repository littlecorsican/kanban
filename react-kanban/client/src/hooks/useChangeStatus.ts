import React, { useState, PropsWithChildren } from 'react';
// import { useMutation } from 'react-query';
import { useMutation } from 'react-query';
import { base } from '../constants'


    export const changeStatus = async (from: number|string, to:number|string) => {
        const response = await fetch(`${base}/api/task/changeStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ from: from, to: to }),
        });
        if (!response.ok) {
        //   throw new ResponseError('Failed to insert new todo', response);
            console.log("errorrr..")
        }
        return await response.json();
    };
      
    export const useChangeStatus = (from: number|string, to:number|string) => {
        const { mutate: callApi, isLoading, error, data } = useMutation(()=>changeStatus(from,to),
            {
                onSuccess: () => {
                    console.log(`success`)
                },
                onError: (error) => {
                    console.log(`errorrr... ${error}`)
                },
            }
        );

        return {
            callApi, data, isLoading, error
        };
    }

