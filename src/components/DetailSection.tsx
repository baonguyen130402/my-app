import { useEffect, useState } from "react";
import AuthService from "~/services/AuthService";
import axios from "axios";
import { InfoCard } from "./InfoCard";
import { useRouter } from "next/router";

export const DetailSection = () => {
  const firstPage = 1;

  const [data, setData] = useState([]);
  const router = useRouter();

  const [page, setPage] = useState(firstPage);
  const [picture, setPicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");

  const handleClickNextPage = () => setPage(page + 3);
  const handleClickPrevPage = () =>
    page !== firstPage ? setPage(page - 3) : setPage(firstPage);

  async function fetchDataUser(API: string) {
    const response = await axios.get(API);

    const userData = response.data.results[0];
    const { title, first, last } = userData.name;
    const { street, city, state, country } = userData.location;

    setLocation(
      `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
    );
    setPicture(userData.picture.thumbnail);
    setFullName(`${title}. ${first} ${last}`);

    // setData([
    //   ...data,
    //   {
    //     fullname: fullName,
    //     location: location,
    //     picture: picture,
    //   },
    // ]);
  }

  useEffect(() => {
    try {
      fetchDataUser(`https://randomuser.me/api?page=${firstPage}`);
      // fetchDataUser(`https://randomuser.me/api?page=${firstPage + 1}`);
      // fetchDataUser(`https://randomuser.me/api?page=${firstPage + 2}`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-700">
      <div className="grid w-4/5 grid-cols-3">
        {/* {data.map((user, id) => { */}
        {/*   return ( */}
        <InfoCard fullName={fullName} location={location} picture={picture} />
        {/*   ); */}
        {/* })} */}
      </div>
      <div className="my-6 inline-flex">
        <button
          className="rounded-l bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
          onClick={handleClickPrevPage}
        >
          Prev
        </button>
        <button
          className="rounded-r bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
          onClick={handleClickNextPage}
        >
          Next
        </button>
      </div>
      <button
        type="button"
        className="mr-2 mb-2 rounded-full border border-gray-200 bg-gray-300 py-2.5 px-5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        onClick={() => {
          AuthService.logOut();
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
