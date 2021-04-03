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

interface IFormattedDataPrismicContent {
  estimatedTime: number;
  post: {
    first_publication_date: string;
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

const formattedDate = (date: string): string => {
  const [day, month, year] = format(parseISO(date), 'dd LLL yyyy', {
    locale: ptBR,
  }).split(' ');

  const dateFormatted = `${day} ${month.charAt(0).toUpperCase()}${month.slice(
    1
  )} ${year}`;

  return dateFormatted;
};

export const formattedDataPrismicResume = (
  posts: Document[]
): IFormattedDataPrismicResume[] => {
  return posts.map(post => ({
    uid: post.uid,
    first_publication_date: formattedDate(post.first_publication_date),
    data: post.data,
  }));
};

export const formattedDataPrismicContent = (
  post: Document
): IFormattedDataPrismicContent => {
  const words = post.data.content.reduce((acc: [], content) => {
    const asText = RichText.asText(content.body);
    const textSplit = asText.split(' ').filter(text => text);

    return [...acc, ...textSplit];
  }, []);

  const estimatedTime = Math.ceil(words.length / 200);

  const postFormatted = {
    first_publication_date: formattedDate(post.first_publication_date),
    data: {
      title: post.data.title,
      banner: {
        url: post.data.banner.url,
      },
      author: post.data.author,
      content: post.data.content.map(({ heading, body }) => ({
        heading,
        body: RichText.asHtml(body),
      })),
    },
  };

  return {
    estimatedTime,
    post: postFormatted,
  };
};
