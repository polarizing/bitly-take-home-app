### REQUIREMENTS

This coding exercise is an opportunity for you to show us how you breakdown designs and product requirements into actual code, and coding style, experience, and creativity. It will also introduce you to the Bitly API and expose you to some of the functionality that the front-end team works with on a daily basis.

#### Bitly Interview SDK and API Key
* You should have received a Bitly Interview SDK in JavaScript as part of this exercise.
* In order to make use of this SDK, you would need an Bitly API Key.
  * Sign up for a Bitly account if you do not already have one.
  * Visit [this page](https://bitly.com/a/your_api_key) to get your API Key.
  * Due to security concerns, do not include your API key as part of the submission. We will immediately reject any submission containing an API key!!!

#### Language and Framework
* Choose languages and frameworks you are relatively comfortable with.
* Choose frameworks capable of supporting Single-Page Application.

#### Project Setup
* The files you provided should be readily runnable either straight from `file:` protocol or from any hosted HTTP server.
* If you chose to use a source-to-source compiler (e.g. Jade, Sass, TypeScript), provide instructions or build script needed for the compilation.
  * In case we cannot get the compiler to work, provide both the original source code and the compiled output.
  * While we do accept a variety of source-to-source compiled languages, a project that relies on a WYSIWYG editor or has unmaintainable original source code will not be considered.

#### HTML/CSS and Visuals
* You should have received 3 design comps as part of this assignment.
* Code out the provided design comps as best as you can.
* Attached are a few assets intended to be used by your implementation. 
* Use Helvetica or any reasonably similar `sans-serif` webfont for font.
* Use the following color palette:
  * orange: `#ee6123`
  * dark-grey: `#444444`
  * light-grey: `#9b9b9b`
* The result is expected to work on the latest versions of all major desktop browsers (Internet Explorer, Chrome, Firefox, and Safari).
* The result is expected to work on mobile and tablet, as such they are not meant to be pixel-perfect.
* How you implement the mobile layout is left to your discretion. You may choose your own grid system and paradigm (Responsive, Fluid, etc). 
* While how mobile layout looks is your decision, the user should always be able to perform the two primary functions of the page: 
  * shorten a link
  * view links they have already shortened
* Concepts such as Graceful Degradation and Accessibility are used in parts of Bitly's FE infrastructure, however due to the technical limitations and time constraint of this exercise, they are not required.

#### User Flow and Functions
##### Initial State / Shorten Bar
* When the user arrives on this page and no link has been shortened, they should be presented with a view similar to [comps/shorten-page.png](comps/shorten-page.png).
* When they click on the shorten bar, the bar should become highlighted. The view should be similar to [comps/shorten-page-with-highlight.png](comps/shorten-page-with-highlight.png).
* If user's shorten action was unsuccessful, they should be notified. How you present this notification is left to your discretion. 

##### Listing Page
* After they successfully shorten a link, they should be presented with a view containing a list of Bitlinks they have already shortened similar to [comps/shorten-page-with-links.png](comps/shorten-page-with-links.png).
* The items in the list of Bitlinks should contain the following info about the link acquired from the SDK: `title`, `long_url`, `short_url`, `global_count`.
* If `title` is not available for the UI, `long_url` should be used in its place.
* All the non-orange text in the Bitlinks list section should have an underline as hover state.
* Persisting data across page reload is not required. A full page reload could simply return user to the initial state `shorten-page.png`. 

### OPTIONAL
* Implement persistent store for the links that user have shortened. When user comes back to this page, their previously shortened links are presented to them.
* When user clicks on the orange Bitlink, instead of navigating to the link, copy it into their clipboard.
