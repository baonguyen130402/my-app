import { use, useEffect, useState } from "react";
import axios from "axios";
import AuthService from "~/services/AuthService";
import { warn } from "console";
import { useRouter } from "next/router";

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

export const InfoCard = (props: any) => {
  const { fullName, location, avatar } = props;
  const [display, setDisplay] = useState(true);

  return (
    <figure className="mx-auto w-2/3 rounded-xl bg-slate-100 p-8 dark:bg-slate-800">
      <img
        className="mx-auto h-24 w-24 rounded-full"
        src={avatar}
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
  );
};
