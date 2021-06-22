import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { Section, SubSection } from "../components/text-helpers";
import PageWrapper from "../components/page-wrapper";
import color from "../components/color";
import { Challenges } from "../components/page-header";
import { Table, Steps, Timeline } from "antd";
import LaunchIcon from "@material-ui/icons/Launch";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import moment from "moment-timezone";
import Img, { FixedObject, FluidObject } from "gatsby-image";

import TennesseeCover from "../../static/images/cvpr2021/cover.svg";
import SlackLogo from "../../static/icons/slack.svg";

const { Step } = Steps;
import { Emoji } from "emoji-mart";

import { Speaker, LiveSession, Video } from "./cvpr2020";

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

function ChallengeVideo(props: {
  url: string;
  imageQuery: string;
  data: object;
}) {
  return (
    <Video fontSize="45px" url={props.url}>
      <Img fluid={props.data[props.imageQuery].childImageSharp.fluid} />
    </Video>
  );
}

function ChallengeSpotlight(props: {
  url: string;
  imageQuery: string;
  data: object;
  width?: string;
  playSize?: string;
  display?: string;
  rank: string;
}) {
  return (
    <div
      css={css`
        width: ${props.width ? props.width : "175px"};
        margin-bottom: 12px;
        display: ${props.display ? props.display : "inline-block"};
        text-align: center;
        margin-right: ${props.display === "block" ? "auto" : "4px"};
        margin-left: ${props.display === "block" ? "auto" : "4px"};
      `}
    >
      <Video
        fontSize={props.playSize ? props.playSize : "25px"}
        url={props.url}
      >
        <Img fluid={props.data[props.imageQuery].childImageSharp.fluid} />
      </Video>
      <div
        css={css`
          background-color: ${color.gray4};
          border-radius: 0px 0px 3px 3px;
          border-right: 1px solid ${color.gray6};
          border-left: 1px solid ${color.gray6};
          border-bottom: 1px solid ${color.gray6};
        `}
      >
        {props.rank}
      </div>
    </div>
  );
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
    <a href="http://svl.stanford.edu/igibson/challenge.html" target="_blank">
      iGibson
    </a>
  ),
  MultiOn: (
    <a href="//multion-challenge.github.io/" target="_blank">
      MultiON
    </a>
  ),
  "Robotic Vision Scene Understanding": (
    <a href="http://cvpr2021.roboticvisionchallenge.org/" target="_blank">
      Robotic Vision Scene Understanding
    </a>
  ),
  "RxR-Habitat": (
    <a href="//ai.google.com/research/rxr/habitat" target="_blank">
      RxR-Habitat
    </a>
  ),
  SoundSpaces: (
    <a href="//soundspaces.org/challenge" target="_blank">
      SoundSpaces
    </a>
  ),
  "TDW-Transport": (
    <a href="http://tdw-transport.csail.mit.edu/" target="_blank">
      TDW-Transport
    </a>
  ),
};

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
  if (typeof window === "undefined") {
    // this only happens when statically building.
    return 800;
  }
  const { innerWidth: width } = window;
  return width;
}

function PaperButton(props: { text: string; url: string; emoji: string }) {
  return (
    <a
      href={props.url}
      target="_blank"
      css={css`
        margin-right: 10px;
      `}
    >
      <div
        css={css`
          display: inline-block;
          border: 1px solid ${color.gray5};
          background-color: ${color.gray2};
          padding-left: 7px;
          padding-right: 7px;
          border-radius: 5px;
          transition-duration: 0.15s;
          > span {
            vertical-align: middle;
          }

          &:hover {
            background-color: ${color.gray4};
            border: 1px solid ${color.gray6};
          }
        `}
      >
        <Emoji emoji={props.emoji} size={14} />
        <span
          css={css`
            margin-left: 5px;
            color: ${color.gray10};
          `}
        >
          {props.text}
        </span>
      </div>
    </a>
  );
}

