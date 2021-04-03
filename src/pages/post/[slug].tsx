/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { Fragment } from 'react';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formattedDataPrismicContent } from '../../utils/prismicFormattedData';

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
  estimatedTime: number;
}

export default function Post({ post, estimatedTime }: PostProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Post {post && `| ${post.data.title}`}</title>
      </Head>

      <main className={styles.container}>
        {post && <img src={post.data.banner.url} alt={post.data.title} />}
        <div className={`${commonStyles.maxWrapper} ${styles.contentPost}`}>
          {!post && <h2>Carregando...</h2>}
          {post && (
            <>
              <h1>{post.data.title}</h1>

              <div className={styles.contentInfo}>
                <time>
                  <FiCalendar size={20} /> {post.first_publication_date}
                </time>
                <span>
                  <FiUser size={20} /> {post.data.author}
                </span>
                <time>
                  <FiClock size={20} /> {estimatedTime} min
                </time>
              </div>

              {post.data.content.map((content, key) => (
                <Fragment key={key}>
                  <h2>{content.heading}</h2>

                  <div
                    className={styles.contentBody}
                    dangerouslySetInnerHTML={{ __html: String(content.body) }}
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
  const { uid } = await prismic.queryFirst(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
    }
  );

  return {
    paths: [
      {
        params: { slug: uid },
      },
    ],
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
