// See: https://www.gatsbyjs.com/docs/gatsby-config/

const path = require(`path`);

module.exports = {
  siteMetadata: {
    cvpr2020: {
      organizers: [
        {
          name: "Jose M. Alvarez",
          imageId: "joseM",
          organization: "NVIDIA",
          site: "https://rsu.data61.csiro.au/people/jalvarez/",
        },
        {
          name: "Anelia Angelova",
          imageId: "anelia",
          organization: "Google",
          site: "https://research.google/people/AneliaAngelova/",
        },
        {
          name: "Dhruv Batra",
          imageId: "dhruv",
          organization: "GaTech, FAIR",
          site: "https://www.cc.gatech.edu/~dbatra/",
        },
        {
          name: "Angel X. Chang",
          imageId: "angel",
          organization: "SFU",
          site: "https://angelxuanchang.github.io/",
        },
        {
          name: "Samyak Datta",
          imageId: "samyak",
          organization: "GaTech",
          site: "https://samyak-268.github.io/",
        },
        {
          name: "Matt Deitke",
          imageId: "matt",
          organization: "AI2, UW",
          site: "https://mattdeitke.com/",
        },
        {
          name: "Ali Farhadi",
          imageId: "ali",
          organization: "Apple, UW",
          site: "https://homes.cs.washington.edu/~ali/",
        },
        {
          name: "Aaron Gokaslan",
          imageId: "aaron",
          organization: "FAIR",
          site: "https://skylion007.github.io/",
        },
        {
          name: "Aleksandra Faust",
          imageId: "aleksandra",
          organization: "Google",
          site: "https://www.afaust.info/",
        },
        {
          name: "Jose A. Iglesias-Guitian",
          imageId: "joseA",
          organization: "UDC, CITIC",
          site: "http://www.j4lley.com/",
        },
        {
          name: "Abhishek Kadian",
          imageId: "abhishek",
          organization: "FAIR",
          site: "https://abhiskk.github.io/",
        },
        {
          name: "Aniruddha Kembhavi",
          imageId: "ani",
          organization: "AI2, UW",
          site: "https://anikem.github.io/",
        },
        {
          name: "Vangelis Kokkevis",
          imageId: "vangelis",
          organization: "TRI",
          site:
            "https://www.semanticscholar.org/author/Vangelis-Kokkevis/3253769",
        },
        {
          name: "Vladlen Koltun",
          imageId: "vladlen",
          organization: "Intel",
          site: "http://vladlen.info/",
        },
        {
          name: "Eric Kolve",
          imageId: "eric",
          organization: "AI2",
          site: "https://www.semanticscholar.org/author/Eric-Kolve/3386570",
        },
        {
          name: "Stefan Lee",
          imageId: "stefan",
          organization: "Oregon State",
          site: "http://web.engr.oregonstate.edu/~leestef/",
        },
        {
          name: "Yongjoon Lee",
          imageId: "yongjoon",
          organization: "Zoox",
          site: "https://www.semanticscholar.org/author/Yongjoon-Lee/1770155",
        },
        {
          name: "Eric (Chengsu) Li",
          imageId: "chengshu",
          organization: "Stanford",
          site: "https://www.chengshuli.me/",
        },
        {
          name: "Antonio Lopez",
          imageId: "antonio",
          organization: "CVC, UAB",
          site: "http://www.cvc.uab.es/~antonio/",
        },
        {
          name: "Oleksandr Maksymets",
          imageId: "oleksandr",
          organization: "FAIR",
          site: "https://research.fb.com/people/maksymets-oleksandr/",
        },
        {
          name: "Jitendra Malik",
          imageId: "jitendra",
          organization: "UC Berkeley",
          site: "https://people.eecs.berkeley.edu/~malik/",
        },
        {
          name: "Roberto Martín-Martín",
          imageId: "roberto",
          organization: "Stanford",
          site: "https://robertomartinmartin.com/",
        },
        {
          name: "Roozbeh Mottaghi",
          imageId: "roozbeh",
          organization: "AI2, UW",
          site: "http://roozbehm.info/",
        },
        {
          name: "Devi Parikh",
          imageId: "devi",
          organization: "GaTech, FAIR",
          site: "https://www.cc.gatech.edu/~parikh/",
        },
        {
          name: "German Ros",
          imageId: "german",
          organization: "Intel",
          site: "https://germanros.net/",
        },
        {
          name: "Manolis Savva",
          imageId: "manolis",
          organization: "SFU, FAIR",
          site: "https://msavva.github.io/",
        },
        {
          name: "Dustin Schwenk",
          imageId: "dustin",
          organization: "AI2",
          site:
            "https://www.semanticscholar.org/author/Dustin-Schwenk/34846449",
        },
        {
          name: "Philipp Slusallek",
          imageId: "philipp",
          organization: "DFKI",
          site: "https://graphics.cg.uni-saarland.de/people/slusallek.html",
        },
        {
          name: "Julian Straub",
          imageId: "julian",
          organization: "FAIR",
          site: "http://people.csail.mit.edu/jstraub/",
        },
        {
          name: "Jie Tan",
          imageId: "jie",
          organization: "Google",
          site: "http://www.jie-tan.net/",
        },
        {
          name: "Alexander Toshev",
          imageId: "alexander",
          organization: "Google",
          site: "https://sites.google.com/view/alextoshev",
        },
        {
          name: "Fei Xia",
          imageId: "fei",
          organization: "Stanford",
          site: "http://fxia.me/",
        },
        {
          name: "Erik Wijmans",
          imageId: "erik",
          organization: "GaTech",
          site: "https://wijmans.xyz/",
        },
        {
          name: "Amir Zamir",
          imageId: "amir",
          organization: "EPFL",
          site: "https://cs.stanford.edu/~amirz/",
        },
      ],
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-antd`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `static`, `images`),
      },
    },
  ],
};
