import React from "react";
import { Heading, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/light-bulb.svg";
const Header = () => {
  return (
    <>
      <Image src={logo} alt="logo" width={100} marginBottom="1rem" />
      <Heading color="white" marginBottom="1rem">
        Keyword Extractor or Sentimental Analysis
      </Heading>
      <Text fontSize={25} textAlign="center">
        Paste in your text below for keyword extraction or youtube video link
        for sentiment analysis.
      </Text>
    </>
  );
};

export default Header;
