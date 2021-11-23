import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@mui/material";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumber] = useState([]);

  const getUser = useCallback(async () => {
    let baseUrl = "https://reqres.in/api/users?page=";
    try {
      const response = await axios.get(`${baseUrl}${currentPage}`);
      const { data, total_pages } = response.data;
      console.log("currentData", data);
      const pageNumbers = [];
      for (let i = 1; i <= total_pages; i++) {
        pageNumbers.push(i);
      }
      setPageNumber(pageNumbers);
      if (data.length > 0) {
        setUserData([...data]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  useEffect(() => {
    console.log("useE");
     getUser();
  }, [getUser]);

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <div key={number} id={number}>
        <Button
          onClick={() => {
            setCurrentPage(number);
          }}
        >
          {number}
        </Button>
      </div>
    );
  });

  return (
    <div>
      <div style={{ display: "flex" }}>{renderPageNumbers}</div>
      {userData.map((item) => (
        <div key={item.id}>
          <img src={item.avatar} alt={item.avatar} />
          <p>{`${item.first_name} ${item.last_name}`}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
