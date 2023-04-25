import { useEffect, useState } from "react";
import AuthService from "~/services/AuthService";
import axios from "axios";
import { InfoCard } from "./InfoCard";
import { useRouter } from "next/router";

export const DetailSection = () => {
  const firstPage = 1;
  const BigData: any[] = [];

  const router = useRouter();

  const [page, setPage] = useState(firstPage);

  const handleClickNextPage = () => setPage(page + 3);
  const handleClickPrevPage = () =>
    page !== firstPage ? setPage(page - 3) : setPage(firstPage);

  async function fetchDataUser1() {
    const response1 = await axios.get(
      `https://randomuser.me/api?page=${firstPage}`
    );

    const userData1 = response1.data.results[0];
    const { title, first, last } = userData1.name;
    const { street, city, state, country } = userData1.location;

    BigData.push({
      fullName: `${title}. ${first} ${last}`,
      location: `Address: ${street.number}, ${street.name} street, ${city} city, st. ${state}, ${country}`,
      picture: userData1.picture.thumbnail,
    });
  }

  async function fetchDataUser2() {
    const response2 = await axios.get(
      `https://randomuser.me/api?page=${firstPage + 1}`
    );

    const userData2 = response2.data.results[0];
    const { title, first, last } = userData2.name;
    const { street, city, state, country } = userData2.location;

    BigData.push({
      fullName: `${title}. ${first} ${last}`,
      location: `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`,
      picture: userData2.picture.thumbnail,
    });
  }

  async function fetchDataUser3() {
    const response3 = await axios.get(
      `https://randomuser.me/api?page=${firstPage + 2}`
    );

    const userData3 = response3.data.results[0];
    const { title, first, last } = userData3.name;
    const { street, city, state, country } = userData3.location;

    BigData.push({
      fullName: `${title}. ${first} ${last}`,
      location: `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`,
      picture: userData3.picture.thumbnail,
    });
  }

  useEffect(() => {
    try {
      fetchDataUser1();
      fetchDataUser2();
      fetchDataUser3();
    } catch (error) {
      console.log(error);
    }
  }, [page]);

    console.log(BigData[0])
    const dataTest = [
        {fullName: "Nguyen", location: "Bien Hoa"},
        {fullName: "Gia", location: "HCMC"},
        {fullName: "Bao", location: "Binh Thanh"}
    ]

    console.log(dataTest)

  const infoCard = () => {
    BigData.map((user) => {
      <InfoCard
        FullName={user.fullName}
        Location={user.location}
        Picture={user.picture}
      />;
    });
  };

  return (
    <>
      {infoCard}
      <div>
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
    </>
  );
};