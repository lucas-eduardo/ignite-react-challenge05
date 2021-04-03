/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { Fragment } from 'react';
import { RichText } from 'prismic-dom';

import { useRouter } from 'next/router';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';
import {
  formattedDataPrismicContent,
  formattedDate,
  estimatedReadingTime,
} from '../../utils/prismicFormattedData';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <Head>
          <title>Posts | SpecaTraveling</title>
        </Head>

        <main className={styles.container}>
          <div className={`${commonStyles.maxWrapper} ${styles.contentPost}`}>
            <h2>Carregando...</h2>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Post {post && `| ${post.data.title}`}</title>
      </Head>

      <Header />

      <main className={styles.container}>
        {post && <img src={post.data.banner.url} alt={post.data.title} />}
        <div className={`${commonStyles.maxWrapper} ${styles.contentPost}`}>
          {!post && !isFallback && <h2>Carregando...</h2>}
          {post && (
            <>
              <h1>{post.data.title}</h1>

              <div className={styles.contentInfo}>
                <time>
                  <FiCalendar size={20} />{' '}
                  {formattedDate(post.first_publication_date)}
                </time>
                <span>
                  <FiUser size={20} /> {post.data.author}
                </span>
                <time>
                  <FiClock size={20} />{' '}
                  {estimatedReadingTime(post.data.content)} min
                </time>
              </div>

              {post.data.content.map((content, key) => (
                <Fragment key={key}>
                  <h2>{content.heading}</h2>

                  <div
                    className={styles.contentBody}
                    dangerouslySetInnerHTML={{
                      __html: String(RichText.asHtml(content.body)),
                    }}
                  />
                </Fragment>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const paths = results.map(({ uid }) => ({
    params: { slug: uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const props = formattedDataPrismicContent(response);

  return {
    props,
  };
};
