import React from "react";

const HomeAbout: React.FC = () => {
  return (
    <div>
      <h1>Welcome to The Knot</h1>

      <h2>Personal Interest:</h2>
      <ul className="ml-5">
        <li>Math</li>
        <li>Computer Science</li>
      </ul>

      <h2>Contact Me:</h2>
      <ul className="ml-5">
        <li>
          <a href="mailto:smyzh5@nottingham.ac.uk" className="underline">
            smyzh5@nottingham.ac.uk
          </a>{" "}
          (Work Address)
        </li>
        <li>
          <a href="mailto:huazifan@gmail.com" className="underline">
            huazifan@gmail.com
          </a>{" "}
          (Personal Address)
        </li>
        <li>
          <a href="mailto:zifan.hua@icloud.com" className="underline">
            zifan.hua@icloud.com
          </a>{" "}
          (Personal Address)
        </li>
      </ul>

      <h2>Mirrors:</h2>
      <ul className="ml-5">
        <li>
          <a href="https://alex1222.com" className="underline">
            https://alex1222.com
          </a>
        </li>
        <li>
          <a href="https://blog.huazifan.eu.org" className="underline">
            https://blog.huazifan.eu.org
          </a>
        </li>
        <li>
          <a href="https://blog.alex1222.com" className="underline">
            https://blog.alex1222.com
          </a>
        </li>
      </ul>

      <h2>Friends:</h2>
      <ul className="ml-5">
        <li>
          <a
            href="https://iskxcr.github.io/blog/p/introduction-to-mikos-library/"
            className="underline"
          >
            IskCXr Blog
          </a>
          ,
          <a href="https://github.com/IskXCr" className="underline">
            GitHub
          </a>{" "}
          {"- Miko's Library - CG, Math, and a bit of CV and AI."}
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.eaimty.com"
            rel="noreferrer"
            className="underline"
          >
            EAimTY&apos;s Blog
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://xblog.aptzone.cc"
            rel="noreferrer"
            className="underline"
          >
            Forever
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HomeAbout;
