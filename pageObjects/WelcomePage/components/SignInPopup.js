import BaseComponent from "../../components/BaseComponent";


export class SignInPopup extends BaseComponent {
    _nameInputLocator = "//input[@id='signupName']";
    _lastNameInputLocator = "//input[@id='signupLastName']";
    _emailInputLocator = "//input[@id='signupEmail']";
    _passwordInputLocator = "//input[@id='signupPassword']";
    _repeatPasswordInputLocator = "//input[@id='signupRepeatPassword']";
    _signInButtonLocator = "//button[normalize-space()='Register']";
    _nameErrorLocator = "//input[@id='signupName']/../div[@class='invalid-feedback']";
    _lastNameErrorLocator = "//input[@id='signupLastName']/../div[@class='invalid-feedback']";
    _emailErrorLocator = "//input[@id='signupEmail']/../div[@class='invalid-feedback']";
    _passwordErrorLocator = "//input[@id='signupPassword']/../div[@class='invalid-feedback']";
    _repeatPasswordErrorLocator = "//input[@id='signupRepeatPassword']/../div[@class='invalid-feedback']";



    constructor(page) {
        super(page, page.locator("//div[@class='modal-content']"))
        this.nameInput = this.container.locator(this._nameInputLocator)
        this.lastNameInput = this.container.locator(this._lastNameInputLocator)
        this.emailInput = this.container.locator(this._emailInputLocator)
        this.passwordInput = this.container.locator(this._passwordInputLocator)
        this.repeatPasswordInput = this.container.locator(this._repeatPasswordInputLocator)
        this.signInButton = this.container.locator(this._signInButtonLocator)
        this.nameError = this.container.locator(this._nameErrorLocator)
        this.lastNameError = this.container.locator(this._lastNameErrorLocator)
        this.emailError = this.container.locator(this._emailErrorLocator)
        this.passwordError = this.container.locator(this._passwordErrorLocator)
        this.repeatPasswordError = this.container.locator(this._repeatPasswordErrorLocator)
    }
}