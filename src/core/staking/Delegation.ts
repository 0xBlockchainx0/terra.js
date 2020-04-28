import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { AccAddress, ValAddress } from '../strings';

/**
 * Stores information about the status of a delegation between a delegator and validator, fetched from the blockchain.
 */
export class Delegation extends JSONSerializable<Delegation.Data> {
  /**
   * @param delegator_address 	delegator's account address
   * @param validator_address 	validator's operator address
   * @param shares 	delegator's shares
   * @param balance balance of the delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public shares: Dec,
    public balance: Int
  ) {
    super();
  }

  public static fromData(data: Delegation.Data): Delegation {
    const { delegator_address, validator_address, shares, balance } = data;
    return new Delegation(
      delegator_address,
      validator_address,
      new Dec(shares),
      new Int(balance)
    );
  }

  public toData(): Delegation.Data {
    const { delegator_address, validator_address, shares, balance } = this;
    return {
      delegator_address,
      validator_address,
      shares: shares.toString(),
      balance: balance.toString(),
    };
  }
}

export namespace Delegation {
  export interface Data {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    shares: string;
    balance: string;
  }
}
