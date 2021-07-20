import chai from "chai";

const { expect } = chai;
const MainPage = function (page){

    const accountDropdown = 'li.account.dropdown';
    const firstPopularProductButton = '#box-popular-products .product-column';
    const customerServiceButton = 'li.customer-service';
    const searchInput = '[type=\'search\']';
    const searchResultBlockLabel = '#box-search-results';
    const searchResultHeader = '#box-search-results > h1';
    const emptySearchResultTextLabel = '#box-search-results > div > em';
    const manufacturerDropdown = '.manufacturers.dropdown';
    const categoriesDropdown = '.categories.dropdown';
    const manufacturerBlockLabel = '#box-manufacturer';
    const manufacturerBlockTitle = '#box-manufacturer .title';
    const categoryBlockTitle = '#box-category .title';
    const categoriesBlockLabel = '#box-category';
    const aboutUsButton = 'a:has-text("About Us")';

    this.openLoginForm = async function (){
        await page.click(accountDropdown);
        await page.waitForLoadState('networkidle');
    }

    this.goToRandomPopularProduct = async function(){
        await page.click(firstPopularProductButton);
        await page.waitForLoadState('networkidle');
    }

    this.goToCustomerService = async function(){
        await page.click(customerServiceButton);
        await page.waitForLoadState('networkidle');
    }

    this.performSearch = async function (searchValue){
        await page.fill(searchInput, searchValue)
        await page.keyboard.press('Enter')
        await page.waitForLoadState('networkidle');
    }

    this.isSearchResultShown = async function(){
        expect(searchResultBlockLabel).to.exist;
    }

    this.getSearchResultTitle = async function(){
        return await page.textContent(searchResultHeader);
    }

    this.getEmptySearchResultLabel = async function(){
        return await page.textContent(emptySearchResultTextLabel);
    }

    this.filterByManufacturer = async function(manufacturerName){
        await page.click(manufacturerDropdown);
        await page.waitForSelector('text=' + manufacturerName);
        await page.click('text=' + manufacturerName);
        await page.waitForLoadState('networkidle');
    }

    this.isFilteredByManufacturer = async function(){
        expect(manufacturerBlockLabel).to.exist;
    }

    this.getManufacturerTitle = async function(){
        return await page.textContent(manufacturerBlockTitle);
    }

    this.openCategory = async function(categoryName){
        await page.click(categoriesDropdown);
        await page.waitForSelector('text=' + categoryName);
        await page.click('text=' + categoryName);
        await page.waitForLoadState('networkidle');
    }

    this.getCategoryTitle = async function(){
        return await page.textContent(categoryBlockTitle);
    }

    this.isCategoriesOpened = async function(){
        expect(categoriesBlockLabel).to.exist;
    }

    this.openSubCategory = async function(subcategoryName){
        await page.click('text=' + subcategoryName);
        await page.waitForLoadState('networkidle');
    }

    this.clickOnBreadcrumb = async function(categoryName){
        await page.click("ul.breadcrumb li:has-text(\"" + categoryName + "\")")
    }

    this.openAboutUsPage = async function(){
        await page.click(aboutUsButton);
        await page.waitForLoadState('networkidle');
    }
}

export { MainPage };
