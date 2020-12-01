import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { auth } from 'firebase';
import { useAuth } from '../lib/auth';

const Home = () =>{

  const auth = useAuth();
  return <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Volunteer Me
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        {auth?.user ? (
        <button onClick={(e) => auth.signout()}>Sign Out</button>
      ): (
        <button onClick={(e) => auth.signInWithGoogle()}>Sign In</button>
      )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  };
  export default Home;