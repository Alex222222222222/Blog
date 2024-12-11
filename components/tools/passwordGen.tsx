"use client";

import React, { useState } from "react";
import SeparateLine from "@/components/hr";
import generator from "generate-password";

const PasswordGen: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [excludeSimilarCharacters, setExcludeSimilarCharacters] =
    useState<boolean>(false);
  const [excludeCharacters, setExcludeCharacters] = useState<string>("");
  const [numberOfPasswords, setNumberOfPasswords] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  return (
    <>
      <table>
        <tbody>
          <tr hidden={errorMsg.length == 0}>
            <td>Error</td>
            <td colSpan={2} className="pl-5">
              <span className="text-red-500">{errorMsg}</span>
            </td>
          </tr>
          <tr>
            <td>Length</td>
            <td className="pl-5">Length of password.</td>
            <td className="pl-5">
              <input
                type="number"
                value={length}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= 0) {
                    setErrorMsg("Length should be positive.");
                    return;
                  }
                  setLength(value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Numbers</td>
            <td className="pl-5">Put numbers in password</td>
            <td className="pl-5">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => {
                  setIncludeNumbers(e.target.checked);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Symbols</td>
            <td className="pl-5">Put symbols in password</td>
            <td className="pl-5">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => {
                  setIncludeSymbols(e.target.checked);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Lowercase</td>
            <td className="pl-5">Put lowercase letters in password</td>
            <td className="pl-5">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => {
                  setIncludeLowercase(e.target.checked);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Uppercase</td>
            <td className="pl-5">Put uppercase letters in password</td>
            <td className="pl-5">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => {
                  setIncludeUppercase(e.target.checked);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Exclude Similar Characters</td>
            <td className="pl-5">
              Exclude similar characters, such as 1 and l
            </td>
            <td className="pl-5">
              <input
                type="checkbox"
                checked={excludeSimilarCharacters}
                onChange={(e) => {
                  setExcludeSimilarCharacters(e.target.checked);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Exclude Characters</td>
            <td className="pl-5">Characters to be excluded from password</td>
            <td className="pl-5">
              <input
                type="text"
                value={excludeCharacters}
                onChange={(e) => {
                  setExcludeCharacters(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Number of Passwords</td>
            <td className="pl-5">Number of passwords to generate</td>
            <td className="pl-5">
              <input
                type="number"
                value={numberOfPasswords}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= 0) {
                    setErrorMsg("Number of passwords should be positive.");
                    return;
                  }
                  setNumberOfPasswords(value);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <SeparateLine />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setErrorMsg("");
          if (
            !(
              includeNumbers ||
              includeSymbols ||
              includeLowercase ||
              includeUppercase
            )
          ) {
            setErrorMsg("At least one of the checkboxes should be checked.");
            return;
          }

          setResults(
            generator.generateMultiple(numberOfPasswords, {
              length: length,
              numbers: includeNumbers,
              symbols: includeSymbols,
              lowercase: includeLowercase,
              uppercase: includeUppercase,
              excludeSimilarCharacters: excludeSimilarCharacters,
              exclude: excludeCharacters,
              strict: true,
            })
          );
        }}
      >
        Generate Password
      </button>
      <SeparateLine />
      <ul>
        {results.map((result) => {
          return <li key={`password_gen_${result}`}>{result}</li>;
        })}
      </ul>
    </>
  );
};

export default PasswordGen;
