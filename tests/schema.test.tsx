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

const saveScreenshot = async (fileName: string) => {
  const screenshotPath = path.join(
    __dirname,
    "screenshots",
    `${fileName}_${new Date().toISOString()}.png`,
  )
  await page.screenshot({ path: screenshotPath })
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
})

afterAll(async () => {
  await browser.close()
})

test("create schema test", async () => {
  try {
    await page.goto(`${baseUrl}/ide`)

    const newSchemaIcon = await page.waitForSelector(
      '[test-id="create-new-schema"]',
    )
    await newSchemaIcon.click()

    const inputElement = await page.waitForSelector("input")

    await inputElement.fill(schemaName)
    await page.keyboard.press("Enter")

    await page.waitForSelector(".monaco-editor")
    // Write the schema content to the clipboard
    await write(schemaContent)

    // Focus the Monaco Editor
    await page.click(".monaco-editor")

    // Check the platform
    const isMac = process.platform === "darwin"
    // Paste the content from the clipboard
    await page.keyboard.press(isMac ? "Meta+v" : "Control+v")

    const deployButton = await page.waitForSelector("text=Deploy")
    await deployButton.click()

    const deployAlert = await page.waitForSelector('[test-id="deploy-outcome"]')
    expect(await deployAlert.isVisible()).toBeTruthy()
    expect(await deployAlert.textContent()).toContain("deployed")
  } catch (error) {
    await saveScreenshot("create_schema_test_failure")
    throw error
  }
}, 20000)

test("verify schema tables & actions test", async () => {
  try {
    const tableName = "messages"
    const actionName = "insert_message"
    const databaseItemId = `database-item-${schemaName}`
    const databaseTableItemId = `${databaseItemId}-tables`
    const databaseActionItemId = `${databaseItemId}-actions`
    const greetingsTableId = `${databaseTableItemId}-${tableName}`
    const insertMessageActionId = `${databaseActionItemId}-${actionName}`
    const insertMessageIdInputId = "action-input-$id"
    const insertMessageIdInputValue = "1"
    const insertMessageMessageInputId = "action-input-$message"
    const insertMessageMessageInputValue = "Hello World"

    await page.goto(`${baseUrl}/databases`)

    const explorer = await page.waitForSelector('[test-id="database-explorer"]')
    expect(await explorer.isVisible()).toBeTruthy()

    // Click on the database name to load schema
    const databaseItem = await page.waitForSelector(
      `[test-id="${databaseItemId}"]`,
    )
    await databaseItem.click()

    // Click Tables
    const databaseTableItem = await page.waitForSelector(
      `[test-id="${databaseTableItemId}"]`,
    )
    await databaseTableItem.click()

    // Click messages table
    const databaseTableMessages = await page.waitForSelector(
      `[test-id="${greetingsTableId}"]`,
    )
    await databaseTableMessages.click()

    // There should be no messages
    const noDataAlert = await page.waitForSelector(`[test-id="alert-info"]`)
    expect(await noDataAlert.isVisible()).toBeTruthy()
    expect(await noDataAlert.textContent()).toContain("No data found")

    // Click Actions
    const databaseActionItem = await page.waitForSelector(
      `[test-id="${databaseActionItemId}"]`,
    )
    await databaseActionItem.click()

    // Click insert messages table
    const databaseActionInsertMessages = await page.waitForSelector(
      `[test-id="${insertMessageActionId}"]`,
    )
    await databaseActionInsertMessages.click()

    // Enter ID value
    console.log(
      "Waiting for input",
      insertMessageIdInputId,
      insertMessageIdInputValue,
    )
    const insertMessageIdInput = await page.waitForSelector(
      `[test-id="${insertMessageIdInputId}"]`,
    )
    await insertMessageIdInput.fill(insertMessageIdInputValue)

    // Enter message value
    const insertMessageMessageInput = await page.waitForSelector(
      `[test-id="${insertMessageMessageInputId}"]`,
    )
    await insertMessageMessageInput.fill(insertMessageMessageInputValue)

    // Click Execute Action
    const executeButton = await page.waitForSelector("[test-id=execute-action]")
    await executeButton.click()

    // Await success alert
    const successAlert = await page.waitForSelector(`[test-id="alert-success"]`)
    expect(await successAlert.isVisible()).toBeTruthy()
    expect(await successAlert.textContent()).toContain(
      "Action executed successfully.",
    )

    // Await data in table
    // Go back to messages table
    await databaseTableMessages.click()

    // Check for the presence of the ID value
    const dataTable = await page.waitForSelector(`[test-id="data-table"]`)
    expect(await dataTable.isVisible()).toBeTruthy()
    expect(await dataTable.textContent()).toContain(insertMessageIdInputValue)
    expect(await dataTable.textContent()).toContain(
      insertMessageMessageInputValue,
    )
  } catch (error) {
    await saveScreenshot("verify_schema_creation_test_failure")
    throw error
  }
}, 15000)

test("delete schema test", async () => {
  try {
    await page.goto(`${baseUrl}/ide`)

    const schemaItem = await page.waitForSelector(
      `[test-id="schema-item-${schemaName}"]`,
    )
    expect(await schemaItem.isVisible()).toBeTruthy()
    await schemaItem.hover()

    const schemaItemDelete = await page.waitForSelector(
      `[test-id="schema-item-${schemaName}-delete"]`,
    )

    // Add the event listener before the action that triggers the dialog
    page.on("dialog", async (dialog) => {
      await dialog.accept()
    })

    await schemaItemDelete.click()

    // Wait for the schema item to be removed from the DOM
    await page.waitForSelector(`[test-id="schema-item-${schemaName}"]`, {
      state: "detached",
    })
  } catch (error) {
    await saveScreenshot("delete_schema_test_failure")
    throw error
  }
})
