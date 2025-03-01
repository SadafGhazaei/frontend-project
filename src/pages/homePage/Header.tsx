import React, { useState } from "react";
import { Input, Button, Tooltip, DatePicker } from "antd";
import {
  AppstoreOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import moment, { Moment } from "moment";
import MovieForm from "../../components/MovieForm";
import { CREATE_MOVIE } from "../../api";


const Header = ({
  isTableView,
  setIsTableView,
  searchValue,
  setSearchValue,
  releasedYearValue,
  setReleasedYearValue,
}: {
  isTableView: boolean;
  setIsTableView: (isTableView: boolean) => void;
  searchValue: string | undefined;
  setSearchValue: (searchValue: string | undefined) => void;
  releasedYearValue: number | undefined;
  setReleasedYearValue: (releasedYearValue: number | undefined) => void;
}): React.ReactElement => {
  const [inputValue, setInputValue] = useState(searchValue);

  const handleClearSearch = () => {
    setInputValue("");
    setSearchValue("");
  };

  return (
    <div className="flex flex-col justify-between mb-8 sm:flex-row bg-white p-6 rounded-lg shadow-lg border border-gray-200">
   
      <div className="flex flex-col sm:flex-row mb-4 sm:mb-0 gap-4 w-full sm:w-auto">
   
        <div className="relative flex-grow">
          <Input
            placeholder="Search by movie name..."
            prefix={<SearchOutlined className="text-gray-600" />}
            suffix={
              <>
                {inputValue && (
                  <Button
                    type="text"
                    icon={
                      <CloseOutlined className="text-gray-600 hover:text-gray-900" />
                    }
                    onClick={handleClearSearch}
                    className="hover:bg-transparent"
                  />
                )}
                <Tooltip title="Search by movie name">
                  <InfoCircleOutlined className="text-gray-400 hover:text-gray-600" />
                </Tooltip>
              </>
            }
            className="w-full sm:w-72 rounded-lg border-gray-300 hover:border-gray-500 focus:border-gray-700 transition-all"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setInputValue(e.target.value);
              setSearchValue(e.target.value);
            }}
          />
        </div>

        <DatePicker
          picker="year"
          placeholder="Select release year"
          className="w-full sm:w-48 rounded-lg border-gray-300 hover:border-gray-500 focus:border-gray-700 transition-all"
          value={
            releasedYearValue
              ? moment().set("year", releasedYearValue)
              : undefined
          }
          onChange={(e: Moment | null): void =>
            setReleasedYearValue(e?.get("year"))
          }
        />
      </div>

      <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
     
        <Button
          type="default"
          icon={isTableView ? <AppstoreOutlined /> : <UnorderedListOutlined />}
          onClick={(): void => setIsTableView(!isTableView)}
          className="flex items-center justify-center bg-white border-gray-300 hover:border-gray-500 hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm"
        />

       
        <MovieForm
          setReleasedYear={setReleasedYearValue}
          setSearchValue={setSearchValue}
          title="Add Movie"
          apiURL={CREATE_MOVIE}
          className="bg-gray-900 hover:bg-gray-700 text-white rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
};

export default Header;
