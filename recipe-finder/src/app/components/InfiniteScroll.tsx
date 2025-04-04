import { useEffect } from "react";


export default function InfiniteScroll({ fetchMore }: { fetchMore: () => void }) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        fetchMore();
      }
    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore]);


  return null;
}
