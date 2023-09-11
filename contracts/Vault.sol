// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol"; /*revert when transaction failed */
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol"; /*  */

contract Valut is Ownable, AccessControlEnumerable {
    IERC20 private token;
    uint256 public maxWithdrawAmount;
    bool public withdrawEnable;
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");

    function setWithdrarwEnable(bool _isEnabel) public onlyOwner {
        withdrawEnable = _isEnabel;
    }

    function setMaxWithdrawAmount(uint256 _maxAmount) public onlyOwner {
        maxWithdrawAmount = _maxAmount;
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function withdraw(uint256 _amount, address _to) external onlyWithdrawer {
        require(withdrawEnable, "Withdraw is not available");
        require(_amount <= maxWithdrawAmount, "Exceed maxium amount");
        token.transfer(_to, _amount);
    }

    function deposit(uint256 _amount) external {
        require(
            token.balanceOf(_msgSender()) >= _amount,
            "Insufficient account balance"
        );
        SafeERC20.safeTransferFrom(token, _msgSender(), address(this), _amount);
    }

    modifier onlyWithdrawer() {
        require(
            owner() == _msgSender() || hasRole(WITHDRAWER_ROLE, _msgSender()),
            "Caller is not a withdrawer"
        );
        _;
    }
}