function Paper(props: {
  title: string;
  abstract: string;
  authors: object;
  affiliations: string[];
  pdf: string;
  poster: string;
}) {
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  let abs;
  if (props.abstract.indexOf(" ", 250) === -1) {
    abs = <div>{props.abstract}</div>;
  } else {
    abs = (
      <div>
        {showFullAbstract
          ? props.abstract + " "
          : props.abstract.slice(0, props.abstract.indexOf(". ") + 2)}
        <span
          css={css`
            color: ${color.light.blue6};
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => setShowFullAbstract(prev => !prev)}
        >
          [{!showFullAbstract ? "Expand" : "Collapse"}]
        </span>
      </div>
    );
  }

  const emojis = ["diamonds", "clubs", "spades", "hearts"];

  return (
    <div
      css={css`
        padding: 20px;
        background: ${color.gray1};
        border: 1px solid ${color.gray5 + "cc"};
        box-shadow: 0px 0px 100px 0px ${color.gray4};
        border-radius: 0px;
        padding-bottom: 45px;
        text-align: left;
        vertical-align: top;
        display: inline-block;
        position: relative;
        @media (min-width: 601px) {
          min-height: 250px;
        }
      `}
    >
      <a href={props.pdf} target="_blank">
        <div
          css={css`
            font-weight: 600;
            line-height: 20px;
            color: ${color.light.blue7};
            font-size: 15px;
            transition-duration: 0.15s;
            &:hover {
              color: ${color.light.blue6};
            }
          `}
        >
          {props.title}
        </div>
      </a>
      <div
        css={css`
          margin-bottom: 8px;
          color: ${color.gray8};
          line-height: 20px;
          font-size: 13px;
          /* margin-top: 5px; */
        `}
      >
        {Object.keys(props.authors).map((name: string, i: number) => (
          <>
            <span>{name}</span>
            <sup></sup>
            {i !== Object.keys(props.authors).length - 1 ? ", " : ""}
          </>
        ))}
      </div>
      {abs}
      <div
        css={css`
          position: absolute;
          bottom: 10px;
          width: calc(100% - 40px);
          padding-top: 5px;
        `}
      >
        <PaperButton text="PDF" emoji="page_facing_up" url={props.pdf} />
        <PaperButton text="Poster" emoji="page_with_curl" url={props.poster} />
      </div>
    </div>
  );
}

let acceptedPapers = [
  <Paper
    title="Pathdreamer: A World Model for Indoor Navigation"
    abstract="People navigating in unfamiliar buildings take advantage of myriad visual, spatial and semantic cues to efficiently achieve their navigation goals. Towards equipping computational agents with similar capabilities, we introduce Pathdreamer, a visual world model for agents navigating in novel indoor environments. Given one or more previous visual observations, Pathdreamer generates plausible high-resolution 360 degree visual observations (RGB, semantic segmentation and depth) for viewpoints that have not been visited, in buildings not seen during training. In regions of high uncertainty (e.g. predicting around corners, imagining the contents of an unseen room), Pathdreamer can predict diverse scenes, allowing an agent to sample multiple realistic outcomes for a given trajectory. In the downstream task of Vision-and-Language Navigation (VLN), planning ahead with Pathdreamer provides about half the benefit of looking ahead at unobserved parts of the environment."
    authors={{
      "Jing Yu Koh": [0],
      "Honglak Lee": [1, 2],
      "Yinfei Yang": [0],
      "Jason Baldridge": [0],
      "Peter Anderson": [0],
    }}
    affiliations={[
      "Google Research",
      "LG AI Research",
      "University of Michigan",
    ]}
    pdf="/papers/Pathdreamer.pdf"
    poster="/posters/Pathdreamer_poster.pdf"
  />,
  <Paper
    title="A Neural-Symbolic Approach for Object Navigation"
    abstract="Object navigation refers to the task of discovering and locating objects in an unknown environment. End-to-end deep learning methods struggle at this task due to sparse rewards. In this work, we propose a simple neural-symbolic approach for object navigation in the AI2-THOR environment. Our method takes raw RGB images as input and uses a spatial memory graph as memory to store object and location information. The architecture consists of both a convolutional neural network for object detection and a spatial graph to represent the environment. By having a discrete graph representation of the environment, the agent can directly use search or planning algorithms as high-level reasoning engines. Model performance is evaluated on both task completion rate and steps required to reach target objects. Empirical results demonstrate that our approach can achieve performance close to the optimal. Our work builds a foundation for a neural-symbolic approach that can reason via unstructured visual cues."
    authors={{
      "Xiaotian Liu": [0],
      "Christian Muise": [0],
    }}
    affiliations={["Queen's University"]}
    pdf="/papers/A-Neural-Symbolic-Approach-for-Object-Navigation.pdf"
    poster="/posters/Neural-Symbolic-Approach-for-Object-Navigation.pdf"
  />,
  <Paper
    title="LegoTron: An Environment for Interactive Structural Understanding"
    abstract="Visual reasoning about geometric structures with detailed spatial relationships is a fundamental component of human intelligence. As children, we learn how to reason about this structure not only from observation, but also by interacting with the world around us -- by taking things apart and putting them back together again. We introduce a new learning environment designed to explore the interplay between interactive reasoning, scene understanding and construction by mining a previously untapped high-quality data source: fan-made Lego creations that have been uploaded to the internet. To make use of this data we have built LegoTron, a fully interactive 3D environment that allows a learning agent to assemble, disassemble and manipulate these models. Our goal is to provide an interactive playground for agents to explore and manipulate complex scenes and recover their underlying structure."
    authors={{
      "Aaron T Walsman": [0],
      "Muru Zhang": [0],
      "Adam Fishman": [0],
      "Karthik Desingh": [0],
      "Dieter Fox": [0, 1],
      "Ali Farhadi": [0, 2],
    }}
    affiliations={["University of Washington, Seattle", "NVIDIA", "Apple"]}
    pdf="/papers/LegoTron.pdf"
    poster="/posters/LegoTron.pdf"
  />,
  <Paper
    title="Success-Aware Visual Navigation Agent"
    abstract="This work presents a method to improve the efficiency and robustness of the previous model-free Reinforcement Learning (RL) algorithms for the task of object-target visual navigation. Despite achieving the state-of-the-art results, one of the major drawbacks of those approaches is the lack of a forward model that informs the agent about the potential consequences if its actions, e.g. being model-free. In this work we take a step towards augmenting the model-free methods with a forward model that is trained along with the policy, using a replay buffer, and can predict a successful future state of an episode in a challenging 3D navigation environment. We develop a module that can predict a representation of a future state, from the beginning of a navigation episode, if the episode were to be successful; we call this ForeSIM module. ForeSIM is trained to imagine a future latent state that leads to success. Therefore, during navigation, the policy is able to take better actions leading to two main advantages: first, in the absence of an object detector, ForeSIM leads mainly to a more robust policy, e.g. about 5% absolute improvement on success rate; second, when combined with an off-the-shelf object detector to help better distinguish the target object, ForeSIM leads to about 3% absolute improvement on success rate and about 2% absolute improvement on Success weighted by inverse Path Length (SPL), e.g. higher efficiency."
    authors={{
      "Mahdi Kazemi Moghaddam": [0],
      "Ehsan M Abbasnejad": [0],
      "Qi Wu": [0],
      "Javen Qinfeng Shi": [0],
      "Anton van den Hengel": [0],
    }}
    affiliations={["University of Adelaide"]}
    pdf="/papers/Success-Aware-Visual-Navigation-Agent.pdf"
    poster="/posters/Success-Aware-Visual-Navigation-Agent.pdf"
  />,
  <Paper
    title="Learning to Explore, Navigate and Interact for Visual Room Rearrangement"
    abstract="Intelligent agents for visual room rearrangement aim to reach a goal room configuration from a cluttered room configuration via a sequence of interactions. For successful visual room rearrangement, the agents need to learn to explore, navigate and interact within the surrounding environments. Contemporary methods for visual room rearrangement display unsatisfactory performance even with state-of-the-art techniques for embodied AI. One of the causes for the low performance arises from the expensive cost of learning in an end-to-end manner. To overcome the limitation, we design a three-phased modular architecture (TMA) for visual room rearrangement. TMA performs visual room rearrangement in three phases: the exploration phase, the inspection phase, and the rearrangement phase. The proposed TMA maximizes the performance by placing the learning modules along with hand-crafted feature engineering modules—retaining the advantage of learning while reducing the cost of learning."
    authors={{
      "Ue-Hwan Kim": [0],
      "Youngho Kim": [0],
      "Jin-Man Park": [0],
      "Hwansoo Choi": [0],
      "Jong-Hwan Kim": [0],
    }}
    affiliations={["KAIST"]}
    pdf="/papers/Learning-to-Explore-Navigate-and-Interact-for-Visual-Room-Rearrangement.pdf"
    poster="/posters/Learning-to-Explore.pdf"
  />,
  <Paper
    title="Massively Parallel Robot Simulations with the HBP Neurorobotics Platform"
    abstract="The success of deep learning in robotics hinges on the availability of physically accurate virtual training environments and simulation tools that accelerate learning by scaling to many parallel instances. However, most current AI frameworks do not integrate easily with common software stacks from robotics, while fully-fledged robot simulators lack capabilities for parallelization. In this paper, we introduce an extension for the Neurorobotics Platform of the Human Brain Project (HBP) that offers the full feature set of a robot simulation and at the same time is arbitrarily scalable for massively parallel robotics experiments."
    authors={{
      "Florian Walter": [0],
      "Mahmoud Akl": [0],
      "Fabrice O. Morin": [0],
      "Alois Knoll": [0],
    }}
    affiliations={["Technical University of Munich"]}
    pdf="/papers/Massively-Parallel-NRP-Simulations.pdf"
    poster="/posters/Massively-Parallel-NRP-Simulations.pdf"
  />,
  <Paper
    title="BEyond observation: an approach for ObjectNav"
    abstract="With the rise of automation, unmanned vehicles became a hot topic both as commercial products and as a scientific research topic. It composes a multi-disciplinary field of robotics that encompasses embedded systems, control theory, path planning, Simultaneous Localization and Mapping (SLAM), scene reconstruction, and pattern recognition. In this work, we present our exploratory research of how sensor data fusion and state-of-the-art machine learning algorithms can perform the Embodied Artificial Intelligence (E-AI) task called Visual Semantic Navigation. This task, a.k.a Object-Goal Navigation (ObjectNav) consists of autonomous navigation using egocentric visual observations to reach an object belonging to the target semantic class without prior knowledge of the environment. Our method reached second place on the Habitat Challenge 2021 ObjectNav on the Minival phase."
    authors={{
      "Daniel V Ruiz": [0],
      "Eduardo Todt": [0],
    }}
    affiliations={["UFPR"]}
    pdf="/papers/BEyond-observation-an-approach-for-ObjectNav.pdf"
    poster="/posters/BEyond.pdf"
  />,
  <Paper
    title="PiCoEDL: Discovery and Learning of Minecraft Navigation Goals from Pixels and Coordinates"
    abstract="Defining a reward function in Reinforcement Learning (RL) is not always possible or very costly. For this reason, there is a great interest in training agents in a task-agnostic manner making use of intrinsic motivations and unsupervised techniques. Due to the complexity to learn useful behaviours in pixel-based domains, the results obtained in RL are still far from the remarkable results obtained in domains such as computer vision and natural language processing. We hypothesize that RL agents will also benefit from unsupervised pre-trainings with no extrinsic rewards, analogously to how humans mostly learn, especially in the early stages of life. Our main contribution is the deployment of the Explore, Discover and Learn (EDL) paradigm for unsupervised learning to the pixel space. In particular, our work focuses on the MineRL environment, where the observation of the agent is represented by: (a) its spatial coordinates in the Minecraft virtual world, and (b) an image from an egocentric viewpoint. Following the idea of empowerment, our goal is to learn latent-conditioned policies by maximizing the mutual information between states and some latent variables, instead of sequences of actions. This allows the agent to influence the environment while discovering available skills."
    authors={{
      "Juan José Nieto": [0],
      "Roger Creus Castanyer": [0],
      "Xavier Giró-i-Nieto": [0],
    }}
    affiliations={["Universitat Politecnica de Catalunya"]}
    pdf="/papers/PiCoEDL.pdf"
    poster="/posters/PiCoEDL.pdf"
  />,
  <Paper
    title="Agent with the Big Picture: Perceiving Surroundings for Interactive Instruction Following"
    abstract="Performing simple household tasks based on language directives is very natural to humans, yet it remains an open challenge for an AI agent. The 'interactive instruction following' task attempts to make progress towards building an agent that can jointly navigate, interact, and reason in the environment at every step. Here, we propose to exploit surrounding views by perceiving observation from navigable directions for effective task completion with ample information, In addition, to address the multifaceted problem, we propose a model that factorizes the task into interactive perception and action policy streams with enhanced components. We empirically validate that our model outperforms prior arts by significant margins on the ALFRED benchmark with improved generalization."
    authors={{
      "Byeonghwi Kim": [0],
      "Suvaansh Bhambri": [0],
      "Kunal Pratap Singh": [1],
      "Roozbeh Mottaghi": [1, 2],
      "Jonghyun Choi": [0],
    }}
    affiliations={[
      "GIST",
      "Allen Institute for AI",
      "University of Washington",
    ]}
    pdf="/papers/Agent-with-the-Big-Picture.pdf"
    poster="/posters/Agent-with-the-Big-Picture.pdf"
  />,
  <Paper
    title="PixelEDL: Unsupervised Skill Discovery and Learning from Pixels"
    abstract="We tackle embodied visual navigation in a task-agnostic set-up by putting the focus on the unsupervised discovery of skills (or options) that provide a good coverage of states. Our approach intersects with empowerment: we address the reward-free skill discovery and learning tasks to discover “what” can be done in an environment and “how”. For this reason, we adopt the existing Explore, Discover and Learn (EDL) paradigm, tested only in toy example mazes, and extend it to pixel-based state representations available for embodied AI agents."
    authors={{
      "Roger Creus Castanyer": [0],
      "Juan José Nieto": [0],
      "Xavier Giro-i-Nieto": [0],
    }}
    affiliations={["Universitat Politècnica de Catalunya"]}
    pdf="/papers/PixelEDL.pdf"
    poster="/posters/PixelEDL.pdf"
  />,
  <Paper
    title="URoboSim: A Simulation-Based Predictive Modelling Engine for Cognition-Enabled Robot Manipulation"
    abstract="In a nutshell robot simulators are fully developed software systems that provide simulations as a substitute for real-world activity. They are primarily used for training modules of robot control programs, which are, after completing the learning process, deployed in real-world robots. In contrast, simulation in (artificial) cognitive systems is a core cognitive capability, which is assumed to provide a “small-scale model of external reality and of its own possible actions within its head, it is able to try out various alternatives, conclude which is the best of them, react to future situations before they arise, utilise the knowledge of past events in dealing with the present and future, and in every way to react in a much fuller, safer, and more competent manner to the emergencies which face it.” [8] This means that simulation can be considered as an embodied, online predictive modelling engine that enables robots to contextualize vague task requests such as “bring me the milk” into a concrete body motion that achieves the implicit goal and avoids unwanted side effects. In this setting a robot can run small-scale simulation and rendering processes for different reasoning tasks all the time and can continually compare simulation results with reality — it is a promising Sim2Real2Sim setup that has the potential to create much more powerful robot simulation engines. We introduce URoboSim, a robot simulation framework that is currently designed and developed with this vision in mind."
    authors={{
      "Michael Neumann": [0],
      "Michael Beetz": [0],
      "Andrei Haidu": [0],
    }}
    affiliations={["University Bremen"]}
    pdf="/papers/URoboSim.pdf"
    poster="/posters/URoboSim.pdf"
  />,
  <Paper
    title="RobustNav: Towards Benchmarking Robustness in Embodied Navigation"
    abstract="As an attempt towards assessing the robustness of embodied navigation agents, we propose RobustNav, a framework to quantify the performance of embodied navigation agents when exposed to a wide variety of visual – affecting RGB inputs – and dynamics – affecting transition dynamics – corruptions. Most recent efforts in visual navigation have typically focused on generalizing to novel target environments with similar appearance and dynamics characteristics. With RobustNav, we find that some standard embodied navigation agents significantly underperform (or fail) in the presence of visual or dynamics corruptions. We systematically analyze the kind of idiosyncrasies that emerge in the behavior of such agents when operating under corruptions. Finally, for visual corruptions in RobustNav, we show that while standard techniques to improve robustness such as data-augmentation and self-supervised adaptation offer some zero-shot resistance and improvements in navigation performance, there is still a long way to go in terms of recovering lost performance relative to clean “non-corrupt” settings, warranting more research in this direction."
    authors={{
      "Prithvijit Chattopadhyay": [0],
      "Judy Hoffman": [0],
      "Roozbeh Mottaghi": [1, 2],
      "Aniruddha Kembhavi": [1, 2],
    }}
    affiliations={[
      "Georgia Tech",
      "Allen Institute for AI",
      "University of Washington",
    ]}
    pdf="/papers/RobustNav.pdf"
    poster="/posters/RobustNav.pdf"
  />,
  <Paper
    title="HexaJungle: a MARL Simulator to Study the Emergence of Language"
    abstract="Multi-agent reinforcement learning in mixed-motive settings allows for the study of complex dynamics of agent interactions. Embodied agents in partially observable environments with the ability to communicate can share information, agree on strategies, or even lie to each other.In order to study this, we propose a simple environment where we can impose varying levels of cooperation, communication and competition as pre-requisites to reach an optimal outcome. Welcome to the jungle."
    authors={{
      "Kiran Ikram": [0],
      "Esther Mondragon": [0],
      "Eduardo Alonso": [0],
      "Michaël Garcia Ortiz": [0],
    }}
    affiliations={["City University Artificial Intelligence Lab"]}
    pdf="/papers/HexaJungle.pdf"
    poster="/posters/HexaJungle.pdf"
  />,
  <Paper
    title="Modular Framework for Visuomotor Language Grounding"
    abstract="Natural language instruction following tasks serve as a valuable test-bed for grounded language and robotics research. However, data collection for these tasks is expensive and end-to-end approaches suffer from data inefficiency. We propose the structuring of language, acting, and visual tasks into separate modules that can be trained independently. Using a Language, Action, and Vision (LAV) framework removes the dependence of action and vision modules on instruction following datasets, making them more efficient to train. We also present a preliminary evaluation of LAV on the ALFRED task for visual and interactive instruction following."
    authors={{
      "Kolby T Nottingham": [0],
      "Litian Liang": [0],
      "Daeyun Shin": [0],
      "Charless Fowlkes": [0],
      "Roy Fox": [0],
      "Sameer Singh": [0],
    }}
    affiliations={["University of California Irvine"]}
    pdf="/papers/Modular-Framework-for-Visuomotor-Language-Grounding.pdf"
    poster="/posters/LAV.pdf"
  />,
  <Paper
    title="PGDrive: Procedural Generation of Driving Environments for Generalization"
    abstract="To better evaluate and improve the generalization of end-to-end driving, we introduce an open-ended and highly configurable driving simulator called PGDrive, following a key feature of procedural generation. We validate that training with the increasing number of procedurally generated scenes significantly improves the generalization of the agent across scenarios of different traffic densities and road networks. Many applications such as multi-agent traffic simulation and safe driving benchmark can be further built upon the simulator."
    authors={{
      "Quanyi Li": [0],
      "Zhenghao Peng": [0],
      "Qihang Zhang": [1],
      "Chunxiao Liu": [2],
      "Bolei Zhou": [0],
    }}
    affiliations={[
      "Chinese University of Hong Kong",
      "Zhejiang University",
      "Sensetime",
    ]}
    pdf="/papers/PGDrive.pdf"
    poster="/posters/pgdrive.pdf"
  />,
];

const Time = (props: { time: string }) => (
  <span
    css={css`
      color: ${color.gray7};
    `}
  >
    {props.time}
  </span>
);

const paperOrder = shuffle([...Array(acceptedPapers.length).keys()]);

// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function InlineSlack() {
  return (
    <div>
      <a
        href="//join.slack.com/t/embodied-aiworkshop/shared_invite/zt-s6amdv5c-gBZQZ7YSktrD_tMhQDjDfg"
        target="_blank"
      >
        <div
          css={css`
            display: inline-block;
            /* border: 1px solid ${color.gray6}; */
            border-radius: 0px 10px 0px 10px;
            padding-left: 10px;
            padding-right: 10px;
            margin-top: 3px;
            padding-top: 3px;
            padding-bottom: 4px;
            background-color: #4a154b;
            transition-duration: 0.15s;
            color: white;
            &:hover {
              cursor: pointer;
              filter: contrast(1.25);
            }
            > span,
            > img {
              vertical-align: middle;
            }
          `}
        >
          <img
            src={SlackLogo}
            css={css`
              width: 15px;
              margin-right: 5px;
            `}
          />{" "}
          <span>
            Ask questions on <b>Slack</b>
          </span>
        </div>
      </a>
    </div>
  );
}

function Slack() {
  return (
    <a
      href="//join.slack.com/t/embodied-aiworkshop/shared_invite/zt-s6amdv5c-gBZQZ7YSktrD_tMhQDjDfg"
      target="_blank"
    >
      <div
        css={css`
          background-color: #4a154b;
          color: white;
          padding: 15px 15px;
          border-radius: 10px 0px 10px 0px;
          transition-duration: 0.15s;

          &:hover {
            cursor: pointer;
            filter: contrast(1.25);
            box-shadow: 0px 0px 15px 0px ${color.gray6};
          }
        `}
      >
        <img
          src={SlackLogo}
          css={css`
            height: 20px;
            vertical-align: middle;
            margin-right: 7px;
          `}
        />
        <div
          css={css`
            display: inline-block;
            vertical-align: middle;
          `}
        >
          Ask Questions on <b>Slack</b>
        </div>
        <div
          css={css`
            background-color: white;
            color: black;
            padding: 5px;
            padding-top: 6px;
            padding-bottom: 3px;
            padding-left: 5px;
            margin-top: 12px;
            border-radius: 10px 0px 10px 0px;
          `}
        >
          <Emoji emoji="male-detective" size={20} /> Questions can be asked{" "}
          <b>anonymously</b>.
        </div>
      </div>
    </a>
  );
}

// And finally, we add all the content into their respective sections.
export default function Home({ data }) {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const resizeWindow = () => setWindowWidth(getWindowWidth());
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  });

  const challengeData = [
    {
      challenge: challengePageMap["AI2-THOR ObjectNav"],
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=bUW8oGKqtY8&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="ai2thor2021"
          data={data}
        />
      ),
      winnerSpotlight: (
        <>
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=EH94fGEjj1I&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="ict_robothor"
            data={data}
            width="200px"
            rank="1st Place"
          />
        </>
      ),
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=bUW8oGKqtY8&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="ai2thor2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=-YmHT2fSQDo&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="alfred2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=SAoN2giK6Gk&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="habitat2021"
          data={data}
        />
      ),
      winnerSpotlight: (
        <>
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=z7HflwSv3GM&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="redRabbit_habitat"
            data={data}
            rank="1st Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=40cbSZefjjY&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="habitatOnWeb_habitat"
            data={data}
            rank="2nd Place"
          />
        </>
      ),
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=SAoN2giK6Gk&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="habitat2021"
          data={data}
        />
      ),
      winnerSpotlight: (
        <>
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=I-4s2keQ1Ig&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="inspir_habitat"
            data={data}
            rank="1st Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=z1lYiPfEAOQ&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="ucu_habitat"
            data={data}
            rank="2nd Place"
          />
        </>
      ),
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=1uSsds7HSrQ&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="igibson2021"
          data={data}
        />
      ),
      winnerSpotlight: (
        <>
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=kC9wdC3abDo&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="gatech_igibson"
            data={data}
            display="block"
            rank="1st Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=x5ewIkkgYuQ&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="lpais_igibson"
            data={data}
            display="block"
            rank="2nd Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=gK4ek_tvCJo&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="nicsefc_igibson"
            data={data}
            display="block"
            rank="4th Place"
          />
        </>
      ),
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=1uSsds7HSrQ&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="igibson2021"
          data={data}
        />
      ),
      winnerSpotlight: (
        <>
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=gK4ek_tvCJo&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="nicsefc_igibson"
            data={data}
            rank="1st Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=x5ewIkkgYuQ&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="lpais_igibson"
            data={data}
            rank="3rd Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=c2TRfio7J-M&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="lpacsi_igibson"
            data={data}
            rank="4th Place"
          />
          <ChallengeSpotlight
            url="//www.youtube.com/watch?v=kC9wdC3abDo&list=PL4XI7L9Xv5fVnzoKzSL0GOu2l2fIAJA7O"
            imageQuery="gatech_igibson"
            data={data}
            rank="5th Place"
          />
        </>
      ),
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=ghX5UDWD1HU&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="multion2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=uDhIEw9TA80&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="rvsu2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=uDhIEw9TA80&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="rvsu2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=YGwHGgD-9gQ&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="rxr2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=ANmhSo6gXNg&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="soundspaces2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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
      video: (
        <ChallengeVideo
          url="//www.youtube.com/watch?v=ffh7zxWAkFw&list=PL4XI7L9Xv5fVzPkYPxASt64LhfNM8MAlP"
          imageQuery="tdw2021"
          data={data}
        />
      ),
      winnerSpotlight: <></>,
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

  // useEffect(() => {
  //   setPaperOrder(prevOrder => shuffle(prevOrder));
  // }, []);

  // using 4:59 since PST is 5 hours behind AoE.
  const paperDeadline = moment.tz("2021-05-15 04:59", "America/Los_Angeles");
  const currentTime = moment();
  const duration = moment.duration(paperDeadline.diff(currentTime));

  const hoursLeft = Math.ceil(duration.asHours() % 24);
  const daysLeft = Math.floor(duration.asDays());

  return (
    <PageWrapper
      headerGradient="linear-gradient(to bottom, #ebdfa5, #49c3cd)"
      imageContent={{
        css: css`
          width: 120%;
          background-repeat: no-repeat;
          padding-top: 50.25%;
          margin-left: -6%;
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
          session, and panel discussions.
        </p>
        <EmailSubscription
          actionIdentifier="1FAIpQLSeIZrn-tk7Oain2R8gc_Q0HzLMLQ9XXwqu3KecK_E5kALpiug"
          entryNumber={1834823104}
        />
      </Section>
      <Section title="Timeline">
        <Steps progressDot current={0} direction="vertical">
          <Step
            title="CVPR Workshop"
            description={
              <>
                June 20, 2021.{" "}
                <span
                  css={css`
                    color: ${color.gray7};
                  `}
                >
                  Tentitative Schedule:
                </span>
                <div
                  css={css`
                    margin-left: 0px;
                    margin-top: 20px;
                  `}
                >
                  <Timeline>
                    <Timeline.Item>
                      Livestream
                      <br />
                      <Time time="6:30 AM - 6:00 PM PST" />
                    </Timeline.Item>
                    <Timeline.Item>
                      Speaker Panel
                      <br />
                      <Time time="11:00 AM PST" />
                      <InlineSlack />
                    </Timeline.Item>
                    <Timeline.Item>
                      Lunch
                      <br />
                      <Time time="12:00 AM PST" />
                    </Timeline.Item>
                    <Timeline.Item>
                      Poster Session
                      <br />
                      <Time time="1:00 PM PST" />
                      <div>
                        <div
                          css={css`
                            display: inline-block;
                            /* border: 1px solid ${color.gray6}; */
                            border-radius: 0px 10px 0px 10px;
                            padding-left: 10px;
                            padding-right: 10px;
                            margin-top: 3px;
                            padding-top: 3px;
                            padding-bottom: 4px;
                            background-color: ${color.dark.blue6};
                            transition-duration: 0.15s;
                            color: white;
                            &:hover {
                              cursor: not-allowed;
                              filter: contrast(1.25);
                            }
                            > span,
                            > img {
                              vertical-align: middle;
                            }
                          `}
                        >
                          <span>
                            Join on <b>gather.town</b>
                          </span>
                        </div>
                      </div>
                    </Timeline.Item>
                    <Timeline.Item>
                      Navigation Challenge Results
                      <br />
                      <Time time="2:00 PM PST" />
                    </Timeline.Item>
                    <Timeline.Item>
                      Navigation Panel
                      <br />
                      <Time time="3:00 PM PST" />
                      <InlineSlack />
                    </Timeline.Item>
                    <Timeline.Item>
                      Interaction Challenge Results
                      <br />
                      <Time time="4:00 PM PST" />
                    </Timeline.Item>
                    <Timeline.Item>
                      Interaction Panel
                      <br />
                      <Time time="5:00 PM PST" />
                      <InlineSlack />
                    </Timeline.Item>
                  </Timeline>
                </div>
              </>
            }
          />
          <Step
            title="Challenge Submission Deadlines"
            description="May 2021. Check each challenge for the specific date."
          />
          <Step
            title="Paper Submission Deadline"
            description="May 14, 2021 (Anywhere on Earth)"
          />
          <Step title="Workshop Announced" description="Feb 17, 2021" />
        </Steps>
      </Section>
      <Section title="Panel Sessions">
        <SubSection title="Speaker Panel">
          <LiveSession
            fluidImage={data.speakerPanel.childImageSharp.fluid}
            videoURL="//www.youtube.com/watch?v=-UcfQnTk8dU&list=PL4XI7L9Xv5fXNCizY4FUOT69pnG5c5KLy"
            rhs={
              <>
                <Slack />
                <div
                  css={css`
                    > p {
                      margin-top: 5px;
                      text-indent: -10px;
                      margin-left: 10px;
                      &:nth-of-type(1) {
                        margin-top: 20px;
                      }
                    }
                  `}
                >
                  <p>
                    <b>Date.</b> June 20th, 11 AM PST.
                  </p>
                  <p>
                    <b>Panel.</b> The panel consists of speakers at this
                    workshop.
                  </p>
                  <p>
                    <b>Moderator.</b> Erik Wijmans.
                  </p>
                  <p>
                    <b>Topics.</b> The topics are based on questions, likely
                    involving cognitive development in humans, progress in
                    embodied AI tasks, sim-2-real transfer, robotics, embodied
                    AI for all, and more!
                  </p>
                </div>
              </>
            }
          />
        </SubSection>
        <SubSection title="Navigation Panel">
          <LiveSession
            fluidImage={data.navigationPanel.childImageSharp.fluid}
            videoURL={undefined}
            rhs={
              <>
                <Slack />
                <div
                  css={css`
                    > p {
                      margin-top: 5px;
                      text-indent: -10px;
                      margin-left: 10px;
                      &:nth-of-type(1) {
                        margin-top: 20px;
                      }
                    }
                  `}
                >
                  <p>
                    <b>Date.</b> June 20th, 3 PM PST.
                  </p>
                  <p>
                    <b>Panel.</b> The panel consists of challenge organizers who
                    organized navigation tasks.
                  </p>
                  <p>
                    <b>Moderator.</b> Luca Weihs.
                  </p>
                  <p>
                    <b>Topics.</b> The topics are based on questions, likely
                    involving navigation benchmarks and tasks, the "reality"
                    gap, robotics, simulation platforms, and more!
                  </p>
                </div>
              </>
            }
          />
        </SubSection>
        <SubSection title="Interaction Panel">
          <LiveSession
            fluidImage={data.interactionPanel.childImageSharp.fluid}
            questionLink="YO"
            videoURL={undefined}
            rhs={
              <>
                <Slack />
                <div
                  css={css`
                    > p {
                      margin-top: 5px;
                      text-indent: -10px;
                      margin-left: 10px;
                      &:nth-of-type(1) {
                        margin-top: 20px;
                      }
                    }
                  `}
                >
                  <p>
                    <b>Date.</b> June 20th, 5 PM PST.
                  </p>
                  <p>
                    <b>Panel.</b> The panel consists of challenge organizers who
                    organized interaction tasks.
                  </p>
                  <p>
                    <b>Moderator.</b> Chengshu (Eric) Li.
                  </p>
                  <p>
                    <b>Topics.</b> The topics are based on questions, likely
                    involving interaction benchmarks and tasks,
                    vision-and-language, rearrangement, leveraging audio, the
                    "reality" gap, robotics, simulation platforms, and more!
                  </p>
                </div>
              </>
            }
          />
        </SubSection>
      </Section>
      <Section title="Invited Speakers">
        <SubSection title="Motivation for Embodied AI Research">
          <Speaker
            organizations={["Stanford"]}
            name="Hyowon Gweon"
            fixedImg={data.hyowon.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=1S8lUbkuMnk&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
        </SubSection>
        <SubSection title="Embodied Navigation">
          <Speaker
            organizations={["Google"]}
            name="Peter Anderson"
            fixedImg={data.peter.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=r5RmmXeUAwE&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
          <Speaker
            organizations={["Google"]}
            name="Aleksandra Faust"
            fixedImg={data.aleksandra.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=x0CXtjpsWCE&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
        </SubSection>
        <SubSection title="Robotics">
          <Speaker
            organizations={["UC Berkeley"]}
            name="Anca Dragan"
            fixedImg={data.anca.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=G-qxzerBq8I&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
          <Speaker
            organizations={["Stanford", "Google"]}
            name="Chelsea Finn"
            fixedImg={data.chelsea.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=6IGdWmvcwb4&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
          <Speaker
            organizations={["Facebook AI Research"]}
            name="Akshara Rai"
            fixedImg={data.akshara.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=Z3RMJA1Nopw&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
        </SubSection>
        <SubSection title="Sim-2-Real Transfer">
          <Speaker
            organizations={["University of Toronto", "NVIDIA"]}
            name="Sanja Fidler"
            fixedImg={data.sanja.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=cgAatW67U4M&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
          <Speaker
            organizations={["DeepMind"]}
            name="Konstantinos Bousmalis"
            fixedImg={data.konstantinos.childImageSharp.fixed}
            url="//www.youtube.com/watch?v=jqxY7tqc6-Y&list=PL4XI7L9Xv5fWVW72Dmoqkc3lJUnF67jvF"
          />
        </SubSection>
      </Section>
      <Section title="Challenges">
        <p>
          The Embodied AI 2021 workshop is hosting many exciting challenges
          covering a wide range of topics such as rearrangement, visual
          navigation, vision-and-language, and audio-visual navigation. More
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
          scroll={{ x: "2250px" }}
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
              fixed: windowWidth > 650 ? "left" : "",
            },
            {
              title: (
                <>
                  <Emoji emoji="microscope" size={18} /> Task
                </>
              ),
              dataIndex: "task",
              key: "task",
              sorter: (a, b) => a.task.localeCompare(b.task),
              sortDirections: ["ascend", "descend"],
              fixed: windowWidth > 650 ? "left" : "",
            },
            {
              title: (
                <>
                  <Emoji emoji="video_camera" size={18} /> Video
                </>
              ),
              dataIndex: "video",
              key: "video",
              width: 300,
            },
            {
              title: (
                <>
                  <Emoji emoji="trophy" size={18} /> Spotlight
                </>
              ),
              dataIndex: "winnerSpotlight",
              key: "winnerSpotlight",
              width: 400,
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
        {/* <SubSection title="Challenge Results">Hello, world.</SubSection> */}
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
        <SubSection title="Submission">
          <p>
            The submission deadline is May 14th (
            <a href="//time.is/Anywhere_on_Earth">Anywhere on Earth</a>). Papers
            should be no longer than 2 pages (excluding references) and styled
            in the{" "}
            <a href="http://cvpr2021.thecvf.com/node/33" target="_blank">
              CVPR format
            </a>
            . Paper submissions are now closed.
          </p>
        </SubSection>
        <SubSection title="Accepted Papers">
          <p>
            <b>Note.</b> The order of the papers is randomized each time the
            page is refreshed.
          </p>
          <div
            css={css`
              display: grid;
              grid-gap: 2%;
              grid-row-gap: 20px;
              grid-template-columns: 49% 49%;
              @media (max-width: 600px) {
                grid-template-columns: 100%;
              }
            `}
          >
            {paperOrder.map((n: number) => acceptedPapers[n])}
          </div>
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

    # speaker pictures
    akshara: file(relativePath: { eq: "cvpr2021/akshara-rai.jpg" }) {
      ...VideoThumbnail
    }
    aleksandra: file(relativePath: { eq: "cvpr2021/aleksandra-faust.jpg" }) {
      ...VideoThumbnail
    }
    anca: file(relativePath: { eq: "cvpr2021/anca-dragan.jpg" }) {
      ...VideoThumbnail
    }
    chelsea: file(relativePath: { eq: "cvpr2021/chelsea-finn.jpg" }) {
      ...VideoThumbnail
    }
    hyowon: file(relativePath: { eq: "cvpr2021/hyowon-gweon.jpg" }) {
      ...VideoThumbnail
    }
    peter: file(relativePath: { eq: "cvpr2021/peter-anderson.jpg" }) {
      ...VideoThumbnail
    }
    sanja: file(relativePath: { eq: "cvpr2021/sanja-fidler.jpg" }) {
      ...VideoThumbnail
    }
    konstantinos: file(
      relativePath: { eq: "cvpr2021/konstantinos-bousmalis.jpg" }
    ) {
      ...VideoThumbnail
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

    haoyangOrg: file(relativePath: { eq: "organizers/haoyang.jpg" }) {
      ...FluidImage
    }

    # Challenge Videos
    ai2thor2021: file(relativePath: { eq: "cvpr2021/ai2thor-challenges.jpg" }) {
      ...FluidImage
    }
    alfred2021: file(relativePath: { eq: "cvpr2021/alfred-challenge.jpg" }) {
      ...FluidImage
    }
    habitat2021: file(relativePath: { eq: "cvpr2021/habitat-challenge.jpg" }) {
      ...FluidImage
    }
    igibson2021: file(relativePath: { eq: "cvpr2021/igibson-challenge.jpg" }) {
      ...FluidImage
    }
    multion2021: file(relativePath: { eq: "cvpr2021/multion-challenge.jpg" }) {
      ...FluidImage
    }
    rvsu2021: file(
      relativePath: {
        eq: "cvpr2021/robotic-vision-scene-understanding-challenge.jpg"
      }
    ) {
      ...FluidImage
    }
    rxr2021: file(relativePath: { eq: "cvpr2021/rxr-habitat.jpg" }) {
      ...FluidImage
    }
    soundspaces2021: file(
      relativePath: { eq: "cvpr2021/soundspaces-challenge.jpg" }
    ) {
      ...FluidImage
    }
    tdw2021: file(relativePath: { eq: "cvpr2021/tdw-transport.jpg" }) {
      ...FluidImage
    }

    interactionPanel: file(
      relativePath: { eq: "cvpr2021/interaction-panel.jpg" }
    ) {
      ...FluidImage
    }
    navigationPanel: file(
      relativePath: { eq: "cvpr2021/navigation-panel.jpg" }
    ) {
      ...FluidImage
    }
    speakerPanel: file(relativePath: { eq: "cvpr2021/speaker-panel.jpg" }) {
      ...FluidImage
    }
    liveStream: file(relativePath: { eq: "cvpr2021/live-stream21.jpg" }) {
      ...FluidImage
    }

    # spotlights
    gatech_igibson: file(relativePath: { eq: "cvpr2021/gatech-igibson.jpg" }) {
      ...FluidImage
    }
    lpacsi_igibson: file(
      relativePath: { eq: "cvpr2021/challenge-lpacsi.jpg" }
    ) {
      ...FluidImage
    }
    lpais_igibson: file(relativePath: { eq: "cvpr2021/team-lpais.jpg" }) {
      ...FluidImage
    }
    nicsefc_igibson: file(relativePath: { eq: "cvpr2021/team-nicsefc.jpg" }) {
      ...FluidImage
    }

    ict_robothor: file(relativePath: { eq: "cvpr2021/ict-cas.jpg" }) {
      ...FluidImage
    }

    redRabbit_habitat: file(
      relativePath: { eq: "cvpr2021/red-rabbit-team.jpg" }
    ) {
      ...FluidImage
    }
    habitatOnWeb_habitat: file(
      relativePath: { eq: "cvpr2021/habitat-on-web.jpg" }
    ) {
      ...FluidImage
    }
    inspir_habitat: file(relativePath: { eq: "cvpr2021/inspir-team.jpg" }) {
      ...FluidImage
    }
    ucu_habitat: file(relativePath: { eq: "cvpr2021/ucu-mlab.jpg" }) {
      ...FluidImage
    }
  }
`;
