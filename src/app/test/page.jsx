"use client";

import axios from "axios";
import React from "react";

const Test = () => {
  async function test() {
    // const res = await fetch("/api/test", {
    //   method: "GET",
    // });

    const res = await axios.get("/api/test");

    console.log(await res.statusText);
  }
  return (
    <>
      <button onClick={test}>test</button>
    </>
  );
};

export default Test;
