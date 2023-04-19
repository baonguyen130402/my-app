import { use, useEffect, useState } from "react";
import axios from "axios";
import AuthService from "~/services/AuthService";
import { warn } from "console";

const promise = new Promise((resolve, reject) => {
  resolve("Done!");
});

// const someAsyncJob = (data:any) => {
//   return new Promise((resolve,reject) => reject('Done!'))
// }
const someAsyncJob = async (data: any) => {
  return "Done!";
};

// console.log(someAsyncJob()); // <-- wrapped promise
// someLogic().then(value => console.log(value)).catch(error => console.log("Error: ", error))

// IIFE
// (async function () {
//   try {
//     const response = await someasyncjob('some data.' )

//     console.log(response)
//   } catch (error) {
//     console.log(error)
//   }
// })();

// someAsyncJob("Some data.")
//   .then(value => someAsyncJob(value)
//     .then(value => someAsyncJob(value).then(value => someAsyncJob(value))
//     )
//   )

// Compile time vs. Run time

export const InfoCard = () => {
  const firstPage = 1;

  const [page, setPage] = useState(firstPage);

  const [display, setDisplay] = useState(true);
  const [display2, setDisplay2] = useState(true);
  const [display3, setDisplay3] = useState(true);

  const [picture, setPicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");

  const [picture2, setPicture2] = useState("");
  const [fullName2, setFullName2] = useState("");
  const [location2, setLocation2] = useState("");

  const [picture3, setPicture3] = useState("");
  const [fullName3, setFullName3] = useState("");
  const [location3, setLocation3] = useState("");

  const handleClickNextPage = () => setPage(page + 3);
  const handleClickPrevPage = () =>
    page !== firstPage ? setPage(page - 3) : setPage(firstPage);

  async function fetchDataUser1() {
    const response = await axios.get(`https://randomuser.me/api?page=${page}`);
    const userData = response.data.results[0];

    const { title, first, last } = userData.name;
    const { street, city, state, country } = userData.location;

    setLocation(
      `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
    );
    setPicture(userData.picture.thumbnail);
    setFullName(`${title}. ${first} ${last}`);
  }

  async function fetchDataUser2() {
    const response2 = await axios.get(
      `https://randomuser.me/api?page=${page + 1}`
    );
    const userData2 = response2.data.results[0];
    const { title, first, last } = userData2.name;
    const { street, city, state, country } = userData2.location;

    setLocation2(
      `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
    );
    setPicture2(userData2.picture.thumbnail);
    setFullName2(`${title}. ${first} ${last}`);
  }

  async function fetchDataUser3() {
    const response3 = await axios.get(
      `https://randomuser.me/api?page=${page + 2}`
    );
    const userData3 = response3.data.results[0];
    const { title, first, last } = userData3.name;
    const { street, city, state, country } = userData3.location;

    setLocation3(
      `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
    );
    setPicture3(userData3.picture.thumbnail);
    setFullName3(`${title}. ${first} ${last}`);
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

  return (
    <div className=" flex h-screen w-full flex-col items-center justify-center bg-slate-700">
      <div className="grid w-4/5 grid-cols-3">
        <figure className="mx-auto w-2/3 rounded-xl bg-slate-100 p-8 dark:bg-slate-800">
          <img
            className="mx-auto h-24 w-24 rounded-full"
            src={picture}
            onClick={() => setDisplay(!display)}
            width="384"
            height="512"
          />
          <div className="space-y-4 pt-6 text-center">
            <blockquote>
              <p className="text-lg font-medium">{display && fullName}</p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-slate-700 dark:text-slate-500">
                {display && location}
              </div>
            </figcaption>
          </div>
        </figure>
        <figure className="mx-auto w-2/3 rounded-xl bg-slate-100 p-8 dark:bg-slate-800">
          <img
            className="mx-auto h-24 w-24 rounded-full"
            src={picture2}
            onClick={() => setDisplay2(!display2)}
            width="384"
            height="512"
          />
          <div className="space-y-4 pt-6 text-center">
            <blockquote>
              <p className="text-lg font-medium">{display2 && fullName2}</p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-slate-700 dark:text-slate-500">
                {display2 && location2}
              </div>
            </figcaption>
          </div>
        </figure>
        <figure className="mx-auto w-2/3 rounded-xl bg-slate-100 p-8 dark:bg-slate-800">
          <img
            className="mx-auto h-24 w-24 rounded-full"
            src={picture3}
            onClick={() => setDisplay3(!display3)}
            width="384"
            width="384"
            height="512"
          />
          <div className="space-y-4 pt-6 text-center">
            <blockquote>
              <p className="text-lg font-medium">{display3 && fullName3}</p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-slate-700 dark:text-slate-500">
                {display3 && location3}
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
      <div className="my-9 inline-flex">
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
        onClick={AuthService.logOut}
      >
        Logout
      </button>
    </div>
  );
};
