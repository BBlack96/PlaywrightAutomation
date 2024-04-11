import BasePage from "../BasePage";


export class SettingsPage extends BasePage{
    constructor(page) {
        super(page, "/panel/settings")
    }

    async removeAccount() {
        await this.navigateToSettings()
        const removeAccountButton = await this.findByRole('button', {name: 'Remove my account'});
        await removeAccountButton.click();
        const removeButton = await  this.findByRole('button', {name: 'Remove'});
        await removeButton.click();
    }
}