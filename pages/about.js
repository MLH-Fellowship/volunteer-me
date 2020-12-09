import Footer from "@/components/Footer";
import { Box, Button, Flex, Text, Icon, Link, Stack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

function About() {
  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Image
            src="https://antreclimited.com/wp-content/uploads/2016/06/socialcare_icon-300x300.png"
            boxSize="110px"
          />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Volunteer Me
            </Text>
            {" is being built as part of "}
            <Link
              href="https://fellowship.mlh.io/"
              isExternal
              textDecoration="underline"
            >
              MLH-Fellowship
            </Link>
            <br />
            <br />
            Volunteer.me is a global collaboration platform promoting social
            good. Our goal is to provide a platform that connects people seeking
            to volunteer, and those who need volunteers.
            <br />
            <br />
            Made with ❤️ by{" "}
            <Link
              href="https://clarachick.me/"
              isExternal
              textDecoration="underline"
            >
              Clara
            </Link>
            ,{" "}
            <Link
              href="https://github.com/pablomdd"
              isExternal
              textDecoration="underline"
            >
              Pablo
            </Link>{" "}
            and{" "}
            <Link
              href="https://shayanriyaz.github.io/"
              isExternal
              textDecoration="underline"
            >
              Shayan
            </Link>
          </Text>
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      ></Box>
      <Footer />
    </>
  );
}

export default About;
