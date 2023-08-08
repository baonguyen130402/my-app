import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import AuthService from "~/services/AuthService";
import { InfoCard } from "./InfoCard";

import axios from "axios";
import { on } from "events";

const ITEMS_PER_PAGE = 20;
const MAX_USER_COUNT = 100;

export const DetailSection = () => {
  const firstPage = 0;

  const router = useRouter();
  const dataInput = useRef("");

  const [numberUser, setNumberUser] = useState(firstPage);
  const [fetchState, setFetchState] = useState(true);

  interface User {
    fullName: string;
    location: string;
    avatar: string;
  }

  const [dataRender, setDataRender] = useState<
    User[]
  >([]);

  const [data, setData] = useState<
    User[]
  >([]);

  const fetchUserData = async (endpoint: string, page: number) => {
    const response = await axios.get(endpoint);

    const userData = response.data.users;

    const dataFetched = userData.map((_: any, index: number) => {
      let location, fullName, avatar;

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
  };

  const fetchUserDataOnNextPage = async (endpoint: string, page: number) => {
    const response = await axios.get(endpoint);

    const userData = response.data.users;

    const dataFetched = userData.map((_: any, index: number) => {
      let location, fullName, avatar;

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
  };

  const userDataSearched = async (endpoint: string) => {
    const response = await axios.get(endpoint);

    const userData = response.data.users;

    const dataGetFromEndpoint = userData.filter(
      (_: any, idx: number) => idx < ITEMS_PER_PAGE,
    );

    const dataFetched = dataGetFromEndpoint.map((_: any, index: number) => {
      let location, fullName, avatar;

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

    dataInput.current.split("").length === 0 && data.length > 40
      ? setDataRender(
        data.slice(numberUser, numberUser + ITEMS_PER_PAGE),
      )
      : setDataRender(dataFetched);
  };

  const handleClickNextPage = () => {
    const newDataRender = numberUser + ITEMS_PER_PAGE;

    if (numberUser < MAX_USER_COUNT - 20) {
      setNumberUser(numberUser + ITEMS_PER_PAGE);
      setDataRender(
        data.slice(
          newDataRender,
          newDataRender + 20,
        ),
      );
    } else {
      setNumberUser(MAX_USER_COUNT);
      alert("Oops! This is last page");
    }

    setFetchState(true);
  };

  const handleClickPrevPage = () => {
    if (numberUser <= MAX_USER_COUNT && numberUser !== 0) {
      setDataRender(data.slice(numberUser - ITEMS_PER_PAGE, numberUser));
      setNumberUser(numberUser - ITEMS_PER_PAGE);
    } else {
      alert("Oops! This is first page");
    }

    setFetchState(false);
  };

  useEffect(() => {
    void (async () => {
      try {
        await fetchUserData(
          `https://dummyjson.com/users?skip=0&limit=20`,
          0,
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (dataRender.length !== 0 && fetchState) {
      if (numberUser < MAX_USER_COUNT && numberUser !== 100) {
        void (async () => {
          try {
            await fetchUserDataOnNextPage(
              `https://dummyjson.com/users?skip=${
                numberUser + ITEMS_PER_PAGE
              }&limit=${ITEMS_PER_PAGE}`,
              numberUser,
            );
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [dataRender, numberUser]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-700">
      <div className="mb-4 w-72 p-4">
        <div className="relative h-10 w-full min-w-[200px]">
          <input
            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0"
            placeholder=""
            onChange={(event) => {
              dataInput.current = event.target.value;
              (async () => {
                try {
                  await userDataSearched(
                    `https://dummyjson.com/users/search?q=${
                      encodeURIComponent(dataInput.current)
                    }`,
                  );
                } catch (error) {
                  console.log(error);
                }
              })();
            }}
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
          disabled={numberUser === 0}
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
