import MovieItem from "@/components/movie-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import style from "./index.module.css";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([fetchMovies(), fetchRandomMovies()]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입 씨네마"></meta>
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 모든 영화들을 만나보세요."
        ></meta>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.reco_container}>
            {recoMovies.slice(0, 3).map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>

        <section>
          <h3>등록된 모든 영화</h3>
          <div className={style.all_container}>
            {allMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
