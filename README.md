# **Griffon**

Discord bot framework built around [Eris](https://abal.moe/Eris/). Inspired by [Gears ♥](https://gears.enitoni.dev/)

Currently in a very experimental beta state, library can change at any time. Documentation is none.

If you have any questions I'm `Crawron#9779` on Discord, or DM me on [Twitter](https://twitter.com/caawron).

## Instalation

**Only available through [GitHub Packages](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#installing-a-package) at the moment.** [Latest version](https://github.com/Crawron/griffon/packages/118955)

```pwsh
npm i eris @crawron/griffon
```

> Use yarn or pnpm if you want.

## Small Example

```js
const customCommand = {
  condition: commandName("roll", "r"),
  action: ctx => {
    const { args, message } = ctx

    const sides = args.trim() ? parseInt(args) : 10
    const roll = Math.floor(Math.random() * (sides - 1) + 1)

    message.channel.createMessage(`${message.author.mention} rolled ${roll}!`)
  },
}

const bot = new Bot({
  token,
  command: {
    condition: commandName("!"),
    childCommands: [customCommand, echoCommand(), replyCommand("BODY", "some")],
  },
})

bot.connect()
```

![Usage](http://AzertyAaron.u.catgirlsare.sexy/o8mF.png)
