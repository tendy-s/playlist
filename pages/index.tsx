import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

import Head from "next/head";
import GradientLayout from "../components/gradientLayout";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user } = useMe();
  return (
    <GradientLayout
      roundImage
      color="pink"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="/lady.png"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="medium">Only visible to you</Text>
          <Flex>
            {artists.map((artist) => (
              <Box paddingX="10px" width="20%">
                <Box
                  bg="gray.900"
                  borderRadius="4px"
                  padding="15px"
                  width="100%"
                >
                  <Image src="/dog.jpg" borderRadius="100%" />
                </Box>
                <Box marginTop="20px">
                  <Text fontSize="Large">{artist.name}</Text>
                  <Text fontSize="Small">Artist</Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  const updatedArtists = artists.map((artist) => {
    return {
      ...artist,
      createdAt: artist.createdAt.toString(),
      updatedAt: artist.updatedAt.toString(),
    };
  });
  return {
    props: { artists: updatedArtists },
  };
};

export default Home;
