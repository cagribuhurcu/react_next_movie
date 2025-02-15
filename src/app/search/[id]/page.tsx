"use client"
import { Imovie } from "@/app/discover/[id]/page";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Search = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const id = params.id.toString();
    const page = searchParams.get("page");
    setTitle(`${id} Movies`);
    setSearch(id);

    axios
      .get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: id,
          page,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_page);
      })
      .catch((error) => console.log(error));
  }, [params.id, searchParams.get("page")]);

  const handlePageChange = (button: string) => {
    let page = "";

    if (button == "prev") {
      page = `page=${currentPage - 1}`;
    } else {
      page = `page=${currentPage + 1}`;
    }

    router.push(`/search/${search}?${page}`);
  };

  return (
    <main
      className="bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative"
      ref={mainRef}
    >
      <h2 className="text-[24px] tracking-[2px]">{title}</h2>
      {movies.length === 0 && <Loading />}
      <div className="grid gap-8 moviesGrid place-items-center mt-8">
        {movies.map((movie: Imovie) => (
          <Card
            key={movie.id}
            img={movie.poster_path}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
          />
        ))}
      </div>

      <div className="flex justify-center gap-16 py-6 pt-16">
        <button
          onClick={() => handlePageChange("prev")}
          className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
            currentPage === 1 && "hidden"
          }`}
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className={`bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
            currentPage === totalPage && "hidden"
          }`}
        >
          Next
        </button>
      </div>
      <div className="pb-18">
        <Footer />
      </div>
    </main>
  );
};

export default Search;
