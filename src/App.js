import "./App.css";
import CommentBox from "./components/CommentBox/CommentBox";

import { useState } from "react";
import Header from "./components/Header/Header";
import { Box, Container } from "@chakra-ui/react";
import Footer from "./components/Footer/Footer";
import KeywordsModal from "./components/KeywordsModal/KeywordsModal";

function App() {
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);

  const [sentimentData, setSentimentData] = useState({});

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3x1" centerContent>
        <Header />

        <CommentBox
          setIsLoading={setIsLoading}
          setIsOpen={setIsOpen}
          setSentimentData={setSentimentData}
          setKeywords={setKeywords}
          setIsYoutube={setIsYoutube}
        ></CommentBox>
        <Footer />
      </Container>
      <KeywordsModal
        keywords={keywords}
        loading={isLoading}
        isOpen={isOpen}
        sentimentData={sentimentData}
        closeModal={closeModal}
        isYoutube={isYoutube}
      />
    </Box>
  );
}

export default App;
