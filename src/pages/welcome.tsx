import { type NextPage } from "next";
import { useState } from "react";

const Welcome: NextPage = () => {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <h1>Hi.</h1>
    </>
  );
};

export default Welcome;


// This is a change on branch `master`.


/**
 * sumoregn/fix-content: some changes made
 *
 * feat(landing): add new button
 * fix(about): input not validating
 * chore(build): add new build script
 *
 * atomic commit
 *
 *
 *
 *
 */
