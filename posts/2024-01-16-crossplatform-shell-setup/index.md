---
title: "Cross-platform shell setup for Linux and Windows"
description: "Sharing configuration across Fish, Zsh, and PowerShell with Aliae and Chezmoi"
draft: true
---

In the past few months I adopted Windows as my daily work system, while keeping Linux for personal projects. The experience of working in terminal on Windows is quite decent, thanks to [Windows Terminal](https://github.com/microsoft/terminal) and [PowerShell](https://github.com/PowerShell/PowerShell). Switching between systems, I've tried to use my custom aliases into PowerShell again and again, only to find them not to work. I could migrate them manually, but when I added [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/) as a third environment, replicating the shell setup were too much of hassle.

I ended up using a bunch of different projects, in summary:

- [aliae] for cross-platform shell management, handling aliases, custom functions, and environment variables,
- [chezmoi] for managing configuration files (dotfiles, if you will) across different machines through a git repository,
- some additional utilities like [eza] for better directory listing, and [zoxide] for quick jumping between commonly used directories.

[aliae]: https://aliae.dev/
[chezmoi]: https://www.chezmoi.io/
[eza]: https://eza.rocks/
[zoxide]: https://github.com/ajeetdsouza/zoxide
