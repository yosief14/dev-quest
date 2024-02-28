import Input from "./Input";
import { FC, FormEventHandler } from "react";
import React from "react";

interface InputListProps {
  inputList: { id: string; icon: any; placeholder: string, jobFilter: string }[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
}


const SearchBar: FC<InputListProps> = ({ inputList, handleSearch }: InputListProps) => {

  return (
    <form className="flex flex-row relative bg-white rounded px-1 h-[60px]" >
      {inputList.map((input, index) => (
        <>
          <Input
            key={input.id}
            icon={input.icon}
            placeholder={input.placeholder}
            jobFilter={input.jobFilter}
            handleSearch={handleSearch}
          />
          {index !== inputList.length - 1 ? (
            <div className="border-l" />
          ) : null}
        </>
      ))}
    </form>
  );
};
export default SearchBar;
