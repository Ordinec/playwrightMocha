import { goto, run, stop } from './framework/lib/browser';

describe('Demo suite', () => {
    let page;
    beforeEach(async () => {
        await run();
        page = await goto('https://try.vikunja.io/login');
    })
    afterEach(async () => {
        await stop();
    })
    it('Demo test', async () => {

    })
})
