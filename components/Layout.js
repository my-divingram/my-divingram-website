import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Link as Scroll } from "react-scroll";

export default function Layout({children, title, description, url, imageUrl, bg_color_to="bg-sky-100"}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content="僕のだいびんぐらむ" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={imageUrl} />
            </Head>
            <header id="header">
                <nav className="bg-sky-800">
                    <div className="h-5"></div>
                    <div className="flex justify-center">
                        <Link href="/">
                            <Image src="/img/logo/logo.png" alt="logo" width={250} height={100} style={{objectFit:"contain"}}/>
                        </Link>
                    </div>
                    <div className="h-1"></div>

                    <div className="flex justify-center space-x-10">
                        <Link href="/">
                            <p className="text-white hover:bg-sky-700 px-3 py-2 rounded">
                                TOP
                            </p>
                        </Link>
                        <Link href="/fish">
                            <p className="text-white hover:bg-sky-700 px-3 py-2 rounded">
                                魚図鑑
                            </p>
                        </Link>
                        <Link href="/blog">
                            <p className="text-white hover:bg-sky-700 px-3 py-2 rounded">
                                BLOG
                            </p>
                        </Link>
                    </div>
                    <div className="h-1"></div>
                </nav>
            </header>
            <main>
                { children }
            </main>
            <footer className={`pt-6 pb-2 ${bg_color_to}`}>
                <div className="flex justify-center items-center space-x-3">
                    <p className="text-xs text-gray-700 text-center">© 2023 僕のだいびんぐらむ.</p>
                    <Scroll to="header" smooth={true} duration={600}>
                        <Image src="/img/logo/ornate.png" alt="ornate" width={100} height={100} style={{objectFit:"contain"}}/>
                    </Scroll>
                    {/* <Link href={"/secret"}>
                        <Image src="/img/logo/ornate.png" alt="ornate" width={100} height={100} style={{objectFit:"contain"}}/>
                    </Link> */}
                </div>
            </footer>
        </div>
    )
}