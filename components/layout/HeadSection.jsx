import Head from "next/head";

const HeadSection = ({ title, content, pageURL, ogImage }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={content} />
      <meta name='author' content='Alamin Shaikh' />
      <link rel='canonical' href={pageURL} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={content} />
      <meta property='og:url' content={pageURL} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:image:width' content='920' />
      <meta property='og:image:height' content='470' />
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
};

export default HeadSection;
