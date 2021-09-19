import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import Results from "../components/Results";
import { Text, Button, Flex, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  function getResults() {
    if (input && input.length !== 0 && input.trim()) {
      setIsFetching(true);
      fetch(`https://twitter-opinion-backend.jeusto.repl.co/${input}`)
        .then((data) => data.json())
        .then((json) => showResultsView(json));
    } else {
      alert("Please enter something.");
    }
  }

  function showResultsView(json) {
    if (json.number_of_tweets <= 10) {
      alert(
        `Not enough tweets about "${json.keyword}". Please choose another keyword.`
      );
      setIsFetching(false);
      setInput("");
      return;
    } else {
      setResults(json);
      setIsFetching(false);
      setShowResults(true);
    }
  }

  function showSearchView() {
    setShowResults(false);
  }

  const handleKeypress = (e) => {
    console.log(e);
    if (e.which === 13) {
      console.log("test2");
      getResults();
    }
  };

  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter opinion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        w="90%"
        maxW="47rem"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
          <Text
            textAlign="center"
            bgGradient="linear(to-r, #4598e6, #6dbaf2)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="700"
          >
            {`Twitter's opinion`}
          </Text>
        </Flex>
        <Text textAlign="center" fontSize="2xl">
          {showResults
            ? `Here's what people think about "${input}" (result in % of tweets)`
            : `Analyze opinions about a specific subject based on Twitter posts.`}
        </Text>
      </Flex>
      {showResults ? (
        <>
          <Button
            mt="1rem"
            onClick={showSearchView}
            h="3rem"
            w="15rem"
            ml="2rem"
            colorScheme="blue"
            aria-label="Search database"
            leftIcon={<ArrowBackIcon />}
          >
            Search another keyword
          </Button>
          <Results results={results}></Results>
        </>
      ) : (
        <Flex mt="2rem" h="16" w="90%" maxW="47rem">
          <Input
            variant="filled"
            h="100%"
            value={input}
            placeholder="Enter a keyword to search"
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeypress}
          />
          {isFetching ? (
            <IconButton
              isLoading
              onClick={getResults}
              h="100%"
              w="20%"
              ml="2rem"
              colorScheme="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          ) : (
            <IconButton
              onClick={getResults}
              h="100%"
              w="20%"
              ml="2rem"
              colorScheme="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          )}
        </Flex>
      )}
    </div>
  );
}
