import { client } from "/libs/client";
import Layout from "/components/Layout";

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data_blog = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      data_blog: data_blog,
    },
  };
};

export const getStaticPaths = async () => {
  const data_blog = await client.get({ endpoint: "blog", queries: {limit: 100}});

  const paths = data_blog.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};


export default function BlogId({ data_blog }) {
    const title = `${data_blog.title} | 僕らむのBLOG`
    const url = `https://www.my-divingram.com/blog/${data_blog.id}`

    return (
      <Layout title={title} description={data_blog.abstruct} url={url} imageUrl={data_blog.thumbnail.url}>

            <div className="px-3 md:px-20 bg-gradient-to-b from-white to-sky-100 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">{data_blog.title}</h1>
                <p className="text-sm md:text-base text-center text-gray-700">{data_blog.publishedAt.substr(0,10)}</p>

                <div dangerouslySetInnerHTML={{__html: `${data_blog.article}`,}} className="px-10 md:px-20 prose prose-figure:flex prose-figure:justify-center prose-figure:m-0 prose-figure:pt-8 prose-figure:pb-2 prose-p:text-gray-700 prose-h1:m-0 prose-h1:pt-10 prose-h1:pb-2 prose-h1:text-lg prose-h1:md:text-xl prose-h1:text-gray-700 prose-h1:font-medium prose-h1:border-b-4 prose-h1:border-dotted prose-h1:border-gray-500 prose-p:m-0 prose-p:pt-7 prose-p:text-sm prose-p:md:text-base text-center max-w-none"></div>

            </div>
        </Layout>

    );
  }