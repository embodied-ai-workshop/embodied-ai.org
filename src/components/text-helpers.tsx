import React, { useState } from "react";
import * as style from "./text-helpers.module.scss";
import { Divider } from "antd";

// SubSections can thought of similar to their LaTeX counterparts,
// except that the { children } are encompassed inside the body
// of the section.
export const SubSection = (props: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <Divider
      orientation="left"
      style={{ borderColor: "1px solid rgba(0, 0, 0, 0.6)" }}
    >
      {props.title}
    </Divider>
    {props.children}
  </>
);

// headerId is used to convert a header string into its hash
// (i.e., embodied-ai.org/#header-hash-name).
export function headerId(header: string) {
  return header.replace(/\s/g, "-").toLowerCase();
}

// Sections can be thought of similar to their LaTeX counterparts,
// except that the { children } are encompassed inside the body
// of the section.
export function Section(props: { title: string; children: React.ReactNode }) {
  const defaultHashOpacity = 0,
    hoverHashOpacity = 0.3,
    hash = headerId(String(props.title)),
    [hashOpacity, setHashOpacity] = useState(defaultHashOpacity);

  return (
    <div style={{ marginTop: "25px" }}>
      <div className={style.textWrapper}>
        <span id={hash} />
        <h1 className={style.hash} style={{ opacity: hashOpacity }}>
          #
        </h1>
        <h1
          className={style.title}
          onMouseEnter={() => {
            setHashOpacity(hoverHashOpacity);
          }}
          onMouseLeave={() => {
            setHashOpacity(defaultHashOpacity);
          }}
          onClick={() => {
            window.location.hash = hash;
          }}
        >
          {props.title}
        </h1>
      </div>
      {props.children}
    </div>
  );
}
