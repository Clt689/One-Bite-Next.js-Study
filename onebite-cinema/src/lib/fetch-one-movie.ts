import { MovieData } from "@/types";

export default async function fetchOneMovies(id: number): Promise<MovieData | null> {
  const url = `https://onebite-cinema-api-theta-lac.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
