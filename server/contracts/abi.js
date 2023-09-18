import FloppyContract from '../../artifacts/contracts/Floppy.sol/Floppy.json' assert { type: "json" };
import VaultContract from '../../artifacts/contracts/Vault.sol/Vault.json' assert { type: "json" };

export default {
   floppy: FloppyContract.abi,
   vault: VaultContract.abi
}
