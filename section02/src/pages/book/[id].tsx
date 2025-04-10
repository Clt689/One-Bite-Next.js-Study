import fetchOneBook from "@/lib/fetch-one-book";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";

export const getStaticPaths = () => {
  return {
    paths: [
      // 하나의 경로 item을 객체로 설정해 줘야 함
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      // params: url 파라미터를 의미
      // 프레임워크 문법상, url 파라미터값들은 반드시 문자열로
    ],
    fallback: false,
    // fallback : "대체, 대비책, 보험" 정도의 의미
    // 설정해 두지 않은 "4" 같은 url로 접속 요청을 보냈을 때
    // 3가지의 옵션이 존재
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return "문제가 발생했습니다. 다시 시도하세요.";
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
