"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
  Box,
  Input,
  Stack,
  Image,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";


const NewModalc = ({isOpen, onClose}) =>{

    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState(null);
    const [unsplashQuery, setUnsplashQuery] = useState("");
    const [unsplashImages, setUnsplashImages] = useState([]);
    const [page, setPage] = useState(1);
  
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);
  
  
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    };
  
    const handleUnsplashSearch = async () => {
      try {
        setUnsplashImages([]); // Clear previous search results
        setPage(1); // Reset page number to 1
  
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${unsplashQuery}&page=${page}&per_page=10&client_id=i-0lfW2d5AShMl9UxXEhlPQ85IX3gog-iDaB72Iitxg`
        );
        const data = await response.json();
        setUnsplashImages(data.results);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
      }
    };
  
    const handleLoadMore = async () => {
      try {
        const nextPage = page + 1;
        setPage(nextPage);
  
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${unsplashQuery}&page=${nextPage}&per_page=10&client_id=i-0lfW2d5AShMl9UxXEhlPQ85IX3gog-iDaB72Iitxg`
        );
        const data = await response.json();
        setUnsplashImages((prevImages) => [...prevImages, ...data.results]);
      } catch (error) {
        console.error("Error fetching more images from Unsplash:", error);
      }
    };
  
    const handleImageClick = (imageUrl) => {
      setSelectedImage(imageUrl);
      onClose(); // Close the modal
    };


return(
    <div>
        <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Media Modal</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Tabs>
                  <TabList>
                    <Tab>Upload</Tab>
                    <Tab>Unsplash</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Stack spacing={4}>
                        <Box
                          borderWidth={2}
                          borderStyle="dashed"
                          borderColor="gray.300"
                          borderRadius="md"
                          p={4}
                          textAlign="center"
                          cursor="pointer"
                          transition="border-color 0.2s"
                          _hover={{ borderColor: "blue.500" }}
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                          />
                          <Box>
                            <Icon
                              as={FiUpload}
                              boxSize={8}
                              color="gray.500"
                              mb={2}
                            />
                            <Text fontWeight="bold" mb={1}>
                              Click to upload an image
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              select an image
                            </Text>
                          </Box>
                        </Box>
                      </Stack>
                    </TabPanel>

                    <TabPanel>
                      <Stack spacing={4}>
                        <Box>
                          <Input
                            type="text"
                            placeholder="Search Unsplash"
                            value={unsplashQuery}
                            onChange={(e) => setUnsplashQuery(e.target.value)}
                          />
                          <Button onClick={handleUnsplashSearch} mt={2}>
                            Search
                          </Button>
                        </Box>
                        <Box height="300px" overflow="auto">
                          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                            {unsplashImages.map((image) => (
                              <GridItem key={image.id}>
                                <Image
                                  src={image.urls.thumb}
                                  alt={image.alt_description}
                                  onClick={() =>
                                    handleImageClick(image.urls.regular)
                                  }
                                  cursor="pointer"
                                />
                              </GridItem>
                            ))}
                          </Grid>
                        </Box>
                        {unsplashImages.length > 0 && (
                          <Button onClick={handleLoadMore}>Load More</Button>
                        )}
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            </ModalContent>
          </Modal>
    </div>
)
}

export default NewModalc;