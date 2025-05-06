"use client";
import React from 'react'
import { Form, useForm } from 'react-hook-form';
import { useAuth } from '@/app/hooks/useAuth';

type Props = {}

const page = () => {
    const { apiBaseUrl } = useAuth();
    const { register, control } = useForm();


  return (
    <Form
      action={`${apiBaseUrl}/ping`} // Send post request with the FormData
      // encType={'application/json'} you can also switch to json object
      onSuccess={() => {
        alert("Your application is updated.")
      }}
      onError={() => {
        alert("Submission has failed.")
      }}
      control={control}
    >
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <button>Submit</button>
    </Form>
  )
}

export default page