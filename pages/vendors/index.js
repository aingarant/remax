import VendorAll from "@/components/vendors/VendorList";
import { getVendors } from "@/config/queries/helper";
import React from "react";

const Vendors = ({ vendors }) => {
  return (
    <section>
      <h2 className="text-center text-3xl font-semibold m-10 mt-0 dark:text-gray-300">
        ALL AVAILABLE VENDORS
      </h2>
      <div className="card-list grid gap-8 my-10 mx-10 grid-cols-2 md:grid-cols-4">
        <VendorAll vendors={vendors} />
      </div>
    </section>
  );
};

export default Vendors;

export async function getServerSideProps({ query }) {
  const vendors = await getVendors();

  return { props: { vendors } };
}
