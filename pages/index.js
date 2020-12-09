import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { auth } from 'firebase';
import { useAuth } from '@/lib/auth';
import Footer from '@/components/Footer';
import { Box, Button, Flex, Text, Icon, Link, Stack } from '@chakra-ui/react';
import LoginButtons from '@/components/LoginButtons';
import { Image } from "@chakra-ui/react"

const Home = () => {

  const auth = useAuth();
  return (
    <>
    <Box bg="gray.100" py={16}>
      <Flex
        as="main"
        direction="column"
        maxW="700px"
        margin="0 auto"
        
      >
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (document.cookie && document.cookie.includes('volunteer-me-auth')) {
                window.location.href = "/project"
              }
            `
            }}
          />
        </Head>
        <Image src="https://antreclimited.com/wp-content/uploads/2016/06/socialcare_icon-300x300.png" boxSize="110px" />
        <Text mb={4} fontSize="lg" py={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Volunteer Me
    </Text>
          {' is being built as part of '}
          <Link
            href="https://fellowship.mlh.io/"
            isExternal
            textDecoration="underline"
          >
            MLH-Fellowship
            </Link>
          {`. It's the easiest way to find volunteers for projects related to social work. It's still a work-in-progress, but you can try it out by logging in.`}
        </Text>
        {auth.user ? (
          <Button
            as="a"
            href="/project"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            mt={4}
            size="lg"
            maxW="200px"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            View Projects
          </Button>
        ) : (
          <LoginButtons />
          )}
      </Flex>
    </Box>
         <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        </Box>
    <Footer />
    </> 
  );
};
export default Home;