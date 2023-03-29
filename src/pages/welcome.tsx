import { type NextPage } from "next";
import { useState } from "react";

const Welcome: NextPage = () => {
  const [authState, setAuth] = useState(false);

  return (
    <>
      <h1>Hi.</h1>
    </>
  );
};

export default Welcome;

// But someone else made a change to this file here.

/**
 * sumoregn/fix-content: some changes made
 *
 * feat(welcome): add new button
 * fix(about): input not validating
 * chore(build): add new build script
 *
 * atomic commit
 *
 *
 * Create new branch: git checkout -b $branch_name
 * 
 *
 *
 *
 *
 */
