import React, { useState } from "react";
import { graphql } from "gatsby";
import Img, { FixedObject, FluidObject } from "gatsby-image";
import style from "./cvpr2020.module.scss";
import { Section, SubSection } from "../components/text-helpers";
import PageWrapper from "../components/page-wrapper";
import { ArrowRightOutlined, PlayCircleFilled } from "@ant-design/icons";
import { Table } from "antd";

// SVG images (imported, instead of path referenced, for faster loading)
import ChallengeSVG from "../../static/images/cvpr2020/challenge-cover.svg";
import NVIDIA from "../../static/images/sponsors/nvidia.svg";
import GoogleCloud from "../../static/images/sponsors/google-cloud.svg";

import { OrganizerPics } from "./cvpr2020";

// And finally, we add all the content into their respective sections.
export default function Home({ data }) {
  return (
    <PageWrapper conference="CVPR 2021">
      <Section title="Overview">
        <p>
          There is an emerging paradigm shift from ‘Internet AI’ towards
          ‘Embodied AI’ in the computer vision, NLP, and broader AI communities.
          In contrast to Internet AI’s focus on learning from datasets of
          images, videos, and text curated from the internet, embodied AI
          enables learning through interaction with the surrounding environment.
        </p>
        <p>
          The goal of this workshop is to bring together researchers from the
          fields of computer vision, language, graphics, and robotics to share
          and discuss the current state of intelligent agents that can:
        </p>
        <ul>
          <li>
            <b>See</b>: perceive their environment through vision or other
            senses.
          </li>
          <li>
            <b>Talk</b>: hold a natural language dialog grounded in their
            environment.
          </li>
          <li>
            <b>Act</b>: navigate and interact with their environment to
            accomplish goals.
          </li>
          <li>
            <b>Reason</b>: consider and plan for the long-term consequences of
            their actions.
          </li>
        </ul>
        <p>
          The Embodied AI 2020 workshop will be held in conjunction with CVPR
          2020 in Seattle, WA over two days, Jun 14 and Jun 15. It will feature
          a host of invited talks covering a variety of topics in Embodied AI,
          three exciting challenges, and two live panel discussions.
        </p>
      </Section>
      <Section title="Organizers">
        The Embodied AI 2021 workshop is a joint effort by a large set of
        researchers from a variety of organizations. They are listed below in
        alphabetical order.
        <SubSection title="Organizing Committee">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2021.organizers.filter(
              (organizer: any) => organizer.oc === true
            )}
            data={data}
          />
        </SubSection>
        <SubSection title="Challenge Organizers">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2021.organizers.filter(
              (organizer: any) => organizer.challenge === true
            )}
            data={data}
          />
        </SubSection>
        <SubSection title="Scientific Advisory Board">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2021.organizers.filter(
              (organizer: any) => organizer.sab === true
            )}
            data={data}
          />
        </SubSection>
      </Section>
    </PageWrapper>
  );
}

