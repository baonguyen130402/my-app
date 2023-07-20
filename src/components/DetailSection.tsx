import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AuthService from "~/services/AuthService";
import { InfoCard } from "./InfoCard";

import axios from "axios";

const ITEMS_PER_PAGE = 20;
const MAX = 100;

export const DetailSection = () => {
  const firstPage = 0;
  const limit = ITEMS_PER_PAGE;

  const router = useRouter();

  const [page, setPage] = useState(firstPage);
  const [fetchState, setFetchState] = useState(true);
  const [dataInput, setDataInput] = useState("");

  const [dataRender, setDataRender] = useState<
    { fullName: string; location: string; avatar: string }[]
  >([]);

  const [data, setData] = useState<
    { fullName: string; location: string; avatar: string }[]
  >([]);

  const [dataLatestPage, setDataLatestPage] = useState(dataRender);

  const handleClickNextPage = () => {
    page < MAX ? setPage(page + ITEMS_PER_PAGE) : setPage(MAX);

    page < (MAX - 20)
      ? setDataRender(
        data.slice(page + ITEMS_PER_PAGE, page + ITEMS_PER_PAGE + 20),
      )
      : alert("Oops! This is last page");

    setFetchState(true);
    setDataLatestPage(
      data.slice(page + ITEMS_PER_PAGE, page + ITEMS_PER_PAGE + 20),
    );
  };

  const handleClickPrevPage = () => {
    page === firstPage
      ? alert("Oops! This is first page")
      : setPage(page - ITEMS_PER_PAGE);

    if (page < MAX && page !== 0) {
      setDataRender(data.slice(page - ITEMS_PER_PAGE, page));
    }

    setFetchState(false);
    setDataLatestPage(data.slice(page - ITEMS_PER_PAGE, page));
  };

  async function fetchUserData(endpoint: string, page: number) {
    const allRes = await axios.get(endpoint);

    const fetchData = [allRes].map((response) => {
      const userData = response.data.users;

      let location, fullName, avatar;

      const dataGetFromEndpoint = userData.filter(
        (_: any, idx: number) => idx < ITEMS_PER_PAGE,
      );

      const dataFetched = dataGetFromEndpoint.map((_: any, index: number) => {
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

      const result = page === 0
        ? dataFetched
        : data.slice(page, page + ITEMS_PER_PAGE);

      setDataRender(result);
    });
  }

  async function fetchUserDataInNextPage(endpoint: string, page: number) {
    const allRes = await Promise.all([axios.get(endpoint)]);

    const fetchData = allRes.map((response: any) => {
      const userData = response.data.users;

      let location, fullName, avatar;

      const dataGetFromEndpoint = userData.filter(
        (_: any, idx: number) => idx < ITEMS_PER_PAGE,
      );

      const dataFetched = dataGetFromEndpoint.map((_: any, index: number) => {
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

      if (data.length < 100) {
        const result = data.length === 0
          ? [...dataRender, ...dataFetched]
          : [...data, ...dataFetched];

        setData(result);
      }
    });
  }

  async function userDataSearched(endpoint: string) {
    const allRes = await Promise.all([axios.get(endpoint)]);

    const fetchData = allRes.map((response: any) => {
      const userData = response.data.users;

      let location, fullName, avatar;

      const dataGetFromEndpoint = userData.filter(
        (_: any, idx: number) => idx < ITEMS_PER_PAGE,
      );

      const dataFetched = dataGetFromEndpoint.map((_: any, index: number) => {
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

      dataInput.split("").length === 0 && data.length > 40
        ? setDataRender(dataLatestPage)
        : setDataRender(dataFetched);
    });
  }

  useEffect(() => {
    try {
      if (page === 0 && fetchState) {
        void fetchUserData(
          `https://dummyjson.com/users?skip=${page}&limit=${limit}`,
          page,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    if (dataRender.length !== 0 && fetchState) {
      try {
        page < 100 // There are only 100 items.
          ? void fetchUserDataInNextPage(
            `https://dummyjson.com/users?skip=${
              page + ITEMS_PER_PAGE
            }&limit=${limit}`,
            page,
          )
          : void fetchUserDataInNextPage(
            `https://dummyjson.com/users?skip=${
              page - ITEMS_PER_PAGE
            }&limit=${limit}`,
            page,
          );
      } catch (error) {
        console.log(error);
      }
    }
  }, [page, dataRender]);

  useEffect(() => {
    try {
      void userDataSearched(
        `https://dummyjson.com/users/search?q=${encodeURIComponent(dataInput)}`,
      );
    } catch (error) {
      console.log(error);
    }
  }, [dataInput]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-700">
      <div className="mb-4 w-72 p-4">
        <div className="relative h-10 w-full min-w-[200px]">
          <input
            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
            placeholder=""
            value={dataInput}
            onChange={(event) => setDataInput(event.target.value)}
          />
          <label className="before:content[' '] after:content[' '] text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
            Search
          </label>
        </div>
      </div>
      <div className="grid w-4/5 grid-cols-5 gap-y-6">
        {dataRender.map(({ fullName, location, avatar }) => {
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
