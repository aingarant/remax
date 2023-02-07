import Link from "next/link";
import CardItem from "../components/cards/CardItem";
import VendorItem from "../components/vendors/VendorItem";
import CardsList from "../components/cards/CardsList";
import {
  // getFeaturedCategories,
  getFeaturedCards,
  getFeaturedVendors,
} from "@/config/queries/helper";

export default function home({ featured_cards, featured_vendors, categories }) {
  return (
    <main className="">
      <section className="main-content">
        <div>
          <h2 className="text-center font-semibold text-3xl">
            DISCOVER CASHBACK REWARDS WITH YOUR CREDIT CARDS
          </h2>
          <div className="card-list grid grid-cols-4 gap-40 m-20">
            {featured_cards.map((card) => (
              <Link href="/cards/[id]" as={`/cards/${card.id}`} key={card.id}>
                <CardItem card={card} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mt-32 text-center italic text-2xl">
            ENJOY MOVIES, TRAVEL, SHOPPING, DINING, GROCERIES, AND MORE
          </h2>
          <div className="vendor-list grid grid-cols-4 gap-40 place-items-center m-20">
            {featured_vendors.map((vendor) => (
              <Link href={vendor.relative_link} key={vendor.id}>
                {console.log(vendor)}
                <VendorItem vendor={vendor} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const featured_cards = await getFeaturedCards();
  const featured_vendors = await getFeaturedVendors();
  // const categories = await getFeaturedCategories();

  return { props: { featured_cards, featured_vendors } };
}
