pragma solidity ^0.4.11;


import 'zeppelin-solidity/contracts/ownership/Heritable.sol';


contract Crown is Heritable(12 hours) {
    uint public lastBid;
    uint public lastRoyalBid;
    uint public currentKingRulingStartDate;


    function Crown() public payable {
        require(msg.value >= 0.1 ether);

        // Bidding starts at 0.1 ether
        lastBid = 0.1 ether;
        lastRoyalBid = 0.1 ether;
        currentKingRulingStartDate = now;
    }

    // Has he gone mad, the king can open the castle vaults,
    // take all the gold and flee, leaving the kingdom reduced to rubble.
    function openVaultsAndFlee() external onlyOwner {
        require(kingIsMad());
        selfdestruct(owner);
    }

    function claimCrown() public payable {
        require(msg.sender != owner);
        require(msg.sender != heir);
        require(msg.value >= lastBid + lastBid * 10/100);
        owner.transfer(lastBid + lastBid * 5/100);
        
        heir = owner;
        owner = msg.sender;
        lastBid = msg.value;
        currentKingRulingStartDate = now;
        super.heartbeat();
    }

    function heirClaimCrown() public payable onlyHeir {
        require(ownerLives());
        require(msg.value >= lastRoyalBid + lastRoyalBid * 10/100);
        super.proclaimDeath();
    }

    function kingDefendCrown() public payable onlyOwner {
        require(!ownerLives());
        require(msg.value >= lastRoyalBid + lastRoyalBid * 10/100);
        super.heartbeat();
    }

    function kingIsInDanger() public view returns (bool) {
        return !ownerLives();
    }

    function getCurrentPrize() public view returns (uint) {
        return this.balance;
    }

    // Be careful, leading a kingdom can drive you insane.
    function kingIsMad() public view returns (bool) {
        return now - currentKingRulingStartDate >= 10 days;
    }


    //
    // NO-OPs
    //

    // Disallow owner to setHeir, so they cannot set themselves.
    function setHeir(address) public {}

    // Likewise, disallow owner to removeHeir, so they cannot avoid having a hostile heir.
    function removeHeir() public {}

    // We dont want the heir to be able to circumvent heirClaimCrown() and call
    // Heritable:proclaimDeath() directly.
    function proclaimDeath() public {}

    // Same here. We dont want the owner to be able to call Heritable.hearbeat().
    function heartbeat() public {}
}
