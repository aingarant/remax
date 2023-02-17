import React from 'react';
import { useForm } from 'react-hook-form';

export default function about() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log("submitted",data.annual_fee);
  console.log("errors",errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" {...register("name", {required: true, min: 4})} />
      <input type="number" step="any" placeholder="interest_rate" {...register("interest_rate", {})} />
      <input type="number" step="any" placeholder="annual_fee" {...register("annual_fee", {})} />
      <input type="url" placeholder="img_url" {...register("img_url", {required: true})} />
      <select {...register("bankName", { required: true })}>
        <option value="Capital One">Capital One</option>
        <option value="AMEX"> AMEX</option>
        <option value="Tangerine"> Tangerine</option>
        <option value="CIBC"> CIBC</option>
        <option value="RBC"> RBC</option>
        <option value="Scotiabank"> Scotiabank</option>
        <option value="Rogers"> Rogers</option>
        <option value="MBNA"> MBNA</option>
        <option value="BMO"> BMO</option>
        <option value="TD"> TD</option>
        <option value="Desjardins"> Desjardins</option>
        <option value="Canadian Tire"> Canadian Tire</option>
        <option value="National Bank"> National Bank</option>
        <option value="PC Financial"> PC Financial</option>
      </select>
      <input type="url" placeholder="link" {...register("link", {required: true})} />

      <button type="submit">Submit</button>
    </form>
  );
}


