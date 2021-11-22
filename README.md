---
layout: page
title: Main Page
further_reading:
  - title: Official Documentation
    url: https://reinhart1010.github.io/ham-docs/
    target: _blank
external_links:
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

This project is built to replace the current, MediaWiki installation at hackapedia.reinhart1010.id after I found out difficult to create custom styles for it, while other, Git-based alternatives such as GitHub Wiki sucks (no, really) and may not support self-hosting on shared hosting providers.

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
- [x] Optimized for GitHub Pages and Gitlab Pages

### What HAM isn't
- [ ] Optimized for large wiki content (this is where advanced alternatives such as [MediaWiki] excels at)
- [ ] Built-in support for hosting content written in MediaWiki markup syntax (however there are converters to Markdown)
- [ ] Supported in legacy web browsers (see [Compatibility](#browser-compatibility))

### What HAM would be
- [ ] Supporting Forem (DEV.to) liquid tags (YouTube embeds, Twitter posts, etc.)

## Browser Compatibility
HAM heavily uses [Halfmoon] CSS framework on the generated page due to its theming flexibility based on CSS variables. However, that comes with a cost: **CSS variables are not supported in old browsers**. If you're thinking of Internet Explorer 11, well, don't think too far, because this exact feature may not be supported on some smart TV models, too! There are plans to either include a JavaScript-based polyfill or fallback CSS for this, but I might want to do that later.

[Halfmoon]: https://gethalfmoon.com
[Jekyll]: https://jekyllrb.com
[MediaWiki]: https://mediawiki.org
