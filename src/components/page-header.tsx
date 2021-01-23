import React from "react";
import style from "./page-header.module.scss";
import { Popover, Button } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import SeattleCover from "../../static/images/cvpr2020/cover-transparent.svg";
import { Emoji } from "emoji-mart";

// This will eventually show the 2021 challenges as a dropdown
// on the header row. 2021 info coming soon!
// For now, it's still in place so that the title is centered.
const Challenges = () => (
  <div className={style.left}>
    <Popover
      placement="bottomLeft"
      content={
        <div>
          <div>
            <a
              href="http://svl.stanford.edu/igibson/challenge.html"
              target="_blank"
            >
              iGibson Challenge
            </a>
          </div>
          <div>
            <a href="https://aihabitat.org/challenge/2020/" target="_blank">
              Habitat Challenge
            </a>
          </div>
          <div>
            <a
              href="https://ai2thor.allenai.org/robothor/challenge"
              target="_blank"
            >
              RoboTHOR Challenge
            </a>
          </div>
        </div>
      }
      trigger="hover"
    >
      <Button
        style={{
          background: "inherit",
          color: "inherit",
          border: "none",
          boxShadow: "none",
          padding: "0px",
          fontSize: "15px",
        }}
      >
        <DownOutlined style={{ fontSize: "14px" }} /> CVPR 2020 Challenges
      </Button>
    </Popover>
  </div>
);

// This will eventually allow the old workshops (e.g., CVPR 2020)
// to be accessible from the header. Waiting until 2021 info is up
// for this to display anything.
const NextYear = () => (
  <div className={style.right}>
    <Popover
      placement="bottomRight"
      content={
        <>
          <span className={style.comingSoonText}>Coming February 2021</span>{" "}
          <Emoji emoji="face_with_cowboy_hat" set="apple" size={22} />
        </>
      }
      trigger="hover"
    >
      <Button
        style={{
          background: "inherit",
          color: "inherit",
          border: "none",
          boxShadow: "none",
          padding: "0px",
          fontSize: "15px",
        }}
      >
        CVPR 2021 Workshop{" "}
        <RightOutlined style={{ fontSize: "14px" }} className={style.emoji} />
      </Button>
    </Popover>
  </div>
);

// Sets the page title and the dynamic header. Eventually, this will
// probably be modularized even further, when future versions come out.
// For now, were just using a single cover image.
export const Header = (props: { conference: string }) => (
  <>
    <div className={style.header}>
      <div className={style.headerContent}>
        <Challenges />
        <div className={style.middle}>
          <div className={style.workshopTitle}>Embodied AI Workshop</div>
          <div className={style.conference}>{props.conference}</div>
        </div>
        <NextYear />
        <div
          style={{
            width: "100%",
            paddingTop: "56.25%",
            backgroundImage: `url(${SeattleCover})`,
          }}
        />
      </div>
    </div>
  </>
);

export default Header;
