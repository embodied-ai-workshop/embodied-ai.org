import React, { useState } from "react";
import { graphql } from "gatsby";
import Img, { FixedObject, FluidObject } from "gatsby-image";
import style from "./cvpr2020.module.scss";
import { Section, SubSection } from "../components/text-helpers";
import { Challenges, OtherYear } from "../components/page-header";
import PageWrapper from "../components/page-wrapper";
import { ArrowRightOutlined, PlayCircleFilled } from "@ant-design/icons";

// SVG images (imported, instead of path referenced, for faster loading)
import ChallengeSVG from "../../static/images/cvpr2020/challenge-cover.svg";
import NVIDIA from "../../static/images/sponsors/nvidia.svg";
import GoogleCloud from "../../static/images/sponsors/google-cloud.svg";

import { css } from "@emotion/react";

// These are for each organizer pic. They encompass the image,
// name, organizations, and external URL when clicked.
export const OrganizerPics = function (props: { organizers: any; data: any }) {
  return (
    <div className={style.organizerContainer}>
      {props.organizers.map(organizer => (
        <div className={style.organizer}>
          <div className={style.organizerPic}>
            <a href={organizer.site} target="_blank">
              <Img
                fluid={
                  props.data[organizer.imageId + "Org"].childImageSharp.fluid
                }
              />
            </a>
          </div>
          <b>{organizer.name}</b>
          <br />
          {organizer.organization}
        </div>
      ))}
    </div>
  );
};

// Wrapper for any generic video that is linked to an external page.
// Note that @fontSize sets the size of the play icon.
function Video(props: {
  fontSize: string;
  url: string;
  children: React.ReactNode;
}) {
  const [videoHovered, setVideoHovered] = useState(false);
  return (
    <a href={props.url} target="_blank">
      <div className={style.videoWrapper}>
        <div
          onMouseOver={() => setVideoHovered(true)}
          onMouseOut={() => setVideoHovered(false)}
          className={style.video}
        >
          {props.children}
          <PlayCircleFilled
            style={{
              fontSize: props.fontSize,
              opacity: videoHovered ? 0.15 : 0.9,
            }}
            className={style.videoPlay}
          />
        </div>
      </div>
    </a>
  );
}

// The speakers of the workshop are all displayed in a similar style,
// and this component encompasses that style.
export const Speaker = (props: {
  url?: string;
  fixedImg: FixedObject;
  name: string;
  organizations: string[];
}) => (
  <div className={style.speaker}>
    <div className={style.speakerThumbnailWrapper}>
      {props.url ? (
        <Video fontSize="45px" url={props.url}>
          <Img fixed={props.fixedImg} />
        </Video>
      ) : (
        <Img fixed={props.fixedImg} />
      )}
    </div>
    <div className={style.speakerInfo}>
      <b>{props.name}</b>
      {props.organizations.map(org => (
        <>
          <br />
          {org}
        </>
      ))}
    </div>
  </div>
);

// There were 2 live sessions, each with questions that could be
// submitted ahead of time, a zoom link, panelist info, topic info,
// and a reference to the recorded session.
export const LiveSession = (props: {
  videoURL: string;
  fluidImage: FluidObject;
  questionLink?: string;
  date?: string;
  panel?: string;
  topics?: string;
  rhs?: React.ReactNode;
}) => (
  <div
    className={style.liveSession}
    css={css`
      margin-bottom: ${props.rhs ? "40px" : "initial"};
    `}
  >
    <div className={style.liveSessionVideo}>
      {props.videoURL ? (
        <Video fontSize="70px" url={props.videoURL}>
          <Img fluid={props.fluidImage} />
        </Video>
      ) : (
        <Img fluid={props.fluidImage} />
      )}
    </div>
    {props.rhs ? (
      <div className={style.sessionBoxContainer}>{props.rhs}</div>
    ) : (
      <div className={style.sessionBoxContainer}>
        <a href={props.questionLink} target="_blank">
          <div className={style.liveSessionBox}>Submit Questions</div>
        </a>
        <div className={style.liveSessionBox}>
          <div>Join Zoom Meeting</div>
          <div>{props.date}</div>
        </div>
      </div>
    )}
    {props.panel && props.topics ? (
      <div className={style.liveSessionInfo}>
        <p>
          <b>Panel.</b> {props.panel}
        </p>
        <p>
          <b>Topics.</b> {props.topics}
        </p>
      </div>
    ) : (
      <></>
    )}
  </div>
);

