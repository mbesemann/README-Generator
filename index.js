const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user
const questions = [
    {name: "title",
    message: "Project Title:"},
    {name: "description",
    message: "Project Description:"},
    {name: "installation",
    message: "Installation Instructions:"},
    {name: "usage",
    message: "Usage Information:"},
    {name: "contribution",
    message: "Contribution Guidelines:"},
    {name: "test",
    message: "Test Instructions:"},
    {type: "list",
    name: "license",
    message: "Choose a License:",
    choices: [{name: "Apache License 2.0",
               value: "apache"},
               {name: "GNU General Public License v3.0",
                value: "gnu"},
                {name: "MIT License",
                value: "mit"}
            ]},
    {name: "github",
    message: "GitHub Username:"},
    {name: "email",
    message: "Email Address:"}
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`output/${fileName}`, data, (err) => {
        if(err) throw err;
        console.log(`The README has been saved to output/${fileName}!`);
    });
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then(function(responses) {
        writeToFile("README.md", generateMarkdown(responses));
    });
}

function generateMarkdown(data) {
    return `${getLicense(data.license).badge}
# ${data.title}
# Description
${data.description}
# Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)
# Installation
${data.installation}
# Usage
${data.usage}
# License
${getLicense(data.license).name}
# Contributing
${data.contribution}
# Tests
${data.test}
# Questions
Feel free to post an issue on my GitHub profile: @[${data.github}](https://github.com/${data.github})
or contact me via email at ${data.email}
  `;
  }

function getLicense(license) {
    switch(license) {
        case 'apache':
            return {name: 'Apache License 2.0',
                    badge: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'};
        case 'gnu':
            return {name: 'GNU General Public License v3.0',
                    badge: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'};
        case 'mit':
            return {name: 'MIT License',
                    badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'};
    }
}

// function call to initialize program
init();

