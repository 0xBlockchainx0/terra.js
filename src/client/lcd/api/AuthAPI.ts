import {
  AccAddress,
  Account,
  Coins,
  LazyGradedVestingAccount,
} from '../../../core';
import { BaseAPI } from './BaseAPI';

export class AuthAPI extends BaseAPI {
  /**
   * Looks up the account information using its Terra account address. If the account has
   * vesting, it will be a [[LazyGradedVestingAccount]].
   *
   * @param address address of account to look up
   */
  public async accountInfo(
    address: AccAddress
  ): Promise<Account | LazyGradedVestingAccount> {
    const { result } = await this.c.get<
      Account.Data | LazyGradedVestingAccount.Data
    >(`/auth/accounts/${address}`);

    // Until columbus-4 it used to return coins from /auth/accounts
    if (!result.value.coins) {
      result.value.coins = (
        await this.c.get<Coins.Data>(`/bank/balances/${address}`)
      ).result;
    }

    if (result.type === 'core/Account') {
      return Account.fromData(result);
    } else {
      return LazyGradedVestingAccount.fromData(result);
    }
  }
}
