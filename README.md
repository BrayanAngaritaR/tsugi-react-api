### tsugi-react-base documentation

##### Modified files

`modified: tsugi/mod/tsugi-react-base/api/attend.php`

`modified: tsugi/mod/tsugi-react-base/src/app/Attend/RecordAttendence.tsx`

`modified: tsugi/mod/tsugi-react-base/src/app/Attend/SettingModal.tsx`

`modified: tsugi/mod/tsugi-react-base/src/app/index.tsx`

`modified: tsugi/mod/tsugi-react-base/src/services/attend.services.js`

* * *

##### Frontend - PHP

##### Getting starting

After executing the **npm run build** command it will create the dist folder. Inside **index.html** file you must change **http://localhost:8888/py4e** to **http://localhost/tsugi** or the URL of your environment.

Being that way:

`http://localhost/tsugi/tsugi/mod/tsugi-react-base/dist/main.bundle.js`

`http://localhost/tsugi/tsugi/mod/tsugi-react-base/dist/main.css`

The URL in the file **main.css** should also be changed.

* * *

###### tsugi/mod/tsugi-react-base/src/app/index.tsx

This file was critical because it basically shows that you can get and object using the **_TSUGI** variable globally.

* * *

##### Modifying the instructor's actions from the modal.

* * *

###### tsugi/mod/tsugi-react-base/src/app/Attend/SettingModal.tsx

In this file I have started by declaring the variable **const PHPSESSID = _TSUGI.react_token;** on line 33.

Then in the submitSetting() function I have commented out the variable **const data** and replaced it with **form_data** instead to submit the fields in another way.

Remaining:

`function submitSetting(){ // const data = // { // "PHPSESSID": PHPSESSID, // "code": code, // "grade": grade, // "match": "" // } const form_data = new FormData(); form_data.append("PHPSESSID", PHPSESSID); form_data.append("code", code); form_data.append("grade", grade); form_data.append("match", ""); setisModalOPen(false); const result = attendServices.UpdateSettings(form_data); }`

And finally by calling the UpdateSettings method of attendServices.

Secondly. I also realized that the grade variable was empty so I created a ternary operator to determine the values to be added using "setgrade".

###### tsugi/mod/tsugi-react-base/src/services/attend.services.js

In the services file I have only removed the **/tsugi** prefix in the URL because my project is on **htdocs** folder. I'm using XAMPP.

Being that way:

`const UpdateSettings = (data) => httpService .post(`/api/settings.php`,data) .then(({ data }) => data) .catch((err) => { //errorCatcher(err.response.data); // Promise.reject(err.response.data); });`

###### tsugi/api/settings.php

In this file I have only commented on the $data variable. Whose value is **//$data = json_decode($json);**.

And instead I hve put the following code:

`$data = [ 'PHPSESSID' => $_POST['PHPSESSID'], 'code' => $_POST['code'], 'grade' => $_POST['grade'], 'match' => $_POST['match'], ]; Settings::linkUpdate((array) $data);`

I have finally commented the following code:

`// Avoid empty body which creates havoc with JQuery //echo("{}");`

###### Database

When the instructor inserts a new code, it will be saved in the `lti_link` table and in the `settings` field.

* * *

##### Modifying the student actions.

* * *

###### tsugi/mod/attend/tsugi-react-base/src/app/Attend/RecordAttendence.tsx

In this file I have added an **onChange** event to the TextInput to dynamically fetch the code.

I have also commented out the **const data** variable and created a **form_data** variable to send the information in another way.

This is the code for the **submitAttendance()** function:

`function submitAttendance(){ const form_data = new FormData(); form_data.append("code", code); attendServices.RecordAttendance(form_data); }`

###### tsugi/mod/attend/tsugi-react-base/src/services/attend.services.js

To modify the alerts, the following method must be modified:

