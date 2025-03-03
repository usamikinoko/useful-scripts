const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
    
    const context = await browser.newContext({
        headless: false,
        proxy: {
            server: 'http://localhost:7890'
        }
    });
    const page = await context.newPage();
    
    const targetUrl = 'https://camo.githubusercontent.com/0aef4e409dd02f5ee005eed54312ce4341c417be3ed6fa458140c9d0820671fa/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d7573616d696b696e6f6b6f';
    const loopCount = 10000;

    for (let i = 0; i < loopCount; i++) {
        console.log(`第${i + 1}次访问...`);
        await page.goto(targetUrl);
        await page.waitForTimeout(10);
    }

    await browser.close();
})();
