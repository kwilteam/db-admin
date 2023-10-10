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

describe("Schema tests", () => {
  test("create schema test", async () => {
    await createSchemaTest()
  }, 30000)

  test("verify schema tables & actions test", async () => {
    await verifySchemaTablesAndActionsTest()
  }, 15000)

  test("delete schema test", async () => {
    await deleteSchemaTest()
  })
})

async function createSchemaTest() {
  try {
    await page.goto(`${baseUrl}/ide`)
    await createNewSchema()
    await fillSchemaName()
    await writeSchemaContent()
    await deploySchema()
    await verifyDeployment()
  } catch (error) {
    await saveScreenshot("create_schema_test_failure")
    throw error
  }
}

async function verifySchemaTablesAndActionsTest() {
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
    await verifyDatabaseExplorer()
    await loadSchema(databaseItemId)
    await clickTables(databaseTableItemId)
    await clickMessagesTable(greetingsTableId)
    await verifyNoDataAlert()
    await clickActions(databaseActionItemId)
    await clickInsertMessagesAction(insertMessageActionId)
    await enterIdValue(insertMessageIdInputId, insertMessageIdInputValue)
    await enterMessageValue(
      insertMessageMessageInputId,
      insertMessageMessageInputValue,
    )
    await executeAction()
    await verifyActionExecution()
    await clickMessagesTable(greetingsTableId)
    await verifyDataInTable(
      insertMessageIdInputValue,
      insertMessageMessageInputValue,
    )
  } catch (error) {
    await saveScreenshot("verify_schema_creation_test_failure")
    throw error
  }
}

async function deleteSchemaTest() {
  try {
    await page.goto(`${baseUrl}/ide`)
    await deleteSchema()
  } catch (error) {
    await saveScreenshot("delete_schema_test_failure")
    throw error
  }
}

// Helper functions for createSchemaTest
async function createNewSchema() {
  const newSchemaIcon = await page.waitForSelector(
    '[test-id="create-new-schema"]',
  )
  await newSchemaIcon.click()
}

async function fillSchemaName() {
  const inputElement = await page.waitForSelector("input")
  await inputElement.fill(schemaName)
  await page.keyboard.press("Enter")
}

async function writeSchemaContent() {
  await page.waitForSelector(".monaco-editor")
  await write(schemaContent)
  await page.click(".monaco-editor")
  const isMac = process.platform === "darwin"
  await page.keyboard.press(isMac ? "Meta+v" : "Control+v")
}

async function deploySchema() {
  const deployButton = await page.waitForSelector("text=Deploy")
  await deployButton.click()
}

async function verifyDeployment() {
  const deployAlert = await page.waitForSelector('[test-id="deploy-outcome"]')
  expect(await deployAlert.isVisible()).toBeTruthy()
  expect(await deployAlert.textContent()).toContain("deployed")
}

// Helper functions for verifySchemaTablesAndActionsTest
async function verifyDatabaseExplorer() {
  const explorer = await page.waitForSelector('[test-id="database-explorer"]')
  expect(await explorer.isVisible()).toBeTruthy()
}

async function loadSchema(databaseItemId: string) {
  const databaseItem = await page.waitForSelector(
    `[test-id="${databaseItemId}"]`,
  )
  await databaseItem.click()
}

async function clickTables(databaseTableItemId: string) {
  const databaseTableItem = await page.waitForSelector(
    `[test-id="${databaseTableItemId}"]`,
  )
  await databaseTableItem.click()
}

async function clickMessagesTable(greetingsTableId: string) {
  const databaseTableMessages = await page.waitForSelector(
    `[test-id="${greetingsTableId}"]`,
  )
  await databaseTableMessages.click()
}

async function verifyNoDataAlert() {
  const noDataAlert = await page.waitForSelector(`[test-id="alert-info"]`)
  expect(await noDataAlert.isVisible()).toBeTruthy()
  expect(await noDataAlert.textContent()).toContain("No data found")
}

async function clickActions(databaseActionItemId: string) {
  const databaseActionItem = await page.waitForSelector(
    `[test-id="${databaseActionItemId}"]`,
  )
  await databaseActionItem.click()
}

async function clickInsertMessagesAction(insertMessageActionId: string) {
  const databaseActionInsertMessages = await page.waitForSelector(
    `[test-id="${insertMessageActionId}"]`,
  )
  await databaseActionInsertMessages.click()
}

async function enterIdValue(
  insertMessageIdInputId: string,
  insertMessageIdInputValue: string,
) {
  const insertMessageIdInput = await page.waitForSelector(
    `[test-id="${insertMessageIdInputId}"]`,
  )
  await insertMessageIdInput.fill(insertMessageIdInputValue)
}

async function enterMessageValue(
  insertMessageMessageInputId: string,
  insertMessageMessageInputValue: string,
) {
  const insertMessageMessageInput = await page.waitForSelector(
    `[test-id="${insertMessageMessageInputId}"]`,
  )
  await insertMessageMessageInput.fill(insertMessageMessageInputValue)
}

async function executeAction() {
  const executeButton = await page.waitForSelector("[test-id=execute-action]")
  await executeButton.click()
}

async function verifyActionExecution() {
  const successAlert = await page.waitForSelector(`[test-id="alert-success"]`)
  expect(await successAlert.isVisible()).toBeTruthy()
  expect(await successAlert.textContent()).toContain(
    "Action executed successfully.",
  )
}

async function verifyDataInTable(
  insertMessageIdInputValue: string,
  insertMessageMessageInputValue: string,
) {
  const dataTable = await page.waitForSelector(`[test-id="data-table"]`)
  expect(await dataTable.isVisible()).toBeTruthy()
  expect(await dataTable.textContent()).toContain(insertMessageIdInputValue)
  expect(await dataTable.textContent()).toContain(
    insertMessageMessageInputValue,
  )
}

// Helper functions for deleteSchemaTest
async function deleteSchema() {
  const schemaItem = await page.waitForSelector(
    `[test-id="schema-item-${schemaName}"]`,
  )
  expect(await schemaItem.isVisible()).toBeTruthy()
  await schemaItem.hover()
  const schemaItemDelete = await page.waitForSelector(
    `[test-id="schema-item-${schemaName}-delete"]`,
  )
  page.on("dialog", async (dialog) => {
    await dialog.accept()
  })
  await schemaItemDelete.click()
  await page.waitForSelector(`[test-id="schema-item-${schemaName}"]`, {
    state: "detached",
  })
}