import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
            <Head>
              
              <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
              <meta content="#ffffff" name="theme-color" />
              <meta content="#ffffff" name="msapplication-TileColor" />
              <meta
              content="/favicons/browserconfig.xml"
              name="msapplication-config"
              />
              <link rel="shortcut icon" href="/favicons/favicon.ico" />
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                rel="stylesheet"
              />
                        <link
            href="/favicons/volunteer-me.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
                    <link
            href="/favicons/volunteer-me.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />

            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>

        );
    }
}

export default MyDocument;