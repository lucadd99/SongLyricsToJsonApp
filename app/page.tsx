"use client";
import { TitleFieldTop } from "@/components/TitleField-top";
import { useState } from "react";
import {
  Input,
  Card,
  CardBody,
  Button,
  Textarea,
  Checkbox,
} from "@nextui-org/react";

type Line = {
  prefix: string;
  lyrics: { character: string; pinyin: string };
  chords: { chord: string; c_position: any; p_position: any }[];
};

export default function Home() {
  const [songTitle, setSongTitle] = useState("");
  const [songPage, setSongPage] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [songCategory, setSongCategory] = useState("");
  const [songCapo, setSongCapo] = useState<number>(0);
  const [songTags, setSongTags] = useState<string[]>([]);

  // const [yes, setYes] = useState(false);

  const [lyricsWithChords, setLyricsWithChords] = useState<Line[]>([]);

  const initializeLine = (): Line => ({
    prefix: "",
    lyrics: { character: "", pinyin: "" },
    chords: [],
  });

  const addNewLine = () => {
    setLyricsWithChords([...lyricsWithChords, initializeLine()]);
  };

  const updateLine = (index: number, updates: Partial<Line>) => {
    const updatedLines = [...lyricsWithChords];
    updatedLines[index] = { ...updatedLines[index], ...updates };
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
    <div className="flex flex-col items-start min-h-screen justify-start gap-8 p-5">
      <TitleFieldTop />
      <Card className="w-full">
        <CardBody>
          <div className="flex flex-col gap-4">
            {/* Song Title Input */}
            <Input
              label="歌名 / Titolo del canto"
              className="w-2/4"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            />

            {/* Song Page Input */}
            <Input
              label="歌曲頁數(歌本的頁數) / Numero pagina del canto"
              className="w-2/4"
              value={songPage}
              onChange={(e) => setSongPage(e.target.value)}
            />
            {/* Song description Input */}
            <Input
              label="歌曲說明(ex:詠 22) / Descrizione del canto(ex:Sal 22) "
              className="w-2/4"
              value={songDescription}
              onChange={(e) => setSongDescription(e.target.value)}
            />
            {/* Song category Input */}
            <p className="text-sm">
              Scegli categoria:
              <br />
              選擇分類:
            </p>
            <div className="flex gap-2">
              <Checkbox
                isSelected={songCategory === "Precatecumenato"}
                onChange={() =>
                  setSongCategory(
                    songCategory === "Precatecumenato" ? "" : "Precatecumenato"
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
                  setSongCategory(songCategory === "Elezione" ? "" : "Elezione")
                }
              >
                揀選期 Elezione
              </Checkbox>
              <Checkbox
                isSelected={songCategory === "Liturgia"}
                onChange={() =>
                  setSongCategory(songCategory === "Liturgia" ? "" : "Liturgia")
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
            {/* Song tags Input */}
            <p className="text-sm">
              Scegli etichette: <br />
              選擇標籤:
            </p>
            <div className="flex gap-2">
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
            <div className="flex gap-2 ">
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
                value={"communione"}
                isSelected={songTags.includes("communione")}
                onChange={(e) => toggleTags(e.target.value)}
              >
                聖血 Communione
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
        </CardBody>
      </Card>
      {/* Lyrics Lines Section */}
      <Card className="w-full">
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
                    <Checkbox
                      isSelected={line.prefix === "領"}
                      onChange={(isSelected) =>
                        updateLine(index, { prefix: isSelected ? "領" : "" })
                      }
                    >
                      領
                    </Checkbox>
                    <Checkbox
                      isSelected={line.prefix === "眾"}
                      onChange={(isSelected) =>
                        updateLine(index, { prefix: isSelected ? "眾" : "" })
                      }
                    >
                      眾
                    </Checkbox>
                    <Button
                      size="sm"
                      color="danger"
                      onPress={() => deletePrefix(index)}
                    >
                      Delete Prefix
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => deleteLine(index)}
                  >
                    Delete Line
                  </Button>
                </div>
                {/* Lyrics Inputs */}
                <Textarea
                  label="Lyrics (Character)"
                  placeholder="Enter the lyrics in characters"
                  value={line.lyrics.character}
                  onChange={(e) =>
                    updateLine(index, {
                      lyrics: { ...line.lyrics, character: e.target.value },
                    })
                  }
                />
                <Textarea
                  label="Lyrics (Pinyin)"
                  placeholder="Enter the pinyin for the lyrics"
                  value={line.lyrics.pinyin}
                  onChange={(e) =>
                    updateLine(index, {
                      lyrics: { ...line.lyrics, pinyin: e.target.value },
                    })
                  }
                />
                {/* Chords Inputs */}
                <div className="flex flex-col gap-2">
                  {line.chords.map((chord, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <Input
                        label="Chord"
                        placeholder="Enter chord"
                        value={chord.chord}
                        onChange={(e) => {
                          const updatedChords = [...line.chords];
                          updatedChords[i].chord = e.target.value;
                          updateChords(index, updatedChords);
                        }}
                      />
                      <Input
                        label="C Position"
                        placeholder="Enter character position"
                        type="number"
                        value={chord.c_position}
                        onChange={(e) => {
                          const updatedChords = [...line.chords];
                          updatedChords[i].c_position = Number(e.target.value);
                          updateChords(index, updatedChords);
                        }}
                      />
                      <Input
                        label="P Position"
                        placeholder="Enter pinyin position"
                        type="number"
                        value={chord.p_position}
                        onChange={(e) => {
                          const updatedChords = [...line.chords];
                          updatedChords[i].p_position = Number(e.target.value);
                          updateChords(index, updatedChords);
                        }}
                      />
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
                        Delete Chord
                      </Button>
                    </div>
                  ))}
                  <Button
                    onPress={() =>
                      updateChords(index, [
                        ...line.chords,
                        { chord: "", c_position: 0, p_position: 0 },
                      ])
                    }
                  >
                    Add Chord
                  </Button>
                </div>
              </div>
            ))}
            <Button onPress={addNewLine}>Add New Line</Button>
          </div>
        </CardBody>
      </Card>

      {/* JSON Output */}
      <Card className="w-full mb-40">
        <CardBody>
          <pre className="bg-gray-800 text-white p-4 rounded h-[600px] overflow-scroll">
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
  );
}
