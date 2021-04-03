import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Header from '../components/Header';

import {
  formattedDataPrismicResume,
  formattedDate,
} from '../utils/prismicFormattedData';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const loadMore = async (): Promise<void> => {
    const data = await fetch(nextPage);
    const { next_page, results } = await data.json();

    const postsFormatted = formattedDataPrismicResume(results);

    setNextPage(next_page);
    setPosts([...posts, ...postsFormatted]);
  };

  useEffect(() => {
    if (postsPagination.results) setPosts(postsPagination.results);

    setNextPage(postsPagination.next_page);
  }, [postsPagination.next_page, postsPagination.results]);

  return (
    <>
      <Head>
        <title>Posts | SpaceTraveling</title>
      </Head>

      <Header />

      <main className={commonStyles.container}>
        <div className={`${commonStyles.maxWrapper} ${styles.wrapper}`}>
          {posts.map(post => (
            <div key={post.uid} className={styles.post}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <div>
                    <time>
                      <FiCalendar size={20} />{' '}
                      {formattedDate(post.first_publication_date)}
                    </time>
                    <span>
                      <FiUser size={20} /> {post.data.author}
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          ))}

          {nextPage && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={loadMore}
            >
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const { next_page, results } = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const posts = formattedDataPrismicResume(results);

  return {
    props: {
      postsPagination: {
        next_page,
        results: posts,
      },
    },
  };
};
