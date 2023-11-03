import React from "react";

const HomeAbout = () => {
  return (
    <div>
      <h1>Welcome to The Knot</h1>

      <h2>Personal Interest:</h2>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 20,
        }}
      >
        <li>Math</li>
        <li>Computer Science</li>
        <li>VPS</li>
      </ul>

      <h2>Contact Me:</h2>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 20,
        }}
      >
        <li>
          <a
            href="mailto:smyzh5@nottingham.ac.uk"
            style={{
              color: "#000",
              textDecoration: "underline",
            }}
          >
            smyzh5@nottingham.ac.uk
          </a>{" "}
          (Work Address)
        </li>
        <li>
          <a
            href="mailto:huazifan@gmail.com"
            style={{
              color: "#000",
              textDecoration: "underline",
            }}
          >
            huazifan@gmail.com
          </a>{" "}
          (Personal Address)
        </li>
        <li>
          <a
            href="mailto:zifan.hua@icloud.com"
            style={{
              color: "#000",
              textDecoration: "underline",
            }}
          >
            zifan.hua@icloud.com
          </a>{" "}
          (Personal Address)
        </li>
      </ul>

      <h2>Useful Links:</h2>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 20,
        }}
      >
        <li>
          <a
            href="https://iskxcr.github.io/blog/p/introduction-to-mikos-library/"
            style={{
              color: "#000",
              textDecoration: "underline",
            }}
          >
            IskCXr Blog
          </a>
          ,
          <a
            href="https://github.com/IskXCr"
            style={{
              color: "#000",
              textDecoration: "underline",
            }}
          >
            GitHub
          </a>{" "}
          - Miko's Library - CG, Math, and a bit of CV and AI.
        </li>
      </ul>
    </div>
  );
};

export default HomeAbout;
