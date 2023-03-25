import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
} from "@chakra-ui/react";
import { VictoryPie } from "victory-pie";

const KeywordsModal = ({
  keywords,
  loading,
  isOpen,
  closeModal,
  isYoutube,
  sentimentData,
}) => {
  const myData = [
    { x: "Positive", y: sentimentData["positive"] },
    { x: "Negative", y: sentimentData["negative"] },
    { x: "Neutral", y: sentimentData["neutral"] },
  ];
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Keywords</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            {loading ? (
              <CircularProgress isIndeterminate color="blue.300" />
            ) : isYoutube ? (
              <VictoryPie
                data={myData}
                colorScale={["green", "red", "yellow"]}
                radius={100}
              />
            ) : (
              <Text>{keywords}</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default KeywordsModal;
