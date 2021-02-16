import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Section, SubSection } from "../components/text-helpers";
import PageWrapper from "../components/page-wrapper";
import { Challenges } from "../components/page-header";
import { Table, Steps } from "antd";
const { Step } = Steps;
import { Emoji } from "emoji-mart";

import { OrganizerPics } from "./cvpr2020";
import { css } from "@emotion/react";

/**
 * Return true if an email is formatted correctly, otherwise false.
 * Taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * @param email the input email
 */
function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const challengePageMap = {
  "AI2-THOR ObjectNav": (
    <a
      href="//ai2thor.allenai.org/robothor/cvpr-2021-challenge"
      target="_blank"
    >
      AI2-THOR ObjectNav
    </a>
  ),
  "AI2-THOR Rearrangement": (
    <a href="//ai2thor.allenai.org/rearrangement" target="_blank">
      AI2-THOR Rearrangement
    </a>
  ),
  ALFRED: (
    <a href="//askforalfred.com/EAI21/" target="_blank">
      ALFRED
    </a>
  ),
  Habitat: (
    <a href="//aihabitat.org/challenge/2021" target="_blank">
      Habitat
    </a>
  ),
  iGibson: (
    <a href="//svl.stanford.edu/igibson/challenge.html" target="_blank">
      iGibson
    </a>
  ),
  MultiOn: (
    <a href="//aspis.cmpt.sfu.ca/projects/multion/" target="_blank">
      MultiOn
    </a>
  ),
  "Robotic Vision Scene Understanding": (
    <a href="//cvpr2021.roboticvisionchallenge.org/">
      Robotic Vision Scene Understanding
    </a>
  ),
  "RxR-Habitat": <a href="//ai.google.com/research/rxr/habitat">RxR-Habitat</a>,
  SoundSpaces: <a href="//soundspaces.org/challenge">SoundSpaces</a>,
  "TDW-Transport": <a href="//www.threedworld.org/">TDW-Transport</a>,
};

const challengeData = [
  {
    challenge: challengePageMap["AI2-THOR ObjectNav"],
    key: "ai2thor-objectnav",
    task: "ObjectNav",
    interactiveActions: "",
    simulationPlatform: "AI2-THOR",
    sceneDataset: "RoboTHOR",
    actionSpace: "Discrete",
    observations: "RGB-D",
    stochasticAcuation: "✓",
  },
  {
    challenge: challengePageMap["AI2-THOR Rearrangement"],
    key: "ai2thor-rearrangement",
    task: "Rearrangement",
    interactiveActions: "✓",
    simulationPlatform: "AI2-THOR",
    sceneDataset: "iTHOR",
    actionSpace: "Discrete",
    observations: "RGB-D, Localization",
    stochasticAcuation: "",
  },
  {
    challenge: challengePageMap["ALFRED"],
    key: "alfred",
    task: "Vision-and-Language Interaction",
    interactiveActions: "✓",
    simulationPlatform: "AI2-THOR",
    sceneDataset: "iTHOR",
    actionSpace: "Discrete",
    observations: "RGB",
    stochasticAcuation: "",
  },
  {
    challenge: challengePageMap["Habitat"],
    key: "habitat-objectNav",
    task: "ObjectNav",
    interactiveActions: "",
    simulationPlatform: "Habitat",
    sceneDataset: "Matterport3D",
    actionSpace: "Discrete",
    observations: "RGB-D, Localization",
    stochasticAcuation: "",
  },
  {
    challenge: challengePageMap["Habitat"],
    key: "habitat-pointnav",
    task: "PointNav v2",
    interactiveActions: "",
    simulationPlatform: "Habitat",
    sceneDataset: "Gibson",
    actionSpace: "Discrete",
    observations: "Noisy RGB-D",
    stochasticAcuation: "✓",
  },
  {
    challenge: challengePageMap["iGibson"],
    key: "igibson-in",
    task: "Interactive Navigation",
    interactiveActions: "✓",
    simulationPlatform: "iGibson",
    sceneDataset: "iGibson",
    actionSpace: "Continuous",
    observations: "RGB-D",
    stochasticAcuation: "✓",
  },
  {
    challenge: challengePageMap["iGibson"],
    key: "igibson-social-navigation",
    task: "Social Navigation",
    interactiveActions: "✓",
    simulationPlatform: "iGibson",
    sceneDataset: "iGibson",
    actionSpace: "Continuous",
    observations: "RGB-D",
    stochasticAcuation: "✓",
  },
  {
    challenge: challengePageMap["MultiOn"],
    key: "multion",
    task: "Multi-Object Navigation",
    interactiveActions: "",
    simulationPlatform: "Habitat",
    sceneDataset: "Matterport3D",
    actionSpace: "Discrete",
    observations: "RGB-D, Localization",
    stochasticAcuation: "",
  },
  {
    challenge: challengePageMap["Robotic Vision Scene Understanding"],
    key: "rvsu",
    task: "Rearrangement (SCD)",
    interactiveActions: "",
    simulationPlatform: "Isaac Sim",
    sceneDataset: "Active Scene Understanding",
    observations: "RGB-D, Pose Data, Flatscan Laser",
    actionSpace: "Discrete",
    stochasticAcuation: "✓",
  },
  {
    challenge: challengePageMap["Robotic Vision Scene Understanding"],
    key: "rvsu-2",
    task: "Semantic SLAM",
    interactiveActions: "",
    simulationPlatform: "Isaac Sim",
    sceneDataset: "Active Scene Understanding",
    observations: "RGB-D, Pose Data, Flatscan Laser",
    actionSpace: "Discrete",
    stochasticAcuation: "Partially",
  },
  {
    challenge: challengePageMap["RxR-Habitat"],
    key: "rxr",
    task: "Vision-and-Language Navigation",
    interactiveActions: "",
    simulationPlatform: "Habitat",
    sceneDataset: "Matterport3D",
    observations: "RGB-D",
    actionSpace: "Discrete",
    stochasticAcuation: "",
  },
  {
    challenge: challengePageMap["SoundSpaces"],
    key: "soundspaces",
    task: "Audio Visual Navigation",
    interactiveActions: "",
    simulationPlatform: "Habitat",
    sceneDataset: "Matterport3D",
    observations: "RGB-D, Audio Waveform",
    actionSpace: "Discrete",
    stochasticAcuation: "",
  },
  {
    challenge: challengePageMap["TDW-Transport"],
    key: "tdw",
    task: "Rearrangement",
    interactiveActions: "✓",
    simulationPlatform: "TDW",
    sceneDataset: "TDW",
    observations: "RGB-D, Metadata",
    actionSpace: "Discrete",
    stochasticAcuation: "✓",
  },
];

