## Bit.ly Take-Home App

### Get Started

Inside the project directory, there is a .env file that has two lines where you will put your private login and API key for Bitly, for security reasons. It looks like this: 
```bash
REACT_APP_API_LOGIN=[YOUR API LOGIN HERE]
REACT_APP_API_KEY=[YOUR API KEY HERE]
```

You do not need to wrap your login or key in quotes. Please paste it directly after the equals sign.

Once the API key is filled out, you are ready to build the application! Please make sure you have Node (npm) installed and run the following commands from the root of the project directory.

```bash
npm run build
```

Once completed, you are ready to deploy the build folder. You can do this directly with:

```bash
serve -s build
```

Alternatively, you can navigate to the build folder and deploy with any hosted HTTP server, for example:
```bash
cd build
python -m SimpleHTTPServer
```

This SPA was implemented with the React library.

#### Design Choices
* The visuals, fonts, and UX/UI of the app follow the design comps given and the official bitly.com website.
* The user is notified of errors (ALREADY_A_BITLY_LINK, INVALID_URI, INVALID_APIKEY ...) and when copying a link to the clipboard by a Toast notification.
* When a user shortens a link, the url for the main link bar will change into newly shortened link and selected for copying to clipboard. The SHORTEN button will turn into a COPY button along with an option for clearing the input field. This is similar to current bitly.com functionality.

#### Implementation Choices
* The header and multiple bitly links are made into React components for reusability. These are in Header.js and BitlyLinks.js.
* Since the Bitly API does not except URLs without http://, all invalid URLs are converted into valid URLs for shortening.
* Session storage persists all the links generated by the user until the user closes the browser. The links are stored in the order generated by the user.
* If a user generates a duplicate link that has already been shortened, it will be brought to the top of the list of links (similar to current bitly.com functionality if you are not logged in).
* A user can copy any short link to the clipboard by clicking on the short URL in the list -- this is done with document.execCommand('copy'). Alternatively, the user can click the COPY button after generating a short-link.
* A user can shorten a link by pressing [Enter] on the keyboard if the input field is highlighted.
