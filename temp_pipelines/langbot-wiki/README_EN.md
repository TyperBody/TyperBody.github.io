# [LangBot](https://github.com/langbot-app/LangBot) Official Documentation

> This repository is the documentation repository for LangBot. Code repository:  
> [LangBot Code Repository](https://github.com/langbot-app/LangBot)  
> This is the documentation for LangBot 4.0. For 3.0 documentation, please see the `v3` branch

## Contributing to Documentation

The documentation is generated based on [Mintlify](https://mintlify.com/). Local development requires Node.js installation.

Clone this repository and execute the following command in the directory to install dependencies:

```bash
npm install
```

After completion, you can modify the documentation. After modifications, use the following command to start locally:

```bash
npm run dev
```
Or use the `mintlify` CLI directly (recommended):
```bash
npx mintlify dev
```

### Using Images

Place images in the `images` directory, then reference them using the absolute path (relative to the project root), such as:

```markdown
![image](/images/xxx.png)
```

### Deployment Details

Now hosted on Mintlify. Commits to the `main` branch trigger automatic deployment.

### Some Standardization Guidelines

- Folder and file naming: **Use all lowercase, separate words with `-`, such as** `plugin-intro.mdx`
- Sub-file (folder) naming: **No prefix** (i.e., the folder name), such as: in the `deploy` folder, the folder `langbot`, the `manual` file in the `langbot` folder is called `manual.mdx`
- Documentation files should use `.mdx` format to support Mintlify components.
- Configure sidebar navigation structure in `docs.json`.

---

**[中文版 README](README.md)**
