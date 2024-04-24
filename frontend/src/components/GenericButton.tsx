import React, { useEffect, useState } from "react";

interface GenericButtonProps {
  text: string;
  onClick: () => void;
  mode: "danger" | "info" | "success";
}

const GenericButton: React.FC<GenericButtonProps> = (props) => {
  const [color, setColor] = useState("#3B9D18");

  useEffect(() => {
    props.mode === "danger"
      ? setColor("#CE3131")
      : props.mode === "info"
      ? setColor("#3182CE")
      : null;
  }, []);

  return (
    <button
      onClick={props.onClick}
      className={`px-3 text-white rounded-md font-semibold h-8`}
      style={{ backgroundColor: color }}
    >
      {props.text}
    </button>
  );
};

export default GenericButton;
