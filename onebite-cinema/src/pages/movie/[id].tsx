import fetchMovies from "@/lib/fetch-movies";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import style from "./[id].module.css";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  return {
    paths: movies.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩 중입니다";
  if (!movie) return "문제가 발생했습니다 다시 시도하세요";
  const { id, title, subTitle, company, runtime, description, posterImgUrl, releaseDate, genres } =
    movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>

      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>

        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
