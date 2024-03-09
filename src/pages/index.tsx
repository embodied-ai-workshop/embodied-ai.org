// import React, { useState, useEffect } from "react";
import * as React from "react";

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

import SlackLogo from "../../static/icons/slack.svg";

const { Step } = Steps;

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
  ARNOLD: (
    <a href="https://sites.google.com/view/arnoldchallenge/" target="_blank">
      ARNOLD
    </a>
  ),
  ManiSkill: (
    <a href="https://sapien.ucsd.edu/challenges/maniskill" target="_blank">
      ManiSkill
    </a>
  ),
  MultiOn: (
    <a href="http://multion-challenge.cs.sfu.ca" target="_blank">
      MultiON
    </a>
  ),
};

function EmailSubscription(props: {
  actionIdentifier: string;
  entryNumber: number;
}) {
  const [submitted, setSubmitted] = React.useState(false),
    [emailFocused, setEmailFocused] = React.useState(false),
    [inputEmail, setInputEmail] = React.useState("");

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

function PaperButton(props: { text: string; url: string;  }) {
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

function Abstract(props: {
  text: string;
}) {
  const [showFullText, setShowFullText] = React.useState(false);

  let text;
  if (props.text.indexOf(" ", 250) === -1) {
    text = <div>{props.text}</div>;
  } else {
    text = (
      <div>
        {showFullText
          ? props.text + " "
          : (props.text.indexOf(". ") + 2 > 250 ? props.text.slice(0, props.text.indexOf(". ") + 2) : props.text.slice(0, 250) + "... ")}
        <span
          css={css`
            color: ${color.light.blue6};
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => setShowFullText(prev => !prev)}
        >
          [{!showFullText ? "Expand" : "Collapse"}]
        </span>
      </div>
    );
  }

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
          min-height: 25px;
        }
      `}
    >
      {text}
    </div>
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
  const [showFullAbstract, setShowFullAbstract] = React.useState(false);

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
        <PaperButton text="PDF"  url={props.pdf} />
        {props.poster ? (
          <PaperButton
            text="Poster"
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
    title="Boosting Outdoor Vision-and-Language Navigation with On-the-route Objects"
    abstract="Outdoor Vision-and-Language Navigation (VLN) is a challenging task that requires an agent to navigate using real-world urban environment data and natural language instructions. Current outdoor VLN models tend to overlook crucial navigation roles, such as objects that serve as landmarks for accurate turn and stop locations. This occurs because they primarily focus on panoramas and instructions, while disregarding objects that provide essential information for accurate decisions, such as identifying correct turn and stop locations, which humans naturally use as landmarks in unfamiliar places. In this paper, we propose the Object-Attention VLN (OAVLN) model, inspired by human navigation, which focuses on relevant on-the-route objects. Our model outperforms previous methods across all evaluation metrics on two benchmark datasets, Touchdown and map2seq."
    authors={{
      "Yanjun Sun": [],
      "Yue Qiu": [],
      "Yoshimitsu Aoki": [],
      "Hirokatsu Kataoka": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/1.pdf"
  />,
  <Paper
    title="Generalizing Skill Embeddings Across Body Shapes for Physically Simulated Characters"
    abstract="Recent progress in physics-based character animation has enabled learning diverse skills from large motion capture datasets. However, most often only a single character shape is considered. On the other hand, work on controlling various body shapes with one policy is limited to few motions. In this paper, we first evaluate the generalization capabilities of latent skill embeddings on physicsbased character control for varying body shapes. We then propose two strategies to learn a single policy that can generalize across different body shapes. In our experiments, we show that these simple but effective strategies significantly improve the performance over state-of-the-art, without having to retrain the skill embeddings from scratch."
    authors={{
      "Sammy Christen": [],
      "Nina Schmid": [],
      "Otmar Hilliges": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/2.pdf"
  />,
  <Paper
    title="Question Generation to Disambiguate Referring Expressions in 3D Environment"
    abstract="Our paper presents a novel task and method for question generation, aimed to disambiguate referring expressions within 3D indoor environments (3D-REQ). Referring to objects using natural language is a fundamental aspect of human communication, and an essential capability for robots in various applications such as room organization. However, human instructions can sometimes be ambiguous, which poses challenges to existing research on visual grounding in 3D environments that assumes referring expressions can uniquely identify objects. To address this issue, we introduce a method inspired by human communication, where ambiguities are resolved by asking questions. Our approach predicts the positions of candidate objects that satisfy given referring expressions in a 3D environment and generates appropriate questions to narrow down the target objects. To facilitate this, we have constructed a new dataset (3D-REQ), containing input referring expressions with ambiguities and point clouds and output bounding boxes of candidate objects and questions to eliminate ambiguities. To our knowledge, 3D-REQ is the first effort to tackle the challenge of ambiguous referring expressions in 3D object grounding."
    authors={{
      "Fumiya Matsuzawa": [],
      "Ryo Nakamura": [],
      "Kodai Nakashima": [],
      "Yue Qiu": [],
      "Hirokatsu Kataoka": [],
      "Yutaka Satoh": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/3.pdf"
  />,
  <Paper
    title="Audio Visual Language Maps for Robot Navigation"
    abstract="While interacting in the world is a multi-sensory experience, many robots continue to predominantly rely on visual perception to map and navigate in their environments. We propose AVLMaps, a 3D spatial map representation that stores cross-modal information from audio, visual, and language cues. AVLMaps fuse features from pre-trained multimodal foundation models into a centralized voxel grid. This enables robots to index goals in the map based on multimodal queries, such as textual descriptions, images, or audio snippets of landmarks. AVLMaps allow for zero-shot multimodal goal navigation and perform better than alternatives in ambiguous scenarios. These capabilities extend to mobile robots in the real world."
    authors={{
      "Chenguang Huang": [],
      "Oier Mees": [],
      "Andy Zeng": [],
      "Wolfram Burgard": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/4.pdf"
  />,
  <Paper
    title="Fully Automated Task Management for Generation, Execution, and Evaluation: A Framework for Fetch-and-Carry Tasks with Natural Language Instructions in Continuous Space"
    abstract="This paper aims to develop a framework that enables a robot to execute tasks based on visual information, in response to natural language instructions for Fetch-and-Carry with Object Grounding (FCOG) tasks. Although there have been many frameworks, they usually rely on manually given instruction sentences. Therefore, evaluations have only been conducted with fixed tasks. Furthermore, many multimodal language understanding models for the benchmarks only consider discrete actions. To address the limitations, we propose a framework for the full automation of the generation, execution, and evaluation of FCOG tasks. In addition, we introduce an approach to solving the FCOG tasks by dividing them into four distinct subtasks."
    authors={{
      "Motonari Kambara": [],
      "Komei Sugiura": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/6.pdf"
  />,
  <Paper
    title="LLM-Planner: Few-Shot Grounded Planning for Embodied Agents with Large Language Models"
    abstract="In this work, we propose a novel method, LLM-Planner, that harnesses the power of large language models to do few-shot planning for embodied agents. We further propose a simple but effective way to enhance LLMs with physical grounding to generate and update plans that are grounded in the current environment. Experiments on the ALFRED dataset show that our method can achieve very competitive few-shot performance: Despite using less than 0.5% of paired training data, LLM-Planner achieves competitive performance with recent baselines that are trained using the full training data. Existing methods can barely complete any task successfully under the same few-shot setting. Our work opens the door for developing versatile and sample-efficient embodied agents that can quickly learn many tasks. "
    authors={{
      "Chan Hee Song": [],
      "Jiaman Wu": [],
      "Clayton B Washington": [],
      "Brian M. Sadler": [],
      "Wei-Lun Chao": [],
      "Yu Su": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/7.pdf"
  />,
  <Paper
    title="Emergence of Implicit System Identification via Embodiment Randomization"
    abstract="We show that embodiment randomization can produce visual navigation agents that are able to generalize to new embodiments in a zero-shot manner. Our embodiment randomization technique is simple and can easily be scaled for agents trained in simulation. Specifically, in training, we randomize various agent embodiment parameters such as height, radius, camera field-of-view, etc. Using the image-goal navigation task, we empirically find that single embodiment policies catastrophically fail to generalize to new embodiments, while embodiment randomized agents maintain strong performance. Through deeper analysis, we discover embodiment randomization produces agents that implicitly perform system identification."
    authors={{
      "Pranav Putta": [],
      "Gunjan Aggarwal": [],
      "Roozbeh Mottaghi": [],
      "Dhruv Batra": [],
      "Naoki Harrison Yokoyama": [],
      "Joanne Truong": [],
      "Arjun Majumdar": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/8.pdf"
  />,
  <Paper
    title="Predicting Motion Plans for Articulating Everyday Objects"
    abstract="Mobile manipulation tasks such as opening a door, pulling open a drawer, or lifting a toilet lid require constrained motion of the end-effector under environmental and task constraints. This, coupled with partial information in novel environments, makes it challenging to employ classical motion planning approaches at test time. Our key insight is to cast it as a learning problem to leverage past experience of solving similar planning problems to directly predict motion plans for mobile manipulation tasks in novel situations at test time. To enable this, we develop a simulator, ArtObjSim, that simulates articulated objects placed in real scenes. We then introduce SeqIK+, a fast and flexible representation for motion plans. Finally, we learn models that use SeqIK+ to quickly predict motion plans for articulating novel objects at test time. Experimental evaluation shows improved speed and accuracy at generating motion plans than pure search-based methods and pure learning methods."
    authors={{
      "Arjun Gupta": [],
      "Max Shepherd": [],
      "Saurabh Gupta": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/9.pdf"
  />,
  <Paper
    title="SalsaBot: Towards a Robust and Generalizable Embodied Agent"
    abstract="As embodied agents become more powerful, there arises a need for an agent to collaboratively solve tasks with humans. This paper introduces SalsaBot, an embodied agent designed for the Alexa Arena benchmark, which is a collaborative human-robot interaction benchmark. The primary aim of SalsaBot is to assist users in completing a game within a virtual environment by providing a consistent user-centric experience, which requires the agent to be capable of handling various types of user interactions. To ensure a great user experience, SalsaBot is equipped with robust macros, an explicit object memory, and a state-aware dialogue generation module. Our efforts and findings demonstrate that our SalsaBot is a robust interactive agent that can effectively collaborate with users."
    authors={{
      "Chan Hee Song": [],
      "Jiaman Wu": [],
      "Ju-Seung Byun": [],
      "Zexin Xu": [],
      "Vardaan Pahuja": [],
      "Goonmeet Bajaj": [],
      "Samuel Stevens": [],
      "Ziru Chen": [],
      "Yu Su": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/10.pdf"
  />,
  <Paper
    title="Exploiting Proximity-Aware Tasks for Embodied Social Navigation"
    abstract="Learning how to navigate among humans in an occluded and spatially constrained indoor environment, is a key ability required to embodied agent to be integrated into our society. In this paper, we propose an end-to-end architecture that exploits Proximity-Aware Tasks (referred as to Risk and Proximity Compass) to inject into a reinforcement learning navigation policy the ability to infer common-sense social behaviors. To this end, our tasks exploit the notion of immediate and future dangers of collision. We validate our approach on Gibson4+ and Habitat-Matterport3D datasets."
    authors={{
      "Enrico Cancelli": [],
      "Tommaso Campari": [],
      "Luciano Serafini": [],
      "Angel X Chang": [],
      "Lamberto Ballan": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/11.pdf"
  />,
  <Paper
    title="A Hypothetical Framework of Embodied Generalist Agent with Foundation Model Assistance"
    abstract="Recent significant advancements in computer vision (CV) and natural language processing (NLP) have showcased the vital importance of leveraging prior knowledge obtained from extensive data for a generalist agent. However, there are limited explorations in utilizing internet-scale data to train embodied generalist agents. In this work, we propose a hypothetical framework that integrates the prior knowledge from foundation models into each component of the actor-critic algorithms for the generalist agents."
    authors={{
      "Weirui Ye": [],
      "Yunsheng Zhang": [],
      "Xianfan Gu": [],
      "Yang Gao": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/12.pdf"
  />,
  <Paper
    title="Situated Real-time Interaction with a Virtually Embodied Avatar"
    abstract="Recent advances in large language model fine-tuning datasets and techniques have made them flourish as general dialogue-based assistants that are well-suited to strictly turn-based interactions. However, maintaining consistency in long-range, multi-turn dialogues remains a challenge with many applications restricting conversations to a short window. Current multi-modal vision-based interactions are also limited to turn-based interactions on a static sequence of tokenized images with VQA-style referential querying. In this work, we present an approach to performing real-time, vision-based dynamic interaction with an auto-regressive language model. Our approach enables long-range consistency through continual visual grounding of language model inputs. Grounding makes use of a winnowing mechanism to reduce a raw stream of pixels hierarchically, to a series of discrete events as conditioning variables for the language model. We present a novel dataset and benchmark for situated, visual interaction in the form of exercise coaching, and show that our approach can generate relevant and useful responses grounded in a real-time camera stream."
    authors={{
      "Sunny Panchal": [],
      "Guillaume Berger": [],
      "Antoine Mercier": [],
      "Cornelius Böhm": [],
      "Florian Dietrichkeit": [],
      "Xuanlin Li": [],
      "Reza Pourreza": [],
      "Pulkit Madan": [],
      "Apratim Bhattacharyya": [],
      "Mingu Lee": [],
      "Mark Todorovich": [],
      "Ingo Bax": [],
      "Roland Memisevic": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/13.pdf"
  />,
  <Paper
    title="When Learning Is Out of Reach, Reset: Generalization in Autonomous Visuomotor Reinforcement Learning"
    abstract="Episodic training, where an agent's environment is reset to some initial condition after every success or failure, is the de facto standard when training embodied reinforcement learning (RL) agents. The underlying assumption that the environment can be easily reset is limiting both practically, as resets generally require human effort in the real world and can be computationally expensive in simulation, and philosophically, as we'd expect intelligent agents to be able to continuously learn without external intervention. Work in learning without any resets, i.e. Reset-Free RL (RF-RL), is very promising but is plagued by the problem of irreversible transitions (e.g. an object breaking or falling out of reach) which halt learning. Moreover, the limited state diversity and instrument setup encountered during RF-RL means that works studying RF-RL largely do not require their models to generalize to new environments. In this work, we instead look to minimize, rather than completely eliminate, resets while building visual agents that can meaningfully generalize. As studying generalization has previously not been a focus of benchmarks designed for RF-RL, we propose a new Stretch Pick-and-Place (Stretch-P&P) benchmark designed for evaluating generalizations across goals, cosmetic variations, and structural changes. Moreover, towards building performant reset-minimizing RL agents, we propose unsupervised metrics to detect irreversible transitions and a single-policy training mechanism to enable generalization. Our proposed approach significantly outperforms prior episodic, reset-free, and reset-minimizing approaches achieving higher success rates with fewer resets in Stretch-P&P and another popular RF-RL benchmark. Finally, we find that our proposed approach can dramatically reduce the number of resets required for training other embodied tasks, in particular for RoboTHOR ObjectNav we obtain higher success rates than episodic approaches using 99.97% fewer resets."
    authors={{
      "Zichen Zhang": [],
      "Luca Weihs": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/14.pdf"
  />,
  <Paper
    title="SegmATRon: Embodied Adaptive Semantic Segmentation for Indoor Environment"
    abstract="This paper presents an adaptive transformer model named SegmATRon for embodied image semantic segmentation. Its distinctive feature is the adaptation of model weights during inference on several images using a hybrid multicomponent loss function. We studied this model on datasets collected in the photorealistic Habitat Simulator. We showed that obtaining additional images using the agent's actions in an indoor environment can improve the quality of semantic segmentation."
    authors={{
      "Tatiana Zemskova": [],
      "Margarita Kichik": [],
      "Dmitry Yudin": [],
      "Aleksandr Panov": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/16.pdf"
  />,
  <Paper
    title="Dynamic-Resolution Model Learning for Object Pile Manipulation"
    abstract="Dynamics models learned from visual observations have shown to be effective in various robotic manipulation tasks. One of the key questions for learning such dynamics models is what scene representation to use. Prior works typically assume representation at a fixed dimension or resolution, which may be inefficient for simple tasks and ineffective for more complicated tasks. In this work, we investigate how to learn dynamic and adaptive representations at different levels of abstraction to achieve the optimal trade-off between efficiency and effectiveness. Specifically, we construct dynamic-resolution particle representations of the environment and learn a unified dynamics model using graph neural networks (GNNs) that allows continuous selection of the abstraction level. During test time, the agent can adaptively determine the optimal resolution at each model-predictive control (MPC) step. We evaluate our method in object pile manipulation, a task we commonly encounter in cooking, agriculture, manufacturing, and pharmaceutical applications. Through comprehensive evaluations both in the simulation and the real world, we show that our method achieves significantly better performance than state-of-the-art fixed-resolution baselines at the gathering, sorting, and redistribution of granular object piles made with various instances like coffee beans, almonds, corn, etc."
    authors={{
      "Yixuan Wang": [],
      "Yunzhu Li": [],
      "Katherine Rose Driggs-Campbell": [],
      "Li Fei-Fei": [],
      "Jiajun Wu": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/17.pdf"
  />,
  <Paper
    title="Reduce, Reuse, Recycle: Modular Multi-Object Navigation"
    abstract="Our work focuses on the Multi-Object Navigation (MultiON) task, where an agent needs to navigate to multiple objects in a given sequence. We systematically investigate the inherent modularity of this task by dividing our approach to contain four modules: (a) an object detection module trained to identify objects from RGB images, (b) a map building module to build a semantic map of the observed objects, (c) an exploration module enabling the agent to explore its surroundings, and finally (d) a navigation module to move to identified target objects. We focus on the navigation and the exploration modules in this work. We show that we can effectively leverage a PointGoal navigation model in the MultiON task instead of learning to navigate from scratch. Our experiments show that a PointGoal agent-based navigation module outperforms analytical path planning on the MultiON task. We also compare exploration strategies and surprisingly find that a random exploration strategy significantly outperforms more advanced exploration methods. We additionally create MultiON 2.0, a new large-scale dataset as a test-bed for our approach."
    authors={{
      "Sonia Raychaudhuri": [],
      "Tommaso Campari": [],
      "Unnat Jain": [],
      "Manolis Savva": [],
      "Angel X Chang": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/18.pdf"
  />,
  <Paper
    title="Unordered Navigation to Multiple Semantic Targets in Novel Environments"
    abstract="We consider the problem of unordered navigation to multiple objects in a novel environment. We define a multi-object navigation task which requires understanding of contextual semantic priors and reasoning over an optimal ordering of semantic targets, challenges missing from other multi-object task definitions and required by important motivating robotic scenarios. We develop a target-driven navigation objective trading off exploration and exploitation. To enable exploration, we explicitly predict unseen semantic regions and estimate uncertainty over those predictions, enabling us to solve the multi-object navigation problem by constructing a long horizon planning objective over an uncertain map. We demonstrate results for unordered navigation in the visually realistic environments of the Matterport3D dataset in the Habitat simulator. We find that our method leverages semantic relationships between objects in planning to allow exploitation of object co-occurrence."
    authors={{
      "Bernadette Bucher": [],
      "Katrina Ashton": [],
      "Bo Wu": [],
      "Karl Schmeckpeper": [],
      "Siddharth Goel": [],
      "Nikolai Matni": [],
      "Georgios Georgakis": [],
      "Kostas Daniilidis": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/19.pdf"
  />,
  <Paper
    title="EnvironAI: Extending AI Research into the Whole Environment"
    abstract="This paper introduces Environment with AI (EnvironAI) as a complementary perspective to Embodied AI research. EnvironAI emphasizes the reciprocal relationship between AI, humans, and other elements, highlighting their dynamic co-construction within the environment. By integrating AI processing and human understanding, EnvironAI offers a comprehensive view that considers both individual elements and the entire system. A case study is presented to illustrate the practical application of EnvironAI, showcasing how the fusion of AI and human experience enhances our understanding of the big-picture metaphor. Overall, EnvironAI holds promise in deepening our insights into AI-human-environment interactions and fostering harmonious coexistence in the future."
    authors={{
      "Jingyi Duan": [],
      "Song Tong": [],
      "Hongyi Shi": [],
      "Honghong Bai": [],
      "Xuefeng Liang": [],
      "Kaiping Peng": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/20.pdf"
  />,
  <Paper
    title="Look Ma, No Hands! Agent-Environment Factorization of Egocentric Videos"
    abstract="The analysis and use of egocentric videos for robotic tasks is made challenging by occlusion due to the hand and the visual mismatch between the human hand and a robot end-effector. In this sense, the human hand presents a nuisance. However, often hands also provide a valuable signal, e.g. the hand pose may suggest what kind of object is being held. In this work, we propose to extract a factored representation of the scene that separates the agent (human hand) and the environment. This alleviates both occlusion and mismatch while preserving the signal, thereby easing the design of models for downstream robotics tasks. At the heart of this factorization is our proposed Video Inpainting via Diffusion Model (VIDM) that leverages both a prior on real-world images (through a large-scale pre-trained diffusion model) and the appearance of the object in earlier frames of the video (through attention). Our experiments demonstrate the effectiveness of VIDM at improving inpainting quality on egocentric videos and the power of our factored representation for numerous tasks: from object detection to learning of reward functions, policies, and affordances from videos."
    authors={{
      "Matthew Chang": [],
      "Aditya Prakash": [],
      "Saurabh Gupta": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/21.pdf"
  />,
  <Paper
    title="Curriculum Learning via Task Selection for Embodied Navigation"
    abstract="In this work, we study the use of ACL for training long-horizon embodied AI tasks with sparse rewards using RL. We focus on ACL methods which generate their curriculum via \emph{task selection}, \ie methods which select training tasks for the agent from a predefined dataset of existing tasks of varying complexity. We present a simple approach, \textsc{ONACL}, which samples the next training task so that the predicted probability of the agent's success on task is near some threshold value.  Using \textsc{ONACL} we present an empirical study of ACL on the ObjectGoal Navigation (\textsc{ObjectNav}) task in the ProcTHOR and HM3D home environments. We find with a simple curriculum learning approach like \textsc{ONACL}, the agent achieves a significant improvement in performance and sample efficiency. Surprisingly, however, we find that the commonly held belief that sparse reward training in HM3D obtains near 0\% success is largely incorrect: if we simply add a sufficiently large number of `easy' episodes during policy training then (evaluation set) performance dramatically improves. We hypothesize this happens due to the emergence of an implicit curriculum during training and present an analysis supporting the claim. This suggests that, in some cases, curriculum learning approaches may simply be correcting for needlessly difficult training datasets."
    authors={{
      "Ram Ramrakhya": [],
      "Dhruv Batra": [],
      "Aniruddha Kembhavi": [],
      "Luca Weihs": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/22.pdf"
  />,
  <Paper
    title="DialMAT: Dialogue-Enabled Transformer with Moment-Based Adversarial Training"
    abstract="This paper focuses on the DialFRED task, which is the task of embodied instruction following in a setting where an agent can actively ask questions about the task. To address this task, we propose DialMAT. DialMAT introduces Moment-based Adversarial Training, which incorporates adversarial perturbations into the latent space of language, image, and action. Additionally, it introduces a crossmodal parallel feature extraction mechanism that applies foundation models to both language and image. We evaluated our model using a dataset constructed from the DialFRED dataset and demonstrated superior performance compared to the baseline method in terms of success rate and path weighted success rate. The model secured the top position in the DialFRED Challenge, which took place at the CVPR 2023 Embodied AI workshop."
    authors={{
      "Kanta Kaneda": [],
      "Ryosuke Korekata": [],
      "Yuiga Wada": [],
      "Shunya Nagashima": [],
      "Motonari Kambara": [],
      "Yui Iioka": [],
      "Haruka Matsuo": [],
      "Yuto Imai": [],
      "Takayuki Nishimura": [],
      "Komei Sugiura": [],
    }}
    affiliations={[]}
    pdf="/papers/2023/23.pdf"
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
          Questions can be asked{" "}
          <b>anonymously</b>.
        </div>
      </div>
    </a>
  );
}




// And finally, we add all the content into their respective sections.
export default function Home({ data }) {
    const [windowWidth, setWindowWidth] = React.useState(getWindowWidth());
  
    React.useEffect(() => {
      const resizeWindow = () => setWindowWidth(getWindowWidth());
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    });
  
    const challengeData = [
      {
        challenge: challengePageMap["MultiOn"],
        key: "multion",
        task: "Multi-Object Navigation",
        interactiveActions: "",
        simulationPlatform: "Habitat",
        sceneDataset: "HM3D Semantics",
        actionSpace: "Discrete",
        observations: "RGB-D, Localization",
        stochasticAcuation: "",
        winner: "",
      },
      {
        challenge: challengePageMap["ManiSkill"],
        key: "maniskill",
        task: "Generalized Manipulation",
        interactiveActions: "✓",
        simulationPlatform: "SAPIEN",
        sceneDataset: "PartNet-Mobility, YCB, EGAD",
        observations: "RGB-D, Metadata",
        actionSpace: "Continuous",
        stochasticAcuation: "",
        winner: "",
      },
      {
        challenge: challengePageMap["ARNOLD"],
        key: "arnold",
        task: "Language-Grounded Manipulation",
        interactiveActions: "✓",
        simulationPlatform: "Isaac Sim",
        sceneDataset: "Arnold Dataset",
        observations: "RGB-D, Proprioception",
        actionSpace: "Continuous",
        stochasticAcuation: "✓",
        winner: "TBD",
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
        // headerGradient="radial-gradient(#090617, #090617)"
        headerGradient="linear-gradient(0deg, #1f2f3f, #100b0f)"
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
            background-image: url("/images/cvpr2024/cover-small.png");
            background-size: cover;
            background-position: center;
          `,
        }}
        conference="CVPR 2024"
        rightSide={
          <Challenges
            conference="CVPR 2024"
            challengeData={Object.values(challengePageMap)}
          />
        }
      >
      <Section title="Overview">
        <p>
          Minds live in bodies, and bodies move through a changing world.
          The goal of embodied artificial intelligence is to create agents,
          such as robots, which learn to creatively solve challenging tasks
          requiring interaction with the environment.

          While this is a tall order, fantastic advances in deep learning and the
          increasing availability of large datasets like ImageNet have enabled
          superhuman performance on a variety of AI tasks previously thought
          intractable. Computer vision, speech recognition and natural language
          processing have experienced transformative revolutions at passive
          input-output tasks like language translation and image processing,
          and reinforcement learning has similarly achieved world-class
          performance at interactive tasks like games.

          These advances have supercharged embodied AI, enabling a growing
          collection of researchers to make rapid progress towards intelligent
          agents which can:         
        </p>
        <ul>
          <li>
            <b>
              See
            </b>
            : perceive their environment through vision or other senses.
          </li>
          <li>
            <b>
              Talk
            </b>
            : hold a natural language dialog grounded in their environment.
          </li>
          <li>
            <b>
              Listen
            </b>
            : understand and react to audio input anywhere in a scene.
          </li>
          <li>
            <b>
              Act
            </b>
            : navigate and interact with their environment to accomplish goals.
          </li>
          <li>
            <b>
              Reason
            </b>
            : consider and plan for the long-term consequences of their actions.
          </li>
        </ul>
        <p>
          The goal of the Embodied AI workshop is to bring together researchers
          from computer vision, language, graphics, and robotics to share
          and discuss the latest advances in embodied intelligent agents.
          
          The overarching theme of this year's workshop is <b>Open World Embodied AI: </b> 
          Being an embodied agent in a world that contains objects and concepts
          unseen during training. This theme applies the “open set” problem of
           many individual tasks to embodied AI as a whole. We feel that truly
           effective embodied AI agents should be able to deal with tasks, 
           objects, and situations markedly different from those that they 
           have been trained on. 
           
           This umbrella theme is divided into three topics:
           <ul>
            <li>
              <b>Embodied Mobile Manipulation</b> We go places to do things, and to do things we have to go places.
              Many interesting embodied tasks combine manipulation and navigation
              to solve problems that cannot be done with either manipulation or
              navigation alone. This builds on embodied navigation and 
              manipulation topics from previous years and makes them more 
              challenging.
            </li>
            <li>
              <b>Generative AI for Embodied AI</b>  Generative AI isn't just a hot topic, it's an important tool
              researchers are using to support embodied artificial intelligence 
              research. Topics such as generative AI for simulation, generative 
              AI for data generation, and generative AI for policies (e.g., 
              diffusion policies and world models) are of great interest.
            </li>
            <li>
              <b>Language Model Planning</b> When we go somewhere to do something we do it for a purpose. 
              Language model planning uses large language models (LLMs), 
              vision-language models (VLMs), and multimodal foundation 
              models to turn arbitrary language commands into plans and 
              sequences for action - a key feature needed to make embodied 
              artificial intelligence systems useful for performing the 
              tasks in open worlds.
            </li>
           </ul>

          The Embodied AI 2024 workshop will be held in conjunction with
          {" "}<a href="https://cvpr.thecvf.com/Conferences/2024">CVPR 2024</a>{" "}
          in Seattle, Washington. It will feature a host of invited
          talks covering a variety of topics in Embodied AI, many exciting 
          Embodied AI challenges, a poster session, and panel discussions.
          For more information on the Embodied AI Workshop series, see our 
          {" "}<a href="https://arxiv.org/abs/2210.06849">Retrospectives</a>{" "}
          paper on the first three years of the workshop.
        </p>
        <EmailSubscription
          actionIdentifier="1FAIpQLSeIZrn-tk7Oain2R8gc_Q0HzLMLQ9XXwqu3KecK_E5kALpiug"
          entryNumber={1834823104}
        />
        </Section>
        <Section title="Timeline">
      <Steps progressDot current={4} direction="vertical">
          <Step title="Workshop Announced" description="March 15, 2024" />
          <Step
            title="Paper Submission Deadline"
            description="April 15th, 2024 (Anywhere on Earth)"
          />
          <Step
            title="Challenge Submission Deadlines"
            description="May 2024. Check each challenge for the specific date."
          />
          <Step
            title="Fifth Annual Embodied AI Workshop at CVPR"
            description={
              <>
                <a href={"https://cvpr.thecvf.com/Conferences/2024"} target="_blank">
                  Seattle Convention Center
                </a>{" "}
                <br />
                Monday, June 18, 2023
                <br />
                8:50 AM - 6:00 PM PT<br />
                TBD <br />
                <span
                  css={css`
                    color: ${color.gray7};
                  `}
                >
                </span>
              </>
            }
          ></Step>
          <Step
            title="Challenge Winners Announced"
            description="June 18, 2024 at the workshop. Check each challenge for specifics."
          />
               </Steps>
      </Section>
      <Section title="Workshop Schedule">
        
        Embodied AI will be a <b>hybrid</b> workshop, with both in-person talks and streaming via zoom.
        <ul>
          <li><b>Workshop Talks: 9:00AM-5:30PM PT - TBD</b></li>
          <li><b>Poster Session: 1:00PM-2:00PM PT - TBD</b></li>
        </ul>
        Zoom information is available on <a href="https://cvpr.thecvf.com/Conferences/2024">the CVPR virtual platform for registered attendees</a>.
        <br />
        Remote and in-person attendees are welcome to as questions via Slack:  
        <br />

                      <InlineSlack />
                      <br />
                <div
                  css={css`
                    margin-left: 0px;
                    margin-top: 20px;
                  `}
                >
                  <Timeline>
                    <Timeline.Item>
                      <b>Workshop Introduction: Embodied AI</b>
                      <br />
                      TBD
                      <br />
                      <Time time="8:50 - 9:00 AM PT" />
                      <Speaker
                         organizations={["Logical Robotics"]}
                         name="Moderator - Anthony Francis"
                         fixedImg={data.anthony.childImageSharp.fixed}
                         noMargin={true}
                      />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Navigation & Social Challenge Presentations</b>
                      <br />
                      (MultiOn, HAZARD, PRS Challenge)
                      <br />
                      <Time time="9:10 - 10:00 AM PT" />
                      <ul>
                        <li>9:00: MultiOn</li>
                        <li>9:10: HAZARD</li>
                        <li>9:20: PRS Challenge</li>
                      </ul>
                    </Timeline.Item>
                    <Timeline.Item>
                      <b>Navigation & Social Challenge Q&A Panel</b>
                      <br/>
                      <Time time="9:30 - 10:00 AM PT" />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Generative AI for Embodied AI: </b>
                      <br />
                      <i>TBD</i>
                      <br />
                      <Time time="10:00 - 10:30 AM PT" />
                      <Speaker
                        organizations={["AI2"]}
                        name="Aniruddha Kembhavi"
                        // fixedImg={data.saurabh.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>TBD</p>
                      <Abstract
                        text="TBD"
                        />                      
                    </Timeline.Item>

                    <Timeline.Item>
                    <b>Invited Talk - Generative AI for Embodied AI: </b>
                      <br />
                      <i>TBD</i>
                      <br />
                      <Time time="10:30 - 11:00 AM PT" />
                      <Speaker
                        organizations={["TBD"]}
                        name="TBD"
                        // fixedImg={data.fei.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>TBD.</p>                     
                      <Abstract
                        text="TBD"
                        />                      
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Language Model Planning: </b>
                      <br />
                      <i>TBD</i>
                      <br />
                      <Time time="11:00 - 11:30 AM PT" />
                      <Speaker
                        organizations={["Google"]}
                        name="Brian Ichter"
                        // fixedImg={data.ruslan.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>TBD.</p>
                      <Abstract
                        text="TBD"
                        />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Sponsor Talk - Project Aria: </b>
                      <br />
                      <i>TBD</i>
                      <br />
                      <Time time="11:30 AM - 12:00 NOON PT" />
                      <Speaker
                        organizations={["Google"]}
                        name="Brian Ichter"
                        // fixedImg={data.ruslan.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>TBD.</p>
                      <Abstract
                        text="TBD"
                        />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Lunch</b>
                      <br />
                      TBD
                      <br />
                      <Time time="12:00 NOON - 1:00 PM PT" />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Accepted Papers Poster Session</b>
                      <br />
                      TBD
                      <br />
                      <Time time="1:00 PM - 2:00 PM PT" />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Mobile Manipulation Challenge Presentations</b>
                      <br />
                      ManiSkill, ARNOLD, HomeRobot OVMM
                      <br />
                      <Time time="2:30 - 3:00 PM PT" />
                      <ul>
                        <li>2:00: ManiSkill</li>
                        <li>2:10: ARNOLD</li>
                        <li>2:20: HomeRobot OVMM</li>
                      </ul>
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Mobile Manipulation Challenge Q&A Panel</b>
                      <br />
                      <Time time="3:00 - 3:30 PM PT" />
                    </Timeline.Item>
                    
                    <Timeline.Item>
                      <b>Invited Talk - Embodied Mobile Manipulation: </b>
                      <br />
                      <i>TBD</i>
                      <br />
                      TBD
                      <br />
                      <Time time="3:30 - 4:00 PM PT" />
                      <Speaker
                        organizations={["TBD"]}
                        name="Shuran Song"
                        // fixedImg={data.jeannette.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Abstract
                        text="TBD."
                        />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Embodied Mobile Manipulation: </b>
                      <br />
                      <i>TBD</i>
                      <br />
                      <Time time="4:00 - 4:30 PM PT" />
                      <Speaker
                        organizations={["Meta AI"]}
                        name="Chris Paxton"
                        //fixedImg={data.chris.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>TBD.</p>
                      <Abstract
                        text="TBD."
                        />                      
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Humanoid Robots</b>
                      <br />
                      <i>TBD</i>
                      <br />
                      <Time time="4:30 - 5:00 PM PT" />
                      <Speaker
                        organizations={["TBD"]}
                        name="Eric Jang"
                        // fixedImg={data.kristen.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>TBD</p>
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Speaker Panel</b>
                      <br />
                      <Time time="5:00 - 5:30 PM PT" />
                      <br />
                      <Speaker
                         organizations={["NVIDIA"]}
                         name="Claudia Perez D'Arpino"
                         fixedImg={data.claudia.childImageSharp.fixed}
                         noMargin={true}
                      />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Workshop Concludes</b>
                      <br />
                      <Time time="5:30 PM PT" />
                    </Timeline.Item>
                  </Timeline>
                </div>
      </Section>
      <Section title="Demos">
        <p>
          In association with the Embodied AI Workshop, our partners and sponsors
          will present demos, date and times TBD.
        </p>
        <br />
      </Section>
      <Section title="Challenges">
        <p>
          The Embodied AI 2024 workshop is hosting many exciting challenges
          covering a wide range of topics such as rearrangement, visual
          navigation, vision-and-language, and audio-visual navigation. More
          details regarding data, submission instructions, and timelines can be
          found on the individual challenge websites.
        </p>
        <p>
          The workshop organizers will award each first-prize challenge winner
          a cash prize, sponsored by Logical Robotics and our other sponsors.
        </p>
        <p>
          Challenge winners may be given the opportunity to present during their
          challenge's presentation at the
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
                  Challenge
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
                  Task
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
                  2023 Winner
                </>
              ),
              dataIndex: "winner",
              key: "winner",
              sorter: (a, b) => a.task.localeCompare(b.winner),
              sortDirections: ["ascend", "descend"],
            },
            {
              title: (
                <>
                  Simulation Platform
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
                  Scene Dataset
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
                  Observations
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
                <div
                  css={css`
                    text-align: center;
                  `}
                >
                  Action Space
                </div>
              ),
              key: "actionSpace",
              dataIndex: "actionSpace",
              sorter: (a, b) => a.actionSpace.localeCompare(b.actionSpace),
              sortDirections: ["ascend", "descend"],
              width: 165,
            },
            {
              title: (
                <>
                  Interactive Actions?
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
                  Stochastic Acuation?
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
          ]}
          dataSource={challengeData}
          pagination={false}
        />
        {/* <SubSection title="Challenge Results">Hello, world.</SubSection> */}
      </Section>
      <Section title="Call for Papers">
        <p>
          We invite high-quality 2-page extended abstracts on embodied AI,
          especially in areas relevant to the themes of this year's workshop:
          <ul>
            <li>
              Open-World AI for Embodied AI
            </li>
            <li>
              Generative AI for Embodied AI
            </li>
            <li>
              Embodied Mobile Manipulation
            </li>
            <li>
              Language Model Planning
            </li>
          </ul>
          as well as themes related to embodied AI in general:
          <ul>
            <li>
              Simulation
              Environments
            </li>
            <li>
              Visual Navigation
            </li>
            <li>
              Rearrangement
            </li>
            <li>
              Embodied Question Answering
            </li>
            <li>
              Embodied Vision &amp; Language
            </li>
          </ul>
          Accepted papers will be presented as posters or spotlight talks at the
          workshop. These papers will be made publicly available in a
          non-archival format, allowing future submission to archival journals
          or conferences. Paper submissions do not have to be anononymized. Per{" "}
          <a
            href="https://cvpr.thecvf.com/Conferences/2024/AuthorGuidelines"
            target="_blank"
          >
            CVPR rules
          </a>{" "}
          regarding workshop papers, at least one author must register for CVPR
          using an in-person registration.
        </p>
        <SubSection title="Submission">
          <p>
            The submission deadline is April 15th (
            <a href="//time.is/Anywhere_on_Earth">Anywhere on Earth</a>). Papers
            should be no longer than 2 pages (excluding references) and styled
            in the{" "}
            <a href="https://cvpr2023.thecvf.com/Conferences/2023/AuthorGuidelines" target="_blank">
              CVPR format
            </a>.
            <uL>
              <li>
              Paper submissions have now CLOSED.
              {/* The <a href="https://openreview.net/group?id=thecvf.com/CVPR/2023/Workshop/EAI">paper submission link is LIVE.</a> */}
              </li>
            </uL>
            
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
      <Section title="Sponsors">
        <p>The Embodied AI 2024 Workshop is sponsored by the following organizations:</p>
        <p>
          <center>
            <a href="https://logicalrobotics.com/">
              <img src="/images/sponsors/logical-robotics.png" width="400" alt="Logical Robotics"/>
            </a>
          </center>
        </p>
        </Section>
      <Section title="Organizers">
        The Embodied AI 2024 workshop is a joint effort by a large set of
        researchers from a variety of organizations. They are listed below in
        alphabetical order.
        <SubSection title="Organizing Committee">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2023.organizers
              .filter((organizer: any) => organizer.oc === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Challenge Organizers">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2023.organizers
              .filter((organizer: any) => organizer.challenge === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Scientific Advisory Board">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2023.organizers
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
          cvpr2023 {
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

    anthony: file(relativePath: { eq: "organizers/anthony.jpg" }) {
      ...FaceThumbnail
    }
    jeannette: file(relativePath: { eq: "cvpr2023/jeannette.png" }) {
      ...FaceThumbnail
    }
    dieter: file(relativePath: { eq: "cvpr2023/dieter.jpg" }) {
      ...FaceThumbnail
    }
    ruslan: file(relativePath: { eq: "cvpr2023/ruslan.jpg" }) {
      ...FaceThumbnail
    }
    kristen: file(relativePath: { eq: "cvpr2023/kristen.jpg" }) {
      ...FaceThumbnail
    }
    saurabh: file(relativePath: { eq: "cvpr2023/saurabh.png" }) {
      ...FaceThumbnail
    }
    embodi: file(relativePath: { eq: "cvpr2023/embodi.png" }) {
      ...FaceThumbnail
    }
    claudia: file(relativePath: { eq: "organizers/claudia.jpg" }) {
      ...FaceThumbnail
    }
    fei: file(relativePath: { eq: "organizers/fei.jpg" }) {
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
    naokiOrg: file(relativePath: { eq: "organizers/naoki.jpg" }) {
      ...FluidImage
    }
    chrisOrg: file(relativePath: { eq: "organizers/chris.jpg" }) {
      ...FluidImage
    }
    davidHOrg: file(relativePath: { eq: "organizers/davidH.jpg" }) {
      ...FluidImage
    }
    devonOrg: file(relativePath: { eq: "organizers/devon.jpg" }) {
      ...FluidImage
    }
    lambertoOrg: file(relativePath: { eq: "organizers/lamberto.jpg" }) {
      ...FluidImage
    }
    xiaofengOrg: file(relativePath: { eq: "organizers/xiaofeng.jpg" }) {
      ...FluidImage
    }
    govindOrg: file(relativePath: { eq: "organizers/govind.jpg" }) {
      ...FluidImage
    }
    ruohanOrg: file(relativePath: { eq: "organizers/ruohan.jpg" }) {
      ...FluidImage
    }
    stoneOrg: file(relativePath: { eq: "organizers/stone.jpg" }) {
      ...FluidImage
    }
    fanboOrg: file(relativePath: { eq: "organizers/fanbo.png" }) {
      ...FluidImage
    }
    jiayuanOrg: file(relativePath: { eq: "organizers/jiayuan.png" }) {
      ...FluidImage
    }
    rinOrg: file(relativePath: { eq: "organizers/rin.jpg" }) {
      ...FluidImage
    }

    # Other pictures
    metaDemo: file(relativePath: { eq: "cvpr2023/meta-demo.png" }) {
      ...FluidImage
    }
    workshopLocation: file(relativePath: { eq: "cvpr2023/workshop-location.jpg" }) {
      ...FluidImage
    }
  }
`;
