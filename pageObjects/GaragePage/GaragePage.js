import BasePage from "../BasePage";


export class GaragePage extends BasePage{
    constructor(page) {
        super(page, "/panel/garage")
    }

    async navigateToSettings() {
        const settingsLink = await this.find("//a[@routerlink='settings']");
        await settingsLink.click();
    }

    async removeAccount() {
        const removeAccountButton = await this.findByRole('button', {name: 'Remove my account'});
        await removeAccountButton.click();
        const removeButton = await  this.findByRole('button', {name: 'Remove'});
        await removeButton.click();
    }
}