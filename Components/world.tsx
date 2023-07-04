import * as React from "react";
import Ground from "./ground";
import Character from "./character";

const World = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "aqua",
        display: "flex",
      }}
    >
      <Character />
      <Ground />
    </div>
  );
};

export default World;
