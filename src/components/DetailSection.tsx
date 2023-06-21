import { useEffect, useState } from "react";
import AuthService from "~/services/AuthService";
import axios from "axios";
import { InfoCard } from "./InfoCard";
import { useRouter } from "next/router";

export const DetailSection = () => {
  const firstPage = 0;
  const limit = 20;

  const [page, setPage] = useState(firstPage);

  const [data, setData] = useState<
    { fullName: string; location: string; avatar: string }[]
  >([]);

  const [dataNextPage, setDataNextPage] = useState<
    { fullName: string; location: string; avatar: string }[]
  >([]);

  const router = useRouter();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleClickNextPage = () =>
    page !== 100 ? setPage(page + 20) : setPage(100);

  const handleClickPrevPage = () =>
    page !== firstPage ? setPage(page - 20) : setPage(firstPage);

  async function fetchUserData(endpoint: string, page: number) {
    await delay(3000);
    const allRes = await Promise.all([axios.get(endpoint)]);

    const a = allRes.map((response) => {
      const userData = response.data.users;

      let location, fullName, avatar;

      const dataGetFromEndpoint = userData.filter((_, idx) => idx < 20);

      const dataRender = dataGetFromEndpoint.map((_, index) => {
        const userData = response.data.users[index];
        const { address, city } = userData.address;

        location = `Address: ${address}, ${city}`;
        fullName = `${userData.firstName} ${userData.lastName}`;
        avatar = userData.image;

        return {
          fullName,
          location,
          avatar,
        };
      });

      page === 0
        ? setData(dataRender)
        : setData(() => {
            const result = dataNextPage.slice(page, page + 20);

            return result;
          });
      console.log(data);
    });
  }

  async function fetchUserDataInNextPage(endpoint: string, page: number) {
    const allRes = await Promise.all([axios.get(endpoint)]);

    const a = allRes.map((response) => {
      const userData = response.data.users;

      let location, fullName, avatar;

      const dataGetFromEndpoint = userData.filter((_, idx) => idx < 20);

      const dataRender = dataGetFromEndpoint.map((_, index) => {
        const userData = response.data.users[index];
        const { address, city } = userData.address;

        location = `Address: ${address}, ${city}`;
        fullName = `${userData.firstName} ${userData.lastName}`;
        avatar = userData.image;

        return {
          fullName,
          location,
          avatar,
        };
      });

      dataNextPage === null
        ? setDataNextPage([...data, ...dataRender])
        : setDataNextPage([...dataNextPage, ...dataRender]);
      console.log(dataNextPage);
    });
  }

  useEffect(() => {
    console.log("page");

    try {
      page !== 100
        ? void fetchUserData(
            `https://dummyjson.com/users?skip=${page}&limit=${limit}`,
            page
          )
        : void fetchUserData(
            `https://dummyjson.com/users?skip=${page - 20}&limit=${limit}`,
            page
          );
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    console.log("data");

    try {
      page !== 100
        ? void fetchUserDataInNextPage(
            `https://dummyjson.com/users?skip=${page + 20}&limit=${limit}`,
            page
          )
        : void fetchUserDataInNextPage(
            `https://dummyjson.com/users?skip=${page - 20}&limit=${limit}`,
            page
          );
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-700">
      <div className="grid w-4/5 grid-cols-5 gap-y-6">
        {data.map(({ fullName, location, avatar }) => {
          return (
            <InfoCard
              key={fullName}
              fullName={fullName}
              location={location}
              avatar={avatar}
            />
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
