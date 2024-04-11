import BasePage from "../BasePage";

export class WelcomePage extends BasePage{
    constructor(page){
        super(page, "/", );
        this.page = page;

    }

    async clickSignUp() {
        await this.page.getByRole('button', {name: 'Sign up'}).click();
    }

}