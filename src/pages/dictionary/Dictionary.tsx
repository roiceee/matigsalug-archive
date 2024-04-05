import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase";
import { Search } from "lucide-react";

export default function Dictionary() {
  //get all data from firestore db

  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [data, setData] = useState<{ english: string; matigsalug: string }[]>(
    []
  );

  const [searched, setSearched] = useState<string>("");

  useEffect(() => {
    const q = query(collection(db, "data"), orderBy("english"));
    const getData = async () => {
      const data = await getDocs(q);
      const dataArr = data.docs.map((doc) => {
        return doc.data() as { english: string; matigsalug: string };
      });
      setData(dataArr);
    };
    try {
      getData();
      setLoadingState("success");
    } catch {
      setLoadingState("error");
    }
  }, []);

  const search = useMemo(() => {
    if (loadingState === "loading")
      return (
        <span className="col-span-2 mx-auto text-center loading loading-dots loading-lg"></span>
      );
    if (loadingState === "error")
      return (
        <div className="col-span-2 text-center">
          Error. Please{" "}
          <button
            className="btn btn-accent"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );

    return data
      .filter((obj) => {
        return (
          obj.english.includes(searched) || obj.matigsalug.includes(searched)
        );
      })
      .map((entry, index) => {
        return (
          <div
            key={"data-" + index}
            className="card bg-base-100 shadow-md max-w-[600px] w-full mx-auto"
          >
            <div className="card-body md:flex-row p-4">
              <div>
                <div className="text-xs mb-2">English</div>
                <div className="text-xl">{entry.english}</div>
              </div>
              <div className="divider md:divider-horizontal my-1"></div>
              <div>
                <div className="text-xs mb-2">Matigsalug</div>
                <div className="text-xl">{entry.matigsalug}</div>
              </div>
            </div>
          </div>
        );
      });
  }, [data, searched, loadingState]);

  return (
    <main>
      <section className="card bg-base-100 shadow-md mb-4">
        <div className="card-body p-4 gap-4">
          <div>
            <label
              className="input input-bordered flex items-center gap-2 input-primary"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={(e) => setSearched(e.target.value)}
              />
              <button>
                <Search />
              </button>
            </label>
          </div>
          <div className="flex flex-row gap-2">
            <span>Sort by:</span>{" "}
            <button className="btn btn-outline btn-wide">A-Z</button>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-4 mb-4">{search}</section>
    </main>
  );
}
