import React, { useState, useEffect } from "react";
import allSongsPinYn from "../data/allSongsPinYn.json";

const chords = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const LyricsScreen = ({ selectedSong }: any) => {
  const defaultFontSize = 20;
  const defaultLyricsData = selectedSong?.lyricsWithChords || [];

  const [currentFontSize, setCurrentFontSize] = useState(defaultFontSize);
  const [lyricsData, setLyricsData] = useState(
    selectedSong?.lyricsWithChords || []
  );
  const [showMenu, setShowMenu] = useState(false);
  const [lyricsInPinYin, setLyricsInPinYin] = useState(false);

  useEffect(() => {
    document.title =  "lyrics and chords to Json format";
    
  }, []);

  if (!selectedSong) {
    return <div className="container error-text">Song not found.</div>;
  }

  const transposeChords = (step: any) => {
    const updatedLyrics = lyricsData.map((line: { chords: any[] }) => {
      const updatedChords = line.chords.map((chordObj) => {
        const match = chordObj.chord.match(/^([A-G]#?)(.*)$/);
        if (match) {
          const [_, root, modifier] = match;
          const currentIndex = chords.indexOf(root);
          if (currentIndex !== -1) {
            const newIndex =
              (currentIndex + step + chords.length) % chords.length;
            return { ...chordObj, chord: chords[newIndex] + modifier };
          }
        }
        return chordObj;
      });
      return { ...line, chords: updatedChords };
    });

    setLyricsData(updatedLyrics);
  };

  const adjustFontSize = (step: any) => {
    const newSize = currentFontSize + step;
    if (newSize >= 16 && newSize <= 26) {
      setCurrentFontSize(newSize);
    }
  };

  const resetSettings = () => {
    setCurrentFontSize(defaultFontSize);
    setLyricsData(defaultLyricsData);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const switchToPinYn = () => {
    setLyricsInPinYin(!lyricsInPinYin);
  };

  return (
    <>
      <div className="action-button-container">
        <button className="action-button" onClick={toggleMenu}>
          {showMenu ? "x" : "✎"}
        </button>
        {showMenu && (
          <div className="menu">
            <button className="menu-item" onClick={() => transposeChords(1)}>
              +
            </button>
            <button className="menu-item" onClick={() => transposeChords(-1)}>
              -
            </button>
            <button className="menu-item" onClick={() => adjustFontSize(2)}>
              A+
            </button>
            <button className="menu-item" onClick={() => adjustFontSize(-2)}>
              A-
            </button>
            <button className="menu-item" onClick={switchToPinYn}>
              {lyricsInPinYin ? "繁" : "拼"}
            </button>
            <button className="menu-item" onClick={resetSettings}>
              ↻
            </button>
          </div>
        )}
      </div>

      <div className="container scrollbar-hide">
        <div className="lyrics-container">
          <div className="song-header-container">
            <h1 className="song-title">{selectedSong.title}</h1>
            <p className="description">{selectedSong.description}</p>
            <p className="page">
              {selectedSong.page ? `歌本${selectedSong.page}頁` : ""}
            </p>
          </div>

          <div className="description-container">
            {selectedSong.capo > 0 && (
              <p className="capo">變調夾：{selectedSong.capo}</p>
            )}
          </div>

          {lyricsData.map((line: any, index: any) => (
            <div
              key={index}
              className="line"
              style={line.spacing ? { marginBottom: `${line.spacing}px` } : {}}
            >
              {line.prefix && <span className="prefix">{line.prefix}</span>}
              <span
                className="lyric"
                style={{ fontSize: `${currentFontSize}px` }}
              >
                {lyricsInPinYin ? line.lyrics.pinyin : line.lyrics.character}
              </span>
              {line.chords.map((singleChord: any, idx: any) => (
                <span
                  key={idx}
                  className="chord"
                  style={{
                    left: `${
                      lyricsInPinYin
                        ? singleChord.p_position === 0 
                          ? 0 
                          : singleChord.p_position * 10 - 5
                        : singleChord.c_position === 0 
                          ? 0 
                          : singleChord.c_position * 10 - 5
                    }px`,
                    fontSize: `${currentFontSize * 0.9}px`,
                  }}
                >
                  {singleChord.chord}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LyricsScreen;
