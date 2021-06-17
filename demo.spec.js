import chai from 'chai';
import { goto, run, stop } from './framework/lib/browser';

const { expect } = chai;

describe('First suite', () => {
    let page;
    beforeEach(async () => {
        await run();
        page = await goto('https://demo.litecart.net/');
    })
    afterEach(async () => {
        await stop();
    })
    it('Go to product page', async () => {
        await page.click('#box-popular-products .product-column');
        await page.waitForLoadState('networkidle');

        const addToCartButton = '.btn-success';
        expect(addToCartButton).to.exist;

        const addToCartButtonText = await page.textContent(addToCartButton);
        expect(addToCartButtonText).to.equals('Add To Cart');
    })
    it('Invalid Login attempt', async () => {
        await page.click('li.account.dropdown');
        await page.waitForLoadState('networkidle');

        const signUpButton = 'text=New customers click here';
        await page.waitForSelector(signUpButton);
        await page.fill('input[type=\'email\']', 'test@test.com');
        await page.fill('input[type=\'password\']', '123123');
        await page.click('button[value=\'Sign In\']');
        await page.waitForLoadState('networkidle');
        expect('#notices').to.exist

        const alertText = await page.textContent('#notices');
        expect(alertText).to.contain('The email does not exist in our database');
    })
    it('Customer Services section', async () => {
        await page.click('li.customer-service');
        await page.waitForLoadState('networkidle');

        expect('section#box-contact-us').to.exist;

        await page.click('#box-information-links .page-2');
        await page.waitForLoadState('networkidle');

        expect('section#box-customer-service').to.exist;
        expect(await page.textContent('section#box-customer-service > h1')).to.equals('Cookie Policy');

        await page.click('#box-information-links .page-5');
        await page.waitForLoadState('networkidle');

        expect('section#box-customer-service').to.exist;
        expect(await page.textContent('section#box-customer-service > h1')).to.equals('Delivery Information');

        await page.click('#box-information-links .page-3');
        await page.waitForLoadState('networkidle');

        expect('section#box-customer-service').to.exist;
        expect(await page.textContent('section#box-customer-service > h1')).to.equals('Privacy Policy');

        await page.click('#box-information-links .page-4');
        await page.waitForLoadState('networkidle');

        expect('section#box-customer-service').to.exist;
        expect(await page.textContent('section#box-customer-service > h1')).to.equals('Terms of Purchase');
    })
    it('Empty search result', async () => {
        const searchValue = '123123123';
        await page.fill('[type=\'search\']', searchValue)
        await page.keyboard.press('Enter')
        await page.waitForLoadState('networkidle');

        expect('#box-search-results').to.exist;
        expect(await page.textContent('#box-search-results > h1')).to
            .equals('Search Results for "' + searchValue + '"');
        expect(await page.textContent('#box-search-results > div > em')).to.equals('No matching results');
    })
    it('Open manufacturers', async () => {
        const manufacturer = 'ACME Corp.';
        await page.click('.manufacturers.dropdown');
        await page.waitForSelector('text=' + manufacturer);
        await page.click('text=' + manufacturer);
        await page.waitForLoadState('networkidle');

        expect('#box-manufacturer').to.exist;
        expect(await page.textContent('#box-manufacturer .title')).to.equals(manufacturer);
    })
})
