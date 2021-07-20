import chai from "chai";

const { expect } = chai;
const ProductPage = function (page){
    const addToCartButton = '.btn-success';

    this.isAddToCartButtonPresent = async function(){
        expect(addToCartButton).to.exist;
    }

    this.getAddToCartText = async function(){
        return await page.textContent(addToCartButton);
    }
}

export { ProductPage };
