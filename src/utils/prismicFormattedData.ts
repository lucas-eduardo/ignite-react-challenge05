import { Document } from '@prismicio/client/types/documents';
import { RichText } from 'prismic-dom';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface IFormattedDataPrismicResume {
  uid: string;
  first_publication_date: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface IOptions {
  nextPost: {
    uid: string;
    title: string;
  } | null;
  prevPost: {
    uid: string;
    title: string;
  } | null;
  preview: boolean;
}

interface IFormattedDataPrismicContent extends IOptions {
  post: {
    first_publication_date: string;
    last_publication_date: string;
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
  };
}

export const formattedDate = (date: string, isLast = false): string => {
  const mask = isLast
    ? "'* editado em' dd LLL yyyy, à's' HH:mm"
    : 'dd LLL yyyy';

  const dateFormatted = format(parseISO(date), mask, {
    locale: ptBR,
  });

  return dateFormatted;
};

export const estimatedReadingTime = (content): number => {
  const words = content.reduce((acc: [], item) => {
    const asText = RichText.asText(item.body);
    const textSplit = asText.split(' ').filter(text => text);

    return [...acc, ...textSplit];
  }, []);

  const estimatedTime = Math.ceil(words.length / 200);

  return estimatedTime;
};

export const formattedDataPrismicResume = (
  posts: Document[]
): IFormattedDataPrismicResume[] => {
  return posts.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: post.data,
  }));
};

export const formattedDataPrismicContent = (
  post: Document,
  options: IOptions
): IFormattedDataPrismicContent => {
  const postFormatted = {
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    last_publication_date: post.last_publication_date,
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      banner: {
        url: post.data.banner.url,
      },
      author: post.data.author,
      content: post.data.content.map(({ heading, body }) => ({
        heading,
        body,
      })),
    },
  };

  return {
    post: postFormatted,
    ...options,
  };
};
