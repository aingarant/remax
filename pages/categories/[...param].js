import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import CardItem from "@/components/cards/CardItem";
import { getCategoriesByID } from "@/config/queries/helper";

const Category = ({ categories }) => {
  const router = useRouter();
  const { param } = router.query;
  console.log(categories);
  if (param === "all") {
    return <div>All</div>;
  }
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{categories[0]["category"]}</h2>
      <div className="card-list grid grid-cols-1 gap-10 m-10">
        {categories.map((card) => (
          <div className="p-6 rounded-lg shadow-md" key={card.id}>
            <Link href="/cards/[id]" as={`/cards/${card.id}`}>
              <div className=" grid grid-template-columns: 3fr">
                <CardItem card={card} />
                <div className="col-start-2 col-end-3 ">
                  <h3 className="text-xl font-bold">{card.name}</h3>
                  <div className="text-sm text-gray-900">
                    Cashback Rate for {card.category}: {card.cashback}%
                  </div>
                  <div className="text-sm text-gray-700">Annual Fee: ${card.annual_fee}</div>
                  <div className="text-sm text-gray-500">Interest Rate: {card.interest_rate}%</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Category;

export async function getServerSideProps({ query }) {
  const categories = await getCategoriesByID(query.param[0]);

  return { props: { categories } };
}
