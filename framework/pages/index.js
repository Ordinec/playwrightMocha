import { MainPage } from "./mainPage";
import { LoginPage } from "./loginPage";
import { ProductPage } from "./productPage";
import { CustomerServicePage } from  "./customerServicePage";

const app = (page) => ({
    MainPage: () => new MainPage(page),
    LoginPage: () => new LoginPage(page),
    ProductPage: () => new ProductPage(page),
    CustomerServicePage: () => new CustomerServicePage(page)
})

export { app };
