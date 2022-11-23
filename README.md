---
layout: page
title: Main Page
further_reading:
  - title: Official Documentation
    url: https://reinhart1010.github.io/ham-docs/
    target: _blank
external_links:
  - title: Ruby Gem (Package)
    url: https://rubygems.org/gems/jekyll-ham
    icon: bi bi-gem
    target: _blank
  - title: Release History
    url: https://github.com/reinhart1010/ham/releases/
    icon: bi bi-clock-history
    target: _blank
  - title: GitHub Repository
    url: https://github.com/reinhart1010/ham/
    icon: bi bi-github
    target: _blank
  - title: Issues List
    url: https://github.com/reinhart1010/ham/issues/
    icon: bi bi-bug
    target: _blank
  - title: Discussions
    url: https://github.com/reinhart1010/ham/discussions/
    icon: bi bi-chat-dots
    target: _blank
---

# HAM 🥩
HAM is a Jekyll-based boilerplate template for generating better, static wiki-style websites. HAM can be instantly used to build static wiki pages. But the best of all, the default theme of HAM can be easily customized to create more personalized wiki pages, unlike those from MediaWiki, for example.

This project is built to replace the current, MediaWiki installation at <hackapedia.reinhart1010.id> after I found out difficult to create custom styles for it, while other, Git-based alternatives such as GitHub Wiki sucks (no, really) and may not support self-hosting on shared hosting providers.

## What does HAM stand for?
HAM is short for:

+ Hackapedia's Abstraction Machine
+ HAM Ain't MediaWiki
+ [Halfmoon] and Markdown
+ && i++ (can we get more pull requests to add more stuff into this list?)

## Features
### What HAM is
- [x] A static-site wiki generator
- [x] A better alternative than GitHub pages
- [x] Highly customizable through [Halfmoon] and [Jekyll]
- [x] Uses GitHub-Flavored Markdown (GFM)
- [x] Optimized for GitHub Pages and GitLab Pages

### What HAM isn't
- [ ] Optimized for large wiki content (this is where advanced alternatives such as [MediaWiki] excels at)
- [ ] Built-in support for hosting content written in MediaWiki markup syntax (however there are converters to Markdown)
- [ ] Supported in legacy web browsers (see [Compatibility](#browser-compatibility))

### What HAM would be
- [ ] Supporting Forem (DEV.to) liquid tags (YouTube embeds, Twitter posts, etc.)

## Usage
### For [GitHub Pages](https://pages.github.com)
If you would like to add this theme into your GitHub Pages website, please just add the following on your `_config.yml`

```
remote_theme: reinhart1010/HAM
```

Note that this instruction will only work if you still opt in to GitHub Pages' "classic" experience - the same old workflow without having to write your own GitHub Actions. Users who opt in to use GitHub Actions instead should install this as a regular Gem-based theme.

The best part of this is that you can get the latest version of HAM without manually requiring it on your Gemfile, as long as you have updated your page frequently (GitHub will fetch the current available version of the HAM "theme").

### As a Gem-based theme
HAM is also available as a [Gem-based theme](https://rubygems.org/gems/jekyll-ham) on the official Ruby gems repository. If you are unsure on installing gem-based themes like this one, check out the [official Jekyll documentation](https://jekyllrb.com/docs/themes/#installing-a-theme) for that.

If you have just created a new site with `jekyll new <PATH>` chances are that you're using the default, Minima theme instead of HAM. If that's the case, replace the line which begins with

```gemspec
gem "minima"
```

on your `Gemfile` with

```gemspec
gem "jekyll-ham", "~> 0.2.3"
```

Also don't forget to change the `theme` configuration on your `_config.yml` to `jekyll-ham` instead of `minima`.

### Site does not load properly after first `jekyll build`?
In previous versions of HAM (0.1.5 and earlier), all of your Markdown and HTML files must include the following frontmatter:

```yaml
---
layout: page
---
```

However, as of 0.1.6 `jekyll-optional-front-matter` has been included and configured by default to remove this requirement, which allows easier content migration for future wikis.

### Changing the `_config.yml`
HAM also introduces additional configuration which you can set on your `_config.yml`:

```yaml
ham:
  site_icon: https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u1f969.svg # Your site icon, to be displayed on navbar
  site_favicon: null # Your site favicon, in case you have a spare favicon.ico for it
  contributing: # Additional metadata for "Contribute to This Page" section on sidebar
    discuss: # For "Discuss" (or "Talk page" on MediaWiki)
      type: url # Currently supports "url". Support for other discussion widgets such as DiscussBot (Telegram), Disqus, and Utteranc.es are coming soon.
      url: https://github.com/reinhart1010/HAM/discussions/
    view_source_base_url: https://github.com/reinhart1010/HAM/blob/main/ # The base URL to publicly view the original (Markdown) source code
    issue_url: https://github.com/reinhart1010/HAM/issues/ # The URL to report an issue related to site or content
```

## Browser Compatibility
HAM heavily uses [Halfmoon] CSS framework on the generated page due to its theming flexibility based on CSS variables. However, that comes with a cost: **CSS variables are not supported in old browsers**. If you're thinking of Internet Explorer 11, well, don't think too far, because this exact feature may not be supported on some smart TV models, too! There are plans to either include a JavaScript-based polyfill or fallback CSS for this, but I might want to do that later.

[Halfmoon]: https://gethalfmoon.com
[Jekyll]: https://jekyllrb.com
[MediaWiki]: https://mediawiki.org

## Credits & Open Source Licenses
Copyright (c) 2022 Reinhart Previano Koentjoro.

This project is distributed under MIT License, and also uses the following open-source components:

+ Bootstrap Icons (<https://github.com/twbs/icons>) - Copyright (c) 2019-2022 The Bootstrap Authors, MIT License
+ Halfmoon (<https://github.com/halfmoonui/halfmoon>) - Copyright (c) 2020 Halfmoon UI, MIT License
+ OneDarkJekyll (<https://github.com/mgyongyosi/OneDarkJekyll>) - Copyright (c) 2016 Mihály Gyöngyösi, MIT License
+ Simple-Jekyll-Search (<https://github.com/christian-fei/Simple-Jekyll-Search>) - Copyright (c) 2015 Christian Fei, MIT License