function EmailSubscription(props: {
  actionIdentifier: string;
  entryNumber: number;
}) {
  const [submitted, setSubmitted] = useState(false),
    [emailFocused, setEmailFocused] = useState(false),
    [inputEmail, setInputEmail] = useState("");

  const emailIsValid = validateEmail(inputEmail);

  return (
    <div
      css={css`
        text-align: center;
        margin-top: 60px;
        margin-bottom: 60px;
      `}
    >
      <form
        encType="text/plain"
        action={
          emailIsValid
            ? `https://docs.google.com/forms/d/e/${props.actionIdentifier}/formResponse?usp=pp_url&entry.${props.entryNumber}=${inputEmail}`
            : ``
        }
        target={`hidden_iframe${props.actionIdentifier}`}
        onSubmit={() => (emailIsValid ? setSubmitted(true) : false)}
        method="post"
      >
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <div
            css={css`
              font-weight: bold;
              font-size: 25px;
              color: "#2b4acb";
              vertical-align: middle;
              display: inline-block;
            `}
          >
            Sign Up for Updates
          </div>
          <div
            css={css`
              vertical-align: middle;
              display: inline-block;
              margin-top: 6px;
              margin-left: 5px;
            `}
          >
            <Emoji emoji="nerd_face" size={32} />
          </div>
        </div>
        {submitted ? (
          <div>Thanks for signing up!</div>
        ) : (
          <>
            <div
              css={css`
                border-radius: 5px;
                box-shadow: 0px 0px 2px 0px #2b4acb;
                display: inline-block;
                margin: auto;
                * {
                  padding-top: 3px;
                  padding-bottom: 5px;
                }
              `}
            >
              <input
                type="email"
                autoComplete="off"
                placeholder="email"
                name={`entry.${props.entryNumber}`}
                id={`entry.${props.entryNumber}`}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setInputEmail(event.target.value)
                }
                value={inputEmail}
                css={css`
                  background-color: transparent;
                  transition-duration: 0.3s;
                  box-shadow: 0px 0px 1px 2px
                    ${!emailFocused && !emailIsValid && inputEmail != ""
                      ? "#ff7875"
                      : "transparent"};
                  border: none;
                  width: 350px;
                  @media (max-width: 500px) {
                    width: 55vw;
                  }
                  border-radius: 5px;
                  padding-left: 8px;
                `}
              />
              <input
                type={emailIsValid ? "submit" : "button"}
                value="Sign Up"
                onClick={() => (emailIsValid ? true : false)}
                css={css`
                  background-color: transparent;
                  border: none;
                  font-weight: 600;
                  transition-duration: 0.3s;
                  color: ${emailIsValid ? "#2b4acb" : "#2b4acb" + "88"};
                  padding-top: 3px;
                  padding-right: 12px;
                  padding-left: 10px;
                  &:hover {
                    cursor: ${emailIsValid ? "pointer" : "default"};
                  }
                `}
              />
            </div>
            <div
              css={css`
                margin-top: 5px;
                color: ${"#8c8c8c"};
              `}
            >
              You can unsubscribe at any time.
            </div>
          </>
        )}
      </form>
      <iframe
        name={`hidden_iframe${props.actionIdentifier}`}
        id={`hidden_iframe${props.actionIdentifier}`}
        css={css`
          display: none !important;
        `}
      />
    </div>
  );
}

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

