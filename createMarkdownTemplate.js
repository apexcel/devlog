const readline = require('readline');
const fs = require('fs');
const path = require('path');

const questions = ['location', 'filename', 'title', 'category', 'tags']
const askQuestion = (rl, question) => new Promise(resolve => rl.question(
    question, ans => resolve(ans)
))

const ask = () => {
    return new Promise(async resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let postInfo = {};

        for (const q of questions) {
            const res = await askQuestion(rl, `${q}: `);
            postInfo[q] = res;
        }
        postInfo = { ...postInfo, tags: postInfo.tags.split(',').map(v => v.trim()) };
        postInfo['date'] = new Date().toISOString();
        rl.close();
        resolve(postInfo);
    })
};

(async () => {
    let postInfo;
    await ask().then(res => postInfo = res);
    const where = path.resolve(__dirname, `${postInfo['location'] ? postInfo['location'] : __dirname}/${postInfo['filename']}.md`);
    const data = `
---
title: "${postInfo.title}"
tags: [${postInfo.tags}]
category: "${postInfo.category}"
date: "${postInfo.date}"
---
`.trim();
    fs.writeFile(where, data, (err) => {
        if (err) console.error(err);
        process.exit();
    })
})();