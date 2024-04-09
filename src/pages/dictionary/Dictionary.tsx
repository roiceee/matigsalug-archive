import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../components/UserProvider";
import { db } from "../../firebase";

export default function Dictionary() {
  //get all data from firestore db

  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [data, setData] = useState<
    { id: string; english: string; matigsalug: string }[]
  >([]);

  const [filter, setFilter] = useState<"all" | "english" | "matigsalug">("all");

  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const [searched, setSearched] = useState<string>("");

  const [addForm, setAddForm] = useState<{
    english: string;
    matigsalug: string;
  }>({
    english: "",
    matigsalug: "",
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    const q = query(collection(db, "data"), orderBy("english"));
    const getData = async () => {
      const data = await getDocs(q);
      const dataArr = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...(doc.data() as { english: string; matigsalug: string }),
        };
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

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "data"), {
        english: addForm.english.trim().toLowerCase(),
        matigsalug: addForm.matigsalug.trim().toLowerCase(),
      });
      setData([
        ...data,
        {
          id: docRef.id,
          english: addForm.english,
          matigsalug: addForm.matigsalug,
        },
      ]);
      setAddForm({ english: "", matigsalug: "" });
    } catch {
      alert("Error adding data");
    }
  };

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
      .filter((obj) => {
        return filter === "all" ? true : obj[filter].includes(searched);
      })
      .sort(() => {
        return sort === "asc" ? 1 : -1;
      })
      .map((entry, index) => {
        return (
          <div
            key={"data-" + index}
            className="card bg-white shadow-md max-w-[600px] w-full mx-auto"
          >
            <div className="card-body md:flex-row p-3 md:p-4">
              <div>
                <div className="text-xs mb-2">English</div>
                <div className="text-md md:text-xl">{entry.english}</div>
              </div>
              <div className="divider md:divider-horizontal my-0 lg:my-1"></div>
              <div>
                <div className="text-xs mb-2">Matigsalug</div>
                <div className="text-md md:text-xl">{entry.matigsalug}</div>
              </div>
              <div className=" ml-auto">
                {user && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      deleteDoc(doc(db, "data", entry.id));
                      setData(data.filter((obj) => obj.id !== entry.id));
                    }}
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      });
  }, [data, searched, loadingState, filter, sort, user]);

  return (
    <main>
      <section className="card bg-white shadow-md mb-4">
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
            </label>
          </div>
          <div className="flex flex-row gap-2">
            <span>Filter:</span> {/* can select which filter */}
            <select
              className="select select-bordered select-sm"
              onChange={(e) =>
                setFilter(e.target.value as "all" | "english" | "matigsalug")
              }
            >
              <option value="all">All</option>
              <option value="english">English</option>
              <option value="matigsalug">Matigsalug</option>
            </select>
          </div>
          <div className="flex flex-row gap-2">
            <span>Sort by:</span>{" "}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
            >
              {sort === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>
        </div>
      </section>
      {user && (
        <section className="card bg-white shadow-md mb-4">
          {/* add new word */}

          <div className="card-body p-4 gap-4">
            <div>
              <label className="label">
                <span>English</span>
                <input
                  type="text"
                  className="input input-bordered"
                  value={addForm.english}
                  onChange={(e) =>
                    setAddForm({ ...addForm, english: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label className="label">
                <span>Matigsalug</span>
                <input
                  type="text"
                  className="input input-bordered"
                  value={addForm.matigsalug}
                  onChange={(e) =>
                    setAddForm({ ...addForm, matigsalug: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <button className="btn btn-primary btn-wide" onClick={addData}>
                Add
              </button>
            </div>
          </div>
        </section>
      )}
      <section className="grid md:grid-cols-2 gap-4 pb-4">{search}</section>
    </main>
  );
}
