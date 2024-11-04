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
  HAZARD: (
    <a href="https://vis-www.cs.umass.edu/hazard/" target="_blank">
      HAZARD
    </a>
  ),
  HomeRobotOVMM: (
    <a href="https://ovmm.github.io/" target="_blank">
      HomeRobot OVMM
    </a>
  ),
  ManiSkillViTac: (
    <a href="https://ai-workshops.github.io/maniskill-vitac-challenge-2024/" target="_blank">
      ManiSkill-ViTac
    </a>
  ),
  MultiOn: (
    <a href="http://multion-challenge.cs.sfu.ca" target="_blank">
      MultiON
    </a>
  ),
  PRS: (
    <a href="https://prsorg.github.io/" target="_blank">
      PRS
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
    title="NavProg: Compositional Embodied Visual Navigation Without Training"
    abstract="Large Language Models (LLMs) are revolutionizing AI, demonstrating excellent reasoning capabilities in composing modules to perform complex image-based tasks. In this article, we propose an approach that extends the concept of program composition through LLMs for images, aiming to integrate them into embodied agents. Specifically, by employing a PointGoal Navigation model as a foundational primitive for guiding an agent through the world, we illustrate how a single model can address diverse tasks without additional training. We delegate primitive composition to an LLM, with only a few in-context examples given alongside the prompt. We evaluate our approach on three popular Embodied AI tasks: ObjectGoal Navigation, Instance-Image Goal Navigation, and Embodied Question Answering, demonstrating competitive results without any specific fine-tuning and establishing efficacy in a zero-shot context."
    authors={{
    "Filippo Ziliotto":[],
    "Tommaso Campari":[],
    "Luciano Serafini":[],
    "Lamberto Ballan":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/1_NavProg_Compositional_Embodi.pdf"
   />,
  <Paper
    title="STEVE Series: Step-by-Step Construction of Agent Systems in Minecraft"
    abstract="Building an embodied agent system with a large language model (LLM) as its core is a promising direction. Due to the significant costs and uncontrollable factors associated with deploying and training such agents in the real world, we have decided to begin our exploration within the Minecraft environment. Our STEVE Series agents can complete basic tasks in a virtual environment and more challenging tasks such as navigation and even creative tasks, with an efficiency far exceeding previous state-of-the-art methods by a factor of 2.5×to 7.3×. We begin our exploration with a vanilla large language model, augmenting it with a vision encoder and an action codebase trained on our collected high-quality dataset STEVE-21K. Subsequently, we enhanced it with a Critic and memory to transform it into a complex system. Finally, we constructed a hierarchical multi-agent system. Our recent work explored how to prune the agent system through knowledge distillation. In the future, we will explore more potential applications of STEVE agents in the real world. The code, data, and models are available at https://rese1f.github.io/STEVE/. "
    authors={{
      "Zhonghan Zhao":[],
      "Wenhao Chai":[],
      "Xuan Wang":[],
      "Ke Ma":[],
      "Shengyu Hao":[],
      "Meiqi Sun":[],
      "Boyi Li":[],
      "Kewei Chen":[],
      "Dongxu Guo":[],
      "Yinfei Ma":[],
      "Yao Chaohua":[],
      "Tian Ye":[],
      "Yanting Zhang":[],
      "Hongwei Wang":[],
      "Gaoang Wang":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/2_STEVE_Series_Step_by_Step_Co.pdf"
   />,
  <Paper
    title="RoboEXP: Action-Conditioned Scene Graph via Interactive Exploration for Robotic Manipulation"
    abstract="In this work, we investigate the interactive scene exploration task, where the goal is to efficiently identify all objects, including those that are directly observable and those that can only be discovered through interaction between the robot and the environment. Towards this goal, we present a novel scene representation called action-conditioned 3D scene graph (ACSG). Unlike conventional 3D scene graphs that focus on encoding static relations, ACSG encodes both spatial relationships and logical associations indicative of action effects (e.g., opening a fridge will reveal an apple inside). We then show that interactive scene exploration can be formulated as a problem of action-conditioned 3D scene graph construction and traversal."
    authors={{
    "Hanxiao Jiang":[],
    "Binghao Huang":[],
    "Ruihai Wu":[],
    "Zhuoran Li":[],
    "Shubham Garg":[],
    "Hooshang Nayyeri":[],
    "Shenlong Wang":[],
    "Yunzhu Li":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/3_RoboEXP_Action_Conditioned_S.pdf"
   />,
  <Paper
    title="EXTRACT: Efficient Policy Learning by Extracting Transferrable Robot Skills"
    abstract="Reinforcement learning (RL) agents equipped with useful, temporally extended skills can learn new tasks more easily. Prior work in skill-based RL either requires expert supervision to define useful skills or creates nonsemantically aligned skills from offline data through heuristics, which is difficult for a downstream RL agent to use for learning new tasks. Instead, our approach, EXTRACT, utilizes pretrained vision models to extract a discrete set of semantically meaningful skills from offline data, each of which is parameterized by continuous arguments, without human supervision. This skill parameterization allows robots to learn new tasks more quickly by only needing to learn when to select a specific skill and how to modify its arguments for the specific task. We demonstrate through experiments in sparse-reward, image-based, robot manipulation environments, both in simulation and in the real world, that EXTRACT can more quickly learn new tasks than prior skill-based RL, with up to a 10× gain in sample efficiency."
    authors={{
    "Jesse Zhang":[],
    "Minho Heo":[],
    "Zuxin Liu":[],
    "Erdem Biyik":[],
    "Joseph J Lim":[],
    "Yao Liu":[],
    "Rasool Fakoor":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/4_EXTRACT_Efficient_Policy_Lea.pdf"
   />,
  <Paper
    title="Adaptive Mobile Manipulation for Articulated Objects In the Open World"
    abstract="Deploying robots in open-ended unstructured environments such as homes has been a long-standing research problem. However, robots are often studied only in closed-off lab settings, and prior mobile manipulation work is restricted to pick-move-place, which is arguably just the tip of the iceberg in this area. In this paper, we introduce Open-World Mobile Manipulation System, a full-stack approach to tackle realistic articulated object operation, e.g. real-world doors, cabinets, drawers, and refrigerators in open-ended unstructured environments. The robot utilizes an adaptive learning framework to initially learns from a small set of data through behavior cloning, followed by learning from online practice on novel objects that fall outside the training distribution. We also develop a low-cost mobile manipulation hardware platform capable of safe and autonomous online adaptation in unstructured environments with a cost of around 25, 000 USD. In our experiments we utilize 20 articulate objects across 4 build-ings in the CMU campus. With less than an hour of online learning for each object, the system is able to increase success rate from 50% of BC pre-training to 95% using online adaptation. Video results at https://open-world-mobilemanip.github.io/."
    authors={{
    "Haoyu Xiong":[],
    "Russell Mendonca":[],
    "Kenneth Shaw":[],
    "Deepak Pathak":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/5_Adaptive_Mobile_Manipulation.pdf"
   />,
  <Paper
    title="Mind the Error! Detection and Localization of Instruction Errors in Vision-and-Language Navigation"
    abstract="In Vision-and-Language Navigation in Continuous Environments (VLN-CE), agents have to navigate towards a target goal by executing a set of low-level actions, following a series of natural language instructions. All VLN-CE methods in the literature assume that language instructions are exact. However, in practice, instructions given by humans can contain errors. For the first time, we propose a novel benchmark dataset that introduces various types of instruction errors considering potential human causes, providing valuable insight into the robustness of VLN-CE agents. Moreover, we formally define the task of Instruction Error Detection and Localization, and propose a method that achieves best performances compared to baselines. Project page at https://intelligolabs.github.io/R2RIE-CE"
    authors={{
    "Francesco Taioli":[],
    "Stefano Rosa":[],
    "Alberto Castellini":[],
    "Lorenzo Natale":[],
    "Alessio Del Bue":[],
    "Alessandro Farinelli":[],
    "Marco Cristani":[],
    "Yiming Wang":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/6_Mind_the_Error_Detection_and.pdf"
   />,
  <Paper
    title="LIT: Large Language Model Driven Intention Tracking for Proactive Human-Robot Collaboration - A Robot Sous-Chef Application"
    abstract="Large Language Models (LLM) and Vision Language Models (VLM) enable robots to ground natural language prompts into control actions to achieve tasks in an open world. However, when applied to a long-horizon collaborative task, this formulation results in excessive prompting for initiating or clarifying robot actions at every task step. We propose Language-driven Intention Tracking (LIT), leveraging LLMs and VLMs to model the human user’s long-term behavior and to predict the next human intention to guide the robot for proactive collaboration. We demonstrate smooth coordination between a LIT-based collaborative robot and a human in collaborative cooking tasks."
    authors={{
    "Zhe Huang":[],
    "John Pohovey":[],
    "Ananya Yammanuru":[],
    "Katherine Driggs-Campbell":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/7_LIT_Large_Language_Model_Dri.pdf"
   />,
  <Paper
    title="Following the Human Thread in Social Navigation"
    abstract="The paper proposes a Social Dynamics Adaptation model (SDA) for Social Navigation, which involves a robot’s ability to navigate human-centric environments while maintaining a safe distance and adhering to social norms. The key challenge is to process human trajectories, which are partially observable from the robot’s perspective and complex to compute. The proposed SDA model uses a two-stage Reinforcement Learning framework: the first stage involves learning to encode human trajectories and the second stage infers social dynamics from the robot’s state-action history. This approach has been tested on the Habitat 3.0 platform, achieving state-of-the-art performance in finding and following humans. The extended version of this work is available at: https://arxiv.org/abs/2404.11327."
    authors={{
    "Luca Scofano":[],
    "Alessio Sampieri":[],
    "Tommaso Campari":[],
    "Valentino Sacco":[],
    "Indro Spinelli":[],
    "Lamberto Ballan":[],
    "Fabio Galasso":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/8_Following_the_Human_Thread_i.pdf"
   />,
  <Paper
    title="3D Semantic MapNet: Building Maps for Multi-Object Re-Identification in 3D"
    abstract="We study the task of 3D multi-object re-identification from embodied tours. Specifically, an agent is given two tours of an environment (e.g. an apartment) under two different layouts (e.g. arrangements of furniture). Its task is to detect and re-identify objects in 3D – e.g. a ‘sofa’ moved from location A to B, a new ‘chair’ in the second layout at location C, or a ‘lamp’ from location D in the first layout missing in the second. To support this task, we create an automated infrastructure to generate paired egocentric tours of initial/modified layouts in the Habitat simulator using Matterport3D scenes, YCB and Google-scanned objects. We present 3D Semantic MapNet (3D-SMNet) – a two-stage re-identification model consisting of (1) a 3D object detector that operates on RGB-D videos with known pose, and (2) a differentiable object matching module that solves correspondence estimation between two sets of 3D bounding boxes. Overall, 3D-SMNet builds object-based maps of each layout and then uses a differentiable matcher to re-identify objects across the tours. After training 3D-SMNet on our generated episodes, we demonstrate zero-shot transfer to real-world rearrangement scenarios by instantiating our task in Replica, and RIO environments depicting rearrangements. On all datasets, we find 3D-SMNet outperforms competitive baselines. Further, we show jointly training on real and generated episodes can lead to significant improvements over training on real data alone."
    authors={{
    "Vincent Cartillier":[],
    "Neha Jain":[],
    "Irfan Essa":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/9_3D_Semantic_MapNet_Building_.pdf"
   />,
  <Paper
    title="UniDoorManip: Learning Universal Door Manipulation Policy Over Large-scale and Diverse Door Manipulation Environments"
    abstract="Door manipulation holds significant importance due to the frequent need to open or close doors in various scenarios. While previous works have focused primarily on interior doors, we aim to extend doors to a more general setting, e.g., doors in windows, cars, and safes. In the above broad scenarios, the door manipulation task covers doors with diverse types, geometries and manipulation mechanisms, which poses a great challenge to learn a universal door manipulation policy. Due to the limited datasets and unrealistic simulation environments, previous works fail to achieve good performance across various doors. In this work, we build a novel door manipulation environment reflecting different realistic door manipulation mechanisms, and further equip this environment with a large-scale door dataset covering 6 door categories with hundreds of door bodies and handles, making up thousands of different door instances. Additionally, to better emulate real-world scenarios, we introduce a mobile robot as the agent and use the partial and occluded point cloud as the observation, which are not considered in previous works while possessing significance for real-world implementations. We conduct detailed comparisons between our proposed environment and dataset and others. To learn a universal policy over diverse doors, we propose a novel framework disentangling the whole manipulation process into three stages, and integrating them by training in the reversed order of inference. Extensive experiments validate the effectiveness of our designs and demon strate our framework’s strong performance. Code, data and videos are avaible on https://unidoormanip.github.io/."
    authors={{
    "Yu Li":[],
    "Xiaojie Zhang":[],
    "Ruihai Wu":[],
    "Zilong Zhang":[],
    "Yiran Geng":[],
    "Hao Dong":[],
    "Zhaofeng He":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/10_UniDoorManip_Learning_Unive.pdf"
   />,
  <Paper
    title="Feudal Networks for Visual Navigation"
    abstract="We introduce a novel no-RL, no-graph, no-odometry approach to visual navigation using feudal learning. This architecture employs a hierarchy of agents that each see a different aspect of the task and operate at different spatial and temporal scales. We develop two unique modules in this framework: (1) a memory proxy map learned in a self-supervised manner that is used to record prior observations, and (2) a waypoint network that outputs intermediate subgoals by learning to imitate human waypoint selection during local navigation. This waypoint network is pre-trained using a dataset [1] of teleoperation sequences made publicly available in our prior work. The resulting feudal navigation network achieves SOTA performance on the image goal navigation task."
    authors={{
    "Faith M Johnson":[],
    "Bryan Bo Cao":[],
    "Ashwin Ashok":[],
    "Shubham Jain":[],
    "Kristin Dana":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/11_Feudal_Networks_for_Visual_.pdf"
   />,
  <Paper
    title="Opening Cabinets and Drawers in the Real World using a Commodity Mobile Manipulator"
    abstract="Pulling open cabinets and drawers presents many difficult technical challenges in perception (inferring articulation parameters for objects from onboard sensors), planning (producing motion plans that conform to tight task constraints), and control (making and maintaining contact while applying forces on the environment). In this work, we build an end-to-end system that enables a commodity mobile manipulator (Stretch RE2) to pull open cabinets and drawers in diverse previously unseen real world environments. We conduct 4 days of real world testing of this system spanning 31 different objects from across 13 different real world environments. Our system achieves a success rate of 61% on opening novel cabinets and drawers in unseen environments zero-shot. An analysis of the failure modes suggests that errors in perception are the most significant challenge for our system. We will open source code and models for others to replicate and build upon our system."
    authors={{
    "Arjun Gupta":[],
    "Michelle Zhang":[],
    "Rishik Sathua":[],
    "Saurabh Gupta":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/12_Opening_Cabinets_and_Drawer.pdf"
   />,
  <Paper
    title="Selective Visual Representations Improve Convergence and Generalization for Embodied AI"
    abstract="Embodied AI models often employ off the shelf vision backbones like CLIP to encode their visual observations. Although such general purpose representations encode rich syntactic and semantic information about the scene, much of this information is often irrelevant to the task at hand. This introduces noise within the learning process and distracts the agent’s focus from task-relevant visual cues. Inspired by selective attention in humans—the process through which people filter their perception based on their task at hand—we introduce a parameter-efficient approach to filter visual stimuli for embodied AI. Our approach induces a task-conditioned bottleneck using a small learnable codebook module. This codebook is trained jointly to optimize task reward and acts as a task-conditioned selective filter over the visual observation. Our experiments showcase state-of-the-art performance for object goal navigation and object displacement across 5 benchmarks, ProcTHOR, ArchitecTHOR, RoboTHOR, AI2-iTHOR, and ManipulaTHOR. The filtered representations produced by the codebook also generalize better and converge faster when adapted to other simulation environments such as Habitat. Our qualitative analyses show that agents explore their environments more effectively and their representations retain task-relevant information like target object recognition while ignoring superfluous information about other objects. "
    authors={{
    "Ainaz Eftekhar":[],
    "Kuo-Hao Zeng":[],
    "Jiafei Duan":[],
    "Ali Farhadi":[],
    "Aniruddha Kembhavi":[],
    "Ranjay Krishna":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/13_Selective_Visual_Representa.pdf"
   />,
  <Paper
    title="From Observation to Abstractions: Efficient In-Context Learning from Human Feedback and Visual Demonstrations for VLM Agents"
    abstract="We propose an efficient method, In-Context Abstraction Learning (ICAL), to improve in-context VLM agents from sub-optimal demonstrations and human feedback. Specifically, given a noisy demonstration for a task in a new domain, LLMs/VLMs are used to fix inefficient actions and annotate four types of cognitive abstractions. These abstractions are then refined  by executing the trajectory in the environment, guided by natural language feedback from humans. We demonstrate that this method rapidly learns useful experience abstractions. Our ICAL agent improves on the state-of-the-art when tested in dialogue-based instruction following in household environments in TEACh, action anticipation in Ego4D, and in multimodal autonomous web agents in Visual-WebArena. In TEACh, we improve on the state-of-the-art by 12.6% in goal-condition success, outperforming LLM agents that use the raw visual demonstrations as in context examples without abstraction learning. In VisualWebArena, we improve on the state-of-the-art by an absolute 8.4% and relative 58.74% in task success, outperforming VLM agents that use hand-written examples. In Ego4D, we improve 6.4 noun and 1.7 action edit distance over few-shot GPT4V. Lastly, we find that weight fine-tuning and in-context abstraction learning complement each other, with their combination yielding the best performance."
    authors={{
    "Gabriel Herbert Sarch":[],
    "Lawrence Jang":[],
    "Michael J. Tarr":[],
    "William W. Cohen":[],
    "Kenneth Marino":[],
    "Katerina Fragkiadaki":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/14_From_Observation_to_Abstrac.pdf"
   />,
  <Paper
    title="An Intuitive Voice Interface for a UV disinfecting Mobile Manipulator Robot"
    abstract="In the wake of the global health crises caused by the COVID-19 pandemic, there is a pressing need for innovative disinfection methods that are both effective and user-friendly to a broad user base. This paper introduces an approach that allows a user to instruct tasks to a UV disinfection robot via speech. The implementation of a voice interface offers a hands-free operation and caters to non-technical users who require a simple and effective way to command the robot. Through a combination of object recognition, natural language processing using a large language model (LLM), and task planning, our system has the potential to execute tasks more effectively since it is more context-aware of its sanitizing duties."
    authors={{
    "Alan G. Sanchez":[],
    "William Smart":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/15_An_Intuitive_Voice_Interfac.pdf"
   />,
  <Paper
    title="RoboVerse: A Unified Simulation Framework for Scaling Vision-Language Manipulation"
    abstract="The importance of diverse, high-quality datasets is underscored by their role in training foundational models, especially in fields like natural language processing and computer vision. However, scaling up data and models for robotics presents unique challenges due to the confinement of prior models to specific datasets and domains and the limitations inherent in collecting diverse real-world demonstrations. To overcome these limitations, we propose leveraging simulators as an alternative. Simulators can generate vast, diverse datasets and allow for flexible manipulation of various elements, such as observation representations and action formats, thereby offering a scalable and adaptable approach for training robotic models. To this end, we propose RoboVerse benchmark, in which we provide a unified infrastructure for diverse tasks, extensive demonstrations, and different robot embodiments. We also collect a large-scale dataset merging both existing benchmarks and newly designed tasks. Furthermore, our framework exhibits remarkable flexibility, allowing for utilization across different observation modalities, diverse randomization strategies, and scalable data augmentation."
    authors={{
    "Haoran Geng":[],
    "Yuyang Li":[],
    "Jie Yang":[],
    "Feishi Wang":[],
    "Ran Gong":[],
    "Peiyuan Zhi":[],
    "Puhao Li":[],
    "Ruimao Zhang":[],
    "Yixin Zhu":[],
    "Baoxiong Jia":[],
    "Siyuan Huang":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/16_RoboVerse_A_Unified_Simulat.pdf"
   />,
  <Paper
    title="SPIN: Simultanoeous Perception, Interaction and Navigation"
    abstract="While there has been remarkable progress recently in the fields of manipulation and locomotion, embodied mobile manipulation remains a long-standing challenge. Compared to locomotion or static manipulation, a mobile system makes a diverse range of long-horizon tasks feasible in unstructured and dynamic environments. Prior works use disentangled modular skills for mobility and manipulation that are trivially tied together, causing several limitations such as compounding errors, delays in decision-making, and no whole-body coordination. We present a reactive mobile manipulation framework that uses an active visual system to consciously perceive and react to its environment using only ego-vision, without any mapping or planning, similar to how humans leverage whole-body and hand-eye coordination. Videos are available at https://spin-robot.github.io"
    authors={{
    "Shagun Uppal":[],
    "Ananye Agarwal":[],
    "Haoyu Xiong":[],
    "Kenneth Shaw":[],
    "Deepak Pathak":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/17_SPIN_Simultanoeous_Percepti.pdf"
   />,
  <Paper
    title="GenH2R: Learning Generalizable Human-to-Robot Handover via Scalable Simulation, Demonstration, and Imitation"
    abstract="Recently the AI community focuses on empowering robots to collaborate with humans, notably in receiving objects handed over by humans. This human-to-robot (H2R) handover capability enables seamless collaboration in various tasks like cooking and furniture assembly. However, due to unique challenges, scalable learning of H2R handover lags behind human-free robot manipulation. Real-world human interaction training is costly and risky, urging simulation-based pre-training. However, creating sufficient simulated assets for handover tasks is challenging. In addition, scaling up demonstrations inspired by the success of large language model poses additional challenges. It is very costly and unscalable to collect robot demonstrations. In this work, we aim to learn generalizable H2R handover at scale by tackling the above challenges. We present a comprehensive solution that scales up both the assets and demonstrations and effectively learns a closed-loop visuomotor policy through a novel imitation learning algorithm."
    authors={{
    "Zifan Wang":[],
    "Junyu Chen":[],
    "Ziqing Chen":[],
    "Pengwei Xie":[],
    "Rui Chen":[],
    "Li Yi":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/18_GenH2R_Learning_Generalizab.pdf"
   />,
  <Paper
    title="Zero-Shot Vision-and-Language Navigation with Collision Mitigation in Continuous Environment"
    abstract="We explore Zero-Shot Vision-and-Language Navigation in Continuous Environment, where agents navigate using natural language instructions without any training data. Collecting instruction-path annotation data is an expensive task. Additionally, humans can navigate without prior learning about the environment. Equipping an embodied agent with this ability is an important task for creating a general-purpose agent that can perform tasks in a variety of unfamiliar environments. In discrete environments, Vision-and-Language Navigation (VLN) is performed through graph traversal, assuming collision-free movement between nodes. However, in continuous environments, navigation must be done through low-level actions to the destination, considering possible collisions. We propose the zero-shot Vision-and-Language Navigation with Collision Mitigation (VLN-CM), which takes these considerations. VLN-CM is composed of four modules and predicts the direction and distance of the next movement at each step. We utilize large foundation models for each modules. To select the direction, we use the Attention Spot Predictor (ASP), View Selector (VS), and Progress Monitor (PM). The ASP employs a Large Language Model (e.g. ChatGPT) to split navigation instructions into attention spots, which are objects or scenes at the location to move to (e.g. a yellow door). The VS selects from panorama images provided at 30-degree intervals the one that includes the attention spot, using CLIP similarity. We then choose the angle of the selected image as the direction to move in. The PM uses a rule-based approach to decide which attention spot to focus on next, among multiple spots derived from the instructions. If the similarity between the current attention spot and the visual observations decreases consecutively at each step, the PM determines that the agent has passed the current spot and moves on to the next one. For selecting the distance to move, we employed the Open Map Predictor (OMP). The OMP uses panorama depth information to predict an occupancy mask. We then selected a collision-free distance in the predicted direction based on the occupancy mask. We evaluated our method using the validation data of VLN-CE. Our approach showed better performance than several baseline methods, and the OPM was effective in mitigating collisions for the agent."
    authors={{
    "SeongJun Jeong":[],
    "Gi-Cheon Kang":[],
    "Joochan Kim":[],
    "Byoung-Tak Zhang":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/19_Zero_Shot_Vision_and_Langua.pdf"
   />,
  <Paper
    title="From NeRFs to Gaussian Splats, and Back"
    abstract="For robotics applications where there is a limited number of (typically ego-centric) views, parametric representations such as neural radiance fields (NeRFs) generalize better than non-parametric ones such as Gaussian splatting (GS) to views that are very different from those in the training data; GS however can render much faster than NeRFs. We develop a procedure to convert back and forth between the two. Our approach achieves the best of both NeRFs (superior PSNR, SSIM, and LPIPS on dissimilar views, and a compact representation) and GS (real-time rendering and ability for easily modifying the representation); the computational cost of these conversions is minor compared to training the two from scratch."
    authors={{
    "Siming He":[],
    "Zach Osman":[],
    "Pratik Chaudhari":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/20_From_NeRFs_to_Gaussian_Spla.pdf"
   />,
  <Paper
    title="Learning Mobile Manipulation Skills via Autonomous Exploration"
    abstract="To build generalist robots capable of executing a wide array of tasks across diverse environments, robots must be endowed with the ability to engage directly with the real world to acquire and refine skills without extensive instrumentation or human supervision. This work presents a fully autonomous real-world reinforcement learning framework for mobile manipulation that can both independently gather data and refine policies through accumulated experience in the real world. It has several key components: 1) automated data collection strategies by guiding the robot’s exploration toward object interactions, 2) using goal cycles for real world RL such that the robot changes goals once it has made sufficient progress, where the different goals serve as resets for one another, 3) efficient control by leveraging basic task knowledge present in behavior priors in conjunction with policy learning and 4) formulating generic rewards that combine human-interpretable semantic infor- mation with low-level, fine-grained state information. We demonstrate our approach on Boston Dynamics Spot robots in continually improving performance on a set of four challenging mobile manipulation tasks and show that this enables competent policy learning, obtaining an average success rate of 80% across tasks, a 3-4× improvement over existing approaches."
    authors={{
    "Russell Mendonca":[],
    "Deepak Pathak":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/21_Learning_Mobile_Manipulatio.pdf"
   />,
  <Paper
    title="Multimodal Datasets and Benchmarks for Reasoning about Dynamic Spatio-Temporality in Everyday Environment"
    abstract="We used a 3D simulator to create artificial video data with standardized annotations, aiming to aid in the development of Embodied AI. Our question answering (QA) dataset measures the extent to which a robot can understand human behavior and the environment in a home setting. Preliminary experiments suggest our dataset is useful in measuring AI’s comprehension of daily life."
    authors={{
    "Takanori Ugai":[],
    "Kensho Hara":[],
    "Shusaku Egami":[],
    "Ken Fukuda":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/22_Multimodal_Datasets_and_Ben.pdf"
   />,
  <Paper
    title="LEAP HAND V2: Low-cost Anthropomorphic Hybrid Rigid Soft Hand for Robot Learning"
    abstract="The human hand is a marvel of biology, providing both great versatility and precision. They are strong and precise, allowing us to manipulate complex tools and do very fine-grained dexterous motions but they are also soft, safe, and compliant. The combination of incredible strength, a tight kinematic structure with many degrees of freedom, and soft compliance makes them the perfect manipulator. Emulating the capabilities of the human hand through a robot has been a long-standing challenge. Robot hands have fallen into one of two categories: soft or rigid. Soft hands, while compliant and safe lack the precision and strength of human hands. Conversely, while rigid robot hands can match the precision and power of human hands, they can easily break and are not safe to deploy. Our proposed solution is to build a robotic hand, that can bridge the gap between these two categories. It is soft when required and strong enough to apply power. We call this hand LEAP Hand v2, a dexterous, low-cost anthropomorphic soft hand. LEAP Hand v2 features three distinctive elements that allow it to be a hybrid between rigid and soft hands, all the while remaining simple to produce and under $3000. Firstly, it achieves a balance of human-hand-like softness and stiffness, via a 3d printed soft exterior combined with a 3d printed internal bone structure. Moreover, LEAP Hand v2 incorporates two powered articulations in the foldable palm: one spanning the four fingers and another near the thumb—mimicking the essential palm flexibility for human-like grasping. Lastly, LEAP Hand v2 boasts a dexterous Metacarpophalangeal (MCP) kinematic structure, making it highly human-like, easy to assemble, and versatile for various tasks. Through thorough real-world experiments, we show that LEAP Hand v2 exceeds the capabilities of many existing robot hands for grasping, teleoperated control, and imitation learning. We plan to release 3D printer files and assembly instructions by the end of the summer."
    authors={{
    "Kenneth Shaw":[],
    "Deepak Pathak":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/23_LEAP_HAND_V2_Low_cost_Anthr.pdf"
   />,
  <Paper
    title="Language Model Guided Sim-To-Real Transfer"
    abstract="Transferring policies learned in simulation to the real world is a promising strategy for acquiring robot skills at scale. However, sim-to-real approaches typically rely on manual design and tuning of the task reward function as well as the simulation physics parameters, rendering the process slow and human-labor intensive. In this paper, we investigate using Large Language Models (LLMs) to automate and accelerate sim-to-real design. Our LLM-guided sim-to-real approach requires only the physics simulation for the target task and automatically constructs suitable reward functions and domain randomization distributions to support real-world transfer. We first demonstrate our approach can discover sim-to-real configurations that are competitive with existing human-designed ones on quadruped locomotion and dexterous manipulation tasks. Then, we showcase that our approach is capable of solving novel robot tasks, such as quadruped balancing and walking atop a yoga ball, without iterative manual design."
    authors={{
    "Yecheng Jason Ma":[],
    "William Liang":[],
    "Hung-Ju Wang":[],
    "Sam Wang":[],
    "Yuke Zhu":[],
    "Linxi Fan":[],
    "Osbert Bastani":[],
    "Dinesh Jayaraman":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/24_Language_Model_Guided_Sim_T.pdf"
   />,
  <Paper
    title="DKPROMPT: Domain Knowledge Prompting Vision-Language Models"
    abstract="Prompting foundation models such as large language models (LLMs) and vision-language models (VLMs) requires extensive domain knowledge and manual efforts, resulting in the so-called “prompt engineering” problem. One can provide examples explicitly or implicitly, or encourage intermediate reasoning steps to improve the performance of foundation models. However, those methods as applied to LLMs and VLMs still lack the theoretical guarantee and provable correctness. Our idea is to leverage the foundation of classical AI, i.e., knowledge representation and reasoning, to develop a prompting strategy that enables the VLMs to verify the correctness of an agent’s behavior at execution time, in the real world. Given the natural connection between planning symbols and human language, this paper investigates how pre-trained VLMs can assist the robot in realizing symbolic plans generated by classical planners, while avoiding the engineering efforts of checking the outcomes of each action. Specifically, we propose a novel closed-loop task planning and execution framework called DKPROMPT, which prompts VLMs using domain knowledge in PDDL, generating visually grounded, provably correct task plans. DKPROMPT leverages VLMs to detect action failures and verify action affordances towards successful plan execution. We take the advantage of the domain knowledge encoded in classical planners, including the actions defined by their effects and preconditions. By simply querying current observations against the action knowledge, similar to applying VLMs to Visual Question Answering (VQA) tasks, DKPROMPT can trigger the robot to repeat an unsuccessful action recovering from previous failures, or call the symbolic planner to generate a new valid plan. We conducted quantitative evaluations in the OmniGibson simulator, where we reused some tasks from the Behavior-1K benchmark. We provided predefined parameterized actions for DKPROMPT, as well as other baselines, and these actions are imperfect by nature, frequently causing situations. Experimental results demonstrate that DKPROMPT is able to recover from action failures and re-plan when situations occur. As a result, our approach outperforms competitive baselines from the literature, achieving the highest task completion rate."
    authors={{
    "Xiaohan Zhang":[], 
    "Zainab Altaweel":[], 
    "Yohei Hayamizu":[], 
    "Yan Ding":[], 
    "Saeid Amiri":[], 
    "Shiqi Zhang":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/25_DKPROMPT_Domain_Knowledge_P.pdf"
   />,
  <Paper
    title="What do we learn from using text captions as a form of 3D scene representation?"
    abstract="Large language models (LLMs) encode a wealth of semantic knowledge about the world, which could be useful for embodied agents to understand their environment. However, current LLMs are not grounded in the real world and cannot directly perceive it. This work investigates the extent to which representing 3D scenes with text descriptions (scene captions) can bridge this gap; we focus on the Embodied Question Answering (EQA) task, explore different types of scene captioning and evaluate the performance of LLMs on a subset the OpenEQA benchmark episodes. Our findings show that (1) detailed captions explicitly describing object attributes, spatial relationships, and potential interactions provide significant benefits in EQA performance, even surpassing the state-of-the-art method in OpenEQA (GPT4-V); and (2) despite this great performance, even the best textual representations fall short of the perceptual and reasoning abilities demonstrated by humans when given visual data. These results suggest inherent limitations in using purely text-based scene descriptions and highlight the need for multimodal approaches that integrate visual data for more robust scene understanding."
    authors={{
    "Vladyslav Humennyy":[],
    "Volodymyr Kuzma":[],
    "Ruslan Partsey":[],
    "Sergio Arnaud":[],
    "Franziska Meier":[],
    "Oleksandr Maksymets":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/26_What_do_we_learn_from_using.pdf"
   />,
  <Paper
    title="THE COLOSSEUM: A Benchmark for Evaluating Generalization for Robotic Manipulation"
    abstract="To realize effective large-scale, real-world robotic applications, we must evaluate how well our robot policies adapt to changes in environmental conditions. Unfortunately, a majority of studies evaluate robot performance in environments closely resembling or even identical to the training setup. We present THE COLOSSEUM, a novel simulation benchmark, with 20 diverse manipulation tasks, that enables systematical evaluation of models across 14 axes of environmental perturbations. These perturbations in- clude changes in color, texture, and size of objects, tabletops, and backgrounds; we also vary lighting, distractors, physical properties perturbations and camera pose. Using THE COLOSSEUM, we compare 5 state-of-the-art manipulation models to reveal that their success rate degrades between 30-50% across these perturbation factors. When multiple perturbations are applied in unison, the success rate degrades ≥75%. We identify that changing the number of distractor objects, target object color, or lighting conditions are the perturbations that reduce model performance the most. To verify the ecological validity of our results, we show that our results in simulation are correlated (¯ R2 = 0.614) to similar perturbations in real-world experiments. We open source code for others to use THE COLOSSEUM, and also release code to 3D print the objects used to replicate the real-world perturbations. Ultimately, we hope that THE COLOSSEUM will serve as a benchmark to identify modeling decisions that systematically improve generalization for manipulation."
    authors={{
    "Wilbert Pumacay":[],
    "Ishika Singh":[],
    "Jiafei Duan":[],
    "Ranjay Krishna":[],
    "Jesse Thomason":[],
    "Dieter Fox":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/27_THE_COLOSSEUM_A_Benchmark_f.pdf"
   />,
  <Paper
    title="Sim2Real Transfer for Audio-Visual Navigation with Frequency-Adaptive Acoustic Field Prediction"
    abstract="Sim2real transfer has received increasing attention lately due to the success of learning robotic tasks in simulation end-to-end. While there has been a lot of progress in transferring vision-based navigation policies, the existing sim2real strategy for audio-visual navigation performs data augmentation empirically without measuring the acoustic gap. The sound differs from light in that it spans across much wider frequencies and thus requires a different solution for sim2real. We propose the first treatment of sim2real for audio-visual navigation by disentangling it into acoustic field prediction (AFP) and waypoint navigation. We first validate our design choice in the SoundSpaces simulator and show improvement on the Continuous AudioGoal navigation benchmark. We then collect real-world data to measure the spectral difference between the simulation and the real world by training AFP models that only take a specific frequency subband as input. We further propose a frequency-adaptive strategy that intelligently selects the best frequency band for prediction based on both the measured spectral difference and the energy distribution of the received audio, which improves the performance on the real data. Lastly, we build a real robot platform and show that the transferred policy can successfully navigate to sounding objects. This work demonstrates the potential of building intelligent agents that can see, hear, and act entirely from simulation, and transferring them to the real world."
    authors={{
    "Changan Chen":[],
    "Jordi Ramos":[],
    "Anshul Tomar":[],
    "Kristen Grauman":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/28_Sim2Real_Transfer_for_Audio.pdf"
   />,
  <Paper
    title="Environmental Understanding Generation with M-LLM for Embodied AI"
    abstract="Recent advancements in large language models (LLMs) have demonstrated their capability to be applied to various Embodied AI environments, operating more flexibly through planning without the need for training. However, it is difficult for LLMs to immediately understand environments that are new and have not been observed without fine-tuning, and even using the supervised data samples as in-context input does not considerably improve the performance. Existing LLM agent studies have aimed to enhance performance by augmenting memory, leveraging environmental textual information, or utilizing predefined action knowledge. However, these approaches have limitations; memory contents are not entirely understandable texts, they require textual environmental data, and they incur high costs. To address these issues, we propose environmental understanding generation using a multi-modal large language model (M-LLM). It interacts directly with environments, stores experiences in memory, and generates action understanding based on these experiences. These generated understandings aid LLMs in task-based action planning. Our contributions are as follows: We propose a novel approach to generating action understanding from M-LLM to augment LLM in embodied AI tasks. We introduce a method that M-LLM directly interacts with the environment through information from multiple modules stored in memory. Furthermore, we summarize the constructed memory to build action understanding. In experimental results, our approach outperforms baselines by utilizing generative action understanding."
    authors={{
    "Jinsik Bang":[],
    "Taehwan Kim":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/29_Environmental_Understanding.pdf"
   />,
  <Paper
    title="Curriculum Learning for GPS-Free Indoor Social Navigation"
    abstract="Tasks involving human-robot interaction demand seamless collaboration between the two within indoor settings. Habitat 3.0 [11] introduced a novel Social Navigation task where agents find, track, and follow humans while avoiding collisions. Their baselines show that performance relies heavily on human GPS availability. However, indoor GPS sensors are rarely reliable in real-life and it may be impractical to provide GPS for every human in the scene. In this work, we tackle the issue of realistic social navigation by relaxing the human GPS requirement at every time step. We achieve this via a curriculum learning strategy for training an RL policy capable of finding and tracking humans with sparse or no reliance on human GPS observations. Our experiments demonstrate the effectiveness of our curriculum strategy, achieving comparable performance to the baselines with lesser samples, using a single GPS observation at the beginning of the episode. The project website and videos can be found at gchhablani.github.io/socnav-curr."
    authors={{
    "Gunjan Chhablani":[],
    "Madhura Keshava Ummettuguli":[],
    "Siva Kailas":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/30_Curriculum_Learning_for_GPS.pdf"
   />,
  <Paper
    title="AmbiK: Dataset of Ambiguous Tasks in Kitchen Environment"
    abstract="The use of Large Language Models (LLMs), which demonstrate impressive capabilities in natural language understanding and reasoning, in Embodied AI is a rapidly developing area. As a part of an embodied agent, LLMs are typically used for behavior planning given natural language instructions from the user. However, dealing with ambiguous instructions in real-world environments remains a challenge for LLMs. Various methods for task disambiguation have been proposed. However, it is difficult to compare them because they work with different data. To address this issue and further advance this area of research, a specialized benchmark is needed. We propose AmbiK, the fully textual dataset of ambiguous commands addressed to a robot in a kitchen environment. AmbiK was collected with the assistance of LLMs and is human-validated. It comprises 250 pairs of ambiguous tasks and their unambiguous counterparts, categorized by ambiguity type, with additional information, for a total of 500 tasks."
    authors={{
    "Anastasia Ivanova":[],
    "Alexey Kovalev":[],
    "Aleksandr Panov":[],
    }}
    affiliations={[]}
    pdf="/papers/2024/31_AmbiK_Dataset_of_Ambiguous_.pdf"
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
        challenge: challengePageMap["ARNOLD"],
        key: "arnold",
        task: "Language-Grounded Manipulation",
        interactiveActions: "✓",
        simulationPlatform: "Isaac Sim",
        sceneDataset: "Arnold Dataset",
        observations: "RGB-D, Proprioception",
        actionSpace: "Continuous",
        stochasticAcuation: "✓",
        winner: "Robot AI",
      },
      {
        challenge: challengePageMap["HAZARD"],
        key: "hazard",
        task: "Multi-Object Rescue",
        interactiveActions: "✓",
        simulationPlatform: "ThreeDWorld",
        sceneDataset: "HAZARD dataset",
        observations: "RGB-D, Sensors, Temperature",
        actionSpace: "Discrete",
        stochasticAcuation: "",
        winner: "TBD",
      },
      {
        challenge: challengePageMap["HomeRobotOVMM"],
        key: "homerobotovmm",
        task: "Open Vocabulary Mobile Manipulation",
        interactiveActions: "✓",
        simulationPlatform: "Habitat",
        sceneDataset: "OVMM Dataset",
        observations: "RGB-D",
        actionSpace: "Continuous",
        stochasticAcuation: "",
        winner: "UniTeam",
      },
      {
        challenge: challengePageMap["ManiSkillViTac"],
        key: "maniskill-vitac",
        task: "Generalized Manipulation / Vision-Based Tactile Manipulation",
        interactiveActions: "✓",
        simulationPlatform: "SAPIEN",
        sceneDataset: "PartNet-Mobility, YCB, EGAD",
        observations: "RGB-D, Proproioception, Localization",
        actionSpace: "Continuous / Discrete for ViTac",
        stochasticAcuation: "",
        winner: "Illusion",
      },
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
        winner: "IntelliGO",
      },
      {
        challenge: challengePageMap["PRS"],
        key: "multion",
        task: "Human Society Integration",
        interactiveActions: "✓",
        simulationPlatform: "PRS Environment",
        sceneDataset: "PRS Dataset",
        actionSpace: "Continuous",
        observations: "RGB-D, Sensors, Pose Data, Tactile Sensors",
        stochasticAcuation: "",
        winner: "PDA",
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
        // Prior variant
        // headerGradient="radial-gradient(#090617, #090617)"
        // 2023 variant
        // headerGradient="linear-gradient(0deg, #1f2f3f, #100b0f)"
        // 2024 variant
        // headerGradient="radial-gradient(#330066, #ff9933)"
        headerGradient="linear-gradient(0deg, #0a2079, #1f094d)"
        
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
      <Section title="Attending">
        The Fifth Annual Embodied AI Workshop will be held 
        <b> Tuesday, June 18 from 8:50am to 5:30pm Pacific </b> 
        in conjunction with <a href="https://cvpr.thecvf.com/">CVPR 2024</a>.
        <ul>
          <li>The physical workshop will be held in meeting room <i>Summit 428.</i></li>
          <li>The physical poster session will be held in room <i>Arch 4E</i> posters 50-81.</li>
          <li>The workshop will also be <a href="https://cvpr.thecvf.com/virtual/2024/workshop/23598">on Zoom</a> for CVPR virtual attendees.</li>
        </ul>
        Remote and in-person attendees are welcome to ask questions via Slack:  
        <InlineSlack />
        Please join us at Embodied AI #5!
        <p>
          <Img fluid={data.workshopLocation.childImageSharp.fluid} alt="Workshop Location"/>
        </p>

      </Section>
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
      <Steps progressDot current={3} direction="vertical">
          <Step title="Workshop Announced" description="March 29, 2024" />
          <Step
            title="Paper Submission Deadline"
            description="May 4th, 2024 (Anywhere on Earth)"
          />
          <Step
            title="Paper Notification Deadline"
            description="May 29th, 2024"
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
                Tuesday, June 18, 2024
                <br />
                8:50 AM - 6:00 PM PT<br />
                Summit 428 <br />
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
          <li><b>Workshop Talks: 8:50AM-5:30PM PT - Summit 428</b></li>
          <li><b>Poster Session: 1:00PM-2:00PM PT - Arch 4E posters 50-81</b></li>
        </ul>
        Zoom information is available on <a href="https://cvpr.thecvf.com/virtual/2024/workshop/23598">the CVPR virtual platform for registered attendees</a>.
        <br />
        Remote and in-person attendees are welcome to ask questions via Slack:  
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
                      <br/>
                      <Time time="8:50 - 9:00 AM PT" />
                      <br />
                      Location: Summit 428
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
                      <Time time="9:00 - 9:30 AM PT" />
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
                      <br/>
                      <i>The Blueprint for Truly Generalizable Robots: Scale, Scale, and Scale</i>
                      <br/>
                      <Time time="10:00 - 10:30 AM PT" />
                      <Speaker
                        organizations={["AI2"]}
                        name="Aniruddha Kembhavi"
                        fixedImg={data.kembhavi.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>Ani Kembhavi is the Senior Director of Computer Vision at the Allen Institute for Artificial Intelligence (AI2) in Seattle. He is also an Affiliate Associate Professor at the Computer Science & Engineering department at the University of Washington. He obtained his PhD at the University of Maryland, College Park and spent 5 years at Microsoft. His research interests lie at the intersection of computer vision, natural language processing and embodiment. His work has been awarded a Best Paper Award at CVPR 2023, an Outstanding Paper Award at Neurips 2022, an AI2 Test of Time award in 2020 and an NVIDIA Pioneer Award in 2018.</p>
                      <Abstract
                        text="Ani will speak about his team's recent advances showing how scaling simulation data enables masterful navigation and manipulation agents who work in the real world without any adaptation or finetuning."
                        />                      
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Panel - Advancing Embodied AI</b>
                      <br/>
                      <i>Towards Seamless Integration of Perception and Action</i>
                      <br/>
                      <Time time="10:30 - 11:00 AM PT" />
                      <Speaker
                        organizations={["Technical Fellow, Microsoft Applied Science Group (E+D)"]}
                        name="Stevie Bathiche"
                        fixedImg={data.stevieBathiche.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Speaker
                        organizations={["Senior Director & Principal PM – Microsoft Research"]}
                        name="Ade Famoti"
                        fixedImg={data.adeFamoti.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Speaker
                        organizations={["Corporate Vice President & MD – Microsoft Research"]}
                        name="Ashley Llorens"
                        fixedImg={data.ashleyLlorens.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Speaker
                        organizations={["CTO, Sanctuary AI"]}
                        name="Olivia Norton"
                        fixedImg={data.oliviaNorton.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <Abstract
                        text="Embodied Artificial Intelligence (AI) represents a pivotal frontier in the quest to endow machines with capabilities to perceive, reason, and act in complex environments. The panel will delve into the multifaceted research landscape shaping the future of embodied AI. Focusing on pivotal research directions and emerging challenges."
                        />                      
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Language Model Planning: </b>
                      <br/>
                      <i>Foundation Models for Robotics and Robotics for Foundation Models</i>
                      <br/>
                      <Time time="11:00 - 11:30 AM PT" />
                      <Speaker
                        organizations={["Physical Intelligence"]}
                        name="Brian Ichter"
                        fixedImg={data.ichter.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>Brian recently founded Physical Intelligence, a company focused on scaling robotics and foundation models. Prior to that Brian was a Research Scientist at Google DeepMind on the Robotics team and received his PhD from Stanford. Generally, his research interests lie in enabling mobile robotic systems to perform complex skills and plan long-horizon tasks in real-world environments through machine learning and large-scale models.</p>
                      <Abstract
                        text="Foundation models have a number of properties that are promising for robotics, and robotics has a number of lessons that can help improve foundation models. This talk will cover a number of recent works along these axes, highlighting both their benefits and limitations. Finally, it will present a forward looking view of scaled robotics in a world of improving VLMs."
                        />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Project Aria from Meta: </b>
                      <br />
                      <i>The Path to Always-on Contextual AI </i>
                      <br />
                      <Time time="11:30 AM - 12:00 NOON PT" />
                      <Speaker
                        organizations={["Meta"]}
                        name="Richard Newcombe"
                        fixedImg={data.richardNewcombe.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>Richard Newcombe is VP of Research Science at Meta Reality Labs leading the Surreal team in Reality Labs Research. The Surreal team has developed the key technologies for always-on 3D device location, scene understanding and contextual AI and pioneered Project Aria - a new generation of machine perception glasses devices that provides a new generation of data for ego-centric multimodal and contextual AI research. Richard received his undergraduate in Computer Science, and masters in Robotics and Intelligent Machines from the University of Essex in England, his PhD from Imperial College in London with a Postdoc at the University of Washington. Richard went on to co-found Surreal Vision, Ltd. that was acquired by Meta in 2015. As a research scientist his original work introduced the Dense SLAM paradigm demonstrated in KinectFusion and DynamicFusion that influenced a generation of real-time and interactive systems in AR/VR and robotics by enabling systems to efficiently understand the geometry of the environment. Richard received the best paper award at ISMAR 2011, best demo award ICCV 2011, best paper award at CVPR 2015 and best robotic vision paper award at ICRA 2017. In 2021, Richard received the ICCV Helmholtz award for research with DTAM, and the ISMAR and UIST test of time awards for KinectFusion.</p>
                      <Abstract
                        text="In this session, Richard will share Meta's vision towards building Always-on Contextual AI. Project Aria will be introduced in the session as a research tool to gather data from users' perspectives to accelerate machine perception and AI research."
                        />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Lunch</b>
                      <br />
                      Location: Summit ExHall 
                      <br />
                      <Time time="12:00 NOON - 1:00 PM PT" />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Accepted Papers Poster Session</b>
                      <br />
                      <Time time="1:00 PM - 2:00 PM PT" />
                      <br />
                      Location: Arch 4E posters 50-81
                      <ul>
                       <li>Posters will be in ARCH 4E, posters 50 to 81 from 1pm to 2pm on Tuesday the 18th.</li>
                       <li>Poster numbers are assigned to your paper number plus 50, i.e. paper 1 is poster 51.</li>
                       <li>Materials for attaching posters to the poster stands will be provided on-site.</li>
                       <li>Posters can only be put up during our allotted time.</li> 
                      </ul>
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Manipulation and Vision Challenge Presentations</b>
                      <br />
                      ManiSkill, ARNOLD, HomeRobot OVMM
                      <br />
                      Location: Summit 428
                      <br />
                      <Time time="2:00 - 2:30 PM PT" />
                      <ul>
                        <li>2:00: ManiSkill</li>
                        <li>2:10: ARNOLD</li>
                        <li>2:20: HomeRobot OVMM</li>
                      </ul>
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Manipulation and Vision Challenge Q&A Panel</b>
                      <br />
                      <Time time="2:30 - 3:00 PM PT" />
                    </Timeline.Item>
                    
                    <Timeline.Item>
                      <b>Invited Talk - Embodied Mobile Manipulation: </b>
                      <br />
                      <i>In-The-Wild Robot Teaching without In-The-Wild Robots</i>
                      <br />
                      <Time time="3:00 - 3:30 PM PT" />
                      <Speaker
                        organizations={["Stanford University"]}
                        name="Shuran Song"
                        fixedImg={data.song.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>Shuran Song leads the Robotics and Embodied AI Lab at Stanford University ( REAL@Stanford ). She is interested in developing algorithms that enable intelligent systems to learn from their interactions with the physical world, and autonomously acquire the perception and manipulation skills necessary to execute complex tasks and assist people.</p>
                      <Abstract
                        text="Shuran Song will be speaking on Embodied Mobile Manipulation."
                        />
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Embodied Mobile Manipulation: </b>
                      <br />
                      <i>Towards Home Robots: Open Vocabulary Mobile Manipulation in Unstructured Environments</i>
                      <br />
                      <Time time="3:30 - 4:00 PM PT" />
                      <Speaker
                        organizations={["Hello Robot"]}
                        name="Chris Paxton"
                        fixedImg={data.paxton.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>Chris Paxton is a roboticist who has worked for FAIR labs at Meta and at NVIDIA research. He got his PhD in Computer Science in 2019 from the Johns Hopkins University in Baltimore, Maryland, focusing on using learning to create powerful task and motion planning capabilities for robots operating in human environments. His work won the ICRA 2021 best human-robot interaction paper award, and was nominated for best systems paper at CoRL 2021, among other things. His research looks at using language, perception, planning, and policy learning to make robots into general-purpose assistants. He's now leading embodied AI at Hello Robot to build practical in-home mobile robots.</p>
                      <Abstract
                        text="Robots are increasingly an important part of our world, from working in factories and hospitals to driving on city streets. As robots move into more unstructured environments such as homes, however, we need new techniques that allow robots to perform complex operations with less information about the world around them. We propose a motivating north star: Open Vocabulary Mobile Manipulation, wherein robots must be able to reliably perform pick and place tasks of any object in any location in an unknown environment. Currently, a variety of powerful approaches exist for learning low-level skills or performing long-horizon manipulation, but these often assume access to model-based object detection and grasp generation. However, new approaches exist which allow for robots to plan and manipulate novel objects - building structures and rearranging scenes - while reducing these assumptions about task and object knowledge. In this talk, I will discuss recent work on how to learn these representations, combine them with robot task and motion planning, and use them to work towards robots that can operate in complex, human environments. Finally, I will discuss how we can benchmark robotics research in home environments, with a look at the HomeRobot challenge."
                        />                      
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Talk - Humanoid Robots</b>
                      <br />
                      <i>Foundation Models for Humanoid Robots</i>
                      <br />
                      <Time time="4:00 - 4:30 PM PT" />
                      <Speaker
                        organizations={["1X Technologies"]}
                        name="Eric Jang"
                        fixedImg={data.jang.childImageSharp.fixed}
                        noMargin={true}
                      />
                      <p>Eric leads the AI team at 1X Technologies, a vertically-integrated humanoid robot company. His research background is on end-to-end mobile manipulation and generative models. Eric recently authored a book on the future of AI and Robotics, titled “AI is Good for You”.</p>
                      <Abstract
                        text="1X's mission is to create an abundant supply of physical labor through androids that work alongside humans. In this talk we'll be sharing an exciting new project."
                        />
                    
                    </Timeline.Item>

                    <Timeline.Item>
                      <b>Invited Speaker Panel</b>
                      <br />
                      <Time time="4:30 - 5:30 PM PT" />
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
      <Section title="Sponsor Events">
        <p>
          The Embodied AI Workshop is proud to highlight the following events
          associated with our sponsors:
        </p>
        <ul>
          <li><b>Meta:</b> top by Meta's Expo Booth #1423 from 6/19-6/21 to see how Project Aria powers machine perception and AI research.</li>
          <li><b>Microsoft:</b> Check out Microsoft's Expo Booth #1445 from 6/19-6/21 to see Microsoft's latest advances!</li>
        </ul>
        <br />
        <center>
          <Img fluid={data.ariaDemo.childImageSharp.fluid} alt="Aria Demo"/>
        </center>
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
                  2024 Winner
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
            The submission deadline is <b>May 4th</b> (
            <a href="//time.is/Anywhere_on_Earth">Anywhere on Earth</a>). Papers
            should be no longer than 2 pages (excluding references) and styled
            in the{" "}
            <a href="https://cvpr.thecvf.com/Conferences/2024/AuthorGuidelines" target="_blank">
              CVPR format
            </a>.
            <uL>
              <li>
              <a href="https://openreview.net/group?id=thecvf.com/CVPR/2024/Workshop/EAI">
              Paper submissions are now OPEN through May 4th, 2024
              </a>
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
              <img src="/images/sponsors/logical-robotics.png" height="150" alt="Logical Robotics"/>
            </a>

                <a href="https://microsoft.com/">
              <img src="/images/sponsors/microsoft-logo.png" height="300" alt="Microsoft"/>
            </a>
                <table>
              <tr>
                <td>
                  <center>

                <a href="https://www.projectaria.com/">
              <img src="/images/sponsors/project_aria.png" height="150" alt="Project Aria"/>
              <br></br>
              Project Aria
               </a>
               </center>
                </td>
              </tr>
            </table>
          </center>
        </p>
        </Section>
      <Section title="Organizers">
        The Embodied AI 2024 workshop is a joint effort by a large set of
        researchers from a variety of organizations. Each year, a set of
        lead organizers takes point coordinating with the CVPR conference,
        backed up by a large team of workshop organizers, challenge organizers,
        and scientific advisors.
        <SubSection title="Lead Organizers">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2024.organizers
              .filter((organizer: any) => organizer.lo === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Organizing Committee">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2024.organizers
              .filter((organizer: any) => organizer.oc === true && organizer.lo === false)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Challenge Organizers">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2024.organizers
              .filter((organizer: any) => organizer.challenge === true)
              .sort((a, b) => a.name.localeCompare(b.name))}
            data={data}
          />
        </SubSection>
        <SubSection title="Scientific Advisory Board">
          <OrganizerPics
            organizers={data.allSite.nodes[0].siteMetadata.cvpr2024.organizers
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
          cvpr2024 {
            organizers {
              name
              imageId
              organization
              site
              sab
              oc
              lo
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
    ichter: file(relativePath: { eq: "cvpr2024/brian_ichter.png" }) {
      ...FaceThumbnail
    }
    kembhavi: file(relativePath: { eq: "cvpr2024/ani_kembhavi.jpg" }) {
      ...FaceThumbnail
    }
    paxton: file(relativePath: { eq: "cvpr2024/chris_paxton.png" }) {
      ...FaceThumbnail
    }
    song: file(relativePath: { eq: "cvpr2024/shuran_song.jpg" }) {
      ...FaceThumbnail
    }
    jang: file(relativePath: { eq: "cvpr2024/eric_jang.jpg" }) {
      ...FaceThumbnail
    }
    aria: file(relativePath: { eq: "sponsors/project_aria.png" }) {
      ...FaceThumbnail
    }
    microsoft: file(relativePath: { eq: "sponsors/microsoft.png" }) {
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
    ranGongOrg: file(relativePath: { eq: "organizers/Ran_Gong.png" }) {
      ...FluidImage
    }
    siyuanHuangOrg: file(relativePath: { eq: "organizers/Siyuan_Huang.png" }) {
      ...FluidImage
    }
    jiangyongHuangOrg: file(relativePath: { eq: "organizers/Jiangyong_Huang.png" }) {
      ...FluidImage
    }
    baoxiongJiaOrg: file(relativePath: { eq: "organizers/Baoxiong_Jia.png" }) {
      ...FluidImage
    }
    andreyKolobovOrg: file(relativePath: { eq: "organizers/andrey-kolobov.png" }) {
      ...FluidImage
    }
    adeFamotiOrg: file(relativePath: { eq: "organizers/ade-famoti.png" }) {
      ...FluidImage
    }
    zhuoqunXuOrg: file(relativePath: { eq: "organizers/zhuoqun-xu.png" }) {
      ...FluidImage
    }
    haoDongOrg: file(relativePath: { eq: "organizers/hao-dong.png" }) {
      ...FluidImage
    }
    richardHeBaiOrg: file(relativePath: { eq: "organizers/richard-he-bai.jpg" }) {
      ...FluidImage
    }
    yangLiuOrg: file(relativePath: { eq: "organizers/yang-liu.jpg" }) {
      ...FluidImage
    }
    joelJangOrg: file(relativePath: { eq: "organizers/joel-jang.jpg" }) {
      ...FluidImage
    }
    geordieRose: file(relativePath: { eq: "cvpr2024/geordieRose.png" }) {
      ...FaceThumbnail
    }
    ashleyLlorens: file(relativePath: { eq: "cvpr2024/ashleyLlorens.png" }) {
      ...FaceThumbnail
    }
    stevieBathiche: file(relativePath: { eq: "cvpr2024/stevieBathiche.png" }) {
      ...FaceThumbnail
    }
    andreyKolobov: file(relativePath: { eq: "organizers/andrey-kolobov.png" }) {
      ...FaceThumbnail
    }
    adeFamoti: file(relativePath: { eq: "organizers/ade-famoti.png" }) {
      ...FaceThumbnail
    }
    oliviaNorton: file(relativePath: { eq: "cvpr2024/olivia-norton.jpg" }) {
      ...FaceThumbnail
    }
    richardNewcombe: file(relativePath: { eq: "cvpr2024/richard-newcombe.jpg" }) {
      ...FaceThumbnail
    }
    
    # Other pictures
    ariaDemo: file(relativePath: { eq: "cvpr2024/aria-demo.jpg" }) {
      ...FluidImage
    }
    workshopLocation: file(relativePath: { eq: "cvpr2024/workshop-location.png" }) {
      ...FluidImage
    }
  }
`;
