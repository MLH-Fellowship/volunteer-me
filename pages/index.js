import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { auth } from 'firebase';
import { useAuth } from '@/lib/auth';

import { FcGoogle } from 'react-icons/fc';

// 1. import `ChakraProvider` component
import { Box, Button, Flex, Text, Icon, Link, Stack } from '@chakra-ui/react';
// import Link from 'next/link'

const Home = () => {

  const auth = useAuth();
  return (
    <Box bg="gray.100">
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="400px"
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
          <title>Volunteer Me</title>
        </Head>
        <Icon color="black" name="logo" size="64px" href="favicons/favicon.ico" />
        <Text mb={4} fontSize="lg" p={6}>
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
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >

            View Projects
          </Button>
        ) : (
            <Button
              onClick={(e) => auth.signInWithGoogle()}
              backgroundColor="red"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon={<FcGoogle />}
              mt={4}
              size="lg"
              _hover={{ bg: 'red.400' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with Google
            </Button>
          )}

      </Flex>
    </Box>

    // <footer className={styles.footer}>
    //   <a
    //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Powered by{' '}
    //     <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
    //   </a>
    // </footer>

  );
};
export default Home;