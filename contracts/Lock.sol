// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract BuyMeACoffee{
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    address payable owner;
    Memo[] memos;
    constructor(address _owner){
        owner = payable(_owner);
    }
    function buyMeACoffee(string memory _name, string memory _message) public payable{
        require(msg.value > 0, "value must be greater than 0");
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }
    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
    function tip() public{
        require(owner.send(address(this).balance), "transfer failed");
    }

}