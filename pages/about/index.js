import { getCards, getCategories, getBanks } from '@/config/queries/helper';
import { useForm } from 'react-hook-form';


export default function about({categories, banks, cards}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log("submitted",data);



  console.log("errors",errors);
  
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" {...register("name", {required: true, min: 4})} />
      <input type="number" step="any" placeholder="interest_rate" {...register("interest_rate", {})} />
      <input type="number" step="any" placeholder="annual_fee" {...register("annual_fee", {})} />
      <input type="url" placeholder="img_url" {...register("img_url", {required: true})} />
      <select {...register("bank_id", { required: true })}>
        {banks.map((bank) => (
          <option key={bank.id} value={bank.id}>
            {bank.name}
          </option>
        ))}
      </select>
      <input type="url" placeholder="link" {...register("link", {required: true})} />
        <button type="submit">Submit</button>
      </form>
Separate form 
<form onSubmit={handleSubmit(onSubmit)}>
<input type="number" step="any" placeholder="cashback %" {...register("reward_rate", {})} />
      <select {...register("card_id", { required: true })}>
        {cards.map(card => (
          <option key={card.id} value={card.id}>{card.name}</option>
        ))}
      </select>

      <select {...register("category_id", { required: true })}>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
      </form>
      </>
  );
}


export async function getServerSideProps({ query }) {
  const categories = await getCategories();
  const banks = await getBanks();
  const cards = await getCards();

  return { props: { categories,banks,cards } };
}