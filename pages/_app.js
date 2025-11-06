import '@/styles/globals.css'
import Script from "next/script";
import * as gtag from "/libs/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  useEffect(() => {
    // 1. ページ読み込み時 (初回) のURLをチェック
    // router.asPath を使って、ブラウザに表示されている実際のパスを確認
    if (router.asPath.endsWith('.') && router.asPath.length > 1) {
      const newUrl = router.asPath.slice(0, -1); // 末尾の "." を削除
      // 履歴を残さずにURLを置換
      router.replace(newUrl);
    }

    // 2. Gtag用のハンドラ
    const handleRouterChange = (url) => {
      gtag.pageview(url);
    };

    // 3. ページ遷移 "開始時" のハンドラ (クリック時)
    const handleRouteChangeStart = (url) => {
      if (url.endsWith('.') && url.length > 1) {
        const newUrl = url.slice(0, -1); // 末尾の "." を削除
        router.replace(newUrl);
      }
    };

    // イベントリスナーを登録
    router.events.on("routeChangeStart", handleRouteChangeStart); // 遷移開始時
    router.events.on("routeChangeComplete", handleRouterChange); // 遷移完了時 (Gtag)

    // クリーンアップ
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouterChange);
    };
  }, [router, router.asPath, router.events]); // 依存配列に router と router.asPath を追加

  return (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gtag.GA_MEASUREMENT_ID}');
        `,
      }}
    />
    <Component {...pageProps} />

    <Analytics />
  </>)
}
