"use client"

import { useRef, useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

interface LoginError {
  errors: {
    message: string
  }[]
}

export default async function Projects() {

  const x = fetch('/api/projects').then((response)=>{
    return response.json()
  }).then((response2)=>{
    console.log(response2)
  })


  return (
    <div className="flex items-center justify-center min-h-screen">

    </div>
  );
};
