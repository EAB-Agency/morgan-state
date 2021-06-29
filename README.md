

## Getting Started

### Install

```
yarn install
```

### Setup Contentful

1.  Rename `env.development` and `env.production` to `.env.development` and `.env.production` (with the `.`). Get parameters from Bob (or in contentful).

### Install Ngrok (for preview updates)
1. A simple `brew install ngrok` and then `ngrok http 8000` (the gatsby app will run on port 8000)
2. Copy the https url and paste it into a new webhook in contentful (Settings > webhooks).
3. Append `/__refresh` onto the end of the URL and save.
4. Now your localhost (and the ngrok url... they are the same) will refresh, after a few seconds, with the latest content from contenful.

### Run dev server
1. `yarn develop`

### Theme UI

Edit [`/src/gatsby-plugin-theme-ui/index.js`](https://github.com/ryanwiemer/gatsby-starter-gcn/blob/master/src/gatsby-plugin-them-ui/index.js)

```js
export default {
  colors: {
    background: '#ffffff',
    text: '#121212',
    primary: '#121212',
    secondary: '#e9e9e9',
    tertiary: '#f3f3f3',
    highlight: '#5b8bf7',
  },
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  sizes: {
    maxWidth: '1050px',
    maxWidthCentered: '650px',
  },
  responsive: {
    small: '35em',
    medium: '50em',
    large: '70em',
  },
}
```

### Using Gatsby Standard

1.  Quickly check your code for errors with the `yarn test` script

### Content and SEO

1.  You can replace the `share.jpg` and `favicon.png` files in the `static/images` directory.
2.  Meta descriptions are defined in Contentful. If you choose to leave this field blank on new posts a 320 character excerpt of the post/page will be used instead.

## Deployment

### Manual Netlify Deployment

1.  Run `gatsby build`

2.  Drag and drop the folder `/public/` into Netlify

### Netlify Deployment From Git (Recommended)

1.  [New Netlify website from Git](https://app.netlify.com/start)

2.  Connect with GitHub and select your repo

3.  Navigate to Netlify: **Settings** → **Build & Deploy** → **Build Environment Variables**. Add the following environment variables using the Space ID and Content Delivery API - access token from Contentful. Additionally if desired you can enter a Google Analytics ID. The variables must be named exactly like this in order to work properly.

```
ACCESS_TOKEN
SPACE_ID
GOOGLE_ANALYTICS
```

![](screenshots/netlify-build-environment-variables.jpg)

4.  Navigate to Netlify: **Deploys**. Click `Trigger deploy` to manually trigger a deploy to confirm the website is building successfully using your build environment variables. At this point be aware that every time you push to `master` a deploy will automatically start and be published to production.

## Additional Settings

### Contentful Webhook (Optional)

1.  Navigate to Netlify:
    **Settings** → **Build & Deploy** → **Build hooks**.
    Create a new build hook.

2.  Navigate to Contentful:
    **app.contentful.com** → **Space Settings** → **Webhooks**. Create a webhook using the Netlify build URL that you just created
    and configure which events should trigger the build on production. For example the following will rebuild the production website every time a post or page is published, unpublished or deleted:

![](screenshots/contentful-webhook-selected-events.jpg)

### Netlify Form Notifications (Optional)

1.  Navigate to Netlify:
    **Forms** → **Notifications**

2.  Click the add notification dropdown and select your desired notification method.

![](screenshots/netlify-form-notifcations.jpg)

## Useful Tips

- If you make edits to your Contentful space while running `yarn develop` you will need to stop it and rerun the command to see the changes reflected. For example a new post or page will not automatically show up until the website has been rebuilt.
- **DO NOT** store your Contentful access tokens or space ids anywhere in GitHub. Treat them like passwords.
