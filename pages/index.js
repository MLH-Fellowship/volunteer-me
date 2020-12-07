import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { auth } from 'firebase';
import { useAuth } from '@/lib/auth';

import { FcGoogle } from 'react-icons/fc';

// 1. import `ChakraProvider` component
import { ChakraProvider, Button, Icon, Flex, Stack, Heading, Text, Code } from "@chakra-ui/react"

import Link from 'next/link'

const Home = () => {

  const auth = useAuth();
  return (
  <Flex
    as="main"
    direction="column"
    align="center"
    justify="center"
    h="100vh"
  >
    <Head>
      <title>Volunteer Me</title>
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>


    <Icon color="black" name="logo" size="64px" />

    {/* <Text>
        Current user: <Code> {auth.user ? auth.user.email : 'None'}</Code>
      </Text> */}

    {/* <Stack direction="row" spacing={4}>
        {auth?.user ? (
        <Button leftIcon={<GoSignOut />} onClick={(e) => auth.signout()} colorScheme="red" variant="outline">
          Sign Out
          </Button>
      ): (
        <Button leftIcon={<FcGoogle />} onClick={(e) => auth.signInWithGoogle()} colorScheme="red" variant="solid">
          Sign In
          </Button>
          
      )}
      </Stack> */}
    {auth.user ? (
      <Button as="a" href="/project">
        View Dashboard
      </Button>
    ) : (
        <Button leftIcon={<FcGoogle />} mt={4} size="sm" onClick={(e) => auth.signInWithGoogle()}>
          Sign In
        </Button>
      )}

  </Flex>

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