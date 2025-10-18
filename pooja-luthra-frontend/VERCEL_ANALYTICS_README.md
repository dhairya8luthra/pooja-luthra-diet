# Vercel Analytics Setup

The code for Vercel Analytics has been added to the project. To complete the setup, follow these steps:

## 1. Install the Vercel Analytics package

Run the following command in the project directory:

```bash
npm i @vercel/analytics
```

Or if you use yarn:

```bash
yarn add @vercel/analytics
```

Or if you use pnpm:

```bash
pnpm add @vercel/analytics
```

## 2. Code Implementation (Already Done)

The necessary code has already been added to the project:

- The `inject` function is imported from `@vercel/analytics` in the `main.tsx` file
- The `inject()` function is called at the application's entry point before rendering the React app

## 3. Deploy Your Site

Deploy your changes to Vercel or your preferred hosting platform that supports Vercel Analytics.

## 4. Verify Analytics

After deploying:

- Visit your website at www.nutriwisebypoojaluthra.com
- Check the Analytics dashboard on Vercel
- Data should start appearing within 30 seconds

If you don't see data after 30 seconds, please check for content blockers and try to navigate between pages on your site.

## Reference

For more information, refer to the [Vercel Analytics documentation](https://vercel.com/docs/concepts/analytics).
