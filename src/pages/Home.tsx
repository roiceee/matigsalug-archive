import { useCallback, useState } from "react";
import _ from "lodash";
import { ArrowUpDown } from "lucide-react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { About } from "../components/About";

export default function Home() {
  const [translateState, setTranslateState] = useState<{
    input: "english" | "matigsalug";
    output: "english" | "matigsalug";
  }>({ input: "english", output: "matigsalug" });
  //by default, english is the input

  const [translateValue, setTranslateValue] = useState<{
    input: string;
    output: string;
  }>({ input: "", output: "" });

  const setInputValue = (value: string) => {
    setTranslateValue((state) => {
      return {
        ...state,
        input: value,
      };
    });

    setOutputValue("Loading...");
    debouncedGetData(translateState.input, value);
  };

  const setOutputValue = (value: string) => {
    setTranslateValue((state) => {
      return {
        ...state,
        output: value,
      };
    });
  };

  const toggleTranslateState = useCallback(() => {
    setTranslateState({
      input: translateState.output,
      output: translateState.input,
    });
    setTranslateValue({
      input: translateValue.output,
      output: translateValue.input,
    });
  }, [translateState, translateValue]);

  const getData = async (key: string, value: string) => {
    const trimmedValue = value.trim();

    const q = query(
      collection(db, "data"),
      where(key, "==", trimmedValue.toLowerCase()),
      limit(1)
    );

    const data = await getDocs(q);

    if (data.size == 0) {
      setOutputValue(trimmedValue);
      return;
    }

    data.forEach((doc) => {
      setOutputValue(doc.data()[translateState.output].trim());
    });
  };

  const debouncedGetData = _.debounce(getData, 500);

  return (
    <main>
      <section className="p-8 border rounded-lg shadow-md bg-white">
        <div className="mb-12">
          <button
            className="btn btn-outline"
            onClick={toggleTranslateState}
          >
            {_.capitalize(translateState.input)} to{" "}
            {_.capitalize(translateState.output)}
            <ArrowUpDown />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-center gap-3">
          <div className="flex flex-col w-full">
            <label htmlFor="input" className="mb-2">
              Input ({_.capitalize(translateState.input)})
            </label>
            <textarea
              id="input"
              placeholder="Input word here"
              className="textarea textarea-lg textarea-bordered w-full bg-white"
              style={{ resize: "none" }}
              value={translateValue.input}
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="result" className="mb-2">
              Result ({_.capitalize(translateState.output)})
            </label>
            <textarea
              readOnly
              id="result"
              placeholder="Result"
              className="textarea textarea-lg textarea-bordered w-full text-slate-black"
              style={{ resize: "none" }}
              value={translateValue.output}
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="btn btn-primary text-lg"
            onClick={() => {
              getData(translateState.input, translateValue.input);
            }}
          >
            Resend
          </button>
        </div>
      </section>
      
      <section>
        <About></About>
      </section>
    </main>
  );
}
