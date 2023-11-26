import "./Style.css";
import axios from "axios";
import Character from "./Character";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Characters() {
  const [charactersList, setCharactersList] = useState([]);
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    setIsloading(true);
  }, []);

  useEffect(() => {
    axios
      .get(`https://ickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => setCharactersList(response.data.results))
      .catch((e) => {
        console.log(
          e,
          "Error while getting characters list from the server API"
        );
        setIsError(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [page]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Oops! Something went wrong. Please try again later.
          </Alert>
        </Stack>
      </Box>
    );
  }

  const handleNextPage = () => {
    setPage((old) => old + 1);
  };

  const filteredCharacters = charactersList.filter((characterFilter) => {
    if (filtered === "") {
      return true;
    } else {
      return characterFilter.name
        .toLowerCase()
        .includes(filtered.toLowerCase());
    }
  });

  return (
    <div>
      <h1 className="main">
        * <span>Rick and Morty </span>Popular Characters *
      </h1>
      <div>
        <input
          type="text"
          placeholder="
          Search for characters, ensuring that each page has its own set of characters.."
          onChange={(e) => setFiltered(e.target.value)}
        />
      </div>
      <Character characters={filteredCharacters} />
      <div className="buttons">
        <button
          disabled={page < 1}
          className="btn_1"
          onClick={() => setPage((old) => old - 1)}
        >
          Previous Page
        </button>
        <button disabled={page >= 42} onClick={handleNextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
}
