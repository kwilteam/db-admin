// Interfaces for Firebird store
export interface IFirebirdAccount {
  created_at?: number
  email: string
  id?: string
  origin?: string
}

// For existing deployments
export interface IFirebirdDeployment {
  config: IFirebirdDeploymentConfig
  created_at: number
  id: string
  status: DeploymentStatus
  updated_at: number
  service_endpoints: {
    kwil_rpc_provider?: string
  }
}

// For building a new deployment from the form
export interface IFirebirdNewDeployment {
  network: Network
  networkSettings: IFirebirdNetworkSettings
  nodeCount: number
  machines: MachineType
  services: IFirebirdServices | undefined
  finalOptions: IFirebirdFinalOptions
  talkWithTeam: boolean
}

export interface IFirebirdNetworkSettings {
  chainId?: string
  dbOwner?: string
  kwilVersion?: string
  companyName?: string
}

export interface IFirebirdServices {
  daemon: boolean
  gateway: boolean
  indexer: boolean
  customBinary: boolean
}

export interface IFirebirdFinalOptions {
  inviteValidators?: boolean
  accessCode: string
}

export enum Network {
  testnet = "testnet",
  mainnet = "mainnet",
}

export enum MachineType {
  mini = "mini",
  small = "small",
  medium = "medium",
  large = "large",
}

export const KwilVersions = {
  "0.10.0-rc.1": "0.10.0-rc.1",
} as const

export interface IFirebirdDeploymentConfig {
  chain: {
    chain_id: string
    version: string
  }
  node_count: number
  machines: {
    instance_name: string
    provider: string
    region: string
    type: string
  }
  access_token: string
}

// Interfaces for Event Stream API responses

export enum DeploymentStatus {
  PENDING = "PENDING",
  DEPLOYING = "DEPLOYING",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
  STOPPED = "STOPPED",
  TERMINATED = "TERMINATED",
  STARTING = "STARTING",
  STOPPING = "STOPPING",
}

export enum DeploymentEvents {
  INIT_KEY_PAIR = "INIT_KEY_PAIR",
  CREATE_INSTANCE = "CREATE_INSTANCE",
  WAIT_INSTANCE_READY = "WAIT_INSTANCE_READY",
  INSTALL_KWILD = "INSTALL_KWILD",
  REGISTER_DOMAIN = "REGISTER_DOMAIN",
  FINALIZE_DEPLOYMENT = "FINALIZE_DEPLOYMENT",
  START_INSTANCE = "START_INSTANCE",
  STOP_INSTANCE = "STOP_INSTANCE",
}

// Interfaces for API responses

export interface IFirebirdApiResponse<T> {
  status: number
  message: string
  data?: T
}

export interface IFirebirdApiNewDeployment {
  chain: {
    chain_id: string
    db_owner: string
    version: string
  }
  node_count: number
  machines: {
    instance_name: string
    provider: string
    region: string
    type: string
  }
  access_token: string
}

export interface IFirebirdPagination {
  cursor: string
  limit: number
  order_by: string
}

// Response interfaces
export interface IFirebirdApiAccountResponse extends IFirebirdAccount {}

export interface IFirebirdApiVerifyOtpResponse extends IFirebirdAccount {
  access_token: string
}

export interface IFirebirdApiDeploymentsResponse {
  pagination: IFirebirdPagination
  result: IFirebirdDeployment[]
}

export interface IFirebirdApiDeployResponse {
  id: string
  status?: string
}

export enum NodeStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  FAILED = "FAILED",
  STOPPING = "STOPPING",
  STOPPED = "STOPPED",
  SHUTTING_DOWN = "SHUTTING_DOWN",
  TERMINATED = "TERMINATED",
}

export interface IFirebirdApiNode {
  id: string
  name: string
  status: NodeStatus
  created_at: number
  deployment_id: string
  private_ip: string
  public_ip: string
}

export interface IFirebirdApiService {
  address: string
  config: string
  endpoint: string
  id: string
  name: string
  running: boolean
}

export enum DeploymentEventType {
  NOT_STARTED = "NOT_STARTED",
  START = "START",
  FINISH = "FINISH",
  FAIL = "FAIL",
}

export const RequiredNetworkSettings: Record<string, string> = {
  chainId: "Chain ID",
  dbOwner: "Database Owner",
  kwilVersion: "Kwil Version",
  companyName: "Company Name",
  nodeCount: "Node Count",
  accessCode: "Access Code",
  machines: "Machine Type",
  network: "Network",
  customBinary: "Custom Binary",
  daemon: "Daemon",
  gateway: "Gateway",
  indexer: "Indexer",
}