`const RecordAttendance = (data) => httpService .post(`/mod/tsugi-react-base/api/attend.php`,data) .then(({ data }) => { data; if(data.status == 'success'){ alert("Success!"); } else { alert("Something was wrong"); } }) .catch((err) => { errorCatcher(err.response.data); Promise.reject(err.response.data); });`

* * *

`
tsugi/mod/tsugi-react-base/api/attend.php
`

I have commented out the $data variable. Whose value is **//$data = json_decode($json);** and passed the information using **$_POST['code']**

This is how it looks:

`if ( $old_code == $_POST['code'] ) {`

Also, I changed the error or success messages.

`Line 27: $retval->detail = "General error";`

`Line 61: $retval->detail = "Code successfully inserted";`

<!--Tsugi React Base Tool
=====================

## Quick-start

```bash
# Get into your Tsugi mod folder
cd ... /mod
git clone https://github.com/csev/tsugi-react-base
cd tsugi-react-base
npm install && npm run start:dev
```
## Development scripts
```sh
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Before you run the `tsugi` build process, you must edit the `webpack.prod.js`
# file and edit the `publicPath` and `replace` field to reflect
# the actual path on your web server where the folder will be available
# TODO: Automate this :)

# Run a tsugi build (outputs to "dist" dir)
npm run build
```

## Other Scripts

```sh
# Run the test suite
npm run test

# Run the test suite with coverage
npm run test:coverage

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start the express server (run a production build first)
npm run start

# Start storybook component explorer
npm run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
npm run build:storybook
```

## Configurations
* [TypeScript Config](./tsconfig.json)
* [Webpack Config](./webpack.common.js)
* [Jest Config](./jest.config.js)
* [Editor Config](./.editorconfig)

## Raster image support

To use an image asset that's shipped with PatternFly core, you'll prefix the paths with "@assets". `@assets` is an alias for the PatternFly assets directory in node_modules.

For example:
```js
import imgSrc from '@assets/images/g_sizing.png';
<img src={imgSrc} alt="Some image" />
```

You can use a similar technique to import assets from your local app, just prefix the paths with "@app". `@app` is an alias for the main src/app directory.

```js
import loader from '@app/assets/images/loader.gif';
<img src={loader} alt="Content loading />
```

## Vector image support
Inlining SVG in the app's markup is also possible.

```js
import logo from '@app/assets/images/logo.svg';
<span dangerouslySetInnerHTML={{__html: logo}} />
```

You can also use SVG when applying background images with CSS. To do this, your SVG's must live under a `bgimages` directory (this directory name is configurable in [webpack.common.js](./webpack.common.js#L5)). This is necessary because you may need to use SVG's in several other context (inline images, fonts, icons, etc.) and so we need to be able to differentiate between these usages so the appropriate loader is invoked.
```css
body {
  background: url(./assets/bgimages/img_avatar.svg);
}
```

## Adding custom CSS
When importing CSS from a third-party package for the first time, you may encounter the error `Module parse failed: Unexpected token... You may need an appropriate loader to handle this file typ...`. You need to register the path to the stylesheet directory in [stylePaths.js](./stylePaths.js). We specify these explicity for performance reasons to avoid webpack needing to crawl through the entire node_modules directory when parsing CSS modules.

## Code quality tools
* For accessibility compliance, we use [react-axe](https://github.com/dequelabs/react-axe)
* To keep our bundle size in check, we use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
* To keep our code logic and test coverage in check, we use [jest](https://github.com/facebook/jest)
* To ensure code styles remain consistent, we use [eslint](https://eslint.org/)
* To provide a place to showcase custom components, we integrate with [storybook](https://storybook.js.org/)

## Multi environment configuration
This project uses [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) for exposing environment variables to your code. Either export them at the system level like `export MY_ENV_VAR=http://dev.myendpoint.com && npm run start:dev` or simply drop a `.env` file in the root that contains your key-value pairs like below:

```sh
ENV_1=http://1.myendpoint.com
ENV_2=http://2.myendpoint.com
```

With that in place, you can use the values in your code like `console.log(process.env.ENV_1);`-->

