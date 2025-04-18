import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "../../components/searchable-layout";
import style from "./index.module.css";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const _movies = await fetchMovies(q as string);
    setMovies(_movies);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입 씨네마 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입 씨네마"></meta>
        <meta property="og:description" content="한입 씨네마 - 검색 결과"></meta>
      </Head>
      <div className={style.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}
Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
