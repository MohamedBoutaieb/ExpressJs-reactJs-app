import React from "react";

interface GenericButtonProps {
  text: string;
  onClick: () => void;
  mode: "danger" | "info" | "success";
}

const GenericButton: React.FC<GenericButtonProps> = (props) => {
  const color =
    props.mode === "danger"
      ? "#CE3131"
      : props.mode === "info"
      ? "#3182CE"
      : "#3B9D18";
    console.log(color);
  return (
    <button
      onClick={props.onClick}
      className={`bg-[${color}] px-3 text-white rounded-md font-semibold h-8`}
    >
      {props.text}
    </button>
  );
};

export default GenericButton;
