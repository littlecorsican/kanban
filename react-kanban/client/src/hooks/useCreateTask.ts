import React, { useState, PropsWithChildren } from 'react';
// import { useMutation } from 'react-query';
import { useMutation } from 'react-query';
import { base } from '../constants'
import { z } from "zod";
import { request } from '../utils/helpers'

    //title: string, description:string, type:number, assigned_to:number
    export const createTask = async (e:any) => {
        e.preventDefault()
        const target = e.target
        const obj = Object.values(target)
        const formData:any = {
            status: 1
        }
        obj.map((value:any)=>{
            const id:string = value.id
            const content:string = value.value
            if (id) {
                formData[id] = content
            }
        })
        console.log("formData", formData)

        const schema = z.object({
            title: z.string(),
            description: z.string(),
            type: z.coerce.number(),
            assigned_to: z.coerce.number(),
            belongs_to: z.coerce.number(),
            status: z.coerce.number()
        });

        const result = schema.safeParse(formData)

        console.log("result", result)

        if (!result.success) {
            const errorMsg = result.error.issues.map(item=>`${item.path[0]} - ${item.message} . \n`).join("")
            return {
                success: false,
                message: errorMsg
            }
        }

        const response:any = await request(`${base}/api/task`, "POST", JSON.stringify({ ...formData }))
        return response
        // const response = await fetch(`${base}/api/task`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ ...formData }),
        // });
        // if (!response.ok) {
        //     return {
        //         success: false,
        //         message: "error"
        //     }
        // }
        // return {
        //     success: true,
        //     message: response.json()
        // }
    };
      
    // export const useCreateTask = (title: string, description:string, type:number, assigned_to:number) => {
    //     const { mutate: callApi, isLoading, error, data } = useMutation(()=>createTask(title, description, type, assigned_to),
    //         {
    //             onSuccess: () => {
    //                 console.log(`success`)
    //             },
    //             onError: (error) => {
    //                 console.log(`errorrr... ${error}`)
    //             },
    //         }
    //     );

    //     return {
    //         callApi, data, isLoading, error
    //     };
    // }

