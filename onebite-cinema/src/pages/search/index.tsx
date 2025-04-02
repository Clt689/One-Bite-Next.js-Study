import { ReactNode } from "react";
import SearchableLayout from "../../components/searchable-layout";
import movie from "@/mock/movie.json";
import { useRouter } from "next/router";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Page() {
  const router = useRouter();

  return (
    <div className={style.container}>
      {movie.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
