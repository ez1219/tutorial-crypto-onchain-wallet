/**
 * Type-safe currency code representation
 * @note Extend with all supported currency codes
 */
type BaseCurrency = 'BTC' | 'ETH' | 'CRO' | 'USDT' | 'XRP'
export type CurrencyCode = BaseCurrency | (string & {})

/**
 * Cryptocurrency metadata interface
 */
export interface Cryptocurrency {
  /**
   * Unique identifier for the cryptocurrency
   * @example "BTC"
   */
  coin_id: string

  /**
   * Full name of the cryptocurrency
   * @example "Bitcoin"
   */
  name: string

  /**
   * Ticker symbol used in trading
   * @example "BTC"
   */
  symbol: string

  /**
   * Decimal precision for token units
   * @example 8 → 1 satoshi = 0.00000001 BTC
   */
  token_decimal: number

  /**
   * Smart contract address (empty for native coins)
   * @example "" for Bitcoin
   */
  contract_address: string

  /**
   * Estimated withdrawal processing times
   * @format Array of "<quantity> <time unit>" strings
   * @example ["30 secs", "2 mins", "30 mins"]
   */
  withdrawal_eta: string[]

  /**
   * URL of color version logo
   * @format Valid image URL
   */
  colorful_image_url: string

  /**
   * URL of grayscale version logo
   * @format Valid image URL
   */
  gray_image_url: string

  /**
   * Flag indicating if deposit requires additional tag/memo
   * @description Used for chains like XRP/XLM that require destination tags
   */
  has_deposit_address_tag: boolean

  /**
   * Minimum balance requirement for wallet
   * @example 0 indicates no minimum requirement
   */
  min_balance: number

  /**
   * Native symbol on its blockchain
   * @description May differ from trading symbol in some cases
   */
  blockchain_symbol: string

  /**
   * Symbol used in trading pairs
   */
  trading_symbol: string

  /**
   * Standard currency code
   * @description ISO 4217-like code where applicable
   */
  code: string

  /**
   * Blockchain explorer URL template
   * @format URL with {txHash} placeholder
   * @example "https://blockchair.com/bitcoin/transaction/{txHash}"
   */
  explorer: string

  /**
   * ERC-20 token compliance flag
   */
  is_erc20: boolean

  /**
   * Gas limit for contract interactions
   * @unit wei (for Ethereum-based chains)
   * @example 21000 for standard ETH transfer
   */
  gas_limit: number

  /**
   * Decimal precision value in string format
   * @description Big integer representation of 10^decimals
   * @example "10000000" represents 10^7
   */
  token_decimal_value: string

  /**
   * Display decimal precision
   * @description May differ from token_decimal for some assets
   */
  display_decimal: number

  /**
   * Legacy address format support flag
   * @description E.g., Bitcoin non-segwit addresses
   */
  supports_legacy_address: boolean

  /**
   * Deposit tag field name (if required)
   * @example "Memo", "Destination Tag"
   */
  deposit_address_tag_name: string

  /**
   * Deposit tag value type
   * @example "TEXT" | "NUMBER" | "HEX"
   */
  deposit_address_tag_type: string

  /**
   * Required blockchain confirmations
   * @description Number of confirmations needed to consider transaction final
   */
  num_confirmation_required: number
}

/**
 * Exchange rate API response structure
 */
export interface CryptocurrencyResponse {
  /** Indicates if the request was successful */
  ok: boolean
  total: number

  /** Array of currency conversion tiers */
  currencies: Cryptocurrency[]
}

/**
 * Exchange rate API response structure
 */
export interface ExchangeRateResponse {
  /** Indicates if the request was successful */
  ok: boolean

  /** Warning messages (if any) */
  warning: string

  /** Array of currency conversion tiers */
  tiers: CurrencyTier[]
}

/**
 * Represents currency conversion rate tiers
 */
export interface CurrencyTier {
  /** Source currency code (ISO 4217 format) */
  from_currency: string

  /** Target currency code (ISO 4217 format) */
  to_currency: string

  /** Array of rate tiers for different amount ranges */
  rates: RateTier[]

  /** UNIX timestamp of rate update (in seconds) */
  time_stamp: number
}

/**
 * Rate tier configuration for specific amount ranges
 */
export interface RateTier {
  /**
   * Minimum applicable amount threshold
   * @remarks
   * - String representation of decimal number
   * - Amount in source currency units
   * - Use decimal.js for precise calculations
   * @example "1000" - Applies to amounts ≥1000 source currency units
   */
  amount: string

  /**
   * Conversion rate value
   * @remarks
   * - String representation of decimal number
   * - Calculation: target_amount = source_amount × (rate / amount)
   * - Use decimal.js for precise calculations
   * @example With amount: "1000" and rate: "1.000727", 1000 units convert to 1000.727 target units
   */
  rate: string
}

/**
 * Wallet balance API response structure
 */
export interface WalletBalanceResponse {
  /** Indicates if the request was successful */
  ok: boolean

  /** Informational/warning messages (if any) */
  warning: string

  /** Array of currency balances */
  wallet: CurrencyBalance[]
}

/**
 * Represents a currency balance entry
 */
export interface CurrencyBalance {
  /**
   * Currency code identifier
   * @example "BTC", "ETH", "USDT"
   */
  currency: CurrencyCode

  /**
   * Current balance amount
   * @remarks
   * - Use decimal.js for precise financial calculations
   * - String representation recommended for precise values
   */
  amount: number
}
