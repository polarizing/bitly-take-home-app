## Bit.ly Take-Home App

### Get Started

Inside the project directory, there is a .env file that has two lines where you will put your private login and API key for Bitly, for security reasons. It looks like this: 
```bash
REACT_APP_API_LOGIN=[YOUR API LOGIN HERE]
REACT_APP_API_KEY=[YOUR API KEY HERE]
```

You do not need to wrap your login or key in quotes. Please paste it directly.

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

### Implementation Notes

