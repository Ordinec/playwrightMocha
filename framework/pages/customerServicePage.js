import chai from "chai";

const { expect } = chai;
const CustomerServicePage = function (page){
    const contactUsButton = 'section#box-contact-us';
    const cookiePolicyButton = '#box-information-links .page-2';
    const mainSectionBlockLabel = 'section#box-customer-service';
    const sectionHeaderLabel = 'section#box-customer-service > h1';
    const deliveryButton = '#box-information-links .page-5';
    const termsPurchaseButton = '#box-information-links .page-4';
    const privacyPolicyButton = '#box-information-links .page-3';
    const homeIcon = 'i.fa-home';

    this.isContactUsPresent = async function(){
        expect(contactUsButton).to.exist;
    }

    this.openCookiePolicySection = async function(){
        await page.click(cookiePolicyButton);
        await page.waitForLoadState('networkidle');
    }

    this.isSectionShown = async function(){
        expect(mainSectionBlockLabel).to.exist;
    }

    this.getSectionTitle = async function(){
        return await page.textContent(sectionHeaderLabel);
    }

    this.openDeliverySection = async function(){
        await page.click(deliveryButton);
        await page.waitForLoadState('networkidle');
    }

    this.openPrivacyPolicySection = async function(){
        await page.click(privacyPolicyButton);
        await page.waitForLoadState('networkidle');
    }

    this.openTermsPurchaseSection = async function(){
        await page.click(termsPurchaseButton);
        await page.waitForLoadState('networkidle');
    }

    this.clickHomeIcon = async function(){
        await page.click(homeIcon);
        await page.waitForLoadState('networkidle');
    }
}

export { CustomerServicePage };
