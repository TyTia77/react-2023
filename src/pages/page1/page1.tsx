import React, { useEffect, useState } from "react";
import { useLocalStorage, useArray } from "hooks";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

const storageKey = "test";

function Page1(props: { params1?: number }) {
  const { params1 } = props;

  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useLocalStorage(storageKey, []);
  const { array, push: addNotes, clear: clearNotes }: any = useArray(value);

  useEffect(() => {
    setValue(array);
    setSearchText("");
  }, [array]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <Container maxWidth="sm">
          <TextField
            id="standard-basic"
            label="text"
            variant="standard"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              disabled={!searchText.length}
              onClick={() => addNotes({ id: "", text: searchText })}
            >
              Add
            </Button>
            <Button disabled={!array.length} onClick={clearNotes}>
              Clear
            </Button>
          </ButtonGroup>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{ p: 2 }}
        // sx={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   "& > :not(style)": {
        //     m: 1,
        //     width: 128,
        //     height: 128,
        //   },
        // }}
      >
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {array.map((m: any) => {
            return (
              <Paper sx={{ p: 1, textAlign: "center" }} elevation={5}>
                {m.text}
              </Paper>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}

export default Page1;
