import React from "react";
import Head from "next/head";
import styles from "../styles/Mystyle.module.css";
import { syncIndexes } from "mongoose";

const Faq = () => {
  return (
    <>
      <Head>
        <title>Contact -codeswear.com</title>
      </Head>
      {/* <header> */}
        {/* <div className="container my-24 px-6 mx-auto"> */}
          <section className="mb-32 text-gray-800 py-20  px-5 bg-pink-50">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Frequently asked questions
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="mb-12">
                <p className="font-bold mb-4">
                  If I order in bulk do I receive a discount?
                </p>
                <p className="text-gray-500">
                  Contact us for more information on bulk ordering.
                </p>
              </div>

              <div className="mb-12">
                <p className="font-bold mb-4">
                  Non cupidatat skateboard dolor brunch?
                </p>
                <p className="text-gray-500">
                  Distinctio corporis, iure facere ducimus quos consectetur ipsa
                  ut magnam autem doloremque ex! Id, sequi. Voluptatum magnam
                  sed fugit iusto minus et suscipit? Minima sunt at nulla
                  tenetur, numquam unde quod modi magnam ab deserunt ipsam sint
                  aliquid dolores libero repellendus cupiditate mollitia quidem
                  dolorem odit
                </p>
              </div>

              <div className="mb-12">
                <p className="font-bold mb-4">
                  Praesentium voluptatibus temporibus consequatur non
                  aspernatur?
                </p>
                <p className="text-gray-500">
                  Minima sunt at nulla tenetur, numquam unde quod modi magnam ab
                  deserunt ipsam sint aliquid dolores libero repellendus
                  cupiditate mollitia quidem dolorem.
                </p>
              </div>

              <div className="col-md-12 mb-12">
                <p className="font-bold mb-4">
                  Voluptatum magnam sed fugit iusto minus et suscipit?
                </p>
                <p className="text-gray-500">
                  Laudantium perferendis, est alias iure ut veniam suscipit
                  dolorem fugit. Et ipsam corporis earum ea ut quae cum non
                  iusto blanditiis ipsum dolor eius reiciendis, velit adipisci
                  quas.
                </p>
              </div>

              <div className="mb-12">
                <p className="font-bold mb-4">Minima sunt at nulla tenetur,?</p>
                <p className="text-gray-500">
                  Numquam unde quod modi magnam ab deserunt ipsam sint aliquid
                  dolores libero repellendus cupiditate mollitia quidem dolorem
                  odit
                </p>
              </div>

              <div className="mb-12">
                <p className="font-bold mb-4">
                  Distinctio corporis, iure facere ducimus?
                </p>
                <p className="text-gray-500">
                  Eaque eos corrupti debitis tenetur repellat, beatae quibusdam
                  incidunt, fuga non iste dignissimos officiis nam officia
                  obcaecati commodi ratione qui nesciunt.
                </p>
              </div>
            </div>
          </section>
        {/* </div> */}
      {/* </header> */}
    </>
  );
};

export default Faq;
