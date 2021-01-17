import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import style from "./page-header.module.scss";
import { Popover, Button } from "antd";
import { DownOutlined, LeftOutlined } from "@ant-design/icons";

// This will eventually show the 2021 challenges as a dropdown
// on the header row. 2021 info coming soon!
// For now, it's still in place so that the title is centered.
const Challenges = () => (
  <div className={style.right}>
    {/* 
      <Popover placement="bottomRight" content="Coming Soon!" trigger="hover">
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
          CVPR 2021 Challenges <DownOutlined style={{ fontSize: "14px" }} />
        </Button>
      </Popover>
      */}
  </div>
);

// This will eventually allow the old workshops (e.g., CVPR 2020)
// to be accessible from the header. Waiting until 2021 info is up
// for this to display anything.
const LastYear = () => (
  <div className={style.left}>
    {/* <LeftOutlined style={{ fontSize: "14px" }} /> CVPR 2020 Workshop */}
  </div>
);

// Sets the page title and the dynamic header. Eventually, this will
// probably be modularized even further, when future versions come out.
// For now, were just using a single cover image.
export const Header = (props: { conference: string }) => (
  <>
    <div className={style.header}>
      <div className={style.headerContent}>
        <LastYear />
        <div className={style.middle}>
          <div className={style.workshopTitle}>Embodied AI Workshop</div>
          <div className={style.conference}>{props.conference}</div>
        </div>
        <Challenges />
        <StaticQuery
          query={graphql`
            query {
              cover: file(
                relativePath: { eq: "cvpr2020/transparent-cover.png" }
              ) {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => (
            <Img
              fluid={data.cover.childImageSharp.fluid}
              style={{ marginTop: "15px", marginBottom: "15px" }}
            />
          )}
        />
      </div>
    </div>
  </>
);

export default Header;
