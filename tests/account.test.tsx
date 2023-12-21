import { EnumAccountType } from "@/utils/admin/schema"
import { browser, page, baseUrl, saveScreenshot } from "../setupTests"

let walletAddress: string

beforeAll(() => {
  walletAddress = "0xbE2A33fCfB32a7eb0911bD05F44dFCCCA71cEe9A"
})

afterAll(async () => {
  await browser.close()
})

describe("Account tests", () => {
  test("create account test", async () => {
    try {
      // Navigate to the accounts page
      await navigateToAccountCreate()

      // Fill in form
      await completeAccountForm()

      // Verify account was created
      await verifyAccountCreated()
    } catch (error) {
      await saveScreenshot("create_account_test_failure")
      throw error
    }
  }, 10000)

  test("delete account test", async () => {
    await deleteAccountTest()
  }, 15000)
})

async function navigateToAccountCreate() {
  await page.goto(`${baseUrl}/settings/accounts`)
  const newAccountBtn = await page.waitForSelector(
    `[test-id="new-account-btn"]`,
  )
  await newAccountBtn.click()
}

async function completeAccountForm() {
  // Fill out form
  const nameInput = await page.waitForSelector(`[test-id="account-name-input"]`)
  await nameInput.fill("Wallet Account")

  // Account  type select
  const accountTypeSelect = await page.waitForSelector(
    `[test-id="account-type-select"]`,
  )

  await accountTypeSelect.selectOption({
    value: "1", // 1 is wallet account
  })

  // Account address input
  const accountAddressInput = await page.waitForSelector(
    `[test-id="account-address-input"]`,
  )
  await accountAddressInput.fill(walletAddress)

  // Submit form
  const submitBtn = await page.waitForSelector(`[test-id="submit-account-btn"]`)
  await submitBtn.click()
}

async function verifyAccountCreated() {
  // Ensure the new account address is visible on the screen
  const accountsTable = await page.waitForSelector(`[test-id="accounts-table"]`)
  const tableContent = await accountsTable.textContent()

  console.log("verifyAccountCreated 3")

  expect(tableContent).toContain(walletAddress)
}

async function deleteAccountTest() {
  const deleteAccountTestId = `[test-id="delete-account-${walletAddress}"]`
  const walletAccountDeleteBtn = await page.waitForSelector(deleteAccountTestId)
  await walletAccountDeleteBtn.click()

  await page.waitForSelector(deleteAccountTestId, {
    state: "detached",
  })
}
