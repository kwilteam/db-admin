import { chromium, Browser, Page } from "playwright"
import { write } from "clipboardy"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

let envPath = path.resolve(process.cwd(), ".env.test.local")

if (!fs.existsSync(envPath)) {
  envPath = path.resolve(process.cwd(), ".env.test")
}

dotenv.config({
  path: envPath,
})

let browser: Browser
let page: Page
let schemaName: string
let schemaFilePath: string
let schemaContent: string

const baseUrl = process.env.NEXT_PUBLIC_TEST_URL

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_TEST_URL is not set")
}

beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
  })
  page = await browser.newPage()

  // create random schema name
  schemaName = `test_schema_${Math.floor(Math.random() * 10000)}`
  schemaFilePath = path.join(__dirname, "test_schema.kf") // replace with your schema file path
  schemaContent = fs.readFileSync(schemaFilePath, "utf-8")
  // replace the ##DATABASE_NAME## with your database name
  schemaContent = schemaContent.replace(/##DATABASE_NAME##/g, schemaName)

  await page.goto(`${baseUrl}`)
  console.log("Navigated to databases page")

  const ideLink = await page.waitForSelector('[test-id="nav-item-IDE"]')
  await ideLink.click()
  console.log("Clicked on IDE link")
})

afterAll(async () => {
  await browser.close()
})

test("create schema test", async () => {
  try {
    const newSchemaIcon = await page.waitForSelector(
      '[test-id="create-new-schema"]',
    )
    await newSchemaIcon.click()
    console.log("Clicked on newSchemaIcon")

    const inputElement = await page.waitForSelector("input")

    await inputElement.fill(schemaName)
    console.log(`Filled input with '${schemaName}'`)
    await page.keyboard.press("Enter")
    console.log("Pressed Enter")

    await page.waitForSelector(".monaco-editor")
    // Write the schema content to the clipboard
    await write(schemaContent)

    // Focus the Monaco Editor
    await page.click(".monaco-editor")

    // Check the platform
    const isMac = process.platform === "darwin"
    // Paste the content from the clipboard
    await page.keyboard.press(isMac ? "Meta+v" : "Control+v")

    console.log("Filled Editor with schema content")

    const deployButton = await page.waitForSelector("text=Deploy")
    await deployButton.click()

    const deployAlert = await page.waitForSelector('[test-id="deploy-outcome"]')
    expect(await deployAlert.isVisible()).toBeTruthy()
    expect(await deployAlert.textContent()).toContain("deployed")
  } catch (error) {
    const screenshotPath = path.join(
      __dirname,
      "screenshots",
      `create_schema_test_failure_${new Date().toISOString()}.png`,
    )
    await page.screenshot({ path: screenshotPath })
    throw error
  }
}, 15000)

test("delete schema test", async () => {
  try {
    const schemaItem = await page.waitForSelector(
      `[test-id="schema-item-${schemaName}"]`,
    )
    expect(await schemaItem.isVisible()).toBeTruthy()
    await schemaItem.hover()
    console.log("Hovered on schemaItem")

    const schemaItemDelete = await page.waitForSelector(
      `[test-id="schema-item-${schemaName}-delete"]`,
    )

    // Add the event listener before the action that triggers the dialog
    page.on("dialog", async (dialog) => {
      console.log("Dialog message: ", dialog.message())
      await dialog.accept()
      console.log("Confirmed deleteSchema")
    })

    await schemaItemDelete.click()
    console.log("Clicked on deleteSchema")

    // Wait for the schema item to be removed from the DOM
    await page.waitForSelector(`[test-id="schema-item-${schemaName}"]`, {
      state: "detached",
    })
    console.log("Schema deleted")
  } catch (error) {
    const screenshotPath = path.join(
      __dirname,
      "screenshots",
      `delete_schema_test_failure_${new Date().toISOString()}.png`,
    )
    await page.screenshot({ path: screenshotPath })
    throw error
  }
})