// This helps the images load immediately, among other things
export const query = graphql`
  fragment VideoThumbnail on File {
    childImageSharp {
      fixed(width: 320, height: 180) {
        ...GatsbyImageSharpFixed
      }
    }
  }

  fragment FluidImage on File {
    childImageSharp {
      fluid(quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }

  query {
    # get data for each organizer from the siteMetadata
    allSite {
      nodes {
        siteMetadata {
          cvpr2021 {
            organizers {
              name
              imageId
              organization
              site
              sab
              oc
              challenge
            }
          }
        }
      }
    }

    # organizer pictures
    apoorvOrg: file(relativePath: { eq: "organizers/apoorv.jpg" }) {
      ...FluidImage
    }
    joseAOrg: file(relativePath: { eq: "organizers/joseA.jpg" }) {
      ...FluidImage
    }
    peterOrg: file(relativePath: { eq: "organizers/peter.jpg" }) {
      ...FluidImage
    }
    dhruvOrg: file(relativePath: { eq: "organizers/dhruv.jpg" }) {
      ...FluidImage
    }
    yonatanOrg: file(relativePath: { eq: "organizers/yonatan.jpg" }) {
      ...FluidImage
    }
    sumanOrg: file(relativePath: { eq: "organizers/suman.jpg" }) {
      ...FluidImage
    }
    angelOrg: file(relativePath: { eq: "organizers/angel.jpg" }) {
      ...FluidImage
    }
    changanOrg: file(relativePath: { eq: "organizers/changan.jpg" }) {
      ...FluidImage
    }
    soniaOrg: file(relativePath: { eq: "organizers/sonia.jpg" }) {
      ...FluidImage
    }
    ferasOrg: file(relativePath: { eq: "organizers/feras.jpg" }) {
      ...FluidImage
    }
    mattOrg: file(relativePath: { eq: "organizers/matt.jpg" }) {
      ...FluidImage
    }
    aliOrg: file(relativePath: { eq: "organizers/ali.jpg" }) {
      ...FluidImage
    }
    anthonyOrg: file(relativePath: { eq: "organizers/anthony.jpg" }) {
      ...FluidImage
    }
    chuangOrg: file(relativePath: { eq: "organizers/chuang.jpg" }) {
      ...FluidImage
    }
    aaronOrg: file(relativePath: { eq: "organizers/aaron.jpg" }) {
      ...FluidImage
    }
    kristenOrg: file(relativePath: { eq: "organizers/kristen.jpg" }) {
      ...FluidImage
    }
    davidOrg: file(relativePath: { eq: "organizers/david.jpg" }) {
      ...FluidImage
    }
    winsonOrg: file(relativePath: { eq: "organizers/winson.jpg" }) {
      ...FluidImage
    }
    joseMOrg: file(relativePath: { eq: "organizers/joseM.jpg" }) {
      ...FluidImage
    }
    rishabhOrg: file(relativePath: { eq: "organizers/rishabh.jpg" }) {
      ...FluidImage
    }
    unnatOrg: file(relativePath: { eq: "organizers/unnat.jpg" }) {
      ...FluidImage
    }
    jaewooOrg: file(relativePath: { eq: "organizers/jaewoo.jpg" }) {
      ...FluidImage
    }
    aniruddhaOrg: file(relativePath: { eq: "organizers/ani.jpg" }) {
      ...FluidImage
    }
    vladlenOrg: file(relativePath: { eq: "organizers/vladlen.jpg" }) {
      ...FluidImage
    }
    ericOrg: file(relativePath: { eq: "organizers/eric.jpg" }) {
      ...FluidImage
    }
    jacobOrg: file(relativePath: { eq: "organizers/jacob.jpg" }) {
      ...FluidImage
    }
    alexOrg: file(relativePath: { eq: "organizers/alex.jpg" }) {
      ...FluidImage
    }
    stefanOrg: file(relativePath: { eq: "organizers/stefan.jpg" }) {
      ...FluidImage
    }
    chengshuOrg: file(relativePath: { eq: "organizers/chengshu.jpg" }) {
      ...FluidImage
    }
    feifeiOrg: file(relativePath: { eq: "organizers/feifei.jpg" }) {
      ...FluidImage
    }
    antonioOrg: file(relativePath: { eq: "organizers/antonio.jpg" }) {
      ...FluidImage
    }
    oleksandrOrg: file(relativePath: { eq: "organizers/oleksandr.jpg" }) {
      ...FluidImage
    }
    jitendraOrg: file(relativePath: { eq: "organizers/jitendra.png" }) {
      ...FluidImage
    }
    robertoOrg: file(relativePath: { eq: "organizers/roberto.jpg" }) {
      ...FluidImage
    }
    roozbehOrg: file(relativePath: { eq: "organizers/roozbeh.jpg" }) {
      ...FluidImage
    }
    deviOrg: file(relativePath: { eq: "organizers/devi.jpg" }) {
      ...FluidImage
    }
    shivanshOrg: file(relativePath: { eq: "organizers/shivansh.jpg" }) {
      ...FluidImage
    }
    germanOrg: file(relativePath: { eq: "organizers/german.jpg" }) {
      ...FluidImage
    }
    silvioOrg: file(relativePath: { eq: "organizers/silvio.jpg" }) {
      ...FluidImage
    }
    manolisOrg: file(relativePath: { eq: "organizers/manolis.jpg" }) {
      ...FluidImage
    }
    mohitOrg: file(relativePath: { eq: "organizers/mohit.png" }) {
      ...FluidImage
    }
    rohanOrg: file(relativePath: { eq: "organizers/rohan.jpg" }) {
      ...FluidImage
    }
    nikoOrg: file(relativePath: { eq: "organizers/niko.jpg" }) {
      ...FluidImage
    }
    benOrg: file(relativePath: { eq: "organizers/ben.jpg" }) {
      ...FluidImage
    }
    joshOrg: file(relativePath: { eq: "organizers/josh.jpg" }) {
      ...FluidImage
    }
    jesseOrg: file(relativePath: { eq: "organizers/jesse.jpg" }) {
      ...FluidImage
    }
    alexanderOrg: file(relativePath: { eq: "organizers/alexander.jpg" }) {
      ...FluidImage
    }
    joanneOrg: file(relativePath: { eq: "organizers/joanne.jpg" }) {
      ...FluidImage
    }
    saimOrg: file(relativePath: { eq: "organizers/saim.jpg" }) {
      ...FluidImage
    }
    lucaOrg: file(relativePath: { eq: "organizers/luca.jpg" }) {
      ...FluidImage
    }
    andrewOrg: file(relativePath: { eq: "organizers/andrew.jpg" }) {
      ...FluidImage
    }
    erikOrg: file(relativePath: { eq: "organizers/erik.jpg" }) {
      ...FluidImage
    }
    feiOrg: file(relativePath: { eq: "organizers/fei.jpg" }) {
      ...FluidImage
    }
    haoyangOrg: file(relativePath: { eq: "organizers/haoyang.jpg" }) {
      ...FluidImage
    }
  }
`;
