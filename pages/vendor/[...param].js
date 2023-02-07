import { useRouter } from "next/router";
  import Image from "next/image";
  import Link from "next/link";
  import CardItem from "@/components/cards/CardItem";
  import { getCategoriesByID, getVendorsByRL,getListingsByVendor } from "@/config/queries/helper";
  import VendorItem from "@/components/vendors/VendorItem";
  
  const Vendor = ({ categories, vendor, listings }) => {
    const router = useRouter();
    const { param } = router.query;
    if (param === "all") {
      return <div>All</div>;
    }
    const main = listings[0]
    return (
      <section>
      <VendorItem vendor={vendor[0]} />
      <h2 className="text-xl font-bold mb-4 text-center ">{vendor[0].name}</h2>
      <div className="text-center">If you are shopping here, you should consider these credit cards for maximum benefits!</div>
      <div className="card-list grid grid-cols-1 gap-10 m-10">
{/* only if there's listings */}
{listings.length > 0 &&  
      <div className="p-6 rounded-lg shadow-md" key={main.card_id}>
      <Link href="/cards/[id]" as={`/cards/${main.card_id}`}>
        <div className=" grid grid-template-columns: 3fr">
        <CardItem card={main}/>
          <div className="col-start-2 col-end-3 ">
            <h3 className="text-xl font-bold">{main.name}</h3>
            <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">Highlight</span>
            <div className="text-sm text-gray-900">
              Cashback Rate for {vendor[0].name} Eligible Items: {main.reward_rate}%
            </div>
            <div className="text-sm text-gray-700">Annual Fee: ${main.annual_fee}</div>
            <div className="text-sm text-gray-500">Interest Rate: {main.interest_rate}%</div>
          </div>
        </div>
      </Link>
      </div>}

        {categories.map((card) => {
          return (
      card.id !== main.card_id &&
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
        )}
      )}
      </div>

    </section>
  );
};

export default Vendor

export async function getServerSideProps({ query }) {
  const vendor = await getVendorsByRL(`/vendor/${query.param[0]}`)
  const listings = await getListingsByVendor(vendor[0].id)
  const categories = await getCategoriesByID(vendor[0].category_id);



  return { props: { categories, vendor, listings } };
}
