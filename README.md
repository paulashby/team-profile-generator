# Team Profile Generator

  [<img src="https://img.shields.io/badge/License-MIT-yellow.svg">](https://opensource.org/licenses/MIT)

  ## Table of Contents

  [Description](#description)<br />[Installation](#installation)<br />[Usage](#usage)<br />[Contributing](#contributing)<br />[Tests](#tests)<br />[License](#license)<br />[Questions](#questions)<br />[Demo](#demo)<br />

  ## Description

  Command line app allowing HTML development team profile pages to be generated from user input. The app includes a [Validator class](https://github.com/paulashby/team-profile-generator/blob/main/lib/utils/Validator.js) which uses regular expressions and type checking to validate strings, numbers, employee Ids, emails and github user names. It provides validation objects for Inquirer via its getValidation() function. 
  The [Workforce class](https://github.com/paulashby/team-profile-generator/blob/main/lib/Workforce.js) manages employee Id numbers, writing data to a JSON file for persistence.
  
  ## Installation
  
  Clone the repository and run<br />```npm i```<br />To install the dependencies (Inquirer for handling input prompts and Jest for tests).
  
  ## Usage
  
  Run the app with<br />```node index```<br />Provide responses to each of the questions, adding engineers and interns until the team is complete, at which point the 'Done' option should be selected. The app will now generate the 'team.html' file in the 'output' directory. If you're running VS Code, you can right click this file and select 'Open with Live Server' to view in a web browser.
  
  ## Contributing
  
  If you would like to make a contribution to the app, simply fork the repository and submit a Pull Request. If I like it, I may include it in the codebase.
  
  ## Tests
  
  ```npm test```
  
  ## License
  
  Released under the [MIT](https://opensource.org/licenses/MIT) license.
  
  ## Questions
  
  Feel free to [email me](mailto:paul@primitive.co?subject=Team%20Profile%20Generator%20query%20from%20GitHub) with any queries. If you'd like to see some of my other projects, my GitHub user name is [paulashby](https://github.com/paulashby).

  ## Demo
  A demonstration video is available [here](https://watch.screencastify.com/v/DhDxF8Oj3VN8Qhhv1V2e).