// References to the iGibson, Habitat, and RoboTHOR challenge
// boxes, which link to the external challenge pages. Also note,
// that the hostname is something like ai2thor.allenai.org or
// svl.stanford.edu.
const ChallengeCover = (props: {
  url: string;
  name: string;
  hostname: string;
  bg: string;
}) => (
  <a href={props.url} target="_blank">
    <div
      style={{
        backgroundColor: props.bg,
      }}
      className={style.challengeCover}
    >
      <div className={style.challengeName}>{props.name}</div>
      <div className={style.challengeHostname}>
        {props.hostname} <ArrowRightOutlined style={{ fontSize: 11 }} />
      </div>
    </div>
  </a>
);

// Each challenge had an organizer video, which just provided
// an overview for the challenge.
const OrganizerVideo = (props: { url: string; fluid: FluidObject }) => (
  <div className={style.challengeOrganizerVideo}>
    <Video fontSize="45px" url={props.url}>
      <Img fluid={props.fluid} />
    </Video>
  </div>
);

// Challenges had winner videos, which were a bit smaller than
// the organizer videos.
const WinnerVideo = (props: { fluid: FluidObject; url: string }) => (
  <div className={style.winnerVideo}>
    <Video fontSize="25px" url={props.url}>
      <Img fluid={props.fluid} />
    </Video>
  </div>
);

