import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { convertToUSD, isRateValid, sum } from '.'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('Exchange rate validity verification - Add 5-minute expiration check', () => {
  expect(
    isRateValid({
      from_currency: 'USDT',
      to_currency: 'USD',
      rates: [
        {
          amount: '1000',
          rate: '1.000727',
        },
      ],
      time_stamp: 1602080062,
    }),
  ).toBe(false)

  expect(
    isRateValid({
      from_currency: 'USDT',
      to_currency: 'USD',
      rates: [
        {
          amount: '1000',
          rate: '1.000727',
        },
      ],
      time_stamp: Math.floor(Date.now() / 1000) - 100,
    }),
  ).toBe(true)
})

test('convert to USD', () => {
  expect(
    convertToUSD(
      [
        {
          currency: 'BTC',
          amount: 1.4,
        },
        {
          currency: 'ETH',
          amount: 20.3,
        },
      ],
      [
        {
          from_currency: 'BTC',
          to_currency: 'USD',
          rates: [
            {
              amount: '1000',
              rate: '10603.900000',
            },
          ],
          time_stamp: 1602080062,
        },
        {
          from_currency: 'ETH',
          to_currency: 'USD',
          rates: [
            {
              amount: '1000',
              rate: '340.210000',
            },
          ],
          time_stamp: 1602080062,
        },
      ],
      [
        {
          coin_id: 'BTC',
          name: 'Bitcoin',
          symbol: 'BTC',
          token_decimal: 8,
          contract_address: '',
          withdrawal_eta: ['30 secs', '2 mins', '30 mins'],
          colorful_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c1246f55568a400e48ac233/bitcoin.png',
          gray_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/gray_logo/5c1246f55568a400e48ac233/bitcoin1.png',
          has_deposit_address_tag: false,
          min_balance: 0,
          blockchain_symbol: 'BTC',
          trading_symbol: 'BTC',
          code: 'BTC',
          explorer: 'https://blockchair.com/bitcoin/transaction/',
          is_erc20: false,
          gas_limit: 0,
          token_decimal_value: '10000000',
          display_decimal: 8,
          supports_legacy_address: false,
          deposit_address_tag_name: '',
          deposit_address_tag_type: '',
          num_confirmation_required: 1,
        },
        {
          coin_id: 'ETH',
          name: 'Ethereum',
          symbol: 'ETH',
          token_decimal: 18,
          contract_address: '',
          withdrawal_eta: ['30 secs', '2 mins', '30 mins'],
          colorful_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c12487d5568a4017c20a993/ethereum.png',
          gray_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/gray_logo/5c12487d5568a4017c20a993/ethereum.png',
          has_deposit_address_tag: false,
          min_balance: 0,
          blockchain_symbol: 'ETH',
          trading_symbol: 'ETH',
          code: 'ETH',
          explorer: 'https://etherscan.io/tx/',
          is_erc20: false,
          gas_limit: 21000,
          token_decimal_value: '100000000000000000',
          display_decimal: 8,
          supports_legacy_address: false,
          deposit_address_tag_name: '',
          deposit_address_tag_type: '',
          num_confirmation_required: 1,
        },
      ],
    ),
  ).toEqual([
    {
      currencyInfo: {
        coin_id: 'BTC',
        name: 'Bitcoin',
        symbol: 'BTC',
        token_decimal: 8,
        contract_address: '',
        withdrawal_eta: ['30 secs', '2 mins', '30 mins'],
        colorful_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c1246f55568a400e48ac233/bitcoin.png',
        gray_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/gray_logo/5c1246f55568a400e48ac233/bitcoin1.png',
        has_deposit_address_tag: false,
        min_balance: 0,
        blockchain_symbol: 'BTC',
        trading_symbol: 'BTC',
        code: 'BTC',
        explorer: 'https://blockchair.com/bitcoin/transaction/',
        is_erc20: false,
        gas_limit: 0,
        token_decimal_value: '10000000',
        display_decimal: 8,
        supports_legacy_address: false,
        deposit_address_tag_name: '',
        deposit_address_tag_type: '',
        num_confirmation_required: 1,
      },
      amount: 1.4,
      usdValue: new Decimal(1.4).mul(new Decimal(10603.9)).dividedBy(1000),
    },

    {
      currencyInfo: {
        coin_id: 'ETH',
        name: 'Ethereum',
        symbol: 'ETH',
        token_decimal: 18,
        contract_address: '',
        withdrawal_eta: ['30 secs', '2 mins', '30 mins'],
        colorful_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c12487d5568a4017c20a993/ethereum.png',
        gray_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/gray_logo/5c12487d5568a4017c20a993/ethereum.png',
        has_deposit_address_tag: false,
        min_balance: 0,
        blockchain_symbol: 'ETH',
        trading_symbol: 'ETH',
        code: 'ETH',
        explorer: 'https://etherscan.io/tx/',
        is_erc20: false,
        gas_limit: 21000,
        token_decimal_value: '100000000000000000',
        display_decimal: 8,
        supports_legacy_address: false,
        deposit_address_tag_name: '',
        deposit_address_tag_type: '',
        num_confirmation_required: 1,
      },
      amount: 20.3,
      usdValue: new Decimal(20.3).mul(new Decimal(340.21)).dividedBy(1000),
    },
  ])

  expect(
    convertToUSD(
      [
        {
          currency: 'BTC',
          amount: 1.4,
        },
        {
          currency: 'ETH',
          amount: 20.3,
        },
      ],
      [
        {
          from_currency: 'BTC',
          to_currency: 'USD',
          rates: [
            {
              amount: '1000',
              rate: '10603.900000',
            },
          ],
          time_stamp: 1602080062,
        },
        {
          from_currency: 'ETH',
          to_currency: 'USD',
          rates: [
            {
              amount: '1000',
              rate: '340.210000',
            },
          ],
          time_stamp: 1602080062,
        },
      ],
      [
        {
          coin_id: 'ETH',
          name: 'Ethereum',
          symbol: 'ETH',
          token_decimal: 18,
          contract_address: '',
          withdrawal_eta: ['30 secs', '2 mins', '30 mins'],
          colorful_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c12487d5568a4017c20a993/ethereum.png',
          gray_image_url:
            'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/gray_logo/5c12487d5568a4017c20a993/ethereum.png',
          has_deposit_address_tag: false,
          min_balance: 0,
          blockchain_symbol: 'ETH',
          trading_symbol: 'ETH',
          code: 'ETH',
          explorer: 'https://etherscan.io/tx/',
          is_erc20: false,
          gas_limit: 21000,
          token_decimal_value: '100000000000000000',
          display_decimal: 8,
          supports_legacy_address: false,
          deposit_address_tag_name: '',
          deposit_address_tag_type: '',
          num_confirmation_required: 1,
        },
      ],
    ),
  ).toEqual([
    {
      currencyInfo: {
        coin_id: 'ETH',
        name: 'Ethereum',
        symbol: 'ETH',
        token_decimal: 18,
        contract_address: '',
        withdrawal_eta: ['30 secs', '2 mins', '30 mins'],
        colorful_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/colorful_logo/5c12487d5568a4017c20a993/ethereum.png',
        gray_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/monaco-cointrack-production/uploads/coin/gray_logo/5c12487d5568a4017c20a993/ethereum.png',
        has_deposit_address_tag: false,
        min_balance: 0,
        blockchain_symbol: 'ETH',
        trading_symbol: 'ETH',
        code: 'ETH',
        explorer: 'https://etherscan.io/tx/',
        is_erc20: false,
        gas_limit: 21000,
        token_decimal_value: '100000000000000000',
        display_decimal: 8,
        supports_legacy_address: false,
        deposit_address_tag_name: '',
        deposit_address_tag_type: '',
        num_confirmation_required: 1,
      },
      amount: 20.3,
      usdValue: new Decimal(20.3).mul(new Decimal(340.21)).dividedBy(1000),
    },
  ])
})
