import BasePage from "../BasePage";

export class WelcomePage extends BasePage{
    constructor(page){
        super(page, "/", );
        this.page = page;
    }

    async fillName(name) {
        await this.page.fill("//input[@id='signupName']", name);
    }

    async clickSignUp() {
        await this.page.getByRole('button', {name: 'Sign up'}).click();
    }

    async fillLastName(lastName) {
        await this.page.fill("//input[@id='signupLastName']", lastName);
    }

    async fillEmail(email) {
        await this.page.fill("//input[@id='signupEmail']", email);
    }

    async fillPassword(password) {
        await this.page.fill("//input[@id='signupPassword']", password);
    }

    async fillRepeatPassword(password) {
        await this.page.fill("//input[@id='signupRepeatPassword']", password);
    }

    async clickRegister() {
        await this.page.click("//button[normalize-space()='Register']");
    }

    async clickEmail() {
        await this.page.click("//input[@id='signupEmail']");
    }
}