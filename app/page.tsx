"use client";
import { TitleFieldTop } from "@/components/TitleField-top";
import { useEffect, useState ,useRef} from "react";
import {
  Input,
  Card,
  CardBody,
  Button,
  Textarea,
  Checkbox,
} from "@nextui-org/react";
import { pinyin } from "pinyin-pro";
import LyricsScreen from "@/components/songLyricsOutput";
type Line = {
  prefix: string;
  lyrics: { character: string; pinyin: string };
  chords: { chord: string; c_position: any; p_position: any }[];
  spacing: number;
};

type Song = {
  title: string;
  page: number;
  description: string;
  category: string;
  capo: number;
  tags: string[];
  lyricsWithChords: Line[];
};
export default function Home() {
  const [songTitle, setSongTitle] = useState("");
  const [songPage, setSongPage] = useState(Number(""));
  const [songDescription, setSongDescription] = useState("");
  const [songCategory, setSongCategory] = useState("");
  const [songCapo, setSongCapo] = useState<number>(0);
  const [songTags, setSongTags] = useState<string[]>([]);
  const [spacing, setSpacing] = useState(0);
  const [finalJson, setFinalJson] = useState<Song | null>(null);

  const [lyricsWithChords, setLyricsWithChords] = useState<Line[]>([]);

  const [trigger, setTrigger] = useState(0); //for re-render
  const lyricsScreenRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Save scroll position before update
    const scrollContainer = lyricsScreenRef.current;
    const scrollTop = scrollContainer?.scrollTop || 0;
  
    setFinalJson({
      title: songTitle,
      page: songPage,
      description: songDescription,
      category: songCategory,
      capo: songCapo,
      tags: songTags,
      lyricsWithChords,
    });
  
    setTrigger((prev) => prev + 1); // Force re-render

    // Restore scroll position after update
    requestAnimationFrame(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollTop;
      }
    });
  }, [
    songTitle,
    songPage,
    songDescription,
    songCategory,
    songCapo,
    songTags,
    lyricsWithChords,
  ]);

  const initializeLine = (): Line => ({
    prefix: "",
    lyrics: { character: "", pinyin: "" },
    chords: [],
    spacing: spacing,
  });

  const convertToPinyin = (character: string): string => {
    return pinyin(character, { type: "array", toneType: "symbol" }) // Get Pinyin array
      .map((char, index, array) => {
        // If both current & next characters are letters (A-Z or a-z), add space
        if (
          /[a-zA-Z]/.test(char) &&
          index < array.length - 1 &&
          /[a-zA-Z]/.test(array[index + 1])
        ) {
          return char + " ";
        }
        return char; // Otherwise, return as is
      })
      .join("") // Join without adding unnecessary spaces
      .replace(/，/g, ", ") // Replace ， with ,
      .replace(/。/g, "."); // Replace 。 with .
  };

  const addNewLine = () => {
    setLyricsWithChords([
      ...lyricsWithChords,
      { ...initializeLine(), spacing: 0 },
    ]);
  };

  const updateLine = (index: number, updates: Partial<Line>) => {
    const updatedLines = [...lyricsWithChords];
    updatedLines[index] = { ...updatedLines[index], ...updates };

    if (updates.lyrics?.character) {
      updatedLines[index].lyrics.pinyin = convertToPinyin(
        updatedLines[index].lyrics.character
      );
    }

    setLyricsWithChords(updatedLines);
  };

  const deletePrefix = (index: number) => {
    updateLine(index, { prefix: "" }); // Set prefix to an empty string instead of deleting it
  };

  const deleteLine = (index: number) => {
    const updatedLines = lyricsWithChords.filter((_, i) => i !== index);
    setLyricsWithChords(updatedLines);
  };

  const updateChords = (index: number, chords: any[]) => {
    updateLine(index, { chords });
  };
  const toggleTags = (tags: string) => {
    setSongTags(
      (prev) =>
        prev.includes(tags)
          ? prev.filter((item) => item !== tags) // Remove if already selected
          : [...prev, tags] // Add if not selected
    );
  };

  return (
    <div className="flex items-start flex-col  min-h-screen  gap-8 p-5">
      <TitleFieldTop />
      <Card className="w-3/4">
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              {/* Song Title Input */}
              <Input
                label="歌名 / Titolo del canto"
                className="w-80"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
              />

              {/* Song Page Input */}
              <Input
                label="歌本頁數/Numero pagina"
                className="w-64"
                value={songPage.toString()}
                onChange={(e) => setSongPage(Number(e.target.value))}
              />
              {/* Song description Input */}
              <Input
                label="歌曲說明(ex:詠 22) / Descrizione del canto(ex:Sal 22) "
                className="w-[400px]"
                value={songDescription}
                onChange={(e) => setSongDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-5 ">
              {/* Song category Input */}
              <p className="text-sm">
                Scegli categoria:
                <br />
                選擇分類:
              </p>
              <div className="flex gap-2 pr-2 border-r-2 border-black">
                <Checkbox
                  isSelected={songCategory === "Precatecumenato"}
                  onChange={() =>
                    setSongCategory(
                      songCategory === "Precatecumenato"
                        ? ""
                        : "Precatecumenato"
                    )
                  }
                >
                  慕道前期 Precatecumenato
                </Checkbox>
                <Checkbox
                  isSelected={songCategory === "Catecumenato"}
                  onChange={() =>
                    setSongCategory(
                      songCategory === "Catecumenato" ? "" : "Catecumenato"
                    )
                  }
                >
                  慕道期 Catecumenato
                </Checkbox>
                <Checkbox
                  isSelected={songCategory === "Elezione"}
                  onChange={() =>
                    setSongCategory(
                      songCategory === "Elezione" ? "" : "Elezione"
                    )
                  }
                >
                  揀選期 Elezione
                </Checkbox>
                <Checkbox
                  isSelected={songCategory === "Liturgia"}
                  onChange={() =>
                    setSongCategory(
                      songCategory === "Liturgia" ? "" : "Liturgia"
                    )
                  }
                >
                  禮儀 Liturgia
                </Checkbox>
              </div>
              {/* Song capo Input */}
              <p className="text-sm">
                Inserisci Capo:
                <br />
                輸入變調夾:
              </p>
              <Input
                label="Song Capo"
                placeholder="Enter Capo position"
                className="w-28"
                type="number"
                value={songCapo.toString()}
                onChange={(e) => setSongCapo(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-row gap-10">
              {/* Song tags Input */}
              <p className="text-sm">
                Scegli etichette: <br />
                選擇標籤:
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-[12px]">
                  Tempo liturgico:
                  <br /> 禮儀年曆:
                </p>
                <Checkbox
                  value={"avvento"}
                  isSelected={songTags.includes("avvento")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  降臨期 Avvento
                </Checkbox>
                <Checkbox
                  value={"natale"}
                  isSelected={songTags.includes("natale")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  聖誕期 Natale
                </Checkbox>
                <Checkbox
                  value={"quaresima"}
                  isSelected={songTags.includes("quaresima")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  四旬期 Quaresima
                </Checkbox>
                <Checkbox
                  value={"pasqua"}
                  isSelected={songTags.includes("pasqua")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  復活期 Pasqua
                </Checkbox>
                <Checkbox
                  value={"pentecoste"}
                  isSelected={songTags.includes("pentecoste")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  五旬期 Pentecoste
                </Checkbox>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="text-[12px]">
                  Ordine liturgico:
                  <br /> 禮儀順序:
                </p>
                <Checkbox
                  value={"ingresso"}
                  isSelected={songTags.includes("ingresso")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  進堂 Ingresso
                </Checkbox>
                <Checkbox
                  value={"pace"}
                  isSelected={songTags.includes("pace")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  平安與奉獻 Pace e Offertorio
                </Checkbox>
                <Checkbox
                  value={"pane"}
                  isSelected={songTags.includes("pane")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  聖體 Frazione del pane
                </Checkbox>
                <Checkbox
                  value={"comunione"}
                  isSelected={songTags.includes("comunione")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  聖血 Communione
                </Checkbox>
                <Checkbox
                  value={"finale"}
                  isSelected={songTags.includes("finale")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  結束 Finale
                </Checkbox>
                <Checkbox
                  value={"verginemaria"}
                  isSelected={songTags.includes("verginemaria")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  聖母的歌曲 Canti della Vergine
                </Checkbox>
                <Checkbox
                  value={"bambini"}
                  isSelected={songTags.includes("bambini")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  小孩的歌曲 Canti della Bambini
                </Checkbox>
                <Checkbox
                  value={"lodivespri"}
                  isSelected={songTags.includes("lodivespri")}
                  onChange={(e) => toggleTags(e.target.value)}
                >
                  晨禱與晚禱 Lodi e Vespri
                </Checkbox>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* Lyrics Lines Section */}
      <Card className="w-[500px] ml-[10%]">
        <CardBody>
          <div className="flex flex-col gap-4">
            {lyricsWithChords.map((line, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border p-2 rounded"
              >
                <div className="flex justify-between items-center">
                  {/* Prefix Selection */}
                  <div className="flex gap-2">
                    <p>詞頭 Prefisso:</p>
                    <Checkbox
                      isSelected={line.prefix === "領:"}
                      onChange={(isSelected) =>
                        updateLine(index, { prefix: isSelected ? "領:" : "" })
                      }
                    >
                      領
                    </Checkbox>
                    <Checkbox
                      isSelected={line.prefix === "眾:"}
                      onChange={(isSelected) =>
                        updateLine(index, { prefix: isSelected ? "眾:" : "" })
                      }
                    >
                      眾
                    </Checkbox>
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => deletePrefix(index)}
                    >
                      Delete
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => deleteLine(index)}
                  >
                    Delete ALL
                  </Button>
                </div>
                {/* Lyrics Inputs */}
                <Textarea
                  label="繁體歌詞 Testo (Caratteri)"
                  className="h-14"
                  value={line.lyrics.character}
                  onChange={(e) =>
                    updateLine(index, {
                      lyrics: { ...line.lyrics, character: e.target.value },
                    })
                  }
                />
                {/* Chords Inputs */}
                <div key={index} className="flex flex-col gap-2 ">
                  {line.chords.map((chord, i) => (
                    <div key={i} className="flex gap-5 items-center ">
                      <Input
                        label="和弦 Accordo"
                        value={chord.chord.toUpperCase()}
                        className="h-[50px]"
                        onChange={(e) => {
                          const updatedChords = [...line.chords];
                          updatedChords[i].chord = e.target.value.toUpperCase();
                          updateChords(index, updatedChords);
                        }}
                      />
                      <Input
                        label="C Position"
                        type="number"
                        className="h-[50px]"
                        value={
                          chord.c_position === null ? "" : chord.c_position
                        }
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : Number(e.target.value);
                          const updatedChords = [...line.chords];
                          updatedChords[i].c_position = value;
                          updateChords(index, updatedChords);
                          // set pinyin chords position same as characters
                          const valueP =
                          e.target.value === ""
                            ? null
                            : Number(e.target.value);
                        const updatedChordsP = [...line.chords];
                        updatedChords[i].p_position = valueP;
                        updateChords(index, updatedChordsP);
                        }}
                      />
                      {/* <Input
                        label="P Position"
                        type="number"
                        value={
                          chord.p_position === null ? "" : chord.p_position
                        }
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : Number(e.target.value);
                          const updatedChords = [...line.chords];
                          updatedChords[i].p_position = value;
                          updateChords(index, updatedChords);
                        }}
                      /> */}
                      <Button
                        size="sm"
                        color="danger"
                        onPress={() => {
                          const updatedChords = line.chords.filter(
                            (_, ci) => ci !== i
                          );
                          updateChords(index, updatedChords);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    className="font-bold text-sm  self-center"
                    onPress={() =>
                      updateChords(index, [
                        ...line.chords,
                        { chord: "", c_position: 0, p_position: 0 },
                      ])
                    }
                  >
                    新增和弦 Aggiungi accordo
                  </Button>
                </div>
                <Checkbox
                  isSelected={line.spacing === 50}
                  onChange={() => {
                    const newSpacing = spacing === 0 ? 50 : 0;
                    setSpacing(newSpacing);
                    updateLine(index, { spacing: newSpacing });
                  }}
                >
                  新增歌詞底下空白 Aggiungi spazio sotto il testo
                </Checkbox>
              </div>
            ))}
            <Button className="font-bold text-md" onPress={addNewLine}>
              新增歌詞 Aggiungi testo
            </Button>
          </div>
        </CardBody>
      </Card>

   
      <div className="w-full flex self-center   max-md:flex-col max-md:items-center">
        <div className="fixed top-5 right-5 z-[999] ">
          <Card className="w-[375px] h-[900px]  flex self-center ml-10">
            <div className="scrollbar-hide overflow-scroll" ref={lyricsScreenRef}>
              <LyricsScreen key={trigger} selectedSong={finalJson} />
            </div>
          </Card>
        </div>
        {/* JSON Output */}
        <Card className="w-[505px]  mb-40 max-md:w-full">
          <CardBody>
            <pre className="bg-gray-800 text-white p-4 rounded h-[600px] overflow-scroll scrollbar-hide">
              {JSON.stringify(
                {
                  title: songTitle,
                  page: songPage,
                  description: songDescription,
                  category: songCategory,
                  capo: songCapo,
                  tags: songTags,
                  lyricsWithChords: lyricsWithChords || [],
                },
                null,
                2
              )}
            </pre>
            <Button
              size="md"
              color="success"
              className="mt-4 w-40 self-center font-bold py-2 px-4 "
              onPress={() => {
                const jsonData = {
                  title: songTitle,
                  page: songPage,
                  description: songDescription,
                  category: songCategory,
                  capo: songCapo,
                  tags: songTags,
                  lyricsWithChords: lyricsWithChords || [],
                };

                const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${songTitle || "song"}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              Download JSON
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
