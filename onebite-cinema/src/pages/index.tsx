import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import movie from "@/mock/movie.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const allMovies = await fetchMovies();
  // const recoMovies =

  return {
    props: {
      allMovies,
    },
  };
};

export default function Home({
  allMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.reco_container}>
          {movie.slice(0, 3).map((movie) => (
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
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
