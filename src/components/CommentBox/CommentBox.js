import { Button, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

import "./CommentBox.css";
const CommentBox = (props) => {
  let isYoutube = false;
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(true);
  const toast = useToast();
  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  function isYoutubeUrl(url) {
    return (
      url.includes("youtube.com/watch?v=") || url.includes("https://youtu.be")
    );
  }
  function getYouTubeVideoId(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }
  function handleOnSubmit() {
    setIsSubmitting(false);
    if (!commentText) {
      toast({
        title: "Text field is empty.",
        description:
          "Please enter some text or youtube URL to extract keywords.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      return;
    }
    if (isValidHttpUrl(commentText) && isYoutubeUrl(commentText)) {
      isYoutube = true;
      const videoId = getYouTubeVideoId(commentText);
      fetch("/.netlify/functions/Youtubekey")
        .then((res) => res.json())
        .then((data) => {
          const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${data.title}&textFormat=plainText&part=snippet&videoId=${videoId}`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              let extractedComments = "";
              for (let item of data.items) {
                extractedComments +=
                  item.snippet.topLevelComment.snippet.textDisplay + "\n";
              }
              console.log("extractedComments -- " + extractedComments);
              extractKeywords(extractedComments);
            });
        });
    } else {
      isYoutube = false;
      extractKeywords(commentText);
    }
    setIsSubmitting(true);
  }

  const extractKeywords = async (text) => {
    props.setIsLoading(true);
    props.setIsOpen(true);
    fetch("/.netlify/functions/OpenAIKey")
      .then((res) => res.json())
      .then((fnData) => {
        let prompt =
          "Extract keywords from following text. Make the first letter of every word uppercase and separate with commas:\n\n" +
          text;

        if (isYoutube) {
          prompt =
            `Build a JSON (format should be { 
            "positive": 7,
            "negative": 3,
            "neutral": 6
          } only) according to number of Positive, Negative or Neutral sentiment in following comments:\n\n` +
            text;
        }

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${fnData.key}`,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.8,
            presence_penalty: 0.0,
          }),
        };

        try {
          console.log(fnData.url);
          fetch(`${fnData.url}`, options)
            .then((response) => response.json())
            .then((data) => {
              const json = data;
              console.log(json.choices[0].text.trim());
              if (isYoutube) {
                //console.log(json.choices[0].text.trim());
                const parsedSentiment = JSON.parse(json.choices[0].text.trim());
                props.setSentimentData(parsedSentiment);
                props.setIsYoutube(true);
                console.log(parsedSentiment);
              } else {
                props.setKeywords(
                  json.choices[0].text.trim(json.choices[0].text.trim())
                );
                props.setIsYoutube(false);
              }
              props.setIsLoading(false);
            });
        } catch (error) {
          console.error(error);
        }
      });
  };
  return (
    <>
      <Textarea
        bg="blue.400"
        padding={4}
        marginTop={6}
        height={200}
        color="white"
        className={!isSubmitting && commentText === "" ? "error" : undefined}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <Button
        bg="blue.500"
        color="white"
        marginTop={4}
        width="100%"
        _hover={{ bg: "blue.700" }}
        onClick={handleOnSubmit}
      >
        Extract Keywords / Analyze Sentiment
      </Button>
    </>
  );
};

export default CommentBox;
