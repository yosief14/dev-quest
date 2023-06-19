import Input from "./Input";
import { FC } from "react";
import React from "react";

interface InputListProps {
  inputList: { id: string; icon: any; placeholder: string }[];
}

const SearchBar: FC<InputListProps> = ({ inputList }: InputListProps) => {
  return (
      <form className="flex bg-white rounded px-1 h-[60px]">
        {inputList.map((input, index) => (
          <React.Fragment key={input.id}>
            <Input
              key={input.id}
              icon={input.icon}
              placeholder={input.placeholder}
            />
            {index !== inputList.length - 1 ? (
              <div className="border-l" />
            ) : null}
          </React.Fragment>
        ))}
      </form>
  );
};
export default SearchBar;
