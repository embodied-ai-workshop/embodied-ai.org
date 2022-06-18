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

import NewOrleansCover from "../../static/images/cvpr2022/cover.svg";
import SlackLogo from "../../static/icons/slack.svg";

const { Step } = Steps;
import { Emoji } from "emoji-mart";

import { Speaker, LiveSession, Video } from "./cvpr2020";

import { OrganizerPics } from "./cvpr2020";
import { css } from "@emotion/react";

import "@allenai/varnish/theme.css";
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
  "AI2-THOR Rearrangement": (
    <a href="//ai2thor.allenai.org/rearrangement" target="_blank">
      AI2-THOR Rearrangement
    </a>
  ),
  ALFRED: (
    <a href="//askforalfred.com/EAI22" target="_blank">
      ALFRED
    </a>
  ),
  Habitat: (
    <a href="//aihabitat.org/challenge/2022" target="_blank">
      Habitat
    </a>
  ),
  iGibson: (
    <a href="http://svl.stanford.edu/igibson/challenge.html" target="_blank">
      iGibson
    </a>
  ),
  MultiOn: (
    <a href="http://multion-challenge.cs.sfu.ca" target="_blank">
      MultiON
    </a>
  ),
  "Robotic Vision Scene Understanding": (
    <a href="http://cvpr2022.roboticvisionchallenge.org/" target="_blank">
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
    <a href="http://tdw-transport.csail.mit.edu" target="_blank">
      TDW-Transport
    </a>
  ),
  TEACh: (
    <a href="//teachingalfred.github.io/EAI22" target="_blank">
      TEACh
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
  poster?: string;
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
        {props.poster ? (
          <PaperButton
            text="Poster"
            emoji="page_with_curl"
            url={props.poster}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

let acceptedPapers = [
  <Paper
    title="ABCDE: An Agent-Based Cognitive Development Environment"
    abstract="Children’s cognitive abilities are sometimes cited as AI benchmarks. How can the most common 1,000 concepts (89% of everyday use) be learnt in a naturalistic children’s setting? Cognitive development in children is about quality, and new concepts can be conveyed via simple examples. Our approach of knowledge scaffolding uses simple objects and actions to convey concepts, like how children are taught. We introduce ABCDE, an interactive 3D environment modeled after a typical playroom for children. It comes with 300+ unique 3D object assets (mostly toys), and a large action space for child and parent agents to interact with objects and each other. ABCDE is the first environment aimed at mimicking a naturalistic setting for cognitive development in children; no other environment focuses on high-level concept learning through learner-teacher interactions. The simulator can be found at https://pypi.org/project/ABCDESim/1.0.0/"
    authors={{
      "Jieyi Ye": [],
      "Jiafei Duan": [],
      "Samson Yu": [],
      "Bihan Wen": [],
      "Cheston Tan": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/1.pdf"
  />,
  <Paper
    title="IFOR: Iterative Flow Minimization for Robotic Object Rearrangement"
    abstract="Accurate object rearrangement from vision is a crucial problem for a wide variety of real-world robotics applications in unstructured environments. We propose IFOR, Iterative Flow Minimization for Robotic Object Rearrangement, an end-to-end method for the challenging problem of object rearrangement for unknown objects given an RGBD image of the original and final scenes. First, we learn an optical flow model based on RAFT to estimate the relative transformation of the objects purely from synthetic data. This flow is then used in an iterative minimization algorithm to achieve accurate positioning of previously unseen objects. Crucially, we show that our method applies to cluttered scenes, and in the real world, while training only on synthetic data. Videos are available at https://imankgoyal.github.io/ifor.html."
    authors={{
      "Ankit Goyal": [],
      "Arsalan Mousavian": [],
      "Chris Paxton": [],
      "Yu-Wei Chao": [],
      "Brian Okorn": [],
      "Jia Deng": [],
      "Dieter Fox": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/3.pdf"
  />,
  <Paper
    title="Simple and Effective Synthesis of Indoor 3D Scenes"
    abstract="We study the problem of synthesizing immersive 3D indoor scenes from one or more images. Our aim is to generate high-resolution images and videos from novel viewpoints, including those that extrapolate far beyond the input images while maintaining 3D consistency. Existing approaches are highly complex, with many separately trained stages and components. We propose a simple alternative: an image-to-image GAN that maps directly from reprojections of incomplete point clouds to full high-resolution RGB-D images. On the Matterport3D and RealEstate10K datasets, our approach significantly outperforms prior work when evaluated by humans, as well as on FID scores. Further, we show that our model is useful for generative data augmentation. A vision-and-language navigation (VLN) agent trained with trajectories spatially-perturbed by our model improves success rate by up to 1.5% over a state of the art model on the R2R benchmark. For more details, we refer readers to our full paper (https://arxiv.org/abs/2204.02960) and video results (https://youtu.be/lhwwlrRfFp0)."
    authors={{
      "Jing Yu Koh": [],
      "Harsh Agrawal": [],
      "Dhruv Batra": [],
      "Richard Tucker": [],
      "Austin Waters": [],
      "Honglak Lee": [],
      "Yinfei Yang": [],
      "Jason M Baldridge": [],
      "Peter Anderson": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/4.pdf"
  />,
  <Paper
    title="Less is More: Generating Grounded Navigation Instructions from Landmarks"
    abstract="We study the automatic generation of navigation instructions from 360-degree images captured on indoor routes. Existing generators suffer from poor visual grounding, causing them to rely on language priors and hallucinate objects. Our Marky-mT5 system addresses this by focusing on visual landmarks; it comprises a first stage landmark detector and a second stage generator--a multimodal, multilingual, multitask encoder-decoder. To train it, we bootstrap grounded landmark annotations on top of the Room-across-Room (RxR) dataset. Using text parsers, weak supervision from RxR's pose traces, and a multilingual image-text encoder trained on 1.8b images, we identify 971k English, Hindi and Telugu landmark descriptions and ground them to specific regions in panoramas. On Room-to-Room, human wayfinders obtain success rates (SR) of 71% following Marky-mT5's instructions, just shy of their 75% SR following human instructions---and well above SRs with other generators. Evaluations on RxR's longer, diverse paths obtain 61-64% SRs on three languages. Generating such high-quality navigation instructions in novel environments is a step towards conversational navigation tools and could facilitate larger-scale training of instruction-following agents. The full paper at CVPR 2022 is available at https://arxiv.org/abs/2111.12872."
    authors={{
      "Su Wang": [],
      "Ceslee Montgomery": [],
      "Jordi Orbay": [],
      "Vighnesh N Birodkar": [],
      "Aleksandra Faust": [],
      "Izzeddin Gur": [],
      "Natasha Jaques": [],
      "Austin Waters": [],
      "Jason M Baldridge": [],
      "Peter Anderson": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/5.pdf"
  />,
  <Paper
    title="VLMbench: A Benchmark for Vision-and-Language Manipulation"
    abstract="One crucial ability of embodied agents is to finish tasks by following language instructions. Language can represent complicated tasks and distinguish their differences, and it is natural for humans to use language to command an embodied agent. In this work, we aim to fill the blank of the last mile of embodied agents---object manipulation by following human guidance, e.g., “move the red mug next to the box while keeping it upright.” To this end, we introduce an Automatic Manipulation Solver (AMSolver) and build a Vision-and-Language Manipulation benchmark (VLMbench), which contains various language instructions on categorized robotic manipulation tasks. Specifically, modular rule-based task templates are created to automatically generate robot demonstrations with language instructions, consisting of diverse object shapes and appearances, action types, and motion constraints. We hope the new simulator and benchmark will facilitate future research on language-guided robotic manipulation."
    authors={{
      "Kaizhi Zheng": [],
      "Xiaotong Chen": [],
      "Odest Chadwicke Jenkins": [],
      "Xin Eric Wang": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/6.pdf"
  />,
  <Paper
    title="FedVLN: Privacy-preserving Federated Vision-and-Language Navigation"
    abstract="Data privacy is a central problem for embodied agents that can perceive the environment, communicate with humans, and act in the real world. While helping humans complete tasks, the agent may observe and process sensitive information of users. In this work, we introduce privacy-preserving embodied agent learning for the task of Vision-and-Language Navigation (VLN), where an embodied agent navigates house environments by following natural language instructions. We propose a novel federated vision-and-language navigation (FedVLN) framework to protect data privacy during both training and pre-exploration, where we view each house environment as a local client. Experiment results show that, under our FedVLN framework, the decentralized VLN model achieve comparable results with centralized training while protecting seen environment privacy, and federated pre-exploration significantly outperforms other pre-exploration methods while preserving unseen environment privacy."
    authors={{
      "Kaiwen Zhou": [],
      "Xin Eric Wang": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/7.pdf"
  />,
  <Paper
    title="Towards Generalisable Audio Representations for Audio-Visual Navigation"
    abstract="In audio-visual navigation (AVN), an intelligent agent needs to navigate to a constantly sound-making object in complex 3D environments based on its audio and visual perceptions. While existing methods attempt to improve the navigation performance with preciously designed path planning or intricate task settings, none has improved the model generalisation on unheard sounds with task settings unchanged. We thus propose a contrastive learning-based method to tackle this challenge by regularising the audio encoder, where the sound-agnostic goal-driven latent representations can be learnt from various audio signals of different classes. In addition, we consider two data augmentation strategies to enrich the training sounds. We demonstrate that our designs can be easily equipped to existing AVN frameworks to obtain an immediate performance gain (13.4%↑ in SPL on Replica and 12.2%↑ in SPL on MP3D). Our project is available at https://AV-GeN.github.io/."
    authors={{
      "Shunqi Mao": [],
      "Chaoyi Zhang": [],
      "Heng Wang": [],
      "Weidong Cai": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/9.pdf"
  />,
  <Paper
    title="Benchmarking Augmentation Methods for Learning Robust Navigation Agents: The Winning Entry of the 2021 iGibson Challenge"
    abstract="While impressive progress has been made for teaching embodied agents to navigate static environments using vision, much less progress has been made on more dynamic environments that may include moving pedestrians or movable obstacles. In this study, we aim to benchmark different augmentation techniques for improving the agent's performance in these challenging environments. We show that adding several dynamic obstacles into the scene during training confers significant improvements in test-time generalization, achieving much higher success rates than baseline agents. We find that this approach can also be combined with image augmentation methods to achieve even higher success rates. Additionally, we show that this approach is also more robust to sim-to-sim transfer than image augmentation methods. Finally, we demonstrate the effectiveness of this dynamic obstacle augmentation approach by using it to train an agent for the 2021 iGibson Challenge at CVPR, achieving 1st place for Interactive Navigation."
    authors={{
      "Naoki Yokoyama": [],
      "Qian Luo": [],
      "Dhruv Batra": [],
      "Sehoon Ha": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/10.pdf"
  />,
  <Paper
    title="Habitat-Web: Learning Embodied Object-Search Strategies from Human Demonstrations at Scale"
    abstract="We present a large-scale study of imitating human demonstrations on tasks that require a virtual robot to search for objects in new environments – (1) ObjectGoal Navigation (e.g. ‘find &amp; go to a chair’) and (2) Pick&amp;Place (e.g. ‘find mug, pick mug, find counter, place mug on counter’). First, we develop a virtual teleoperation data-collection infrastructure – connecting Habitat simulator running in a web browser to Amazon Mechanical Turk, allowing remote users to teleoperate virtual robots, safely and at scale. We collect 80k demonstrations for ObjectNav and 12k demonstrations for Pick&amp;Place, which is an order of magnitude larger than existing human demonstration datasets in simulation or on real robots. Second, we use this data to answer the question – how does large-scale imitation learning (IL) (which has not been hitherto possible) compare to reinforcement learning (RL) (which is the status quo)? On ObjectNav, we find that IL (with no bells or whistles) using 70k human demonstrations outperforms RL using 240k agent-gathered trajectories. This effectively establishes an ‘exchange rate’ – a single human demonstration appears to be worth ∼4 agent-gathered ones. Finally, accuracy vs. training data size plots show promising scaling behavior, suggesting that simply collecting more demonstrations is likely to advance the state of art further. On Pick&amp;Place, the comparison is starker – IL agents achieve ∼18% success on episodes with new object-receptacle locations when trained with 9.5k human demonstrations, while RL agents fail to get beyond 0%. Overall, our work provides compelling evidence for investing in large-scale imitation learning. Project page: https://ram81.github.io/projects/habitat-web."
    authors={{
      "Ram Ramrakhya": [],
      "Eric Undersander": [],
      "Dhruv Batra": [],
      "Abhishek Das": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/11.pdf"
  />,
  <Paper
    title="IGLU Gridworld: Simple and Fast Environment for Embodied Dialog Agents"
    abstract="We present the IGLU Gridworld: a reinforcement learning environment for building and evaluating language conditioned embodied agents in a scalable way. The environment features visual agent embodiment, interactive learning through collaboration, language conditioned RL, and combinatorically hard task (3d blocks building) space."
    authors={{
      "Artem Zholus": [],
      "Alexey Skrynnik": [],
      "Shrestha Mohanty": [],
      "Zoya Volovikova": [],
      "Julia Kiseleva": [],
      "Arthur Szlam": [],
      "Marc-Alexandre Côté": [],
      "Aleksandr Panov": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/12.pdf"
  />,
  <Paper
    title="SAMPLE-HD: Simultaneous Action and Motion Planning Learning Environment"
    abstract="Humans exhibit incredibly high levels of multi-modal understanding - combining visual cues with read, or heard knowledge comes easy to us and allows for very accurate interaction with the surrounding environment. Various simulation environments focus on providing data for tasks related to scene understanding, question answering, space exploration, visual navigation. In this work, we are providing a solution to encompass both, visual and behavioural aspects of simulation in a new environment for learning interactive reasoning in manipulation setup. SAMPLE-HD environment allows to generate various scenes composed of small household objects, to procedurally generate language instructions for manipulation, and to generate ground truth paths serving as training data."
    authors={{
      "Michal Nazarczuk": [],
      "Tony Ng": [],
      "Krystian Mikolajczyk": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/13.pdf"
  />,
  <Paper
    title="Human Instruction Following: Graph Neural Network Guided Object Navigation"
    abstract="Home-assistant robots (e.g., mobile manipulator) following human instruction is a long-standing topic of research whose main challenge comes from the interpretation of diverse instructions and dynamically-changing environments. This paper proposes a hybrid planner for parsing human instruction and task planning, and a graph-based object navigation to search unknown objects by exploiting a partially known semantic map. We present preliminary evaluations of human instruction parsing and object-to-object link prediction based on graph neural network prediction, and demonstrate their effectiveness in human instruction following tasks."
    authors={{
      "Hongyi Chen": [],
      "Letian Wang": [],
      "Yuhang Yao": [],
      "Ye Zhao": [],
      "Patricio Vela": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/14.pdf"
  />,
  <Paper
    title="A Planning based Neural-Symbolic Approach for Embodied Instruction Following"
    abstract="The ALFRED environment features an embodied agent following instructions and accomplishing tasks in simulated home environments. However, end-to-end deep learning methods struggle at these tasks due to long-horizon and sparse rewards. In this work, we propose a principled neural-symbolic approach combining symbolic planning and deep-learning methods for visual perception and NL processing. The symbolic model is enriched as exploration progress until a full plan can be obtained. New perceptions are added to a discrete graph representation that is used for producing new planning problems. Empirical results demonstrate that our approach can achieve high scalability with SOTA performance of 36.04% unseen success rate in the ALFRED benchmark. Our work builds a foundation for a neural-symbolic approach that can act in unstructured environments when the set of skills and possible relationships is known."
    authors={{
      "Xiaotian Liu": [],
      "Hector Palacios": [],
      "Christian Muise": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/15.pdf"
  />,
  <Paper
    title="Modality-invariant Visual Odometry for Indoor Navigation"
    abstract='Successful indoor navigation is a crucial skill for many robots. This fundamental ability has been extensively studied through the task of PointGoal navigation in simulated environments. With noisy observations and actuation, the setting becomes more realistic and previously successful agents fail dramatically. Visual Odometry has shown to be a practical substitute for GPS+compass and can effectively localize the agent from visual observations. With the availability of multiple sensors and estimators, the question naturally arises of how to make the most use of multiple input modalities. When having access to multiple modalities, the predictions of naive multi-modal approaches can be dominated by a single one, impeding overall robustness. Recent methods are modality-specific and can not deal with "privileged" modalities, e.g., irregular or no access to depth during test time. We propose the Visual Odometry Transformer, a novel approach to multi-modal Visual Odometry based on Vision Transformers that successfully replaces GPS+compass. Our experiments show that the model can deal with limited availability of modalities during test time by implicitly learning a representation invariant to the availability of input modalities.'
    authors={{
      "Marius Memmel": [],
      "Amir Zamir": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/17.pdf"
  />,
  <Paper
    title="Role of reward shaping in object-goal navigation"
    abstract="Deep reinforcement learning approaches have been a popular method for visual navigation tasks in the computer vision and robotics community of late. In most cases, the reward function has a binary structure, i.e., a large positive reward is provided when the agent reaches goal state, and a negative step penalty is assigned for every other state in the environment. A sparse signal like this makes the learning process challenging, specially in big environments, where a large number of sequential actions need to be taken to reach the target. We introduce a reward shaping mechanism which gradually adjusts the reward signal based on distance to the goal. Detailed experiments conducted using the AI2-THOR simulation environment demonstrate the efficacy of the proposed approach for object-goal navigation tasks."
    authors={{
      "Srirangan Madhavan": [],
      "Anwesan Pal": [],
      "Henrik Christensen": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/18.pdf"
  />,
  <Paper
    title="Bridging the Gap between Events and Frames through Unsupervised Domain Adaptation"
    abstract="Event cameras are novel sensors with outstanding properties such as high temporal resolution and high dynamic range. However, event-based vision has been held back by the shortage of labeled datasets due to the novelty of event cameras. To overcome this drawback, we propose a task transfer method to train models directly with labeled images and unlabeled event data. We leverage the generative event model to split event features into content and motion features. Thus, our approach unlocks the vast amount of existing image datasets for the training of event-based neural networks. Our task transfer method outperforms methods targeting Unsupervised Domain Adaptation for object detection by 0.26 mAP and classification by 2.7% accuracy."
    authors={{
      "Nico Messikommer": [],
      "Daniel Gehrig": [],
      "Mathias Gehrig": [],
      "Davide Scaramuzza": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/19.pdf"
  />,
  <Paper
    title="BEHAVIOR in Habitat 2.0: Simulator-Independent Logical Task Description for Benchmarking Embodied AI Agents"
    abstract="Robots excel in performing repetitive and precision-sensitive tasks in controlled environments such as warehouses and factories, but have not been yet extended to embodied AI agents providing assistance in household tasks. Inspired by the catalyzing effect that benchmarks have played in the AI fields such as computer vision and natural language processing, the community is looking for new benchmarks for embodied AI. Prior work in embodied AI benchmark defines tasks using a different formalism, often specific to one environment, simulator or domain, making it hard to develop general and comparable solutions. In this work, we bring a subset of BEHAVIOR activities into Habitat 2.0 to benefit from its fast simulation speed, as a first step towards demonstrating the ease of adapting activities defined in the logic space into different simulators."
    authors={{
      "Ziang Liu": [],
      "Roberto Martin-Martin": [],
      "Fei Xia": [],
      "Jiajun Wu": [],
      "Li Fei-Fei": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/22.pdf"
  />,
  <Paper
    title="Language Guided Meta-Control for Embodied Instruction Following"
    abstract="Embodied Instruction Following (EIF) is a challenging problem requiring an agent to infer a sequence of actions to achieve a goal environment state from complex language and visual inputs. We propose a generalised Language Guided Meta-Controller (LMC) for better language grounding in the large action space of the embodied agent. We additionally propose an auxiliary reasoning loss to improve `conceptual grounding' of the agent. Our empirical validation shows that our approach outperforms strong baselines on the Execution from Dialogue History (EDH) benchmark from the TEACh benchmark."
    authors={{
      "Divyam Goel": [],
      "Kunal Pratap Singh": [],
      "Jonghyun Choi": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/23.pdf"
  />,
  <Paper
    title="Learning to navigate in interactive Environments with the transformer-based memory"
    abstract="Substantial progress has been achieved in embodied visual navigation based on reinforcement learning (RL). These studies presume that the environment is stationary where all the obstacles are static. However, in real cluttered scenes, interactable objects (e.g. shoes and boxes) blocking the way of robots makes the environment non-stationary. We formulate this interactive visual navigation as a Partial Observed Markov Decision Problem. To handle it, we propose a transformer encoder to learn a belief state which captures the long spatial-temporal dependencies of the aggregated observations in the memory. However, leveraging the transformer architecture in the RL settings is highly unstable. We propose a surrogate objective to predict the next waypoint, which facilitates the representation learning and bootstrap the RL. We demonstrate our method in the iGibson environment and experimental results show a significant improvement over the interactive Gibson benchmark and the related recurrent RL policy both in the validation seen scenes and the test unseen scenes."
    authors={{
      "Weiyuan Li": [],
      "Ruoxin Hong": [],
      "Jiwei Shen": [],
      "Yue Lu": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/24.pdf"
  />,
  <Paper
    title="Learning to navigate in interactive Environments with the transformer-based memory"
    abstract="Substantial progress has been achieved in embodied visual navigation based on reinforcement learning (RL). These studies presume that the environment is stationary where all the obstacles are static. However, in real cluttered scenes, interactable objects (e.g. shoes and boxes) blocking the way of robots makes the environment non-stationary. We formulate this interactive visual navigation as a Partial Observed Markov Decision Problem. To handle it, we propose a transformer encoder to learn a belief state which captures the long spatial-temporal dependencies of the aggregated observations in the memory. However, leveraging the transformer architecture in the RL settings is highly unstable. We propose a surrogate objective to predict the next waypoint, which facilitates the representation learning and bootstrap the RL. We demonstrate our method in the iGibson environment and experimental results show a significant improvement over the interactive Gibson benchmark and the related recurrent RL policy both in the validation seen scenes and the test unseen scenes."
    authors={{
      "Weiyuan Li": [],
      "Ruoxin Hong": [],
      "Jiwei Shen": [],
      "Yue Lu": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/24.pdf"
  />,
  <Paper
    title="ET tu, CLIP? Addressing Common Object Errors for Unseen Environments"
    abstract="We introduce a simple method that employs pre-trained CLIP encoders to enhance model generalization in the ALFRED task. In contrast to previous literature where CLIP replaces the visual encoder, we suggest using CLIP as an additional module through an auxiliary object detection objective. We validate our method on the recently proposed Episodic Transformer architecture and demonstrate that incorporating CLIP improves task performance on the unseen validation set. Additionally, our analysis results support that CLIP especially helps with leveraging object descriptions, detecting small objects, and interpreting rare words."
    authors={{
      "Jimin Sun": [],
      "Ye Won Byun": [],
      "Shahriar Noroozizadeh": [],
      "Rosanna M Vitiello": [],
      "Cathy L Jiao": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/20.pdf"
  />,
  <Paper
    title="Housekeep: Tidying Virtual Households using Commonsense Reasoning"
    abstract="We introduce Housekeep, a benchmark to evaluate commonsense reasoning in the home for embodied AI. In Housekeep, an embodied agent must tidy a house by rearranging misplaced objects without explicit instructions specifying which objects need to be rearranged. Instead, the agent must learn from and is evaluated against human preferences of which objects belong where in a tidy house. Specifically, we collect a dataset of where humans typically place objects in tidy and untidy houses constituting 1799 objects, 268 object categories, 585 placements, and 105 rooms. Next, we propose a modular baseline approach for Housekeep that integrates planning, exploration, and navigation. It leverages a fine-tuned large language model (LLM) trained on an internet text corpus for effective planning. We show that our baseline agent generalizes to rearranging unseen objects in unknown environments."
    authors={{
      "Yash Mukund": [],
      "Arun Ramachandran": [],
      "Sriram Yenamandra": [],
      "Igor Gilitschenski": [],
      "Dhruv Batra": [],
      "Andrew Szot": [],
      "Harsh Agrawal": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/21.pdf"
  />,
  <Paper
    title="Learning Value Functions from Undirected State-only Experience"
    abstract="This paper tackles the problem of learning value functions from undirected state-only experience (state transitions without action labels i.e. (s,s',r) tuples). We first theoretically characterize the applicability of Q-learning in this setting. We show that tabular Q-learning in discrete Markov decision processes (MDPs) learns the same value function under any arbitrary refinement of the action space. This theoretical result motivates the design of Latent Action Q-learning or LAQ, an offline RL method that can learn effective value functions from state-only experience. Latent Action Q-learning (LAQ) learns value functions using Q-learning on discrete latent actions obtained through a latent-variable future prediction model. We show that LAQ can recover value functions that have high correlation with value functions learned using ground truth actions. Value functions learned using LAQ lead to sample efficient acquisition of goal-directed behavior, can be used with domain-specific low-level controllers, and facilitate transfer across embodiments. Our experiments in 5 environments ranging from 2D grid world to 3D visual navigation in realistic environments demonstrate the benefits of LAQ over simpler alternatives, imitation learning oracles, and competing methods."
    authors={{
      "Matthew Chang": [],
      "Arjun Gupta": [],
      "Saurabh Gupta": [],
    }}
    affiliations={[]}
    pdf="/papers/2022/16.pdf"
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
    {
      challenge: challengePageMap["TEACh"],
      key: "teach",
      task: "Vision-and-Dialogue Interaction",
      interactiveActions: "✓",
      simulationPlatform: "AI2-THOR",
      sceneDataset: "iTHOR",
      observations: "RGB",
      actionSpace: "Discrete, Text Generation",
      stochasticAcuation: "",
    },
  ];

  // useEffect(() => {
  //   setPaperOrder(prevOrder => shuffle(prevOrder));
  // }, []);

  // using 4:59 since PST is 5 hours behind AoE.
  const paperDeadline = moment.tz("2022-05-17 04:59", "America/Los_Angeles");
  const currentTime = moment();
  const duration = moment.duration(paperDeadline.diff(currentTime));

  const hoursLeft = Math.ceil(duration.asHours() % 24);
  const daysLeft = Math.floor(duration.asDays());

  return (
    <PageWrapper
      headerGradient="radial-gradient(#090617, #090617)"
      headerStyle={css`
        color: ${color.dark.gold10} !important;
        button {
          &:hover {
            color: ${color.dark.gold9} !important;
          }
        }
      `}
      imageContent={{
        css: css`
          width: 130%;
          background-repeat: no-repeat;
          padding-top: 70.25%;
          margin-top: -25px;
          margin-left: -15%;
          margin-bottom: -15px;
          background-image: url("/images/cvpr2022/cover.jpg");
          background-size: cover;
          background-position: center;
        `,
      }}
      conference="CVPR 2022"
      rightSide={
        <Challenges
          conference="CVPR 2022"
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
          The Embodied AI 2022 workshop will be held in conjunction with CVPR
          2022. It will feature a host of invited talks covering a variety of
          topics in Embodied AI, many exciting challenges, a poster session, and
          panel discussions.
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
                <a href={"/images/cvpr2022/map-location.jpg"} target="_blank">
                  Room 224, New Orleans Ernest M. Morial Conventinon Center
                </a>{" "}
                <br />
                June 19, 2022
                <br />
                9:00 AM - 5:30 PM CT <br />
                <span
                  css={css`
                    color: ${color.gray7};
                  `}
                >
                  Tentative Schedule:
                </span>
                <div
                  css={css`
                    margin-left: 0px;
                    margin-top: 20px;
                  `}
                >
                  <Timeline>
                    <Timeline.Item>
                      Workshop Introduction
                      <br />
                      <Time time="9:00 AM CT" />
                    </Timeline.Item>

                    <Timeline.Item>
                      Navigation & Understanding Challenge Presentations
                      <br />
                      (MultiON, SoundSpaces, RxR-Habitat, RVSU)
                      <br />
                      <Time time="9:10 AM CT" />
                    </Timeline.Item>
                    <Timeline.Item>
                      Navigation & Understanding Challenge Q&A Panel
                      <br />
                      (MultiON, SoundSpaces, RxR-Habitat, RVSU)
                      <br />
                      <Time time="10:00 AM CT" />
                      <InlineSlack />
                    </Timeline.Item>

                    <Timeline.Item>
                      Invited Talk
                      <Speaker
                        organizations={["Google AI"]}
                        name="Carolina Parada"
                        fixedImg={data.carolina.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Time time="10:30 AM CT" />
                      <InlineSlack />
                    </Timeline.Item>
                    <Timeline.Item>
                      Invited Talk
                      <Speaker
                        organizations={["Allen Institute for AI"]}
                        name="Roozbeh Mottaghi"
                        fixedImg={data.roozbeh.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Time time="11:00 AM CT" />
                      <InlineSlack />
                    </Timeline.Item>
                    <Timeline.Item>
                      Invited Talk
                      <Speaker
                        organizations={["GaTech", "FAIR"]}
                        name="Dhruv Batra"
                        fixedImg={data.dhruv.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Time time="11:30 AM CT" />
                      <InlineSlack />
                    </Timeline.Item>

                    <Timeline.Item>
                      Accepted Papers Poster Session
                      <br />
                      <Time time="12:00 PM CT" />
                    </Timeline.Item>

                    <Timeline.Item>
                      Invited Talk
                      <Speaker
                        organizations={["Carnegie Mellon"]}
                        name="Katerina Fragkiadaki"
                        fixedImg={data.katerina.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Time time="1:30 PM CT" />
                      <InlineSlack />
                    </Timeline.Item>
                    <Timeline.Item>
                      Invited Talk
                      <Speaker
                        organizations={["Stanford"]}
                        name="Fei-Fei Li"
                        fixedImg={data.feifei.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Time time="2:00 PM CT" />
                      <InlineSlack />
                    </Timeline.Item>
                    <Timeline.Item>
                      Invited Talk
                      <Speaker
                        organizations={["Berkeley"]}
                        name="Jitendra Malik"
                        fixedImg={data.jitendra.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Time time="2:30 PM CT" />
                      <InlineSlack />
                    </Timeline.Item>

                    <Timeline.Item>
                      Interaction Challenge Presentations
                      <br />
                      AI2-Rearrangement, ALFRED, TEACh
                      <br />
                      <Time time="3:00 PM CT" />
                    </Timeline.Item>
                    <Timeline.Item>
                      Interaction Challenge Q&A Panel
                      <br />
                      <Time time="4:00 PM CT" />
                      <InlineSlack />
                    </Timeline.Item>

                    <Timeline.Item>
                      Invited Speaker Panel
                      <br />
                      <Time time="4:30 PM CT" />
                      <InlineSlack />
                    </Timeline.Item>

                    <Timeline.Item>
                      Workshop Concludes
                      <br />
                      <Time time="5:30 PM CT" />
                    </Timeline.Item>
                  </Timeline>
                </div>
              </>
            }
          ></Step>
          <Step
            title="Challenge Submission Deadlines"
            description="May 2022. Check each challenge for the specific date."
          />
          <Step
            title="Paper Submission Deadline"
            description="May 16, 2022 (Anywhere on Earth)"
          />
          <Step title="Workshop Announced" description="Feb 14, 2022" />
        </Steps>
      </Section>
      <Section title="Challenges">
        <p>
          The Embodied AI 2022 workshop is hosting many exciting challenges
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
          scroll={{ x: "1500px" }}
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
              // fixed: "left",
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
              width: 180,
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
              width: 170,
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
              // width: 225,
            },
            {
              title: (
                <div
                  css={css`
                    text-align: center;
                  `}
                >
                  <Emoji emoji="joystick" size={18} /> Action Space
                </div>
              ),
              key: "actionSpace",
              dataIndex: "actionSpace",
              sorter: (a, b) => a.actionSpace.localeCompare(b.actionSpace),
              sortDirections: ["ascend", "descend"],
              width: 165,
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
          Accepted papers will be presented as posters or spotlight talks at the
          workshop. These papers will be made publicly available in a
          non-archival format, allowing future submission to archival journals
          or conferences. Paper submissions do not have to be anononymized. Per{" "}
          <a
            href="https://docs.google.com/document/d/1JWVoTitdS5UhktYNI2KyRP8JdDplawr_Zwm6R0ymQwI"
            target="_blank"
          >
            CVPR rules
          </a>{" "}
          regarding workshop papers, at least one author must register for CVPR
          using an in-person registration.
        </p>
        <SubSection title="Submission">
          <p>
            The submission deadline is May 16th (
            <a href="//time.is/Anywhere_on_Earth">Anywhere on Earth</a>). Papers
            should be no longer than 2 pages (excluding references) and styled
            in the{" "}
            <a href="//cvpr2022.thecvf.com/author-guidelines" target="_blank">
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
        The Embodied AI 2022 workshop is a joint effort by a large set of
        researchers from a variety of organizations. They are listed below in
        alphabetical order.
        <SubSection title="Organizing Committee">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2022.organizers
              .filter((organizer: any) => organizer.oc === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Challenge Organizers">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2022.organizers
              .filter((organizer: any) => organizer.challenge === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Scientific Advisory Board">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2022.organizers
              .filter((organizer: any) => organizer.sab === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
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

  fragment FaceThumbnail on File {
    childImageSharp {
      fixed(width: 100, height: 100) {
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
          cvpr2022 {
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
    jitendra: file(relativePath: { eq: "cvpr2022/jitendra.jpg" }) {
      ...FaceThumbnail
    }
    roozbeh: file(relativePath: { eq: "cvpr2022/roozbeh.jpg" }) {
      ...FaceThumbnail
    }
    dhruv: file(relativePath: { eq: "cvpr2022/dhruv.jpg" }) {
      ...FaceThumbnail
    }
    katerina: file(relativePath: { eq: "cvpr2022/katerina.jpg" }) {
      ...FaceThumbnail
    }
    feifei: file(relativePath: { eq: "cvpr2022/fei-fei.jpg" }) {
      ...FaceThumbnail
    }
    carolina: file(relativePath: { eq: "cvpr2022/carolina.jpg" }) {
      ...FaceThumbnail
    }

    # organizer pictures
    devendraOrg: file(relativePath: { eq: "organizers/devendra.jpg" }) {
      ...FluidImage
    }
    claudiaOrg: file(relativePath: { eq: "organizers/claudia.jpg" }) {
      ...FluidImage
    }
    anthonyOrg: file(relativePath: { eq: "organizers/anthony.jpg" }) {
      ...FluidImage
    }
    chengshuOrg: file(relativePath: { eq: "organizers/chengshu.jpg" }) {
      ...FluidImage
    }
    oleksandrOrg: file(relativePath: { eq: "organizers/oleksandr.jpg" }) {
      ...FluidImage
    }
    mikeOrg: file(relativePath: { eq: "organizers/mike.jpg" }) {
      ...FluidImage
    }
    andrewSOrg: file(relativePath: { eq: "organizers/andrewS.jpg" }) {
      ...FluidImage
    }
    lucaOrg: file(relativePath: { eq: "organizers/luca.jpg" }) {
      ...FluidImage
    }
    mattOrg: file(relativePath: { eq: "organizers/matt.jpg" }) {
      ...FluidImage
    }
    soreanOrg: file(relativePath: { eq: "organizers/sorean.jpg" }) {
      ...FluidImage
    }
    germanOrg: file(relativePath: { eq: "organizers/german.jpg" }) {
      ...FluidImage
    }
    joanneOrg: file(relativePath: { eq: "organizers/joanne.jpg" }) {
      ...FluidImage
    }
    joseMOrg: file(relativePath: { eq: "organizers/joseM.jpg" }) {
      ...FluidImage
    }
    soniaOrg: file(relativePath: { eq: "organizers/sonia.jpg" }) {
      ...FluidImage
    }
    aliOrg: file(relativePath: { eq: "organizers/ali.jpg" }) {
      ...FluidImage
    }
    joseAOrg: file(relativePath: { eq: "organizers/joseA.jpg" }) {
      ...FluidImage
    }
    aniOrg: file(relativePath: { eq: "organizers/ani.jpg" }) {
      ...FluidImage
    }
    feifeiOrg: file(relativePath: { eq: "organizers/feifei.jpg" }) {
      ...FluidImage
    }
    antonioOrg: file(relativePath: { eq: "organizers/antonio.jpg" }) {
      ...FluidImage
    }
    robertoOrg: file(relativePath: { eq: "organizers/roberto.jpg" }) {
      ...FluidImage
    }
    deviOrg: file(relativePath: { eq: "organizers/devi.jpg" }) {
      ...FluidImage
    }
    silvioOrg: file(relativePath: { eq: "organizers/silvio.jpg" }) {
      ...FluidImage
    }
    manolisOrg: file(relativePath: { eq: "organizers/manolis.jpg" }) {
      ...FluidImage
    }
    jieOrg: file(relativePath: { eq: "organizers/jie.jpg" }) {
      ...FluidImage
    }
    alexanderOrg: file(relativePath: { eq: "organizers/alexander.jpg" }) {
      ...FluidImage
    }
    feiOrg: file(relativePath: { eq: "organizers/fei.jpg" }) {
      ...FluidImage
    }
    karmeshOrg: file(relativePath: { eq: "organizers/karmesh.jpg" }) {
      ...FluidImage
    }
    aaronOrg: file(relativePath: { eq: "organizers/aaron.jpg" }) {
      ...FluidImage
    }
    rishabhOrg: file(relativePath: { eq: "organizers/rishabh.jpg" }) {
      ...FluidImage
    }
    ramOrg: file(relativePath: { eq: "organizers/ram.jpg" }) {
      ...FluidImage
    }
    santhoshOrg: file(relativePath: { eq: "organizers/santhosh.jpg" }) {
      ...FluidImage
    }
    erikOrg: file(relativePath: { eq: "organizers/erik.jpg" }) {
      ...FluidImage
    }
    ericUOrg: file(relativePath: { eq: "organizers/ericU.jpg" }) {
      ...FluidImage
    }
    alexanderCOrg: file(relativePath: { eq: "organizers/alexanderC.jpg" }) {
      ...FluidImage
    }
    dhruvOrg: file(relativePath: { eq: "organizers/dhruv.jpg" }) {
      ...FluidImage
    }
    unnatOrg: file(relativePath: { eq: "organizers/unnat.jpg" }) {
      ...FluidImage
    }
    ericOrg: file(relativePath: { eq: "organizers/eric.jpg" }) {
      ...FluidImage
    }
    roozbehOrg: file(relativePath: { eq: "organizers/roozbeh.jpg" }) {
      ...FluidImage
    }
    mohitOrg: file(relativePath: { eq: "organizers/mohit.png" }) {
      ...FluidImage
    }
    ishikaOrg: file(relativePath: { eq: "organizers/ishika.jpg" }) {
      ...FluidImage
    }
    anthonyLOrg: file(relativePath: { eq: "organizers/anthonyL.jpg" }) {
      ...FluidImage
    }
    tiffanyOrg: file(relativePath: { eq: "organizers/tiffany.jpg" }) {
      ...FluidImage
    }
    yonatanOrg: file(relativePath: { eq: "organizers/yonatan.jpg" }) {
      ...FluidImage
    }
    jesseOrg: file(relativePath: { eq: "organizers/jesse.jpg" }) {
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
    peterOrg: file(relativePath: { eq: "organizers/peter.jpg" }) {
      ...FluidImage
    }
    changanOrg: file(relativePath: { eq: "organizers/changan.jpg" }) {
      ...FluidImage
    }
    sagnikOrg: file(relativePath: { eq: "organizers/sagnik.jpg" }) {
      ...FluidImage
    }
    kristenOrg: file(relativePath: { eq: "organizers/kristen.jpg" }) {
      ...FluidImage
    }
    chuangOrg: file(relativePath: { eq: "organizers/chuang.jpg" }) {
      ...FluidImage
    }
    joshOrg: file(relativePath: { eq: "organizers/josh.jpg" }) {
      ...FluidImage
    }
    benOrg: file(relativePath: { eq: "organizers/ben.jpg" }) {
      ...FluidImage
    }
    angelOrg: file(relativePath: { eq: "organizers/angel.jpg" }) {
      ...FluidImage
    }
    soniaROrg: file(relativePath: { eq: "organizers/soniaR.jpg" }) {
      ...FluidImage
    }
    tommasoOrg: file(relativePath: { eq: "organizers/tommaso.jpg" }) {
      ...FluidImage
    }
    davidOrg: file(relativePath: { eq: "organizers/david.jpg" }) {
      ...FluidImage
    }
    nikoOrg: file(relativePath: { eq: "organizers/niko.jpg" }) {
      ...FluidImage
    }
  }
`;
