"use client";

import { Rings } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="h-[80vh] bg-neutral-900/10 flex flex-col items-center justify-center ">
      <Rings
        height="100"
        width="100"
        color="#3f6ed4"
        radius="10"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default loading;
