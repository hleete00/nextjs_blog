import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Hunters Blog</title>
        <meta name="description" content="I post about stuff." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedPosts();
  return {
    props: {
      posts: featuredEvents,
    },
    revalidate: 60,
  };
}

export default HomePage;
