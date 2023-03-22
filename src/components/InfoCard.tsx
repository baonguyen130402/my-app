import { useEffect, useState } from "react";
import axios from "axios";
import { LogInForm } from "./LogInForm";

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
//     const response = await someAsyncJob('Some data.')

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

export const InfoCard = ({setAuth}:{setAuth: ()=>void}) => {
  const firstPage = 1;

  const [page, setPage] = useState(firstPage);
  const [picture, setPicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [display, setDisplay] = useState(true);

  const handleClickNextPage = () => setPage(page + 1);
  const handleClickPrevPage = () =>
    page !== firstPage ? setPage(page - 1) : setPage(firstPage);

  async function fetchData() {
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

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }

    // axios({
    //   method: 'get',
    //   url: `https://randomuser.me/api?page=${page}`
    // })
    //   .then((response) => {
    //     const userData = response.data.results[0]
    //     const { title, first, last } = userData.name;
    //     const { street, city, state, country } = userData.location;

    //     setLocation(
    //       `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
    //     );
    //     setPicture(userData.picture.thumbnail);
    //     setFullName(`${title}. ${first} ${last}`);
    //   })
    //   .catch((error) => {
    //     console.log(error.message)
    //   })
  }, [page]);

  // useEffect(() => {
  //   fetch(`https://randomuser.me/api?page=${page}`)
  //     .then((response) => {

  //       if (!response.ok) {
  //         switch (response.status) {
  //           case 400:
  //           case 401:
  //           case 404:
  //           case 500:
  //         }
  //       }

  //       return response.json()

  //     })
  //     .then((value) => {
  //       const userData = value.results[0];
  //       const { title, first, last } = userData.name;
  //       const { street, city, state, country } = userData.location;

  //       setLocation(
  //         `Address: ${street.number}, ${street.name} street, ${city} City, St. ${state}, ${country}`
  //       );
  //       setPicture(userData.picture.thumbnail);
  //       setFullName(`${title}. ${first} ${last}`);
  //     })
  //     .catch(console.log)
  // }, [page]);
  //

  return (
      <div className=" flex h-screen w-full flex-col items-center justify-center bg-slate-700">
        <div className="flex h-80 w-80 flex-col items-center justify-between overflow-hidden rounded-xl bg-sky-500 pt-8 shadow-lg shadow-cyan-500/50">
          <img
            className="z-1 w-32 cursor-pointer rounded-full hover:opacity-80"
            style={{ imageRendering: "pixelated", filter: "revert" }}
            src={picture}
            onClick={() => setDisplay(!display)}
            alt=""
          />
          <div className="flex h-28 w-80 items-center bg-cyan-200 p-2">
            <h1 className="hover:animate-moveIn">
              {display && fullName}
              <br />
              {display && location}
            </h1>
          </div>
        </div>
        <div className="m-6">
          <button
            className="mx-2 rounded-3xl bg-violet-500 px-4 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700"
            onClick={handleClickPrevPage}
          >
            Prev Page
          </button>
          <button
            className="mx-2 rounded-3xl bg-violet-500 px-4 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700"
            onClick={handleClickNextPage}
          >
            Next Page
          </button>
        </div>
        <button
          className="w-1/3 rounded-3xl bg-blue-600 hover:bg-blue-500"
          onClick={() => setAuth(false)}
        >
          LogOut
        </button>
      </div>
  );
};
