import React, { useState, useEffect } from 'react';
import Header, { OtherYears } from "./page-header";
import { headerId } from "./text-helpers";
import { Helmet } from "react-helmet";
import * as style from "./page-wrapper.module.scss";
import { YoutubeFilled, GithubFilled, SlackOutlined } from "@ant-design/icons";

// This brings both the header, page content, section contents
// in a way that they are clickable. Note, all children
// must be sections: <Section></Section>.
export default function PageWrapper({
  conference,
  children,
  rightSide,
  imageContent,
  headerGradient,
  headerStyle,
}) {
  // State equivalent to `headerIdLocations` and `focusedHeaderI`
  const [headerIdLocations, setHeaderIdLocations] = React.useState<number[]>([]);
  const [focusedHeaderI, setFocusedHeaderI] = React.useState<number>(0);

  /*
  // Equivalent to `updateSidebarScroll` method
  const updateSidebarScroll = () => {
      // scrolled to absolute bottom of page, set last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setFocusedHeaderI(headerIdLocations.length - 1);
      } else {
        // updates which section should be highlighted.
        let scrollTop =
          window.pageYOffset !== undefined
            ? window.pageYOffset
            : ((document.documentElement ||
                document.body.parentNode ||
                document.body) as HTMLElement).scrollTop;

        // give some extra padding to the sections
        scrollTop += 50;

        // above the first section
        if (
          headerIdLocations.length > 0 &&
          scrollTop < headerIdLocations[0]
        ) {
          setFocusedHeaderI(-1);
        }

        // find which section
        for (let i = 0; i < headerIdLocations.length; i++) {
          if (scrollTop > headerIdLocations[i]) {
            setFocusedHeaderI(i);
          }
        }
      }
  };
*/
/*
  const sidebarHeaderClick = (header: string) => {
    window.location.hash = headerId(header);
  };
  */
  /*


  const updateHeaderLocations = () => {
    setHeaderIdLocations(children.map(
        (section: any) =>
          document
            .getElementById(headerId(section.props.title))
            .getBoundingClientRect().top + window.scrollY
      ));
  }

  const componentDidMount = () => {
    updateHeaderLocations();
    window.addEventListener("scroll", updateSidebarScroll);
  }

  const componentWillUnmount = () => {
    window.removeEventListener("scroll", updateSidebarScroll);
  }
  */


  // If you have lifecycle methods (componentDidMount, componentDidUpdate, componentWillUnmount),
  // you can replicate them with useEffect here.

  return (
    // JSX structure
    <>
        <Helmet>
            <title>Embodied AI Workshop</title>
        </Helmet>
    <Header
        conference={conference}
        leftSide={<OtherYears onConference={conference} />}
        rightSide={rightSide}
        imageContent={imageContent}
        headerGradient={headerGradient}
        headerStyle={headerStyle}
      />
      Hello world!
      <div className={style.contentWrapper}>
      <div className={style.mainContent}>{children}</div>
        </div>
        <footer>
          <a
            href="//github.com/embodied-ai-workshop/embodied-ai.org"
            target="_blank"
          >
            <GithubFilled className={style.footerIcon} />
          </a>
          <a
            href="//www.youtube.com/channel/UCoMZfljfYHVWr1BCoQ9AGzA"
            target="_blank"
          >
            <YoutubeFilled className={style.footerIcon} />
          </a>
          <a
            href="//join.slack.com/t/embodied-aiworkshop/shared_invite/zt-s6amdv5c-gBZQZ7YSktrD_tMhQDjDfg"
            target="_blank"
          >
            <SlackOutlined className={style.footerIcon} />
          </a>
        </footer>

    </>
  );
}
