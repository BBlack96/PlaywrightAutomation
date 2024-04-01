import { test, expect } from "@playwright/test";

test.describe("Positive auth", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("");
    });

    test('Positive: Successful registration', async ({page}) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.fill('//input[@id=\'signupName\']', 'Bogdan');
        await page.fill('//input[@id=\'signupLastName\']', 'Chornyi');
        await page.fill('//input[@id=\'signupEmail\']', 'aqa-bogdan@example.com');
        await page.fill('//input[@id=\'signupPassword\']', 'Vestell1200');
        await page.fill('//input[@id=\'signupRepeatPassword\']', 'Vestell1200');
        await page.click('//button[normalize-space()=\'Register\']');
        await expect(page.getByRole('heading')).toContainText('Garage');
        await page.getByRole('link', {name: ' Settings'}).click();
        await page.getByRole('button', {name: 'Remove my account'}).click();
        await page.getByRole('button', {name: 'Remove'}).click();

    });
})

test.describe("Negative auth", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("");
    });

    test('Negative: Registration with a wrong name', async ({page}) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.fill('//input[@id=\'signupName\']', 'test 😂');
        await page.fill('//input[@id=\'signupLastName\']', 'Chornyi');
        await page.fill('//input[@id=\'signupEmail\']', 'aqa-bogdan@example.com');
        await page.fill('//input[@id=\'signupPassword\']', 'Vestell1200');
        await page.fill('//input[@id=\'signupRepeatPassword\']', 'Vestell1200');
        await expect(page.getByRole('paragraph')).toContainText('Name is invalid');
    });

    test('Negative: Different passwords', async ({page}) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.fill('//input[@id=\'signupName\']', 'Bogdan');
        await page.fill('//input[@id=\'signupLastName\']', 'Chornyi');
        await page.fill('//input[@id=\'signupEmail\']', 'aqa-bogdan@example.com');
        await page.fill('//input[@id=\'signupPassword\']', 'Vestell1200');
        await page.fill('//input[@id=\'signupRepeatPassword\']', 'Vestell1100');
        await expect(page.getByRole('paragraph')).toContainText('Passwords do not match');
    });

    test('Negative: Name length more than 20 characters', async ({page}) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.fill('//input[@id=\'signupName\']', 'ThisIsMyLengthTestForNameInput');
        await page.fill('//input[@id=\'signupLastName\']', 'Chornyi');
        await page.fill('//input[@id=\'signupEmail\']', 'aqa-bogdan@example.com');
        await page.fill('//input[@id=\'signupPassword\']', 'Vestell1200');
        await page.fill('//input[@id=\'signupRepeatPassword\']', 'Vestell1100');
        await expect(page.locator('form')).toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Negative: Last name length more than 20 characters', async ({page}) => {
        await page.getByRole('button', {name: 'Sign up'}).click();
        await page.fill('//input[@id=\'signupName\']', 'Bogdan');
        await page.fill('//input[@id=\'signupLastName\']', 'ThisIsMyLengthTestForLastNameInput');
        await page.fill('//input[@id=\'signupEmail\']', 'aqa-bogdan@example.com');
        await page.fill('//input[@id=\'signupPassword\']', 'Vestell1200');
        await page.fill('//input[@id=\'signupRepeatPassword\']', 'Vestell1100');
        await expect(page.locator('form')).toContainText('Last name has to be from 2 to 20 characters long');
    });
})