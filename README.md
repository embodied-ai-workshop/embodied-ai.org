# Embodied AI Workshop Website

This repository contains the code that runs the Embodied AI Workshop's website,
[embodied-ai.org](https://embodied-ai.org/). The TL;DR: is that if you push
changes to the main branch on Github, it will trigger a Github action that
will evaluate the changes and then push them live if the website builds.

Development of the website can be run locally via `yarn run develop` which
will stand up a server displaying a website at http://localhost:8000 . Edits
made locally will show up there, so you can test your work.

**NOTE: The Embodied AI Website is archival.** We host our own papers on our website
and we also have pointers to past videos and talks. *Website updates should add new
content, not break previous years' content or 'clean things up' because they are
'out of date'.* We want what we have and are hosting to remain accessible going forward.

### Quick Updates and Troubleshooting

* **Updating Organizer Info**: Organizer info is stored in
    [gatsby-config.js](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/gatsby-config.js),
    where the imageId's correspond to those found in
    [static/images/organizers](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/organizers). You may need to restart your local server to pick up the changes.

* **Images Don't Seem to Upload**: Make sure you added them to
    [static](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static)
    and not the auto-generated `public` directory.

* **Website Build Runs Out of Memory**: Try `export NODE_OPTIONS=--max-old-space-size=8192` before
    running `yarn run develop`.

## Structure of the Embodied AI Website

### External Structure
The root of [embodied-ai.org](https://embodied-ai.org/) has the following structure:

* [index.html](https://embodied-ai.org/index.html) automatically redirects to the current year
    (but can be overridden to point to the previous year when prototyping a new year's page.)
* *cvprYYYY/* points to various years of the workshop:
    * [cvpr2020/](https://embodied-ai.org/cvpr2020/): Embodied AI Workshop
    * [cvpr2021/](https://embodied-ai.org/cvpr2021/): Embodied AI #2
    * [cvpr2022/](https://embodied-ai.org/cvpr2022/): Embodied AI #3
    * [cvpr2023/](https://embodied-ai.org/cvpr2023/): Embodied AI #4
    * [cvpr2024/](https://embodied-ai.org/cvpr2024/): Embodied AI #5 (currently live)
    * [cvpr2025/](https://embodied-ai.org/cvpr2025/): Embodied AI #6 (in development)

Each year is shown as a single page with all the information about the workshop on it.

Individual pages have a top navigation banner with a dropdown for past years of the workshop on the
upper left, the current year's banner in the middle, and current challenges dropdown on the right.
The banner generally displays the logos of the participating organizations (the affiliations of
the organizers, scientific advisors, challenge organizers, and any sponsors).

Each year's page is broken down into the following:

* [Attending](https://embodied-ai.org/cvpr2024/#overview): Not live until near the conference,
    this page gives details on the room and ideally a picture.
* [Overview](https://embodied-ai.org/cvpr2024/#overview): Describes the workshop in detail,
    based on the themes established in this year's proposal.
* [Timeline](https://embodied-ai.org/cvpr2024/#timeline): Describes the important dates of the
    workshop such as paper submissions, challenge deadlines and the workshop date. Has a "dot"
    which moves down the schedule as it is updated.
* [Workshop Schedule](https://embodied-ai.org/cvpr2024/#workshop-schedule): The detailed workshop
    schedule (ideally updated with room numbers once they are known).
* [Sponsor Events](https://embodied-ai.org/cvpr2024/#sponsor-events): A list of sponsor events,
    if any are held this year.
* [Challenges](https://embodied-ai.org/cvpr2024/#challenges): A table of challenges that are
    running this year.
* [Call for Papers](https://embodied-ai.org/cvpr2024/#call-for-papers): Details on our call
    for papers, and the place the papers go when accepted.
* [Sponsors](https://embodied-ai.org/cvpr2024/#sponsors): List of the sponsor organizations.
    These include companies paying some kind of money, e.g., for challenge awards.
* [Organizers](https://embodied-ai.org/cvpr2024/#organizers): List of the lead organizers (called
    out into their own section so the lead organizers can use this as evidence of participation
    to their organizations), other organizers, challenge organizers, and scientific advisors.


### Page Structure
The embodied AI repo https://github.com/embodied-ai-workshop/embodied-ai.org has the following
structure:

* [.github/workflows](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/.github/workflows): 
    Contains the workflow to publish the website
* [src](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/src): Website dynamic content
    * [components](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/src/components):
        Code used to autogenerate the page content from the dynamic setup.
    * [pages](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/src/pages): The
        actual code for the pages of the website, including:
        * [index.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/index.tsx): Redirector code
        * [cvpr2020.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/cvpr2020.tsx): 2020 website
        * [cvpr2021.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/cvpr2021.tsx): 2021 website
        * [cvpr2022.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/cvpr2022.tsx): 2022 website
        * [cvpr2023.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/cvpr2023.tsx): 2023 website
        * [cvpr2024.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/cvpr2024.tsx): 2024 website
        * [cvpr2025.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/cvpr2025.tsx): 2025 website
        
    * [styles](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/src/styles):
        Contains stylesheets, currently a shared [global.scss](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/styles/global.scss). Please make sure changes do not
        mess up prior years by creating new styles rather than mutating old ones.
* [static](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static): Static data for the website.
    * [icons](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/icons): SVG
        icon files, mostly used in older years.
    * [images](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/icons): Tree
        of images for the website
        * [organizers](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/organizers): Organizer headshots.
        * [sponsors](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/sponsors): Sponsor logos.
        * [cvpr2020](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/cvpr2020): 2020 speakers and other logos.
        * [cvpr2021](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/cvpr2021): 2021 speakers and other logos.
        * [cvpr2022](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/cvpr2022): 2022 speakers and other logos.
        * [cvpr2023](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/cvpr2023): 2023 speakers and other logos.
        * [cvpr2024](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/cvpr2024): 2024 speakers and other logos.
        * [cvpr2025](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/images/cvpr2025): 2025 speakers and other logos.
    * [papers](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/papers):
        Papers on the website, as well as 2020 and 2021 papers. We are not moving those so as not
        to break those links.
        * [2022](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/papers/2022): 2022 papers.
        * [2023](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/papers/2023): 2023 papers.
        * [2024](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/papers/2024): 2024 papers.
        * `2025`: Not live yet
    * [posters](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/static/posters):
        Mostly posters from 2021.

Note there is also a `public` directory that is automatically generated when you are developing
locally. Don't put anything there, as it will appear in your local web server, but will not get
uploaded to source control.

### Data Structure
There are several locations where data needs to be updated:
* [gatsby_browser.js](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/gatsby-browser.js):
    Controls the year redirect; also update [src/pages/index.tsx](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/src/pages/index.tsx).
* [gatsby_config.js](https://github.com/embodied-ai-workshop/embodied-ai.org/blob/main/gatsby-config.js):
    Defines the table of each year's organizers, challenge organizers, and scientific advisors.
* [src/pages/cvprYYYY](https://github.com/embodied-ai-workshop/embodied-ai.org/tree/main/src/pages):
    Each year defines its own:
    * **Challenge Page Map:** List of challenges in the dropdown up top.
    * **Challenge Data Table:** List of challenges in the dropdown up top.
    * **Accepted Paper List:** List of accepted papers and abstracts.
    * **Query Table of Images:** A list of image paths for this year's website.

## Development of the Embodied AI Website

The website is developed using Gatsby and relies on React, TypeScript, SCSS, and GraphQL, among other things. It's then statically transformed and optimized into HTML, CSS, and JavaScript (on the `generated-static-pages` branch), which ultimately gets displayed to the user.

To develop locally:

### 0. Consider installing a package manager:
While the website manages its own dependencies with `npm` and `yarn` it does load roughly 1000
packages, so it can be useful to wrap all your work in something like a `conda` environment.
This is not strictly required, however.

### 1. Install [Node.js](https://www.npmjs.com/get-npm). 
Follow the instructions at the above link.
The installation can be confirmed by typing the following into the command line:

```
npm -v
```

into a command line.

### 2. Install [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
This makes it easy to install gatsby dependencies (in my experience, over using NPM directly).
The installation can be confirmed by typing the following into the command line:

```
yarn --version
```

### 3. Clone the repo
Get a local copy of the repo and `cd` into it.

```
git clone https://github.com/embodied-ai-workshop/embodied-ai.org.git
cd embodied-ai-website/
```

### 4. Install other dependencies
These include things like scss, TypeScript, and so on, and should be done via `yarn`:

```
yarn install
```

### 5. Check out a development branch
Typically we use a development branch to avoid direct pushes to main:

```
git checkout cvpr2025
```

or `git checkout -b your_branch_name`.

### 6. Build the website locally
Invoke gatsby from the root of the directory to build locally:

```
export NODE_OPTIONS=--openssl-legacy-provider # Needed for newer versions of node
yarn run develop
```

This should then create a local server which shows the live website at http://localhost:8000/.

### 7. Push changes to Github
Now commit your changes and push them remote:

```
git add .
git commit -m "Your commit message."
git push
```

### 7. Merge into Head
From the Github page you should see that there are recent changes in your branch. 

* Open a pull request to merge them into main.
* Once merged, monitor the github actions to see that they are merged and pushed live
* Verify the live website.

You may need to merge some changes back into your branch if you want to keep using it.

### 8. Update your local repo.
Make sure you are up to date:

```
git pull
```

### 9. ??????

### 10. PROFIT!!!!


