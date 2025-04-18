import { MovieData } from "@/types";

export default async function fetchOneMovies(id: number): Promise<MovieData | null> {
  const url = `https://onebite-cinema-9arwnwx9p-kx1302-navercoms-projects.vercel.app/movie/${id}`;

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