// And finally, we add all the content into their respective sections.
import TennesseeCover from "../../static/images/cvpr2021/cover.svg";
export default function Home({ data }) {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const resizeWindow = () => setWindowWidth(getWindowWidth());
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  });

  return (
    <PageWrapper
      headerGradient="linear-gradient(to bottom, #ebdc38, #49c3cd)"
      imageContent={{
        css: css`
          width: 120%;
          background-repeat: no-repeat;
          padding-top: 50.25%;
          margin-left: -5%;
          margin-top: 50px;
          margin-bottom: -15px;
          background-image: url(${TennesseeCover});
        `,
      }}
      conference="CVPR 2021"
      rightSide={
        <Challenges
          conference="CVPR 2021"
          challengeData={Object.values(challengePageMap)}
        />
      }
    >
      <Section title="Overview">
        <p>
          Within the last decade, advances in deep learning, coupled with the
          creation of large, freely available datasets (e.g., ImageNet), have
          resulted in remarkable progress in the computer vision, NLP, and
          broader AI communities. This progress has enabled models to begin to
          obtain superhuman performance on a wide variety of passive tasks.
          However, this progress has also enabled a paradigm shift that a
          growing collection of researchers take aim at: the creation of an
          embodied agent (e.g., a robot) which learns, through interaction and
          exploration, to creatively solve challenging tasks within its
          environment.
        </p>
        <p>
          The goal of this workshop is to bring together researchers from the
          fields of computer vision, language, graphics, and robotics to share
          and discuss the current state of intelligent agents that can:
        </p>
        <ul>
          <li>
            <b>
              <Emoji emoji="eye" size={18} /> See
            </b>
            : perceive their environment through vision or other senses.
          </li>
          <li>
            <b>
              <Emoji emoji="microphone" size={18} /> Talk
            </b>
            : hold a natural language dialog grounded in their environment.
          </li>
          <li>
            <b>
              <Emoji emoji="ear" size={18} />
              Listen
            </b>
            : understand and react to audio input anywhere in a scene.
          </li>
          <li>
            <b>
              <Emoji emoji="joystick" size={18} /> Act
            </b>
            : navigate and interact with their environment to accomplish goals.
          </li>
          <li>
            <b>
              <Emoji emoji="thinking_face" size={18} /> Reason
            </b>
            : consider and plan for the long-term consequences of their actions.
          </li>
        </ul>
        <p>
          The Embodied AI 2021 workshop will be held virtually in conjunction
          with CVPR 2021. It will feature a host of invited talks covering a
          variety of topics in Embodied AI, many exciting challenges, a poster
          session, and live panel discussions.
        </p>
        <EmailSubscription
          actionIdentifier="1FAIpQLSeIZrn-tk7Oain2R8gc_Q0HzLMLQ9XXwqu3KecK_E5kALpiug"
          entryNumber={1834823104}
        />
      </Section>
      <Section title="Timeline">
        <Steps progressDot current={0} direction="vertical">
          <Step title="Workshop Announced" description="Feb 17, 2021" />
          <Step
            title="Paper Submission Deadline"
            description="March 15, 2021"
          />
          <Step
            title="Challenge Submission Deadlines"
            description="May 2021. Check each challenge for the specific date."
          />
          <Step title="CVPR Workshop" description="June 2021" />
        </Steps>
      </Section>
      <Section title="Challenges">
        <p>
          The Embodied AI 2021 workshop is hosting many exciting challenges
          covering a wide range of topics such as rearrangement, visual
          navigation, and vision-and-language, and audio-visual navigation. More
          details regarding data, submission instructions, and timelines can be
          found on the individual challenge websites.
        </p>
        <p>
          Challenge winners will be given the opportunity to present a talk at
          the workshop. Since many challenges can be grouped into similar tasks,
          we encourage participants to submit models to more than 1 challenge.
          The table below describes, compares, and links each challenge.
        </p>
        <Table
          scroll={{ x: "1550px" }}
          css={css`
            margin-top: 25px;
            margin-bottom: 50px;
          `}
          sticky={true}
          columns={[
            {
              title: (
                <>
                  <Emoji emoji="mechanical_arm" size={18} /> Challenge
                </>
              ),
              dataIndex: "challenge",
              key: "challenge",
              fixed: "left",
            },
            {
              title: (
                <>
                  <Emoji emoji="microscope" size={18} /> Task
                </>
              ),
              dataIndex: "task",
              key: "task",
              fixed: windowWidth > 650 ? "left" : "",
              sorter: (a, b) => a.task.localeCompare(b.task),
              sortDirections: ["ascend", "descend"],
            },
            {
              title: (
                <>
                  <Emoji emoji="cooking" size={18} /> Interactive Actions?
                </>
              ),
              dataIndex: "interactiveActions",
              key: "interactiveActions",
              sorter: (a, b) =>
                a.interactiveActions.localeCompare(b.interactiveActions),
              sortDirections: ["descend", "ascend"],
              width: 200,
            },
            {
              title: (
                <>
                  <Emoji emoji="earth_americas" size={18} /> Simulation Platform
                </>
              ),
              dataIndex: "simulationPlatform",
              key: "simulationPlatform",
              sorter: (a, b) =>
                a.simulationPlatform.localeCompare(b.simulationPlatform),
              sortDirections: ["ascend", "descend"],
              width: 200,
            },
            {
              title: (
                <>
                  <Emoji emoji="house" size={18} /> Scene Dataset
                </>
              ),
              dataIndex: "sceneDataset",
              key: "sceneDataset",
              sorter: (a, b) => a.sceneDataset.localeCompare(b.sceneDataset),
              sortDirections: ["ascend", "descend"],
            },
            {
              title: (
                <>
                  <Emoji emoji="eye" size={18} /> Observations
                </>
              ),
              key: "observations",
              dataIndex: "observations",
              sorter: (a, b) => a.observations.localeCompare(b.observations),
              sortDirections: ["ascend", "descend"],
            },
            {
              title: (
                <>
                  <Emoji emoji="tophat" size={18} /> Stochastic Acuation?
                </>
              ),
              key: "stochasticAcuation",
              dataIndex: "stochasticAcuation",
              sorter: function (a, b) {
                // let's favor the checks over any text.
                let aActuation =
                  a.stochasticAcuation === "✓" ? "Z" : a.stochasticAcuation;
                let bActuation =
                  b.stochasticAcuation === "✓" ? "Z" : b.stochasticAcuation;
                return aActuation.localeCompare(bActuation);
              },
              sortDirections: ["descend", "ascend"],
              width: 205,
            },
            {
              title: (
                <>
                  <Emoji emoji="joystick" size={18} /> Action Space
                </>
              ),
              key: "actionSpace",
              dataIndex: "actionSpace",
              sorter: (a, b) => a.actionSpace.localeCompare(b.actionSpace),
              sortDirections: ["ascend", "descend"],
            },
          ]}
          dataSource={challengeData}
          pagination={false}
        />
      </Section>
      <Section title="Call for Papers">
        <p>
          We invite high-quality 2-page extended abstracts in relevant areas,
          such as:
          <ul>
            <li>
              <Emoji emoji="mountain_railway" size={16} /> Simulation
              Environments
            </li>
            <li>
              <Emoji emoji="footprints" size={16} /> Visual Navigation
            </li>
            <li>
              <Emoji emoji="chair" size={16} /> Rearrangement
            </li>
            <li>
              <Emoji emoji="raising_hand" size={16} /> Embodied Question
              Answering
            </li>
            <li>
              <Emoji emoji="world_map" size={16} /> Simulation-to-Real Transfer
            </li>
            <li>
              <Emoji emoji="speak_no_evil" size={16} /> Embodied Vision &amp;
              Language
            </li>
          </ul>
          Accepted papers will be presented as posters. These papers will be
          made publicly available in a non-archival format, allowing future
          submission to archival journals or conferences.
        </p>
        <p></p>
        <SubSection title="Submission">
          <p
            css={css`
              margin-bottom: 45px;
            `}
          >
            The submission deadline is March 15th. Papers should be no longer
            than 2 pages (excluding references) and styled in the{" "}
            <a href="http://cvpr2021.thecvf.com/node/33" target="_blank">
              CVPR format
            </a>
            . The link for submissions will be available soon!
          </p>
        </SubSection>
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
    claudiaOrg: file(relativePath: { eq: "organizers/claudia.jpg" }) {
      ...FluidImage
    }
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
