"use client";
import { TitleFieldTop } from "@/components/TitleField-top";
import { SetStateAction, useState } from "react";
import {
  Input,
  Card,
  CardBody,
  Button,
  Textarea,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";

export default function Home() {
  const [songTitle, setSongTitle] = useState("");
  const [lyricsWithChords, setLyricsWithChords] = useState(Array);
  const [currentPrefix, setCurrentPrefix] = useState("");
  const [currentLyrics, setCurrentLyrics] = useState("");
  const [currentPinyin, setCurrentPinyin] = useState("");
  const [currentChords, setCurrentChords] = useState(Array);

  // Update JSON for lyrics with chords
  const updateLyricsWithChords = (
    prefix: string,
    lyrics: string,
    pinyin: string,
    chords: unknown[]
  ) => {
    setLyricsWithChords([
      {
        prefix,
        lyrics: { character: lyrics, pinyin: pinyin },
        chords: chords,
      },
    ]);
  };

  // Delete Prefix
  const deletePrefix = () => {
    setCurrentPrefix("");
    updateLyricsWithChords("", currentLyrics, currentPinyin, currentChords);
  };
  // Delete Lyrics (Character)
  const deleteCharacter = () => {
    setCurrentLyrics("");
    updateLyricsWithChords(currentPrefix, "", currentPinyin, currentChords);
  };

  // Delete Lyrics (Pinyin)
  const deletePinyin = () => {
    setCurrentPinyin("");
    updateLyricsWithChords(currentPrefix, currentLyrics, "", currentChords);
  };

  // Delete a specific chord
  const deleteChord = (index: number) => {
    const updatedChords = currentChords.filter((_, i) => i !== index);
    setCurrentChords(updatedChords);
    updateLyricsWithChords(
      currentPrefix,
      currentLyrics,
      currentPinyin,
      updatedChords
    );
  };

  // Delete specific chord properties
  const deleteChordProperty = (index: number, property: string) => {
    const updatedChords: any = [...currentChords];
    updatedChords[index][property] = ""; // Clear the specific property
    setCurrentChords(updatedChords);
    updateLyricsWithChords(
      currentPrefix,
      currentLyrics,
      currentPinyin,
      updatedChords
    );
  };
  return (
    <div className="flex flex-col items-start min-h-screen justify-start gap-8 p-5">
      <TitleFieldTop />
      {/* Song Title Input */}
      <Input
        label="Song Title"
        placeholder="Enter the song title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
      />

      {/* Lyrics Section */}
      <Card className="w-full">
        <CardBody>
          <div className="flex flex-col gap-4">
            {/* Prefix Selection */}
            <div className="flex flex-row gap-2">
              <Checkbox
                isSelected={currentPrefix === "領"}
                onChange={() => {
                  setCurrentPrefix("領");
                  updateLyricsWithChords(
                    "領",
                    currentLyrics,
                    currentPinyin,
                    currentChords
                  );
                }}
                aria-label="Select prefix 領"
              >
                領
              </Checkbox>
              <Checkbox
                isSelected={currentPrefix === "眾"}
                onChange={() => {
                  setCurrentPrefix("眾");
                  updateLyricsWithChords(
                    "眾",
                    currentLyrics,
                    currentPinyin,
                    currentChords
                  );
                }}
                aria-label="Select prefix 眾"
              >
                眾
              </Checkbox>
              <Button size="sm" color="danger" onPress={deletePrefix}>
                Delete
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Textarea
                label="Lyrics (Character)"
                placeholder="Enter the lyrics in characters"
                value={currentLyrics}
                onChange={(e) => {
                  setCurrentLyrics(e.target.value);
                  updateLyricsWithChords(
                    currentPrefix,
                    e.target.value,
                    currentPinyin,
                    currentChords
                  );
                }}
              />
              <Button color="danger" onPress={deleteCharacter}>
                Delete
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Textarea
                label="Lyrics (Pinyin)"
                placeholder="Enter the pinyin for the lyrics"
                value={currentPinyin}
                onChange={(e) => {
                  setCurrentPinyin(e.target.value);
                  updateLyricsWithChords(
                    currentPrefix,
                    currentLyrics,
                    e.target.value,
                    currentChords
                  );
                }}
              />
              <Button color="danger" onPress={deletePinyin}>
                Delete
              </Button>
            </div>

            {/* Real-Time Chords Input */}
            <div className="flex flex-col gap-2">
              {currentChords.map((chord: any, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Input
                    label="Chord"
                    placeholder="Enter chord"
                    value={chord.chord}
                    onChange={(e) => {
                      const updatedChords: any = [...currentChords];
                      updatedChords[index].chord = e.target.value;
                      setCurrentChords(updatedChords);
                      updateLyricsWithChords(
                        currentPrefix,
                        currentLyrics,
                        currentPinyin,
                        updatedChords
                      );
                    }}
                  />
                  <Button
                    color="danger"
                    onPress={() => deleteChordProperty(index, "chord")}
                  >
                    Delete
                  </Button>
                  <Input
                    label="C Position"
                    placeholder="Enter character position"
                    type="number"
                    value={chord.c_position}
                    onChange={(e) => {
                      const updatedChords: any = [...currentChords];
                      updatedChords[index].c_position = Number(e.target.value);
                      setCurrentChords(updatedChords);
                      updateLyricsWithChords(
                        currentPrefix,
                        currentLyrics,
                        currentPinyin,
                        updatedChords
                      );
                    }}
                  />
                  <Button
                    color="danger"
                    onPress={() => deleteChordProperty(index, "c_position")}
                  >
                    Delete
                  </Button>
                  <Input
                    label="P Position"
                    placeholder="Enter pinyin position"
                    type="number"
                    value={chord.p_position}
                    onChange={(e) => {
                      const updatedChords: any = [...currentChords];
                      updatedChords[index].p_position = Number(e.target.value);
                      setCurrentChords(updatedChords);
                      updateLyricsWithChords(
                        currentPrefix,
                        currentLyrics,
                        currentPinyin,
                        updatedChords
                      );
                    }}
                  />
                  <Button
                    color="danger"
                    onPress={() => deleteChordProperty(index, "p_position")}
                  >
                    Delete
                  </Button>
                  <Button
                    color="danger"
                    className="font-bold text-[10px] "
                    onPress={() => deleteChord(index)}
                  >
                    Delete this line
                  </Button>
                </div>
              ))}
              <Button
                onPress={() =>
                  setCurrentChords([
                    ...currentChords,
                    { chord: "", c_position: 0, p_position: 0 },
                  ])
                }
              >
                Add Chord
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* JSON Output */}
      <Card className="w-full">
        <CardBody>
          <pre className="bg-gray-800 text-white p-4 rounded">
            {JSON.stringify(
              {
                title: songTitle,
                lyricsWithChords,
              },
              null,
              2
            )}
          </pre>
        </CardBody>
      </Card>
    </div>
  );
}
