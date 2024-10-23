// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    uint256 Secrets;
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    event NewSecret (
        address indexed from,
        uint256 timestamp,
        string message,
        string name
    );

    struct Secret {
        address sender;
        string message;
        string name;
        uint256 timestamp;
    }

    Secret[] Secret;

    function getAllSecret() public view returns (Secret[] memory) {
        return Secret;
    }    

    function getTotalSecret() public view returns (uint256) {
        return totalSecret;
    }

    function buySecret(
        string memory _message,
        string memory _name
    ) payable public {
        require(msg.value == 0.01 ether, "You need to pay 0.01 ETH");

        totalSecret += 1;
        Secret.push(Secret(msg.sender, _message, _name, block.timestamp));

        (bool success,) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether to owner");

        emit NewSecret(msg.sender, block.timestamp, _message, _name);
    }
}