// And finally, we add all the content into their respective sections.
import SeattleCover from "../../static/images/cvpr2020/cover-transparent.svg";
export default function Home({ data }) {
  return (
    <PageWrapper
      imageContent={{
        css: css`
          width: 100%;
          padding-top: 56.25%;
          background-image: url(${SeattleCover});
        `,
      }}
      headerGradient="linear-gradient(175deg, #b5f0ff, #1d3d7e)"
      conference="CVPR 2020"
      rightSide={
        <Challenges
          conference="CVPR 2020"
          challengeData={[
            <a href="//svl.stanford.edu/igibson/challenge.html" target="_blank">
              iGibson
            </a>,
            <a href="https://aihabitat.org/challenge/2020/" target="_blank">
              Habitat
            </a>,
            <a
              href="https://ai2thor.allenai.org/robothor/challenge"
              target="_blank"
            >
              RoboTHOR
            </a>,
          ]}
        />
      }
    >
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
      <Section title="Live Sessions">
        <SubSection title="Simulated Environments">
          <LiveSession
            fluidImage={data.simLive.childImageSharp.fluid}
            questionLink="https://app.sli.do/event/wjgsmgxt"
            date="June 14th | 5-6 PM PST"
            panel="The panel consists of researchers who have built various
              simulation environments and physics engines."
            topics="The topics are based on questions, likely involving the
              need for simulation, progress in developing AI agents in simulation,
              need for photo-realism, physics engines for simulation, multi-agent
              capabilities, sim-to-real, the future of simulators, accessibility of
              simulation environments, and more!"
            videoURL="https://www.youtube.com/watch?v=nBF3QJd2t50&list=PL4XI7L9Xv5fWxObV8eDWP4APN1V5Xd6QN"
          />
        </SubSection>
        <SubSection title="Embodied AI Research">
          <LiveSession
            fluidImage={data.researchLive.childImageSharp.fluid}
            questionLink="https://app.sli.do/event/wjgsmgxt"
            date="June 15th | 9-10 AM PST"
            panel="The panel consists of speakers at this workshop"
            topics="The topics are based on questions, likely involving cognitive
              development in humans, progress in embodied AI tasks, sim-2-real transfer,
              robotics, embodied AI for all, and more!"
            videoURL="https://www.youtube.com/watch?v=EX8HYsmZN4w&list=PL4XI7L9Xv5fWxObV8eDWP4APN1V5Xd6QN"
          />
        </SubSection>
      </Section>
      <Section title="Invited Talks">
        <SubSection title="Motivation for Embodied AI Research">
          <Speaker
            fixedImg={data.alisonTalk.childImageSharp.fixed}
            name="Alison Gopnik"
            organizations={["UC Berkeley"]}
            url="https://www.youtube.com/watch?v=ZLIH9GPvS-8&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
          <Speaker
            fixedImg={data.lindaTalk.childImageSharp.fixed}
            name="Linda Smith"
            organizations={["Indiana"]}
            url="https://www.youtube.com/watch?v=dxli8qWJHLU&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
        </SubSection>
        <SubSection title="Embodied Navigation">
          <Speaker
            fixedImg={data.raquelTalk.childImageSharp.fixed}
            name="Raquel Urtasun"
            organizations={["Uber ATG Toronto", "University of Toronto"]}
            url="https://www.youtube.com/watch?v=7GIUBS-TEa0&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
          <Speaker
            fixedImg={data.piotrTalk.childImageSharp.fixed}
            name="Piotr Mirowski"
            organizations={["DeepMind"]}
            url="https://www.youtube.com/watch?v=mwjlRJeo3Ik&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
        </SubSection>
        <SubSection title="Embodied Perception">
          <Speaker
            fixedImg={data.alexTalk.childImageSharp.fixed}
            name="Alex Schwing"
            organizations={["UIUC"]}
            url="https://www.youtube.com/watch?v=u5ayFwhLzfY&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
          <Speaker
            fixedImg={data.deepakTalk.childImageSharp.fixed}
            name="Deepak Pathak"
            organizations={["FAIR, UC Berkeley", "CMU (Starting Fall 2020)"]}
            url="https://www.youtube.com/watch?v=crxnghFA8Ww&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
        </SubSection>
        <SubSection title="Robotics">
          <Speaker
            fixedImg={data.dieterTalk.childImageSharp.fixed}
            name="Dieter Fox"
            organizations={["NVIDIA, UW"]}
            url="https://www.youtube.com/watch?v=LJNFzE-VmzI&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
          <Speaker
            fixedImg={data.franziskaTalk.childImageSharp.fixed}
            name="Franziska Meier"
            organizations={["FAIR"]}
            url="https://www.youtube.com/watch?v=UpjXMmZtxvY&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
        </SubSection>
        <SubSection title="Sim-2-Real Transfer">
          <Speaker
            fixedImg={data.judyTalk.childImageSharp.fixed}
            name="Judy Hoffman"
            organizations={["Georgia Tech"]}
            url="https://www.youtube.com/watch?v=eNcMHOTpWJA&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
          <Speaker
            fixedImg={data.soniaTalk.childImageSharp.fixed}
            name="Sonia Chernova"
            organizations={["Georgia Tech"]}
            url="https://www.youtube.com/watch?v=1DPXcXWBfsI&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
        </SubSection>
        <SubSection title="Embodied AI for All">
          <Speaker
            fixedImg={data.heidiTalk.childImageSharp.fixed}
            name="Heidi Hysell"
            organizations={["Alpha Drive"]}
            url="https://www.youtube.com/watch?v=LOImoR7gZB8&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
          <Speaker
            fixedImg={data.rishabhTalk.childImageSharp.fixed}
            name="Rishabh Jain"
            organizations={["Eval AI", "Georgia Tech"]}
            url="https://www.youtube.com/watch?v=3SoCElGefik&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq"
          />
        </SubSection>
      </Section>
      <Section title="Challenges">
        <img
          src={ChallengeSVG}
          alt="Challenge Cover Graphic"
          style={{
            marginBottom: "15px",
            marginLeft: "0.66%",
            marginRight: "0.66%",
          }}
        />
        <div style={{ position: "relative", marginBottom: "15px" }}>
          <ChallengeCover
            name="iGibson Challenge"
            bg="#8e0d0d"
            hostname="svl.stanford.edu"
            url="http://svl.stanford.edu/igibson/challenge.html"
          />
          <ChallengeCover
            name="Habitat Challenge"
            bg="#478cc4"
            hostname="aihabitat.org"
            url="https://aihabitat.org/challenge/2020/"
          />
          <ChallengeCover
            name="RoboTHOR Challenge"
            bg="#265ED4"
            hostname="ai2thor.allenai.org"
            url="https://ai2thor.allenai.org/robothor/challenge"
          />
        </div>
        <p>
          The Embodied AI 2020 workshop will host three exciting challenges
          focusing on the problems of point navigation, object navigation, and
          the transfer of models from simulated environments to the real world.
          More details regarding data, submission instructions, and timelines
          can be found on the individual challenge websites.
        </p>
        <p>
          Although these challenges use three different simulation engines, the
          APIs, action, observation spaces, and agent models are unified! Thus,
          participants are encouraged to participate in all challenges as these
          can use identical setups.
        </p>
        <p>In more detail, the challenges relate to each other as follows:</p>
        <div className={style.tableWrapper}>
          <table className={style.challengeTable}>
            <thead>
              <tr>
                <th></th>
                <th>iGibson</th>
                <th>Habitat</th>
                <th>RoboTHOR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Problem</td>
                <td>PointNav</td>
                <td>PointNav, ObjNav</td>
                <td>ObjNav</td>
              </tr>
              <tr>
                <td>Test Environment</td>
                <td>Real</td>
                <td>Simulation</td>
                <td>Real</td>
              </tr>
              <tr>
                <td>Agent</td>
                <td colSpan={3}>LoCoBot</td>
              </tr>
              <tr>
                <td>Observations</td>
                <td colSpan={3}>RGB-D</td>
              </tr>
              <tr>
                <td>Actions</td>
                <td>Continuous</td>
                <td>Discrete</td>
                <td>Discrete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Challenge Results">
        <SubSection title="iGibson Challenge">
          <h3>Organizer Video</h3>
          <OrganizerVideo
            fluid={data.igibsonResultVid.childImageSharp.fluid}
            url="https://www.youtube.com/watch?v=0BvUSjcc0jw&list=PL4XI7L9Xv5fVUMEb1eYOaH8y1b6j8xiMM"
          />
          <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>Winners</h3>
          <div style={{ marginBottom: "40px" }}>
            <WinnerVideo
              fluid={data.teamInspirai.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=NBE-iXpyCCU&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
            <WinnerVideo
              fluid={data.teamDan.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=q9puBO4Gyhs&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
            <WinnerVideo
              fluid={data.teamJoanne.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=nCDcsNUxi_k&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
            <WinnerVideo
              fluid={data.teamVGAI.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=pmsfEoUCHTM&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
          </div>
        </SubSection>
        <SubSection title="Habitat Challenge">
          <h3>Organizer Video</h3>
          <OrganizerVideo
            fluid={data.habitatResultVid.childImageSharp.fluid}
            url="https://www.youtube.com/watch?v=X5L0Nf5hYCI&list=PL4XI7L9Xv5fVUMEb1eYOaH8y1b6j8xiMM"
          />
          <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
            ObjectNav Winners
          </h3>
          <div>
            <WinnerVideo
              fluid={data.teamArnold.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=QNTs6cdxOoU&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
            <WinnerVideo
              fluid={data.teamSRCB.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=a9q1Bj8omKE&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
          </div>
          <h3 style={{ marginTop: "15px", marginBottom: "5px" }}>
            PointNav Winners
          </h3>
          <div style={{ marginBottom: "40px" }}>
            <WinnerVideo
              fluid={data.teamOant.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=v1pXHom9JnU&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
            <WinnerVideo
              fluid={data.teamEgo.childImageSharp.fluid}
              url="https://www.youtube.com/watch?v=4n_Po0uCdU0&list=PL4XI7L9Xv5fVULPNAqiGQ2yK07k78-02h"
            />
          </div>
        </SubSection>
        <SubSection title="RoboTHOR Challenge">
          <h3>Organizer Video</h3>
          <OrganizerVideo
            fluid={data.robothorResultVid.childImageSharp.fluid}
            url="https://www.youtube.com/watch?v=5GXNvrVHByo&list=PL4XI7L9Xv5fVUMEb1eYOaH8y1b6j8xiMM"
          />
        </SubSection>
      </Section>
      <Section title="Organizers">
        The Embodied AI 2020 workshop is a joint effort by a large set of
        researchers from a variety of organizations. They are listed below in
        alphabetical order.
        <OrganizerPics
          organizers={data.allSite.nodes[0].siteMetadata.cvpr2020.organizers}
          data={data}
        />
      </Section>
      <Section title="Sponsors">
        <div className={style.sponsorContainer} style={{ textAlign: "center" }}>
          <a href="https://www.nvidia.com/" target="_blank">
            <img src={NVIDIA} alt="NVIDIA" className={style.nvidia} />
          </a>
          <a href="https://cloud.google.com/" target="_blank">
            <img
              src={GoogleCloud}
              alt="Google Cloud"
              className={style.googleCloud}
            />
          </a>
        </div>
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
          cvpr2020 {
            organizers {
              name
              imageId
              organization
              site
            }
          }
        }
      }
    }

    # live session thumbnails
    simLive: file(relativePath: { eq: "cvpr2020/video-covers/sim-panel.jpg" }) {
      ...FluidImage
    }
    researchLive: file(
      relativePath: { eq: "cvpr2020/video-covers/research-panel.jpg" }
    ) {
      ...FluidImage
    }

    # challenge results
    igibsonResultVid: file(
      relativePath: { eq: "cvpr2020/video-covers/igibson.jpg" }
    ) {
      ...FluidImage
    }
    habitatResultVid: file(
      relativePath: { eq: "cvpr2020/video-covers/habitat.jpg" }
    ) {
      ...FluidImage
    }
    robothorResultVid: file(
      relativePath: { eq: "cvpr2020/video-covers/robothor.jpg" }
    ) {
      ...FluidImage
    }
    teamInspirai: file(
      relativePath: { eq: "cvpr2020/video-covers/team-inspirai.jpg" }
    ) {
      ...FluidImage
    }
    teamDan: file(relativePath: { eq: "cvpr2020/video-covers/team-dan.jpg" }) {
      ...FluidImage
    }
    teamJoanne: file(
      relativePath: { eq: "cvpr2020/video-covers/team-joanne.jpg" }
    ) {
      ...FluidImage
    }
    teamVGAI: file(
      relativePath: { eq: "cvpr2020/video-covers/team-vgai.jpg" }
    ) {
      ...FluidImage
    }
    teamArnold: file(
      relativePath: { eq: "cvpr2020/video-covers/team-arnold.jpg" }
    ) {
      ...FluidImage
    }
    teamSRCB: file(
      relativePath: { eq: "cvpr2020/video-covers/team-srcb.jpg" }
    ) {
      ...FluidImage
    }
    teamEgo: file(
      relativePath: { eq: "cvpr2020/video-covers/team-ego-location.jpg" }
    ) {
      ...FluidImage
    }
    teamOant: file(
      relativePath: { eq: "cvpr2020/video-covers/team-oant.jpg" }
    ) {
      ...FluidImage
    }

    # video talk thumbnails
    alisonTalk: file(relativePath: { eq: "cvpr2020/video-covers/alison.jpg" }) {
      ...VideoThumbnail
    }
    lindaTalk: file(relativePath: { eq: "cvpr2020/video-covers/linda.jpg" }) {
      ...VideoThumbnail
    }
    raquelTalk: file(relativePath: { eq: "cvpr2020/video-covers/raquel.jpg" }) {
      ...VideoThumbnail
    }
    piotrTalk: file(relativePath: { eq: "cvpr2020/video-covers/piotr.jpg" }) {
      ...VideoThumbnail
    }
    alexTalk: file(relativePath: { eq: "cvpr2020/video-covers/alex.jpg" }) {
      ...VideoThumbnail
    }
    deepakTalk: file(relativePath: { eq: "cvpr2020/video-covers/deepak.jpg" }) {
      ...VideoThumbnail
    }
    dieterTalk: file(relativePath: { eq: "cvpr2020/video-covers/dieter.jpg" }) {
      ...VideoThumbnail
    }
    franziskaTalk: file(
      relativePath: { eq: "cvpr2020/video-covers/franziska.jpg" }
    ) {
      ...VideoThumbnail
    }
    judyTalk: file(relativePath: { eq: "cvpr2020/video-covers/judy.jpg" }) {
      ...VideoThumbnail
    }
    soniaTalk: file(relativePath: { eq: "cvpr2020/video-covers/sonia.jpg" }) {
      ...VideoThumbnail
    }
    heidiTalk: file(relativePath: { eq: "cvpr2020/video-covers/heidi.jpg" }) {
      ...VideoThumbnail
    }
    rishabhTalk: file(
      relativePath: { eq: "cvpr2020/video-covers/rishabh.jpg" }
    ) {
      ...VideoThumbnail
    }

    # organizer pictures
    aaronOrg: file(relativePath: { eq: "organizers/aaron.jpg" }) {
      ...FluidImage
    }
    abhishekOrg: file(relativePath: { eq: "organizers/abhishek.jpg" }) {
      ...FluidImage
    }
    aleksandraOrg: file(relativePath: { eq: "organizers/aleksandra.jpg" }) {
      ...FluidImage
    }
    alexanderOrg: file(relativePath: { eq: "organizers/alexander.jpg" }) {
      ...FluidImage
    }
    aliOrg: file(relativePath: { eq: "organizers/ali.jpg" }) {
      ...FluidImage
    }
    amirOrg: file(relativePath: { eq: "organizers/amir.jpg" }) {
      ...FluidImage
    }
    aneliaOrg: file(relativePath: { eq: "organizers/anelia.jpg" }) {
      ...FluidImage
    }
    angelOrg: file(relativePath: { eq: "organizers/angel.jpg" }) {
      ...FluidImage
    }
    aniOrg: file(relativePath: { eq: "organizers/ani.jpg" }) {
      ...FluidImage
    }
    antonioOrg: file(relativePath: { eq: "organizers/antonio.jpg" }) {
      ...FluidImage
    }
    chengshuOrg: file(relativePath: { eq: "organizers/chengshu.jpg" }) {
      ...FluidImage
    }
    deviOrg: file(relativePath: { eq: "organizers/devi.jpg" }) {
      ...FluidImage
    }
    dhruvOrg: file(relativePath: { eq: "organizers/dhruv.jpg" }) {
      ...FluidImage
    }
    dustinOrg: file(relativePath: { eq: "organizers/dustin.jpg" }) {
      ...FluidImage
    }
    ericOrg: file(relativePath: { eq: "organizers/eric.jpg" }) {
      ...FluidImage
    }
    erikOrg: file(relativePath: { eq: "organizers/erik.jpg" }) {
      ...FluidImage
    }
    jitendraOrg: file(relativePath: { eq: "organizers/jitendra.png" }) {
      ...FluidImage
    }
    feiOrg: file(relativePath: { eq: "organizers/fei.jpg" }) {
      ...FluidImage
    }
    germanOrg: file(relativePath: { eq: "organizers/german.jpg" }) {
      ...FluidImage
    }
    jieOrg: file(relativePath: { eq: "organizers/jie.jpg" }) {
      ...FluidImage
    }
    joseAOrg: file(relativePath: { eq: "organizers/joseA.jpg" }) {
      ...FluidImage
    }
    joseMOrg: file(relativePath: { eq: "organizers/joseM.jpg" }) {
      ...FluidImage
    }
    julianOrg: file(relativePath: { eq: "organizers/julian.jpg" }) {
      ...FluidImage
    }
    manolisOrg: file(relativePath: { eq: "organizers/manolis.jpg" }) {
      ...FluidImage
    }
    mattOrg: file(relativePath: { eq: "organizers/matt.jpg" }) {
      ...FluidImage
    }
    oleksandrOrg: file(relativePath: { eq: "organizers/oleksandr.jpg" }) {
      ...FluidImage
    }
    philippOrg: file(relativePath: { eq: "organizers/philipp.jpg" }) {
      ...FluidImage
    }
    rishabhOrg: file(relativePath: { eq: "organizers/rishabh.jpg" }) {
      ...FluidImage
    }
    robertoOrg: file(relativePath: { eq: "organizers/roberto.jpg" }) {
      ...FluidImage
    }
    roozbehOrg: file(relativePath: { eq: "organizers/roozbeh.jpg" }) {
      ...FluidImage
    }
    samyakOrg: file(relativePath: { eq: "organizers/samyak.jpg" }) {
      ...FluidImage
    }
    stefanOrg: file(relativePath: { eq: "organizers/stefan.jpg" }) {
      ...FluidImage
    }
    vangelisOrg: file(relativePath: { eq: "organizers/vangelis.jpg" }) {
      ...FluidImage
    }
    vladlenOrg: file(relativePath: { eq: "organizers/vladlen.jpg" }) {
      ...FluidImage
    }
    yongjoonOrg: file(relativePath: { eq: "organizers/yongjoon.jpg" }) {
      ...FluidImage
    }
  }
`;
