import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Chart from "./Chart";

export default function Results({ results }) {
  return (
    <Box mt="1rem" w="90%" maxW="37rem">
      <Chart results={results}></Chart>
    </Box>
  );
}
