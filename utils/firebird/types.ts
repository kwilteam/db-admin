export interface IFirebirdApiResponse<T> {
  status: number
  message: string
  data?: T
}

export interface IFirebirdAccount {
  created_at: number
  email: string
  id: string
  origin: string
}

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

export enum DeploymentStatus {
  PENDING = "PENDING",
  DEPLOYING = "DEPLOYING",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
  STOPPED = "STOPPED",
  TERMINATED = "TERMINATED",
}

export interface IFirebirdDeployment {
  config: IFirebirdDeploymentConfig
  created_at: number
  id: string
  status: DeploymentStatus
  updated_at: number
  endpoints: {
    chain: string //TODO: Change to provider?
  }
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
