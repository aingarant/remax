import React from "react";
import { useRouter } from "next/router";
import CardList from "@/components/cards/CardList";
import CardItem from "@/components/cards/CardItem";
import { getCashback, getListingsByCardID, getCards } from "@/config/queries/helper";
import Link from "next/link";
import Range from "@/components/slider/Range";
import { BsInfoCircle } from "react-icons/bs";

const Cards = ({ cards, vendors, all }) => {
  const router = useRouter();
  const { param } = router.query;
  const card = cards[0];

  if (param[0] === "all") {
    return (
      <section className="border-b-8">
        <h2 className="text-center text-3xl font-semibold m-10 mt-0 dark:text-gray-300">
          ALL AVAILABLE CREDIT CARDS
        </h2>
        <div className="card-list grid gap-8 my-10 mx-10 md:grid-cols-4">
          <CardList cards={all} />
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto">
      <div className="card-list grid grid-cols-1 gap-10 mt-0 mx-auto ">
        <div className="p-6 rounded-lg shadow-lg dark:shadow-blue-400/40 dark:bg-gray-400 ">
          <h2 className="p-0 lg:px-3 mx-2 text-xl font-bold text-center mb-4 text-gray-700 dark:text-gray-800">
            <Link href={card.link}>
              <BsInfoCircle className="text-gray-700 hover:text-orange-400 " size="1.25em" />
            </Link>
            {card["name"]}
          </h2>
          <CardItem card={card} />
          <br />
          <div className="text-sm text-gray-700 text-center dark:text-gray-800">
            Annual Fee: ${card.annual_fee}{" "}
          </div>
          <div className="text-sm text-gray-700 text-center dark:text-gray-800">
            Interest Rate: {card.interest_rate}%{" "}
          </div>
          <br />
          <div className="font-xl text-2xl align-middle px-3 text-center mb-2 dark:text-gray-800">
            {" "}
            Cashback Rates
          </div>
          <br />
          <div className="grid grid-cols-1 text-center">
            {vendors.length > 0 && (
              <div className="text-sm text-gray-900 ">
                <Range
                  category={`${vendors[0].name} Eligible Purchases`}
                  cashback={vendors[0].reward_rate}
                />
                <br />
              </div>
            )}

            {cards.map((card) => (
              <div className="text-sm text-gray-900 ">
                <Range category={card.category} cashback={card.cashback} />
                <br />
              </div>
            ))}
          </div>
          <br />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps({ query }) {
  const cards = await getCashback(query.param[0]);
  const all = await getCards();
  const vendors = await getListingsByCardID(query.param[0]);
  return { props: { cards, vendors, all } };
}

export default Cards;
