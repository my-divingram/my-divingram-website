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

            <div className="px-10 md:px-20 font-sans">

                <h1 className="pt-10 pb-5 text-xl md:text-2xl text-center text-sky-800 font-black">{data_blog.title}</h1>
                <p className="text-sm md:text-base text-center text-gray-700">{data_blog.publishedAt.substr(0,10)}</p>

                <div
                    dangerouslySetInnerHTML={{__html: `${data_blog.article}`,}} 
                    className="
                        prose prose-sm md:prose-base
                        prose-p:leading-relaxed
                        max-w-4xl
                        mx-auto
                        prose-a:text-sky-600
                        prose-figcaption:text-sm
                        md:prose-figcaption:text-base
                        prose-figcaption:text-gray-700
                        prose-figcaption:text-center
                        prose-figcaption:mt-2
                        prose-strong:font-extrabold

                        prose-h1:bg-sky-800/80
                        prose-h1:text-white
                        prose-h1:font-bold
                        prose-h1:px-6
                        prose-h1:py-3
                        prose-h1:rounded-lg
                        prose-h1:shadow-md
                        prose-h1:mt-12
                        prose-h1:mb-6
                        prose-h1:text-lg
                        prose-h1:md:text-xl
                    "
                />

            </div>
        </Layout>

    );
  }