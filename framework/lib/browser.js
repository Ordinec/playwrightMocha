import { chromium } from 'playwright';

let browser;
let context;
let page;

async function goto(url){
    await page.goto(url);
    return page;
}

async function run(){
    browser = await chromium.launch({
        headless: true,
        slowMo: 1000,
    });
    context = await browser.newContext();
    page = await context.newPage();
}

async function stop(){
    await page.close();
    await browser.close();
}

export { goto, run, stop }
