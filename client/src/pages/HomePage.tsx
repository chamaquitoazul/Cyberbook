import {
  Box,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  ScaleFade,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import BookCard from "../components/BookCard";

type SearchFilter = "title" | "genre" | "category" | "reading-list";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("title");
  const navigation = useNavigate();
  const { books, isLoading } = useBooks();

  const search = books.filter((book) => {
    switch (filter) {
      case "title":
        return book.title.toLowerCase().includes(query.toLowerCase());
      case "genre":
        return book.genres.some((genre) =>
          genre.toLowerCase().includes(query.toLowerCase())
        );
      case "category":
        return book.categoryName.toLowerCase().includes(query.toLowerCase());
      case "reading-list":
        return false;
    }
  });

  const bookCards = search.map((book, i) => {
    return (
      <ScaleFade in={true} initialScale={0.1} key={i}>
        <motion.div whileHover={{ scale: 1.08 }}>
          <BookCard
            book={book}
            compact
            onClick={() =>
              navigation("/home/book/" + book.idBook, { state: { book } })
            }
          />
        </motion.div>
      </ScaleFade>
    );
  });

  return (
    <>
      <VStack
        alignItems="center"
        width="100vw"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundImage: "url('assets/images/library.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1, // Ensure this stays behind other content
            opacity: 1.0,
            filter: "brightness(0.3) grayscale(0.3)",
          }}
        />
        <Container maxW="800px" size="lg" py={5}>
          <InputGroup mt="20vh">
            <Select
              bg="surface"
              borderColor="surfaceDarker"
              maxW={200}
              mr={4}
              onChange={(e) => {
                setFilter(e.target.value as SearchFilter);
              }}
            >
              <option value="title">Título</option>e
              <option value="genre">Género</option>
              <option value="category">Categoría</option>
              <option value="reading-list">Lista De Lectura </option>
            </Select>
            <Input
              bg="surface"
              borderColor="surfaceDarker"
              placeholder="Introduce el nombre de tu libro favorito"
              _placeholder={{ color: "#5e503f" }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <InputRightElement pointerEvents="none" children={<FaSearch />} />
          </InputGroup>
        </Container>
        <Box
          w="100%"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          py={12}
          mt={40}
          minH="100vh"
          bg="surfaceLighter"
        >
          {bookCards.length > 0 ? (
            <SimpleGrid
              columns={{
                base: 1,
                sm: 3,
                md: 4,
                xl: 5,
              }}
              spacingX={7}
              spacingY={20}
            >
              {bookCards}
            </SimpleGrid>
          ) : isLoading ? (
            <SimpleGrid
              columns={{
                base: 1,
                sm: 3,
                md: 4,
                xl: 5,
              }}
              spacingX={7}
              spacingY={20}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                <Box borderRadius="10px" key={i}>
                  <Skeleton
                    key={i}
                    startColor="surface"
                    endColor="surfaceDarker"
                    borderRadius="10px"
                    height="210px"
                    width="240px"
                  />
                  <SkeletonText
                    mt="4"
                    startColor="surface"
                    endColor="surfaceDarker"
                    noOfLines={2}
                  />
                  <SkeletonText
                    startColor="surface"
                    endColor="surfaceDarker"
                    mt="4"
                    noOfLines={1}
                  />
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <motion.div
              animate={{ scale: [0.4, 1] }}
              transition={{ duration: 0.15 }}
            >
              <Text fontSize="xl" fontWeight="bold" mt="9vh">
                No se encontraron resultados :/
              </Text>
            </motion.div>
          )}
        </Box>
      </VStack>
    </>
  );
};

export default HomePage;
