import { useEffect, useState } from "react";
import AuthService from "~/services/AuthService";
import axios from "axios";
import { InfoCard } from "./InfoCard";
import { useRouter } from "next/router";

export const DetailSection = () => {
  const firstPage = 1;

  const [page, setPage] = useState(firstPage);
  const [data, setData] = useState < { fullName: string, location: string, picture: string }[] > ([]);

  const router = useRouter();

  const handleClickNextPage = () => setPage(page + 1);
  const handleClickPrevPage = () =>
    page !== firstPage ? setPage(page - 1) : setPage(firstPage);

  async function fetchUserData(endpoint: string) {
    const response1 = await axios.get(endpoint + page);
    const response2 = await axios.get(endpoint + page + 1);
    const response3 = await axios.get(endpoint + page + 2);

    const userData = response.data.results[0];
    const { title, first, last } = userData.name;
    const { street, city, state, country } = userData.location;

    console.log("fetchDataUser ", endpoint)

    const location = `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
    const fullName = `${title}. ${first} ${last}`
    const picture = userData.picture.thumbnail

    setData([
      {
        fullName,
        location,
        picture,
      },
    ]);
  }

  useEffect(() => {
    try {
      // void fetchUserData(`https://randomuser.me/api?page=${firstPage}`);
      void fetchUserData(`https://randomuser.me/api?page=`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-700">
      <div className="grid w-4/5 grid-cols-3">
        {data.map(({ fullName, location, picture }) => {
          return (
            <InfoCard key={fullName} fullName={fullName} location={location} picture={picture} />
          );
        })}
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
