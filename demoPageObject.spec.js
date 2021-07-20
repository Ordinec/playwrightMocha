import chai from 'chai';
import { goto, run, stop } from './lib/browser';
import { app } from "./framework/pages";

const { expect } = chai;

describe('First suite', () => {
    let page;
    const baseUrl = 'https://demo.litecart.net/';
    beforeEach(async () => {
        await run();
        page = await goto(baseUrl);
    })
    afterEach(async () => {
        await stop();
    })
    it('Go to product page', async () => {
        await app(page).MainPage().goToRandomPopularProduct();
        await app(page).ProductPage().isAddToCartButtonPresent();
        const addToCartButtonText = await app(page).ProductPage().getAddToCartText();
        expect(addToCartButtonText).equals('Add To Cart');
    })
    it('Invalid Login attempt', async () => {
        await app(page).MainPage().openLoginForm();
        await app(page).LoginPage().login("test@test.com", "123123123");
        await app(page).LoginPage().isErrorShown();
        const errorText = await app(page).LoginPage().getErrorText();
        expect(errorText).to.contain('The email does not exist in our database');
    })
    it('Customer Services section', async () => {
        await app(page).MainPage().goToCustomerService();
        await app(page).CustomerServicePage().isContactUsPresent();

        await app(page).CustomerServicePage().openCookiePolicySection();
        await app(page).CustomerServicePage().isSectionShown();
        let sectionTitle = await app(page).CustomerServicePage().getSectionTitle();
        expect(sectionTitle).to.equals('Cookie Policy');

        await app(page).CustomerServicePage().openDeliverySection();
        await app(page).CustomerServicePage().isSectionShown();
        sectionTitle = await app(page).CustomerServicePage().getSectionTitle();
        expect(sectionTitle).to.equals('Delivery Information');

        await app(page).CustomerServicePage().openPrivacyPolicySection();
        sectionTitle = await app(page).CustomerServicePage().getSectionTitle();
        expect(sectionTitle).to.equals('Privacy Policy');

        await app(page).CustomerServicePage().openTermsPurchaseSection();
        await app(page).CustomerServicePage().isSectionShown();
        sectionTitle = await app(page).CustomerServicePage().getSectionTitle();
        expect(sectionTitle).to.equals('Terms of Purchase');
    })
    it('Empty search result', async () => {
        const searchValue = '123123123';
        await app(page).MainPage().performSearch(searchValue)
        await app(page).MainPage().isSearchResultShown();
        const searchResultTitle = await app(page).MainPage().getSearchResultTitle();
        expect(searchResultTitle).to.equals('Search Results for "' + searchValue + '"');
        const emptySearchResultLabel = await app(page).MainPage().getEmptySearchResultLabel();
        expect(emptySearchResultLabel).to.equals('No matching results');
    })
    it('Open manufacturers', async () => {
        const manufacturer = 'ACME Corp.';
        await app(page).MainPage().filterByManufacturer(manufacturer);
        await app(page).MainPage().isFilteredByManufacturer();
        const manufacturerTitle = await app(page).MainPage().getManufacturerTitle();
        expect(manufacturerTitle).equals(manufacturer)
    })
    it('Open categories', async () => {
        const category = 'Rubber Ducks';
        await app(page).MainPage().openCategory(category);
        await app(page).MainPage().isCategoriesOpened();
        const categoryTitle = await app(page).MainPage().getCategoryTitle();
        expect(categoryTitle).equals(category)
    })
    it('Check home icon navigation', async () => {
        await app(page).MainPage().goToCustomerService();
        await app(page).CustomerServicePage().clickHomeIcon();
        expect(await page.url()).equals(baseUrl);
    })
    it('Open subcategory', async () => {
        const category = 'Rubber Ducks';
        const subCategory = 'Subcategory';
        await app(page).MainPage().openCategory(category);
        const categoryTitle = await app(page).MainPage().getCategoryTitle();
        expect(categoryTitle).equals(category)

        await app(page).MainPage().openSubCategory(subCategory);
        const subCategoryTitle = await app(page).MainPage().getCategoryTitle();
        expect(subCategoryTitle).equals(subCategory);
    })
    it('Breadcrumb navigation', async () => {
        const category = 'Rubber Ducks';
        const subCategory = 'Subcategory';
        await app(page).MainPage().openCategory(category);

        await app(page).MainPage().openSubCategory(subCategory);
        await app(page).MainPage().clickOnBreadcrumb(category);
        const categoryTitle = await app(page).MainPage().getCategoryTitle();
        expect(categoryTitle).equals(category)

        await app(page).MainPage().clickOnBreadcrumb("Home");
        expect(await page.url()).equals(baseUrl);
    })
    it('Open About Us', async () => {
        await app(page).MainPage().openAboutUsPage();
        expect(await page.url()).equals("https://demo.litecart.net/about-us-i-1");
    })
})
