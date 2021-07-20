import chai from 'chai';

const { expect } = chai;
const LoginPage = function (page){
    const signUpButton = 'text=New customers click here';
    const emailInput = 'input[type=\'email\']';
    const passwordInput = 'input[type=\'password\']';
    const signInButton = 'button[value=\'Sign In\']';
    const alertLabel = '#notices';

    this.login = async function (login, password){
        await page.waitForSelector(signUpButton);
        await page.fill(emailInput, login);
        await page.fill(passwordInput, password);
        await page.click(signInButton);
        await page.waitForLoadState('networkidle');
    };

    this.isErrorShown = async function(){
        expect(alertLabel).to.exist;
    };

    this.getErrorText = async function(){
        return  await page.textContent(alertLabel);
    }
}

export { LoginPage };
